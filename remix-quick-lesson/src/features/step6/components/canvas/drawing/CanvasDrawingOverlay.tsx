import React, { useState, useRef } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { DrawingToolbarBadge } from './DrawingToolbarBadge';

interface CanvasDrawingOverlayProps {
  elements: SlideElement[];
  onUpdateElements: (elements: SlideElement[]) => void;
  onClose: () => void;
}

export const CanvasDrawingOverlay: React.FC<CanvasDrawingOverlayProps> = ({
  elements, onUpdateElements, onClose,
}) => {
  const [tool, setTool] = useState<'pen' | 'highlighter'>('pen');
  const [color, setColor] = useState('#EF4444');
  const [strokeWidth, setStrokeWidth] = useState(1.2);
  const [currentPoints, setCurrentPoints] = useState<Array<{ x: number; y: number }>>([]);
  const isDrawing = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const getPt = (e: React.MouseEvent) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)),
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pt = getPt(e);
    if (!pt) return;
    isDrawing.current = true;
    setCurrentPoints([pt]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    const pt = getPt(e);
    if (pt) setCurrentPoints((prev) => [...prev, pt]);
  };

  const handleMouseUp = () => {
    if (!isDrawing.current || currentPoints.length < 2) {
      isDrawing.current = false;
      setCurrentPoints([]);
      return;
    }
    isDrawing.current = false;
    const newStroke = {
      points: currentPoints,
      color: tool === 'highlighter' ? '#FACC15' : color,
      width: tool === 'highlighter' ? strokeWidth * 2.5 : strokeWidth,
      isHighlighter: tool === 'highlighter',
    };

    const existingDrawing = elements.find((e) => e.type === 'shape' && e.meta?.isDrawingLayer);
    if (existingDrawing) {
      onUpdateElements(elements.map((e) => (e.id === existingDrawing.id ? {
        ...e, meta: { ...(e.meta || {}), strokes: [...(e.meta?.strokes || []), newStroke] }
      } : e)));
    } else {
      onUpdateElements([...elements, {
        id: `el-draw-${Date.now()}`, type: 'shape', x: 0, y: 0, width: 100, height: 100,
        content: '', fillColor: 'transparent', meta: { isDrawingLayer: true, strokes: [newStroke] },
      }]);
    }
    setCurrentPoints([]);
  };

  const currentD = currentPoints.length > 1
    ? currentPoints.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '')
    : '';

  return (
    <div className="absolute inset-0 z-50 pointer-events-auto cursor-crosshair">
      <DrawingToolbarBadge
        tool={tool} color={color} strokeWidth={strokeWidth}
        onSelectTool={setTool} onSelectColor={setColor} onSelectWidth={setStrokeWidth}
        onClear={() => onUpdateElements(elements.filter((e) => !(e.type === 'shape' && e.meta?.isDrawingLayer)))}
        onDone={onClose}
      />
      <svg
        ref={svgRef} viewBox="0 0 100 100"
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        className="w-full h-full"
      >
        {currentD && (
          <path
            d={currentD} fill="none" stroke={tool === 'highlighter' ? '#FACC15' : color}
            strokeWidth={tool === 'highlighter' ? strokeWidth * 2.5 : strokeWidth}
            strokeLinecap="round" strokeLinejoin="round" opacity={tool === 'highlighter' ? 0.45 : 1}
          />
        )}
      </svg>
    </div>
  );
};

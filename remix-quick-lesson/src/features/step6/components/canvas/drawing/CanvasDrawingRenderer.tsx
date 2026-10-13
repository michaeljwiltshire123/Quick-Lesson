import React from 'react';
import { SlideElement } from '../../../types/slideTypes';

interface CanvasDrawingRendererProps {
  element: SlideElement;
}

export const CanvasDrawingRenderer: React.FC<CanvasDrawingRendererProps> = ({ element }) => {
  const meta = element.meta || {};
  const strokes: Array<{ points: Array<{ x: number; y: number }>; color: string; width: number; isHighlighter?: boolean }> =
    meta.strokes || [];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none overflow-visible">
      {strokes.map((stroke, i) => {
        if (!stroke.points || stroke.points.length < 2) return null;
        const d = stroke.points.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={stroke.color}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={stroke.isHighlighter ? 0.45 : 1}
            style={{ mixBlendMode: stroke.isHighlighter ? 'multiply' : 'normal' }}
          />
        );
      })}
    </svg>
  );
};

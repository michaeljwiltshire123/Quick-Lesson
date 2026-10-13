import React, { useState, useRef } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { X, Pencil, RotateCcw, Check } from 'lucide-react';

interface CustomMaskModalProps {
  isOpen: boolean;
  selectedElement?: SlideElement;
  onClose: () => void;
  onApplyCustomMask: (shapeName: string, path: string) => void;
}

export const CustomMaskModal: React.FC<CustomMaskModalProps> = ({
  isOpen, selectedElement, onClose, onApplyCustomMask,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const getPos = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return { x: 50, y: 50 };
    const r = containerRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, Math.round(((e.clientX - r.left) / r.width) * 1000) / 10)),
      y: Math.max(0, Math.min(100, Math.round(((e.clientY - r.top) / r.height) * 1000) / 10)),
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const p = getPos(e);
    setPoints((prev) => {
      const last = prev[prev.length - 1];
      return last && Math.hypot(p.x - last.x, p.y - last.y) < 1 ? prev : [...prev, p];
    });
  };

  const polygonPath = points.length >= 3 ? `polygon(${points.map((p) => `${p.x}% ${p.y}%`).join(', ')})` : '';
  const crop = selectedElement?.crop;
  const imageClip = crop ? `inset(${crop.top}% ${crop.right}% ${crop.bottom}% ${crop.left}%)` : undefined;
  const aspect = `${Math.max(1, selectedElement?.width || 16)} / ${Math.max(1, selectedElement?.height || 9)}`;

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in select-none">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl max-w-lg w-full p-4 space-y-3 text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <Pencil className="w-5 h-5 text-amber-700" />
            <h3 className="font-extrabold text-sm text-stone-900">Draw Freehand Mask on Image</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <p className="text-xs text-stone-600">
          ✏️ Click & hold down to sketch. Watch the glowing outline trace your pencil in real-time!
        </p>

        <div className="w-full flex items-center justify-center bg-stone-950 rounded-xl p-2 border-2 border-amber-500/80 shadow-inner">
          <div
            ref={containerRef}
            onMouseDown={(e) => { setIsDrawing(true); setPoints([getPos(e)]); }}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            style={{ aspectRatio: aspect }}
            className="relative w-full max-h-72 cursor-crosshair overflow-hidden select-none"
          >
            {selectedElement?.content && (
              <img src={selectedElement.content} alt="Slide visual" style={{ clipPath: imageClip }} className="absolute inset-0 w-full h-full object-fill pointer-events-none opacity-90" />
            )}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-20">
              {points.length > 1 && (
                <polyline
                  points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill={isDrawing ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.35)'}
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            {points.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-white/80 text-xs font-semibold bg-stone-900/40 pointer-events-none">
                Click & drag with your pencil here
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-stone-100">
          <button type="button" onClick={() => setPoints([])} disabled={points.length === 0} className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-40">
            <RotateCcw className="w-3.5 h-3.5" /> Clear & Redraw
          </button>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer">Cancel</button>
            <button
              type="button"
              disabled={points.length < 5}
              onClick={() => { onApplyCustomMask('custom_polygon', polygonPath); onClose(); }}
              className="px-4 py-1.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-amber-200" /> Apply Mask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

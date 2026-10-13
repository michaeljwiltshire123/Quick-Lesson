import React, { useState, useRef } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { GoogleSlidesBoundingBox } from '../canvas/GoogleSlidesBoundingBox';
import { ResizeDirection } from '../canvas/resizeHandler';
import { Flashlight, Maximize2, Minimize2, Move } from 'lucide-react';

interface CanvasSpotlightElementProps {
  element: SlideElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent) => void;
  onStartResize: (e: React.MouseEvent, dir: ResizeDirection) => void;
}

export const CanvasSpotlightElement: React.FC<CanvasSpotlightElementProps> = ({
  element, isSelected, onSelect, onUpdateElement, onStartDrag, onStartResize,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [beamX, setBeamX] = useState<number>(element.meta?.spotlightX ?? 50);
  const [beamY, setBeamY] = useState<number>(element.meta?.spotlightY ?? 50);
  const [beamRadius, setBeamRadius] = useState<number>(element.meta?.beamRadius ?? 90);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setBeamX(xPct);
    setBeamY(yPct);
    onUpdateElement({ meta: { ...(element.meta || {}), spotlightX: xPct, spotlightY: yPct } });
  };

  const adjustBeamSize = (delta: number) => {
    const newRad = Math.max(50, Math.min(220, beamRadius + delta));
    setBeamRadius(newRad);
    onUpdateElement({ meta: { ...(element.meta || {}), beamRadius: newRad } });
  };

  return (
    <div
      ref={containerRef}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseDown={onStartDrag}
      onPointerMove={handlePointerMove}
      onTouchMove={(e) => {
        if (!containerRef.current || !e.touches[0]) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        setBeamX(Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)));
        setBeamY(Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100)));
      }}
      style={{
        left: `${element.x}%`, top: `${element.y}%`, width: `${element.width}%`, height: `${element.height}%`,
        background: `radial-gradient(circle ${beamRadius}px at ${beamX}% ${beamY}%, transparent 95%, rgba(15, 23, 42, 0.88) 100%)`,
      }}
      className={`absolute inset-0 z-20 cursor-crosshair select-none touch-none rounded-xl transition-all ${
        isSelected ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      {isSelected && <GoogleSlidesBoundingBox onStartDrag={onStartDrag} onStartResize={onStartResize} />}

      {/* Floating HUD Controls for Beam Radius */}
      <div className="absolute top-2 right-2 bg-stone-900/90 border border-yellow-500/60 rounded-xl p-1.5 flex items-center gap-1.5 text-yellow-300 shadow-xl pointer-events-auto backdrop-blur-xs">
        <span className="flex items-center gap-1 text-[10px] font-black tracking-wide px-1">
          <Flashlight className="w-3.5 h-3.5 text-yellow-400" />
          <span>Spotlight ({beamRadius}px)</span>
        </span>
        <button type="button" onClick={() => adjustBeamSize(-20)} className="p-1 bg-stone-800 hover:bg-stone-700 text-yellow-300 rounded cursor-pointer" title="Smaller Focus">
          <Minimize2 className="w-3 h-3" />
        </button>
        <button type="button" onClick={() => adjustBeamSize(20)} className="p-1 bg-stone-800 hover:bg-stone-700 text-yellow-300 rounded cursor-pointer" title="Larger Beam">
          <Maximize2 className="w-3 h-3" />
        </button>
      </div>

      {/* Touch / Mouse Drag Prompt Indicator */}
      <div style={{ left: `${beamX}%`, top: `${beamY}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
        <div style={{ width: `${beamRadius * 2}px`, height: `${beamRadius * 2}px` }} className="rounded-full border-2 border-dashed border-yellow-400/60 animate-spin-slow flex items-center justify-center">
          <Move className="w-4 h-4 text-yellow-300 opacity-40" />
        </div>
        <span className="text-[9px] font-extrabold text-yellow-200 bg-stone-950/80 px-1.5 py-0.5 rounded shadow-md mt-1 whitespace-nowrap border border-yellow-500/40">
          Move Mouse / Touch Screen
        </span>
      </div>
    </div>
  );
};

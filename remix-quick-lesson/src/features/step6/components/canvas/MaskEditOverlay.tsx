import React, { useRef } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { Move, Check } from 'lucide-react';

interface MaskEditOverlayProps {
  element: SlideElement;
  containerRect?: DOMRect | null;
  onUpdateMaskMeta: (meta: { maskScale?: number; maskX?: number; maskY?: number }) => void;
  onDoneMasking: () => void;
}

export const MaskEditOverlay: React.FC<MaskEditOverlayProps> = ({
  element, onUpdateMaskMeta, onDoneMasking,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const scale = element.meta?.maskScale ?? 100;
  const maskX = element.meta?.maskX ?? 50;
  const maskY = element.meta?.maskY ?? 50;

  const startDragCenter = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const elRect = overlayRef.current?.getBoundingClientRect();
    if (!elRect) return;

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startX = maskX;
    const startY = maskY;

    const onMove = (m: MouseEvent) => {
      const dx = ((m.clientX - startClientX) / elRect.width) * 100;
      const dy = ((m.clientY - startClientY) / elRect.height) * 100;
      onUpdateMaskMeta({
        maskX: Math.max(5, Math.min(95, Math.round(startX + dx))),
        maskY: Math.max(5, Math.min(95, Math.round(startY + dy))),
      });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const startResizeNode = (e: React.MouseEvent, dir: string) => {
    e.stopPropagation();
    e.preventDefault();
    const elRect = overlayRef.current?.getBoundingClientRect();
    if (!elRect) return;

    const startClientY = e.clientY;
    const startClientX = e.clientX;
    const startScale = scale;

    const onMove = (m: MouseEvent) => {
      const dy = (m.clientY - startClientY) * (dir.includes('t') ? -1 : 1);
      const dx = (m.clientX - startClientX) * (dir.includes('l') ? -1 : 1);
      const deltaPx = Math.max(Math.abs(dy), Math.abs(dx)) * (dy + dx >= 0 ? 1 : -1);
      const deltaScale = (deltaPx / Math.max(elRect.width, elRect.height)) * 200;
      onUpdateMaskMeta({ maskScale: Math.max(15, Math.min(220, Math.round(startScale + deltaScale))) });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div ref={overlayRef} className="absolute inset-0 pointer-events-auto z-50 select-none">
      <div
        style={{ width: `${scale}%`, height: `${scale}%`, left: `${maskX}%`, top: `${maskY}%`, transform: 'translate(-50%, -50%)' }}
        onMouseDown={startDragCenter}
        className="absolute border-2 border-black shadow-[0_0_0_1px_rgba(255,255,255,0.95)] cursor-move"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Move className="w-5 h-5 text-stone-900 bg-white/95 rounded-full p-0.5 shadow-md" />
        </div>
        <div onMouseDown={(e) => startResizeNode(e, 'tl')} className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nwse-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 't')} className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-black border border-white cursor-ns-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 'tr')} className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nesw-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 'r')} className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2 h-4 bg-black border border-white cursor-ew-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 'br')} className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nwse-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 'b')} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-black border border-white cursor-ns-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 'bl')} className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nesw-resize z-20" />
        <div onMouseDown={(e) => startResizeNode(e, 'l')} className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2 h-4 bg-black border border-white cursor-ew-resize z-20" />
      </div>

      <button type="button" onClick={onDoneMasking} className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10.5px] font-bold px-3 py-1 rounded shadow-lg hover:bg-stone-800 cursor-pointer z-50 flex items-center gap-1.5">
        <Check className="w-3.5 h-3.5 text-amber-300" /> Done Masking (Enter)
      </button>
    </div>
  );
};

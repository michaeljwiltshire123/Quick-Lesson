import React from 'react';
import { SlideElement } from '../../types/slideTypes';

interface GoogleSlidesCropOverlayProps {
  element: SlideElement;
  containerRect: DOMRect | null;
  onUpdateCrop: (crop: { top: number; right: number; bottom: number; left: number }) => void;
  onDoneCrop: () => void;
}

export const GoogleSlidesCropOverlay: React.FC<GoogleSlidesCropOverlayProps> = ({
  element, containerRect, onUpdateCrop, onDoneCrop,
}) => {
  const crop = element.crop || { top: 0, right: 0, bottom: 0, left: 0 };

  const startCropDrag = (e: React.MouseEvent, handle: 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br') => {
    e.stopPropagation();
    e.preventDefault();
    if (!containerRect) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initTop = crop.top;
    const initRight = crop.right;
    const initBottom = crop.bottom;
    const initLeft = crop.left;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / containerRect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / containerRect.height) * 100;

      let nextT = initTop;
      let nextR = initRight;
      let nextB = initBottom;
      let nextL = initLeft;

      if (handle.includes('t')) nextT = Math.max(0, Math.min(80 - initBottom, Math.round(initTop + deltaY)));
      if (handle.includes('b')) nextB = Math.max(0, Math.min(80 - initTop, Math.round(initBottom - deltaY)));
      if (handle.includes('l')) nextL = Math.max(0, Math.min(80 - initRight, Math.round(initLeft + deltaX)));
      if (handle.includes('r')) nextR = Math.max(0, Math.min(80 - initLeft, Math.round(initRight - deltaX)));

      onUpdateCrop({ top: nextT, right: nextR, bottom: nextB, left: nextL });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="absolute inset-0 pointer-events-auto z-50 select-none" onDoubleClick={onDoneCrop}>
      {/* Black Google Slides Corner & Edge Crop Handles */}
      <div
        style={{ top: `${crop.top}%`, right: `${crop.right}%`, bottom: `${crop.bottom}%`, left: `${crop.left}%` }}
        className="absolute border-2 border-black shadow-[0_0_0_1px_rgba(255,255,255,0.8)]"
      >
        {/* Top-Left Corner Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'tl')} className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nwse-resize z-10" title="Crop Top-Left" />
        {/* Top Edge Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 't')} className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-black border border-white cursor-ns-resize z-10" title="Crop Top" />
        {/* Top-Right Corner Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'tr')} className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nesw-resize z-10" title="Crop Top-Right" />
        {/* Right Edge Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'r')} className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2 h-4 bg-black border border-white cursor-ew-resize z-10" title="Crop Right" />
        {/* Bottom-Right Corner Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'br')} className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nwse-resize z-10" title="Crop Bottom-Right" />
        {/* Bottom Edge Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'b')} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-black border border-white cursor-ns-resize z-10" title="Crop Bottom" />
        {/* Bottom-Left Corner Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'bl')} className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-black border border-white cursor-nesw-resize z-10" title="Crop Bottom-Left" />
        {/* Left Edge Handle */}
        <div onMouseDown={(e) => startCropDrag(e, 'l')} className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2 h-4 bg-black border border-white cursor-ew-resize z-10" title="Crop Left" />
      </div>

      <button
        type="button"
        onClick={onDoneCrop}
        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg hover:bg-stone-800 cursor-pointer z-50"
      >
        Done Cropping (Enter)
      </button>
    </div>
  );
};

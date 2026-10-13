import React, { useRef, useEffect, useState } from 'react';
import { CropTransform } from './cropUtils';

interface CropViewportProps {
  image: HTMLImageElement;
  transform: CropTransform;
  onTransformChange: (t: CropTransform) => void;
  size?: number;
}

export const CropViewport: React.FC<CropViewportProps> = ({
  image,
  transform,
  onTransformChange,
  size = 240,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({ startX: 0, startY: 0, initX: 0, initY: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: transform.x,
      initY: transform.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.startX;
    const dy = e.clientY - dragStartRef.current.startY;
    onTransformChange({
      ...transform,
      x: dragStartRef.current.initX + dx,
      y: dragStartRef.current.initY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  const imgW = image.width * transform.scale;
  const imgH = image.height * transform.scale;
  const left = size / 2 + transform.x - imgW / 2;
  const top = size / 2 + transform.y - imgH / 2;

  return (
    <div
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative overflow-hidden bg-[#2D2A26] rounded-2xl select-none touch-none cursor-${isDragging ? 'grabbing' : 'grab'} shadow-inner border border-[#2D2A26]/20`}
    >
      <img
        src={image.src}
        alt="Cropping target"
        draggable={false}
        style={{ width: imgW, height: imgH, left, top }}
        className="absolute pointer-events-none max-w-none transition-none"
      />

      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, transparent ${size * 0.44}px, rgba(15, 12, 9, 0.68) ${size * 0.44 + 1}px)`,
        }}
      />

      <div
        style={{ width: size * 0.88, height: size * 0.88 }}
        className="absolute inset-0 m-auto pointer-events-none rounded-full border-2 border-dashed border-[#F59E0B] shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]"
      />
    </div>
  );
};

import React, { useState } from 'react';
import { SlideElement } from '../types/slideTypes';
import { ResizeDirection, computeResizeBounds } from '../components/canvas/resizeHandler';

interface UsePreviewTransformProps {
  element: SlideElement;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onUpdateBounds: (id: string, patch: { x?: number; y?: number; width?: number; height?: number }) => void;
  onSelect: () => void;
}

export function usePreviewElementTransform({
  element, containerRef, onUpdateBounds, onSelect,
}: UsePreviewTransformProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  const handleStartDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const initX = element.x ?? 15;
    const initY = element.y ?? 20;

    setIsInteracting(true);

    const onMouseMove = (me: MouseEvent) => {
      const dx = ((me.clientX - startX) / rect.width) * 100;
      const dy = ((me.clientY - startY) / rect.height) * 100;
      const nextX = Math.round(Math.max(0, Math.min(100 - (element.width ?? 30), initX + dx)) * 10) / 10;
      const nextY = Math.round(Math.max(0, Math.min(100 - (element.height ?? 20), initY + dy)) * 10) / 10;
      onUpdateBounds(element.id, { x: nextX, y: nextY });
    };

    const onMouseUp = () => {
      setIsInteracting(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleStartResize = (e: React.MouseEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    onSelect();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const init = {
      x: element.x ?? 15, y: element.y ?? 20,
      width: element.width ?? 35, height: element.height ?? 25,
    };

    setIsInteracting(true);

    const onMouseMove = (me: MouseEvent) => {
      const deltaX = ((me.clientX - startX) / rect.width) * 100;
      const deltaY = ((me.clientY - startY) / rect.height) * 100;
      const bounds = computeResizeBounds(dir, init, deltaX, deltaY);
      onUpdateBounds(element.id, bounds);
    };

    const onMouseUp = () => {
      setIsInteracting(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return { isInteracting, handleStartDrag, handleStartResize };
}

import { useState, useCallback } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { CurvedTextType } from '../../types/visualAidEffectTypes';
import { generateCurvedBannerPng } from './wordart/generateCurvedBannerPng';

interface UseCurvatureDragOptions {
  element: SlideElement;
  onUpdateElement?: (patch: Partial<SlideElement>) => void;
}

export function useCurvatureDrag({ element, onUpdateElement }: UseCurvatureDragOptions) {
  const [isDraggingCurve, setIsDraggingCurve] = useState(false);

  const startCurvatureDrag = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingCurve(true);

    const initialY = e.clientY;
    const initialDeg = Number(element.meta?.curvedDegree ?? 45);
    const initialType: CurvedTextType = element.meta?.curvedType || 'arc-up';
    const textContent = element.caption || element.content || 'Headline Words';
    const color = element.textStyle?.color || element.meta?.bannerColor || '#92400E';

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const deltaY = initialY - moveEvent.clientY; // Dragging UP is positive delta

      let newDeg = Math.round(initialDeg + deltaY * 0.75);
      let newType: CurvedTextType = initialType;

      if (newDeg < 5) {
        newType = 'arc-down';
        newDeg = Math.min(95, Math.abs(newDeg) + 10);
      } else {
        newType = 'arc-up';
        newDeg = Math.min(95, Math.max(10, newDeg));
      }

      const newSvgDataUrl = generateCurvedBannerPng({
        text: textContent,
        curvedType: newType,
        curvedDegree: newDeg,
        color,
        bold: true,
      });

      onUpdateElement?.({
        content: newSvgDataUrl,
        meta: {
          ...(element.meta || {}),
          isBannerSticker: true,
          curvedType: newType,
          curvedDegree: newDeg,
        },
      });
    };

    const handleMouseUp = () => {
      setIsDraggingCurve(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [element, onUpdateElement]);

  return { isDraggingCurve, startCurvatureDrag };
}

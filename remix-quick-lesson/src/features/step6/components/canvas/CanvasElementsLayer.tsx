import React, { useEffect, useMemo } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { CanvasElementRenderer } from './CanvasElementRenderer';
import { getAnimationCssClass, getAnimationCssTimingStyle } from '../../utils/animationCssUtils';
import { useMotionPlayback } from '../../hooks/useMotionPlayback';
import { ResizeDirection } from './resizeHandler';
import { AnimationKeyframesStyle } from './AnimationKeyframesStyle';
import { getAnimationStepPlan } from '../../utils/animationStepPlan';

interface CanvasElementsLayerProps {
  elements: SlideElement[];
  selectedIds?: string[];
  selectedId?: string | null;
  cropElementId: string | null;
  isPlaying: boolean;
  step: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: string, e: React.MouseEvent) => void;
  onDoneCrop: () => void;
  onUpdateContent: (id: string, content: string) => void;
  onUpdateElement: (id: string, patch: Partial<SlideElement>) => void;
  onStartDrag: (e: React.MouseEvent, id: string) => void;
  onStartResize: (e: React.MouseEvent, id: string, dir: ResizeDirection) => void;
  onJumpToAims?: () => void;
}

export const CanvasElementsLayer: React.FC<CanvasElementsLayerProps> = ({
  elements, selectedIds = [], selectedId, cropElementId, isPlaying, step, containerRef,
  onSelect, onDoneCrop, onUpdateContent, onUpdateElement, onStartDrag, onStartResize, onJumpToAims,
}) => {
  const { hoveredElementId, advanceStep, autoAdvanceAfterStep } = useMotionPlayback();
  const animationPlan = useMemo(
    () => isPlaying ? getAnimationStepPlan(elements) : null,
    [elements, isPlaying],
  );
  const effectiveSelectedIds = selectedIds.length > 0 ? selectedIds : (selectedId ? [selectedId] : []);
  const autoAdvanceDelay = autoAdvanceAfterStep[step];

  useEffect(() => {
    if (!isPlaying || autoAdvanceDelay === undefined) return;
    const timer = window.setTimeout(advanceStep, Math.max(0, autoAdvanceDelay * 1000));
    return () => window.clearTimeout(timer);
  }, [advanceStep, autoAdvanceDelay, isPlaying, step]);

  return (
    <div className="absolute inset-0 z-20">
      <AnimationKeyframesStyle />
      {elements.map((el) => {
        const isHovered = !isPlaying && el.id === hoveredElementId;
        const elementSteps = animationPlan?.stepsByElement.get(el.id);
        const animClass = isPlaying
          ? getAnimationCssClass(el, step, elementSteps)
          : 'pointer-events-auto';
        const isSelected = effectiveSelectedIds.includes(el.id);
        const previewSnippet = el.content ? el.content.replace(/<[^>]*>/g, '').slice(0, 24) : el.type.toUpperCase();

        return (
          <div key={el.id} className="absolute inset-0">
            {isHovered && (
              <>
                <div
                  style={{ left: `${el.x}%`, top: `${Math.max(0, el.y - 6)}%` }}
                  className="absolute z-40 bg-amber-950 text-amber-200 text-[9.5px] font-bold px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap border border-amber-400"
                >
                  Highlighted: "{previewSnippet}..."
                </div>
                <div
                  style={{ left: `${el.x}%`, top: `${el.y}%`, width: `${el.width}%`, height: `${el.height}%` }}
                  className="absolute z-30 pointer-events-none ring-3 ring-amber-500 ring-offset-2 ring-offset-white rounded-lg shadow-xl animate-pulse"
                />
              </>
            )}
            <CanvasElementRenderer
              element={el}
              isSelected={isSelected}
              isCropping={cropElementId === el.id}
              containerRect={containerRef.current?.getBoundingClientRect() || null}
              onSelect={(e) => onSelect(el.id, e)}
              onDoneCrop={onDoneCrop}
              onUpdateContent={(c) => onUpdateContent(el.id, c)}
              onUpdateElement={(p) => onUpdateElement(el.id, p)}
              onStartDrag={(e) => onStartDrag(e, el.id)}
              onStartResize={(e, dir) => onStartResize(e, el.id, dir)}
              onJumpToAims={onJumpToAims}
              animClass={animClass}
              animStyle={getAnimationCssTimingStyle(
                el,
                animationPlan?.timingByElement.get(el.id),
                isPlaying ? step : undefined,
                isPlaying ? elementSteps : undefined,
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

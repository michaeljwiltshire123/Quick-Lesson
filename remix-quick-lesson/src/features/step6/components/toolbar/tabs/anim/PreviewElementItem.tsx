import React, { CSSProperties } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { getAnimationCssClass } from '../../../../utils/animationCssUtils';
import { getLiveCatalogueKeyframeStyle } from '../../../../utils/cataloguePreviewKeyframes';
import { usePreviewElementTransform } from '../../../../hooks/usePreviewElementTransform';
import { Image as ImageIcon } from 'lucide-react';
import { AnimationPhaseSteps } from '../../../../utils/animationStepPlan';
import { getAnimationCssTimingStyle } from '../../../../utils/animationCssUtils';

interface PreviewElementItemProps {
  element: SlideElement;
  isSelected: boolean;
  playbackStep: number;
  animationSteps?: AnimationPhaseSteps;
  previewEffectId?: string | null;
  onSelect: () => void;
  onUpdateBounds: (id: string, patch: { x?: number; y?: number; width?: number; height?: number }) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const PreviewElementItem: React.FC<PreviewElementItemProps> = ({
  element, isSelected, playbackStep, animationSteps, previewEffectId, onSelect, onUpdateBounds, containerRef,
}) => {
  const { isInteracting, handleStartDrag } = usePreviewElementTransform({
    element, containerRef, onUpdateBounds, onSelect,
  });

  const isLivePreviewActive = Boolean(isSelected && previewEffectId);
  const animClass = isLivePreviewActive ? '' : getAnimationCssClass(element, playbackStep, animationSteps);
  const livePreviewStyle: CSSProperties = isLivePreviewActive && previewEffectId
    ? getLiveCatalogueKeyframeStyle(previewEffectId, element.meta?.animDuration || 0.8)
    : {};

  const isImg = element.type === 'image' || Boolean(element.content?.startsWith('http') || element.content?.startsWith('data:image'));

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      onMouseDown={handleStartDrag}
      style={{
        left: `${element.x ?? 15}%`, top: `${element.y ?? 20}%`,
        width: `${element.width ?? 35}%`, height: `${element.height ?? 25}%`,
        ...livePreviewStyle,
        ...getAnimationCssTimingStyle(element),
      }}
      className={`absolute select-none cursor-move rounded-xl transition-shadow ${animClass} ${
        isSelected ? 'z-30' : 'hover:outline hover:outline-1 hover:outline-blue-400 z-10'
      } ${isInteracting ? 'opacity-90 z-40' : ''}`}
    >
      <div className="relative w-full h-full bg-white/95 rounded-xl overflow-hidden border border-stone-200/90 text-stone-900 shadow-xs flex flex-col justify-between p-1.5">
        {isImg ? (
          <div className="w-full h-full bg-stone-100 rounded-lg overflow-hidden relative flex items-center justify-center">
            <img
              src={element.content || element.meta?.imageUrl} alt={element.caption || 'Slide illustration'}
              className="w-full h-full object-cover pointer-events-none"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <ImageIcon className="w-4 h-4 text-stone-400 absolute pointer-events-none" />
          </div>
        ) : (
          <div className="text-[11px] font-bold line-clamp-4 leading-snug whitespace-pre-wrap p-0.5">
            {element.content || 'Text element'}
          </div>
        )}

        <div className="absolute top-1 right-1 z-20 pointer-events-none">
          <span className="bg-amber-100/95 text-amber-950 border border-amber-300 px-1.5 py-0.2 rounded-md font-black text-[8px] shadow-2xs">
            Step {element.meta?.animationStep || 1}
          </span>
        </div>
      </div>
    </div>
  );
};

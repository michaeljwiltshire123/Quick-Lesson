import React from 'react';
import { SlideItem } from '../../../../../types/slideTypes';
import { CanvasElementRenderer } from '../../../../canvas/CanvasElementRenderer';
import { getAnimationCssClass } from '../../../../../utils/animationCssUtils';
import { Play, RotateCcw, Sparkles } from 'lucide-react';

interface AuthenticSlidePreviewStageProps {
  slide: SlideItem;
  selectedElementId: string | null;
  currentStep: number;
  maxStep: number;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onShowAll: () => void;
  onSelectElementId: (id: string) => void;
}

export const AuthenticSlidePreviewStage: React.FC<AuthenticSlidePreviewStageProps> = ({
  slide, selectedElementId, currentStep, maxStep, isPlaying, onPlayToggle, onShowAll, onSelectElementId,
}) => {
  const bg = slide?.theme?.backgroundColor || '#FAF9F5';
  const textColor = slide?.theme?.textColor || '#1C1917';

  return (
    <div className="space-y-2 flex flex-col justify-between h-full text-xs">
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-stone-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Authentic Slide Preview</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button" onClick={onShowAll}
            className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-[10.5px] font-bold text-stone-700 cursor-pointer"
          >
            Show All
          </button>
          <button
            type="button" onClick={onPlayToggle}
            className="px-2.5 py-1 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-[10.5px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
          >
            {isPlaying ? <RotateCcw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-white" />}
            <span>{isPlaying ? `Step ${currentStep}...` : 'Play Sequence'}</span>
          </button>
        </div>
      </div>

      <div
        style={{ backgroundColor: bg, color: textColor }}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-stone-300 shadow-md p-5 flex flex-col justify-between select-none"
      >
        <div className="space-y-0.5">
          <h2 className="text-base font-black truncate">{slide?.title || 'Slide Title'}</h2>
          {slide?.subtitle && <p className="text-[10px] italic opacity-75 truncate">{slide.subtitle}</p>}
        </div>

        <div className="relative flex-1 my-2">
          {slide?.elements?.map((el) => {
            const isSel = el.id === selectedElementId;
            return (
              <div
                key={el.id} onClick={(e) => { e.stopPropagation(); onSelectElementId(el.id); }}
                className={`${getAnimationCssClass(el, currentStep)} ${isSel ? 'ring-2 ring-amber-500 rounded-lg shadow-sm' : ''}`}
              >
                <CanvasElementRenderer
                  element={el} isSelected={isSel} onSelect={() => onSelectElementId(el.id)}
                  onUpdateContent={() => {}} onUpdateElement={() => {}} onStartDrag={() => {}} onStartResize={() => {}}
                />
              </div>
            );
          })}
        </div>

        <div className="text-[9px] font-mono text-stone-500 flex justify-between border-t border-stone-200/60 pt-1">
          <span>Active Step: {currentStep} / {maxStep}</span>
          <span>Click any element to edit timing</span>
        </div>
      </div>
    </div>
  );
};

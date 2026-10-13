import React, { CSSProperties } from 'react';
import { SlideItem } from '../../../types/slideTypes';
import { CanvasElementRenderer } from '../CanvasElementRenderer';
import { AimsOutcomesLayer } from '../layers/AimsOutcomesLayer';
import { getAimsAndOutcomesSlideIndex } from '../../../utils/slideNavigationUtils';
import { getAnimationCssClass, getAnimationCssTimingStyle } from '../../../utils/animationCssUtils';
import { TransitionVisualOverlay } from '../../toolbar/tabs/anim/preview/TransitionVisualOverlay';
import { OutgoingSlideCard } from './OutgoingSlideCard';
import { usePresenterStepTracker } from './usePresenterStepTracker';
import { AnimationKeyframesStyle } from '../AnimationKeyframesStyle';

interface PresenterSlideStageProps {
  slide: SlideItem;
  currentSlideIndex?: number;
  outgoingSlide?: SlideItem | null;
  outgoingStyle?: CSSProperties;
  slides: SlideItem[];
  animStep: number;
  combinedPageStyle: CSSProperties;
  showNotes: boolean;
  onNext: () => void;
  onJumpToSlide: (idx: number) => void;
}

export const PresenterSlideStage: React.FC<PresenterSlideStageProps> = ({
  slide, currentSlideIndex = 0, outgoingSlide, outgoingStyle, slides, animStep, combinedPageStyle,
  showNotes, onNext, onJumpToSlide,
}) => {
  const aimsIndex = getAimsAndOutcomesSlideIndex(slides);
  const isAims = slide.archetype === 'aims_outcomes' || slide.id === 'slide-aims-outcomes' || slide.title?.toLowerCase().includes('aims');
  const isCover = slide.archetype === 'title';
  const effectId = slide.theme?.transitionEffect;
  const playback = usePresenterStepTracker(slide.elements, animStep, onNext);

  return (
    <div onClick={playback.handleClick} className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-stone-950 cursor-pointer">
      <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
        {outgoingSlide && (
          <OutgoingSlideCard slide={outgoingSlide} outgoingStyle={outgoingStyle} />
        )}

        <div
          key={`slide-${slide.id}-${currentSlideIndex}`}
          style={{ backgroundColor: slide.theme?.backgroundColor || '#FAF9F5', color: slide.theme?.textColor || '#1C1917', ...combinedPageStyle }}
          className="relative w-full h-full rounded-3xl p-10 overflow-hidden flex flex-col justify-between z-20"
        >
          <AnimationKeyframesStyle />
          {Boolean(effectId && effectId !== 'none') && animStep === 0 && (
            <TransitionVisualOverlay key={`trans-${slide.id}-${currentSlideIndex}-${effectId}`} effectId={effectId!} speed={0.6} />
          )}

          <div className="space-y-2">
            <h1 className={`${isCover ? 'text-5xl md:text-7xl text-center font-serif' : 'text-3xl md:text-4xl'} font-black`}>{slide.title}</h1>
            {slide.subtitle && <p className={`${isCover ? 'text-center text-lg' : 'text-base'} italic opacity-80`}>{slide.subtitle}</p>}
          </div>

          {isAims && (
            <AimsOutcomesLayer slides={slides} onJumpToSlide={onJumpToSlide} />
          )}

          <div className="relative flex-1 my-4">
            {slide.elements.filter((element) => !isAims || !element.id.startsWith('el-aims-')).map((el) => (
              <CanvasElementRenderer
                key={el.id} element={el} isSelected={false}
                animClass={getAnimationCssClass(el, playback.currentStep, playback.stepsForElement(el.id))}
                animStyle={getAnimationCssTimingStyle(
                  el,
                  playback.timingForElement(el.id),
                  playback.currentStep,
                  playback.stepsForElement(el.id),
                )}
                onSelect={() => playback.handleClick()} onUpdateContent={() => {}} onUpdateElement={() => {}}
                onStartDrag={() => {}} onStartResize={() => {}}
                onJumpToAims={() => onJumpToSlide(aimsIndex)}
                isLivePresentation
              />
            ))}
          </div>
        </div>
      </div>

      {showNotes && (
        <aside className="absolute right-4 top-4 bottom-4 w-80 bg-stone-900/95 border border-stone-700 p-4 rounded-2xl shadow-2xl overflow-y-auto space-y-3 text-xs text-stone-200 z-30">
          <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Teacher Spoken Script</h4>
          <p className="italic text-stone-300">{slide.speakerNotes?.teacherScript || 'No notes for this slide.'}</p>
        </aside>
      )}
    </div>
  );
};

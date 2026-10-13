import React, { useState, useRef } from 'react';
import { SlideElement, SlideItem } from '../../../../types/slideTypes';
import { PreviewElementItem } from './PreviewElementItem';
import { SlidePreviewHeader } from './SlidePreviewHeader';
import { MousePointer } from 'lucide-react';
import { AnimationKeyframesStyle } from '../../../canvas/AnimationKeyframesStyle';
import { usePresenterStepTracker } from '../../../canvas/presenter/usePresenterStepTracker';

interface FullSlideAnimationCanvasPreviewProps {
  slide?: SlideItem;
  elements: SlideElement[];
  selectedElementId: string | null;
  previewEffectId?: string | null;
  onSelectElementId: (id: string) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
  maxStep: number;
}

export const FullSlideAnimationCanvasPreview: React.FC<FullSlideAnimationCanvasPreviewProps> = ({
  slide, elements, selectedElementId, previewEffectId, onSelectElementId, onUpdateElements, maxStep,
}) => {
  const [step, setStep] = useState<number>(maxStep);
  const [isInteractiveTest, setIsInteractiveTest] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playback = usePresenterStepTracker(elements, step);
  const activeMaxStep = Math.max(maxStep, playback.maxStep);

  const handleUpdateBounds = (id: string, patch: { x?: number; y?: number; width?: number; height?: number }) => {
    onUpdateElements(elements.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const handleStartInteractive = () => {
    setStep(0);
    setIsInteractiveTest(true);
  };

  const handleCanvasClick = () => {
    if (!isInteractiveTest) return;
    if (step < activeMaxStep) setStep((s) => s + 1);
    else setStep(0);
  };

  const bgColor = slide?.theme?.backgroundColor || '#FAF9F5';
  const textColor = slide?.theme?.textColor || '#1C1917';

  return (
    <div className="space-y-2 flex flex-col justify-between h-full text-xs select-none">
      <AnimationKeyframesStyle />
      <SlidePreviewHeader
        isInteractiveTest={isInteractiveTest}
        maxStep={activeMaxStep}
        onReset={() => { setStep(activeMaxStep); setIsInteractiveTest(false); }}
        onStartInteractive={handleStartInteractive}
      />

      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-stone-300 shadow-xl p-6 flex flex-col justify-between transition-all ${
          isInteractiveTest ? 'cursor-pointer ring-4 ring-emerald-500/50 shadow-2xl' : ''
        }`}
      >
        <div className="flex items-start justify-between z-10">
          <div className="space-y-0.5 max-w-[80%]">
            <h2 className="text-base md:text-lg font-black tracking-tight leading-tight line-clamp-1">{slide?.title || 'Lesson Slide'}</h2>
            {slide?.subtitle && <p className="text-[11px] opacity-75 line-clamp-1 italic">{slide.subtitle}</p>}
          </div>
          {isInteractiveTest && (
            <div className="bg-stone-900/90 backdrop-blur-xs text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
              <MousePointer className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>{step < activeMaxStep ? `Click slide to advance (${step}/${activeMaxStep})` : 'Sequence Complete! Click to replay'}</span>
            </div>
          )}
        </div>

        <div className="relative flex-1 w-full my-2">
          {elements.map((el) => (
            <PreviewElementItem
              key={el.id} element={el} isSelected={el.id === selectedElementId}
              animationSteps={playback.stepsForElement(el.id)}
              playbackStep={step} previewEffectId={el.id === selectedElementId ? previewEffectId : null}
              onSelect={() => { onSelectElementId(el.id); if (isInteractiveTest) handleCanvasClick(); }}
              onUpdateBounds={handleUpdateBounds} containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

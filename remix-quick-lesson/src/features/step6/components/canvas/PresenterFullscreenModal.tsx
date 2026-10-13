import React, { useState, useEffect } from 'react';
import { SlideItem } from '../../types/slideTypes';
import { AnimationKeyframesStyle } from './AnimationKeyframesStyle';
import { SpecialClassroomKeyframesStyle } from './SpecialClassroomKeyframesStyle';
import { ExitClassroomKeyframesStyle } from './ExitClassroomKeyframesStyle';
import { NoveltyTransitionsKeyframes } from './NoveltyTransitionsKeyframes';
import { PresenterHeaderBar } from './presenter/PresenterHeaderBar';
import { PresenterSlideStage } from './presenter/PresenterSlideStage';
import { PresenterBottomControls } from './presenter/PresenterBottomControls';
import { usePresenterKeyboardNav } from '../../hooks/usePresenterKeyboardNav';
import { usePresenterSlideTransition } from '../../hooks/usePresenterSlideTransition';

interface PresenterFullscreenModalProps {
  isOpen: boolean;
  slides: SlideItem[];
  initialIndex?: number;
  onClose: () => void;
}

export const PresenterFullscreenModal: React.FC<PresenterFullscreenModalProps> = ({
  isOpen, slides, initialIndex = 0, onClose,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const displaySlides = slides.filter((slide) => !slide.isHidden);
  const visibleInitialIndex = Math.min(displaySlides.length - 1, slides.slice(0, initialIndex).filter((slide) => !slide.isHidden).length);

  const {
    index, slide, animStep, maxAnimStep, outgoingSlide, outgoingStyle, incomingStyle,
    handleNext, handlePrev, handleJumpToSlide,
  } = usePresenterSlideTransition({ slides: displaySlides, initialIndex: Math.max(0, visibleInitialIndex), isOpen });

  useEffect(() => {
    if (isOpen) setSeconds(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const iv = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(iv);
  }, [isOpen]);

  usePresenterKeyboardNav({ isOpen, onNext: handleNext, onPrev: handlePrev, onClose });

  if (!isOpen || displaySlides.length === 0 || !slide) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none text-white animate-in fade-in duration-200">
      <AnimationKeyframesStyle />
      <SpecialClassroomKeyframesStyle />
      <ExitClassroomKeyframesStyle />
      <NoveltyTransitionsKeyframes />

      <PresenterHeaderBar
        currentSlide={index + 1} totalSlides={displaySlides.length} animStep={animStep}
        maxAnimStep={maxAnimStep} seconds={seconds} showNotes={showNotes}
        onToggleNotes={() => setShowNotes(!showNotes)} onClose={onClose}
      />
      <PresenterSlideStage
        slide={slide} currentSlideIndex={index} outgoingSlide={outgoingSlide} outgoingStyle={outgoingStyle}
        slides={displaySlides} animStep={animStep}
        combinedPageStyle={incomingStyle} showNotes={showNotes}
        onNext={handleNext} onJumpToSlide={handleJumpToSlide}
      />
      <PresenterBottomControls
        isLastSlideAndStep={index === displaySlides.length - 1 && animStep >= maxAnimStep}
        onPrev={handlePrev} onNext={handleNext}
      />
    </div>
  );
};

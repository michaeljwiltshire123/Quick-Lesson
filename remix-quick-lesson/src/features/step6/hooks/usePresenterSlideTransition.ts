import { useState, useRef, useEffect, CSSProperties } from 'react';
import { SlideItem } from '../types/slideTypes';
import { getMaxAnimationStepOnSlide, getPageTransitionStyle, getPageExitTransitionStyle } from '../utils/animationCssUtils';
import { getMatchingExitTransition } from '../utils/transitionPairingUtils';

interface UsePresenterSlideTransitionProps {
  slides: SlideItem[];
  initialIndex?: number;
  isOpen: boolean;
}

export function usePresenterSlideTransition({
  slides,
  initialIndex = 0,
  isOpen,
}: UsePresenterSlideTransitionProps) {
  const [index, setIndex] = useState(initialIndex);
  const [animStep, setAnimStep] = useState(0);
  const [outgoingSlide, setOutgoingSlide] = useState<SlideItem | null>(null);
  const [outgoingStyle, setOutgoingStyle] = useState<CSSProperties>({});
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setAnimStep(0);
      setOutgoingSlide(null);
      setOutgoingStyle({});
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const slide = slides[index];
  const maxAnimStep = slide ? getMaxAnimationStepOnSlide(slide.elements) : 0;

  const triggerSlideTransition = (targetIndex: number) => {
    if (targetIndex === index || targetIndex < 0 || targetIndex >= slides.length) return;
    const currentSlide = slides[index];
    const targetSlide = slides[targetIndex];

    const exitEffect = currentSlide?.theme?.pageExitEffect ||
      getMatchingExitTransition(targetSlide?.theme?.transitionEffect || 'fade');

    const exitStyle = getPageExitTransitionStyle(exitEffect, 1, 0);

    setOutgoingSlide(currentSlide);
    setOutgoingStyle(exitStyle);
    setIndex(targetIndex);
    setAnimStep(0);

    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setOutgoingSlide(null);
      setOutgoingStyle({});
    }, 600);
  };

  const handleNext = () => {
    if (animStep < maxAnimStep) {
      setAnimStep((s) => s + 1);
    } else if (index < slides.length - 1) {
      triggerSlideTransition(index + 1);
    } else {
      triggerSlideTransition(0);
    }
  };

  const handlePrev = () => {
    if (animStep > 0) {
      setAnimStep((s) => s - 1);
    } else if (index > 0) {
      triggerSlideTransition(index - 1);
    }
  };

  const handleJumpToSlide = (idx: number) => {
    if (idx !== index) triggerSlideTransition(idx);
  };

  const incomingStyle = getPageTransitionStyle(slide?.theme?.transitionEffect, animStep);

  return {
    index,
    slide,
    animStep,
    maxAnimStep,
    outgoingSlide,
    outgoingStyle,
    incomingStyle,
    handleNext,
    handlePrev,
    handleJumpToSlide,
  };
}

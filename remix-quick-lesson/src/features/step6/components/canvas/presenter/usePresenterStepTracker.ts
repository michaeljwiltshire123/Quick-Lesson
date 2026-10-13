import { useEffect, useMemo, useRef } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { AnimationPhaseSteps, getAnimationStepPlan } from '../../../utils/animationStepPlan';

export function usePresenterStepTracker(elements: SlideElement[], playhead: number, onTick?: () => void) {
  const plan = useMemo(() => getAnimationStepPlan(elements), [elements]);
  const onTickRef = useRef(onTick);
  const autoAdvanceDelay = plan.autoAdvanceAfterStep.get(playhead);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (autoAdvanceDelay === undefined) return;
    const timer = window.setTimeout(() => onTickRef.current?.(), Math.max(0, autoAdvanceDelay * 1000));
    return () => window.clearTimeout(timer);
  }, [autoAdvanceDelay, playhead]);

  return {
    currentStep: playhead,
    maxStep: plan.maxStep,
    stepsByElement: plan.stepsByElement,
    timingByElement: plan.timingByElement,
    stepsForElement: (id: string): AnimationPhaseSteps => plan.stepsByElement.get(id) || {},
    timingForElement: (id: string) => plan.timingByElement.get(id),
    handleClick: () => onTick?.(),
  };
}
import React from 'react';
import { SlideElement } from '../types/slideTypes';
import { getSpecificTransitionStyle } from './transitionStyleMap';
import { AnimationPhaseSteps, AnimationPhaseTimings, getAnimationStepPlan } from './animationStepPlan';

export function getPageTransitionStyle(transitionEffect?: string, currentStep: number = 0): React.CSSProperties {
  if (currentStep > 0 || !transitionEffect || transitionEffect === 'none') return {};
  return getSpecificTransitionStyle(transitionEffect, 'entry', 0.6);
}

export function getPageExitTransitionStyle(
  exitEffect?: string,
  currentStep: number = 0,
  maxElementStep: number = 0
): React.CSSProperties {
  if (!exitEffect || exitEffect === 'none' || currentStep <= maxElementStep) return {};
  return getSpecificTransitionStyle(exitEffect, 'exit', 0.5);
}

const entranceClasses: Record<string, string> = {
  fade_in: 'animate-[fadeIn_700ms_ease-out_1_forwards]',
  slide_in_left: 'animate-[slideLeftIn_500ms_ease-out_1_forwards]',
  slide_in_bottom: 'animate-[slideUpIn_500ms_ease-out_1_forwards]',
  zoom_in: 'animate-[zoomIn_500ms_ease-out_1_forwards]',
  bounce: 'animate-bounce', physics_bounce: 'animate-bounce', pulse: 'animate-pulse', spin: 'animate-spin', grow_shrink: 'animate-[zoomIn_500ms_ease-out_1_forwards]',
};

const exitClasses: Record<string, string> = {
  fade_out: 'animate-[fadeOut_500ms_ease-in_1_forwards]',
  fly_out_right: 'animate-[slideRightOut_500ms_ease-in_1_forwards]',
  shrink_disappear: 'animate-[zoomOut_500ms_ease-in_1_forwards]',
};

export function getAnimationCssClass(element: SlideElement, currentStep: number, steps?: AnimationPhaseSteps): string {
  const meta = element.meta || {};
  const effects = Array.isArray(meta.timelineEffects) ? meta.timelineEffects : [];
  const entranceEffect = effects.find((effect: any) => effect.category === 'entrance');
  const emphasisEffect = effects.find((effect: any) => effect.category === 'emphasis');
  const exitEffect = effects.find((effect: any) => effect.category === 'exit');
  const playbackStyles = meta.ambientLoop && meta.ambientLoop !== 'none'
    ? '![animation-iteration-count:infinite] ![animation-fill-mode:both] ![transform-origin:50%_50%]'
    : '![animation-iteration-count:1] ![animation-fill-mode:both] ![transform-origin:50%_50%]';
  const animType = entranceEffect?.effectId || meta.animationType || 'none';
  const fallbackStep = meta.animationStep || 1;
  const entranceStep = steps?.entrance ?? fallbackStep;
  const emphasisStep = steps?.emphasis ?? fallbackStep;
  const exitStep = steps?.exit ?? fallbackStep;
  const exitType = exitEffect?.effectId || meta.exitAnimationType || 'none';

  if (animType !== 'none' && entranceStep > currentStep) {
    return `opacity-0 pointer-events-none transition-all duration-300 ${playbackStyles}`;
  }

  if (exitType !== 'none' && exitStep <= currentStep) {
    return `${exitClasses[exitType] || 'opacity-0 transition-opacity duration-500'} pointer-events-none ${playbackStyles}`;
  }
  const emphasis = emphasisEffect?.effectId || meta.emphasisEffect || (meta.isPulseEmphasis ? 'pulse' : meta.isSpinEmphasis ? 'spin' : '');
  const entranceIsActive = animType !== 'none' && entranceStep === currentStep;
  const emphasisIsActive = Boolean(emphasis) && emphasisStep === currentStep;
  const classes = [
    'transition-all duration-500',
    entranceIsActive ? entranceClasses[animType] || entranceClasses.fade_in : '',
    !entranceIsActive && emphasisIsActive ? entranceClasses[emphasis] || '' : '',
    meta.ambientLoop === 'gentle_float' ? 'animate-bounce duration-1000' : meta.ambientLoop === 'soft_pulse' ? 'animate-pulse' : '',
    meta.is3DZoom && currentStep >= entranceStep ? 'scale-110 shadow-2xl z-20' : '',
    meta.is3DCardFlip && currentStep >= entranceStep ? '[transform:rotateY(180deg)]' : '',
    meta.dimPrevious && currentStep > entranceStep ? 'opacity-40 filter grayscale-50' : '',
  ];
  return `${classes.filter(Boolean).join(' ')} ${playbackStyles}`.trim();
}

export function getAnimationCssTimingStyle(
  element: SlideElement,
  timings?: AnimationPhaseTimings,
  currentStep?: number,
  steps?: AnimationPhaseSteps,
): React.CSSProperties {
  const meta = element.meta || {};
  const records = Array.isArray(meta.timelineEffects) ? meta.timelineEffects : [];
  const activePhase = steps?.exit !== undefined && currentStep !== undefined && steps.exit <= currentStep
    ? 'exit'
    : steps?.entrance !== undefined && currentStep === steps.entrance
      ? 'entrance'
      : steps?.emphasis !== undefined && currentStep === steps.emphasis
        ? 'emphasis'
        : 'entrance';
  const timingRecord = records.find((record: any) => record.category === activePhase) || records[0];
  const plannedTiming = timings?.[activePhase] || timings?.entrance || timings?.emphasis || timings?.exit;
  const duration = Number(plannedTiming?.duration ?? timingRecord?.duration ?? meta.animDuration);
  const delay = Number(plannedTiming?.delay ?? timingRecord?.delay ?? meta.animDelay);
  return {
    animationDuration: `${Number.isFinite(duration) && duration > 0 ? duration : 0.8}s`,
    animationDelay: `${Number.isFinite(delay) && delay >= 0 ? delay : 0}s`,
    animationFillMode: 'both',
    ...(steps?.entrance !== undefined && currentStep !== undefined && currentStep < steps.entrance
      ? { opacity: 0, visibility: 'hidden' }
      : { visibility: 'visible' }),
  };
}

export function getMaxAnimationStepOnSlide(elements: SlideElement[], pageExitEffect?: string): number {
  return Math.max(getAnimationStepPlan(elements).maxStep, pageExitEffect ? 1 : 0);
}

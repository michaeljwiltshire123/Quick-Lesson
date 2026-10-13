import { SlideElement } from '../types/slideTypes';
import { prioritizeElementAnimationPhases } from './animationSequenceUtils';

export interface AnimationPhaseSteps {
  entrance?: number;
  emphasis?: number;
  exit?: number;
}

export interface AnimationPhaseTiming {
  duration: number;
  delay: number;
}

export type AnimationPhaseTimings = Partial<Record<keyof AnimationPhaseSteps, AnimationPhaseTiming>>;

export function getAnimationStepPlan(elements: SlideElement[]) {
  const records: {
    id: string;
    elementId: string;
    phase: keyof AnimationPhaseSteps;
    category: keyof AnimationPhaseSteps;
    trigger: string;
    order?: number;
    duration: number;
    delay: number;
    index: number;
  }[] = [];
  const seen = new Set<string>();
  elements.forEach((element, elementIndex) => {
    const meta = element.meta || {};
    const effects = Array.isArray(meta.timelineEffects) && meta.timelineEffects.length
      ? meta.timelineEffects
      : [
        ...(meta.animationType && meta.animationType !== 'none' ? [{ category: 'entrance', effectId: meta.animationType, trigger: meta.animTrigger }] : []),
        ...(meta.emphasisEffect && meta.emphasisEffect !== 'none' ? [{ category: 'emphasis', effectId: meta.emphasisEffect, trigger: meta.emphasisTrigger }] : []),
        ...(meta.exitAnimationType && meta.exitAnimationType !== 'none' ? [{ category: 'exit', effectId: meta.exitAnimationType, trigger: meta.exitTrigger }] : []),
      ];
    effects.forEach((effect: any, effectIndex: number) => {
      if (!effect.effectId || !['entrance', 'emphasis', 'exit'].includes(effect.category)) return;
      const phaseKey = `${element.id}:${effect.category}`;
      if (seen.has(phaseKey)) return;
      seen.add(phaseKey);
      const duration = Number(effect.duration);
      const delay = Number(effect.delay);
      records.push({
        id: element.id,
        elementId: element.id,
        phase: effect.category,
        category: effect.category,
        trigger: effect.trigger || 'onClick',
        order: effect.order ?? meta.animationStep,
        duration: Number.isFinite(duration) && duration > 0 ? duration : 0.8,
        delay: Number.isFinite(delay) && delay > 0 ? delay : 0,
        index: elementIndex * 10 + effectIndex,
      });
    });
  });
  records.sort((a, b) => (a.order ?? a.index) - (b.order ?? b.index) || a.index - b.index);
  const sequencedRecords = prioritizeElementAnimationPhases(records);
  const stepsByElement = new Map<string, AnimationPhaseSteps>();
  const timingByElement = new Map<string, AnimationPhaseTimings>();
  const autoAdvanceAfterStep = new Map<number, number>();
  let currentStep = 0;
  let currentGroupDuration = 0;
  sequencedRecords.forEach((record) => {
    let step: number;
    if (record.trigger === 'onClick') {
      step = currentStep + 1;
      currentGroupDuration = 0;
    } else if (record.trigger === 'withPrevious') {
      step = currentStep;
    } else {
      autoAdvanceAfterStep.set(currentStep, currentGroupDuration);
      step = currentStep + 1;
      currentGroupDuration = 0;
    }
    currentStep = step;
    currentGroupDuration = Math.max(currentGroupDuration, record.delay + record.duration);

    const phases = stepsByElement.get(record.id) || {};
    const timings = timingByElement.get(record.id) || {};
    if (phases[record.phase] === undefined) {
      phases[record.phase] = step;
      timings[record.phase] = { duration: record.duration, delay: record.delay };
    }
    stepsByElement.set(record.id, phases);
    timingByElement.set(record.id, timings);
  });
  return { stepsByElement, timingByElement, autoAdvanceAfterStep, maxStep: currentStep };
}
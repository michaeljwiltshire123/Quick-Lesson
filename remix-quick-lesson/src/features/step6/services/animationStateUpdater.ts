import { SlideElement } from '../types/slideTypes';
import { getTimelineEffectsForElement, removeTimelineEffect, updateTimelineEffect } from '../components/toolbar/tabs/anim/studio/shelf/applyEffectHelper';
import { replaceAnimationState } from './animationStateCleaner';
import { ReplaceAnimationParams } from './animationStateCleaner';
import { MotionAnimationItem } from '../components/toolbar/tabs/anim/motion/motionPanelTypes';

export type AnimationStatePatch = Partial<ReplaceAnimationParams> & { delay?: number };

export function definedAnimationPatch<T extends object>(patch: T): Partial<T> {
  return Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined)) as Partial<T>;
}

export function updateAnimationRecord(elements: SlideElement[], id: string, patch: Partial<MotionAnimationItem>): SlideElement[] {
  return elements.map((element) => {
    const effect = getTimelineEffectsForElement(element).find((record) => record.id === id);
    if (!effect) return element;
    const update = definedAnimationPatch({
      effectId: patch.effectId, category: patch.category, trigger: patch.trigger,
      duration: patch.duration === undefined ? undefined : finiteDuration(patch.duration, effect.duration),
      order: patch.order,
    });
    return updateTimelineEffect(element, id, update);
  });
}

const finiteDuration = (value: unknown, fallback: number) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
};

export function updateAnimationState(element: SlideElement, patch: AnimationStatePatch): SlideElement {
  const records = getTimelineEffectsForElement(element);
  if (patch.category && patch.effectId && patch.effectId !== 'none') {
    const current = records.find((record) => record.category === patch.category);
    return replaceAnimationState(element, {
      category: patch.category, effectId: patch.effectId,
      trigger: patch.trigger ?? current?.trigger ?? 'onClick',
      duration: finiteDuration(patch.duration ?? current?.duration, 0.8),
      repeatTimes: patch.repeatTimes ?? current?.repeatTimes ?? 1,
      delay: patch.delay ?? current?.delay, order: patch.order ?? current?.order,
    });
  }
  const targets = records.filter((record) => !patch.category || record.category === patch.category);
  if (patch.category && patch.effectId === 'none') {
    return targets.reduce((current, record) => removeTimelineEffect(current, record.id), element);
  }
  return targets.reduce((current, record) => replaceAnimationState(current, {
    category: record.category, effectId: record.effectId,
    trigger: patch.trigger ?? record.trigger,
    duration: finiteDuration(patch.duration ?? record.duration, 0.8),
    repeatTimes: patch.repeatTimes ?? record.repeatTimes ?? 1,
    delay: patch.delay ?? record.delay, order: patch.order ?? record.order,
  }), element);
}
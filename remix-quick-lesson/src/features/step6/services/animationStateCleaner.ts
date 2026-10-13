import { SlideElement } from '../types/slideTypes';
import { AnimationCategory, ElementTimelineEffect } from '../components/toolbar/tabs/anim/studio/types';

export interface ReplaceAnimationParams {
  category: AnimationCategory;
  effectId: string;
  trigger: string;
  duration: number;
  repeatTimes: number;
  delay?: number;
  order?: number;
}

function legacyEffects(element: SlideElement): ElementTimelineEffect[] {
  const meta = element.meta || {};
  const effects: ElementTimelineEffect[] = [];
  if (meta.animationType && meta.animationType !== 'none') effects.push({ id: `${element.id}-ent`, category: 'entrance', effectId: meta.animationType, trigger: meta.animTrigger || 'onClick', duration: meta.animDuration ?? 0.8 });
  if (meta.emphasisEffect && meta.emphasisEffect !== 'none') effects.push({ id: `${element.id}-emp`, category: 'emphasis', effectId: meta.emphasisEffect, trigger: meta.emphasisTrigger || 'onClick', duration: meta.animDuration ?? 0.8, repeatTimes: meta.emphasisRepeat ?? 1 });
  if (meta.exitAnimationType && meta.exitAnimationType !== 'none') effects.push({ id: `${element.id}-ext`, category: 'exit', effectId: meta.exitAnimationType, trigger: meta.exitTrigger || 'onClick', duration: meta.animDuration ?? 0.8 });
  return effects;
}

export function replaceAnimationState(element: SlideElement, params: ReplaceAnimationParams): SlideElement {
  const meta = { ...(element.meta || {}) };
  const stored = Array.isArray(meta.timelineEffects) && meta.timelineEffects.length > 0;
  let current: ElementTimelineEffect[] = (stored ? [...meta.timelineEffects] : legacyEffects(element))
    .filter((effect, index, effects) => effects.findIndex((candidate) => candidate.category === effect.category) === index);
  const isDefaultFade = params.category !== 'entrance' && meta.animationType === 'fade_in' && !meta.animTrigger;
  if (isDefaultFade) current = current.filter((effect) => effect.category !== 'entrance');
  const previous = current.find((effect) => effect.category === params.category);
  const replacement: ElementTimelineEffect = {
    id: previous?.id || `fx-${element.id}-${params.category}-${Date.now().toString(36)}`,
    category: params.category, effectId: params.effectId, trigger: params.trigger as any,
    duration: params.duration || previous?.duration || 0.8,
    repeatTimes: params.repeatTimes || previous?.repeatTimes || 1,
    delay: params.delay ?? previous?.delay,
    order: params.order ?? previous?.order,
  };
  const timelineEffects = [...current.filter((effect) => effect.category !== params.category), replacement];
  const entrance = timelineEffects.find((effect) => effect.category === 'entrance');
  const emphasis = timelineEffects.find((effect) => effect.category === 'emphasis');
  const exit = timelineEffects.find((effect) => effect.category === 'exit');
  meta.timelineEffects = timelineEffects;
  meta.animationType = entrance?.effectId || 'none';
  meta.emphasisEffect = emphasis?.effectId || 'none';
  meta.exitAnimationType = exit?.effectId || 'none';
  const timingEffect = entrance || emphasis || exit;
  if (timingEffect) meta.animDuration = timingEffect.duration;
  if (entrance) meta.animTrigger = entrance.trigger;
  if (timingEffect?.delay !== undefined) meta.animDelay = timingEffect.delay;
  if (emphasis) { meta.emphasisTrigger = emphasis.trigger; meta.emphasisRepeat = emphasis.repeatTimes || 1; }
  if (exit) meta.exitTrigger = exit.trigger;
  meta.isPulseEmphasis = emphasis?.effectId === 'pulse';
  meta.isSpinEmphasis = emphasis?.effectId === 'spin';
  if (typeof replacement.order === 'number') meta.animationStep = replacement.order;
  return { ...element, meta };
}
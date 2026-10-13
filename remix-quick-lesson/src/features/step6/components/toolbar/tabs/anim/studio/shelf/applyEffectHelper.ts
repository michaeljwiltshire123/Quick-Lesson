import { SlideElement } from '../../../../../../types/slideTypes';
import { AnimationCategory, ElementTimelineEffect } from '../types';
import { replaceAnimationState } from '../../../../../../services/animationStateCleaner';

export interface ApplyEffectParams {
  category: AnimationCategory;
  effectId: string;
  trigger: string;
  duration: number;
  repeatTimes: number;
  order?: number;
}

export function getTimelineEffectsForElement(element: SlideElement): ElementTimelineEffect[] {
  const meta = element.meta || {};
  if (Array.isArray(meta.timelineEffects) && meta.timelineEffects.length > 0) {
    return meta.timelineEffects.map((fx) => ({
      ...fx,
      duration: typeof fx.duration === 'number' && !isNaN(fx.duration) && fx.duration > 0 ? fx.duration : 0.8,
    }));
  }
  const initial: ElementTimelineEffect[] = [];
  if (meta.animationType && meta.animationType !== 'none') {
    initial.push({ id: `${element.id}-ent`, category: 'entrance', effectId: meta.animationType, trigger: (meta.animTrigger as any) || 'onClick', duration: meta.animDuration ?? 0.8 });
  }
  if (meta.emphasisEffect && meta.emphasisEffect !== 'none') {
    initial.push({ id: `${element.id}-emp`, category: 'emphasis', effectId: meta.emphasisEffect, trigger: (meta.emphasisTrigger as any) || 'withPrevious', duration: meta.animDuration ?? 0.8, repeatTimes: meta.emphasisRepeat ?? 1 });
  }
  if (meta.exitAnimationType && meta.exitAnimationType !== 'none') {
    initial.push({ id: `${element.id}-ext`, category: 'exit', effectId: meta.exitAnimationType, trigger: (meta.exitTrigger as any) || 'onClick', duration: meta.animDuration ?? 0.8 });
  }
  return initial;
}

function syncLegacy(meta: Record<string, any>, list: ElementTimelineEffect[]): void {
  const ent = list.find((e) => e.category === 'entrance');
  const emp = list.find((e) => e.category === 'emphasis');
  const ext = list.find((e) => e.category === 'exit');
  meta.animationType = ent ? ent.effectId : 'none';
  if (ent) { meta.animTrigger = ent.trigger; meta.animDuration = ent.duration; }
  meta.emphasisEffect = emp ? emp.effectId : 'none';
  meta.isPulseEmphasis = emp?.effectId === 'pulse';
  meta.isSpinEmphasis = emp?.effectId === 'spin';
  if (emp) meta.emphasisRepeat = emp.repeatTimes || 1;
  meta.exitAnimationType = ext ? ext.effectId : 'none';
}

export function commitEffectToElement(element: SlideElement, params: ApplyEffectParams): SlideElement {
  return replaceAnimationState(element, params);
}

export function removeTimelineEffect(element: SlideElement, effectUid: string): SlideElement {
  const current = getTimelineEffectsForElement(element);
  const updatedList = current.filter((e) => e.id !== effectUid);
  const meta = { ...(element.meta || {}), timelineEffects: updatedList };
  syncLegacy(meta, updatedList);
  return { ...element, meta };
}

export function updateTimelineEffect(element: SlideElement, effectUid: string, patch: Partial<ElementTimelineEffect>): SlideElement {
  const current = getTimelineEffectsForElement(element);
  const updatedList = current.map((e) => (e.id === effectUid ? { ...e, ...patch } : e));
  const meta = { ...(element.meta || {}), timelineEffects: updatedList };
  syncLegacy(meta, updatedList);
  return { ...element, meta };
}

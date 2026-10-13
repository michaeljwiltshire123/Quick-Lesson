import { SlideElement } from '../../../../../types/slideTypes';
import { ElementTimelineEffect } from '../studio/types';
import { getTimelineEffectsForElement } from '../studio/shelf/applyEffectHelper';
import { ALL_MOTION_EFFECTS } from './motionEffectOptions';
import { normalizeMotionAnimationOrders } from './motionAnimationHelpers';

function syncElementLegacy(meta: Record<string, any>, effects: ElementTimelineEffect[]): void {
  const ent = effects.find((e) => e.category === 'entrance');
  const emp = effects.find((e) => e.category === 'emphasis');
  const ext = effects.find((e) => e.category === 'exit');

  meta.animationType = ent ? ent.effectId : 'none';
  if (ent) {
    meta.animTrigger = ent.trigger;
    meta.animDuration = ent.duration;
  }
  meta.emphasisEffect = emp ? emp.effectId : 'none';
  meta.isPulseEmphasis = emp?.effectId === 'pulse';
  meta.isSpinEmphasis = emp?.effectId === 'spin';
  if (emp) meta.emphasisRepeat = emp.repeatTimes || 1;
  meta.exitAnimationType = ext ? ext.effectId : 'none';
}

export function addMotionRule(
  elements: SlideElement[],
  targetElementId: string,
  effectId: string = 'fade_in',
): SlideElement[] {
  const effectDef = ALL_MOTION_EFFECTS.find((e) => e.id === effectId);
  const category = effectDef?.category || 'entrance';
  const duration = effectDef?.defaultDuration || 0.8;
  let maxOrder = 0;
  elements.forEach((element, elementIndex) => {
    getTimelineEffectsForElement(element).forEach((effect, effectIndex) => {
      maxOrder = Math.max(maxOrder, effect.order ?? (elementIndex + 1) * 10 + effectIndex + 1);
    });
  });
  const order = maxOrder + 1;

  const updatedElements = elements.map((el) => {
    if (el.id !== targetElementId) return el;
    const current = getTimelineEffectsForElement(el);
    const newEffect: ElementTimelineEffect = {
      id: `fx-${effectId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      category,
      effectId,
      trigger: 'onClick',
      duration,
      repeatTimes: 1,
      order,
    };
    const updated = [...current, newEffect];
    const meta = { ...(el.meta || {}), timelineEffects: updated };
    syncElementLegacy(meta, updated);
    return { ...el, meta };
  });
  return normalizeMotionAnimationOrders(updatedElements);
}

export function updateMotionRule(
  elements: SlideElement[],
  ruleId: string,
  patch: Partial<ElementTimelineEffect>,
): SlideElement[] {
  const updatedElements = elements.map((el) => {
    const current = getTimelineEffectsForElement(el);
    const hasTarget = current.some((r) => r.id === ruleId);
    if (!hasTarget) return el;

    const updated = current.map((r) => {
      if (r.id !== ruleId) return r;
      const next = { ...r, ...patch };
      if (patch.effectId) {
        const def = ALL_MOTION_EFFECTS.find((o) => o.id === patch.effectId);
        if (def) next.category = def.category;
      }
      return next;
    });

    const meta = { ...(el.meta || {}), timelineEffects: updated };
    syncElementLegacy(meta, updated);
    return { ...el, meta };
  });
  return normalizeMotionAnimationOrders(updatedElements);
}

export function removeMotionRule(elements: SlideElement[], ruleId: string): SlideElement[] {
  const updatedElements = elements.map((el) => {
    const current = getTimelineEffectsForElement(el);
    const hasTarget = current.some((r) => r.id === ruleId);
    if (!hasTarget) return el;

    const updated = current.filter((r) => r.id !== ruleId);
    const meta = { ...(el.meta || {}), timelineEffects: updated };
    syncElementLegacy(meta, updated);
    return { ...el, meta };
  });
  return normalizeMotionAnimationOrders(updatedElements);
}

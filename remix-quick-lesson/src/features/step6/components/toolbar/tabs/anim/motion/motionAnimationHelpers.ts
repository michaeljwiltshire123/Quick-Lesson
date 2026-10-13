import { SlideElement } from '../../../../../types/slideTypes';
import { MotionAnimationItem, OBJECT_ANIMATION_OPTIONS } from './motionPanelTypes';
import { getTimelineEffectsForElement, commitEffectToElement, removeTimelineEffect, updateTimelineEffect } from '../studio/shelf/applyEffectHelper';
import { getElementRoleBadge } from './motionRoleBadgeHelper';
import { prioritizeElementAnimationPhases } from '../../../../../utils/animationSequenceUtils';

export function extractAllMotionItems(elements: SlideElement[]): MotionAnimationItem[] {
  const items: MotionAnimationItem[] = [];

  elements.forEach((el, elIdx) => {
    const list = getTimelineEffectsForElement(el);
    const label = el.caption || (el.type === 'text' ? el.content?.slice(0, 16) || 'Text' : el.type.toUpperCase());
    const thumb = el.type === 'image' ? (el.content || el.meta?.imageUrl) : undefined;
    const role = getElementRoleBadge(el);

    list.forEach((fx, fxIdx) => {
      const fallbackOrder = (elIdx + 1) * 10 + (fxIdx + 1);
      const effectiveOrder = typeof fx.order === 'number' && !isNaN(fx.order) ? fx.order : fallbackOrder;

      items.push({
        id: fx.id,
        elementId: el.id,
        elementLabel: label,
        elementType: el.type,
        thumbnailUrl: thumb,
        effectId: fx.effectId,
        category: fx.category,
        trigger: fx.trigger,
        duration: typeof fx.duration === 'number' && !isNaN(fx.duration) && fx.duration > 0 ? fx.duration : 0.8,
        order: effectiveOrder,
        rawContent: el.content || '',
        roleBadge: role,
      });
    });
  });

  items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return prioritizeElementAnimationPhases(items).map((item, index) => ({ ...item, order: index + 1 }));
}

export function normalizeMotionAnimationOrders(elements: SlideElement[]): SlideElement[] {
  const orderById = new Map(extractAllMotionItems(elements).map((item, index) => [item.id, index + 1]));
  return elements.map((element) => {
    const effects = getTimelineEffectsForElement(element);
    const orderedEffects = effects.filter((effect) => orderById.has(effect.id));
    if (orderedEffects.every((effect) => effect.order === orderById.get(effect.id))) return element;
    return orderedEffects.reduce(
      (current, effect) => updateTimelineEffect(current, effect.id, { order: orderById.get(effect.id) }),
      element,
    );
  });
}

export function getEffectLabel(effectId: string): string {
  for (const group of OBJECT_ANIMATION_OPTIONS) {
    const found = group.items.find((i: { id: string; label: string }) => i.id === effectId);
    if (found) return found.label;
  }
  return effectId.replace(/_/g, ' ');
}

export function getTriggerDisplay(trigger: string): string {
  if (trigger === 'withPrevious') return 'With previous';
  if (trigger === 'afterPrevious') return 'After previous';
  return 'On click';
}

export function addAnimationToElement(elements: SlideElement[], targetElementId: string): SlideElement[] {
  return addAnimationsToElements(elements, [targetElementId]);
}

export function addAnimationsToElements(elements: SlideElement[], targetElementIds: string[]): SlideElement[] {
  const existing = extractAllMotionItems(elements);
  let maxOrder = existing.length > 0 ? Math.max(...existing.map((item) => item.order ?? 0)) : 0;
  
  const updated = elements.map((el) => {
    if (targetElementIds.includes(el.id)) {
      maxOrder += 1;
      return commitEffectToElement(el, { category: 'entrance', effectId: 'fade_in', trigger: 'onClick', duration: 0.8, repeatTimes: 1, order: maxOrder });
    }
    return el;
  });
  return normalizeMotionAnimationOrders(updated);
}

export function updateAnimationInElements(
  elements: SlideElement[],
  animId: string,
  patch: Partial<MotionAnimationItem>
): SlideElement[] {
  const updatedElements = elements.map((el) => {
    const list = getTimelineEffectsForElement(el);
    const hasEffect = list.some((e) => e.id === animId);
    if (hasEffect) {
      return updateTimelineEffect(el, animId, {
        effectId: patch.effectId,
        category: patch.category,
        trigger: patch.trigger as any,
        duration: patch.duration,
        order: patch.order,
      });
    }
    return el;
  });
  return normalizeMotionAnimationOrders(updatedElements);
}

export function bulkUpdateAnimationsForElements(
  elements: SlideElement[],
  elementIds: string[],
  patch: Partial<MotionAnimationItem>
): SlideElement[] {
  const updatedElements = elements.map((el) => {
    if (elementIds.includes(el.id)) {
      const list = getTimelineEffectsForElement(el);
      if (list.length > 0) {
        return updateTimelineEffect(el, list[0].id, {
          effectId: patch.effectId || list[0].effectId,
          category: patch.category || list[0].category,
          trigger: patch.trigger as any || list[0].trigger,
          duration: patch.duration || list[0].duration,
        });
      }
    }
    return el;
  });
  return normalizeMotionAnimationOrders(updatedElements);
}

export function deleteAnimationFromElements(elements: SlideElement[], animId: string): SlideElement[] {
  return elements.map((el) => {
    const list = getTimelineEffectsForElement(el);
    const hasEffect = list.some((e) => e.id === animId);
    if (hasEffect) {
      return removeTimelineEffect(el, animId);
    }
    return el;
  });
}

export function reorderAnimationInElements(elements: SlideElement[], animId: string, direction: 'up' | 'down'): SlideElement[] {
  // Mock implementation for now as it's complex and not directly needed for bulk update, but required by exports
  return elements;
}

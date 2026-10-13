import { SlideElement } from '../../../../../types/slideTypes';
import { extractAllMotionItems } from './motionAnimationHelpers';
import { updateTimelineEffect } from '../studio/shelf/applyEffectHelper';
import { prioritizeElementAnimationPhases } from '../../../../../utils/animationSequenceUtils';

export function reorderAnimationInElements(
  elements: SlideElement[],
  animId: string,
  direction: 'up' | 'down'
): SlideElement[] {
  const items = extractAllMotionItems(elements);
  const currentIndex = items.findIndex((i) => i.id === animId);
  if (currentIndex === -1) return elements;
  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return elements;

  const [movedItem] = items.splice(currentIndex, 1);
  items.splice(targetIndex, 0, movedItem);
  const orderedItems = prioritizeElementAnimationPhases(items);
  const orderById = new Map(orderedItems.map((item, index) => [item.id, index + 1]));

  return elements.map((el) => {
    let updated = el;
    orderedItems
      .filter((item) => item.elementId === el.id)
      .forEach((item) => {
        updated = updateTimelineEffect(updated, item.id, { order: orderById.get(item.id) });
      });
    return updated;
  });
}

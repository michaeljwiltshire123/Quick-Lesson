import { SlideElement } from '../../../../types/slideTypes';
import { updateAnimationState } from '../../../../services/animationStateUpdater';

type AnimationCategory = 'entrance' | 'emphasis' | 'exit';

export interface MultiSelectAnimationPatch {
  category?: AnimationCategory;
  type?: string;
  effectId?: string;
  trigger?: string;
  duration?: number;
  delay?: number;
  repeatTimes?: number;
  meta?: Record<string, any>;
}

type PatchFactory = (element: SlideElement, selectedIndex: number) => MultiSelectAnimationPatch;

export function applyMultiSelectAnimation(
  elements: SlideElement[],
  selectedIds: string[],
  patchInput: MultiSelectAnimationPatch | PatchFactory,
): SlideElement[] {
  const ids = new Set(selectedIds);
  let selectedIndex = 0;
  return elements.map((element) => {
    if (!ids.has(element.id)) return element;
    const patch = typeof patchInput === 'function' ? patchInput(element, selectedIndex++) : patchInput;
    const meta = patch.meta || {};
    const category = patch.category || (meta.emphasisEffect !== undefined ? 'emphasis' : meta.exitAnimationType !== undefined ? 'exit' : meta.animationType !== undefined ? 'entrance' : undefined);
    const type = patch.type ?? patch.effectId ?? (category === 'entrance' ? meta.animationType : category === 'emphasis' ? meta.emphasisEffect : meta.exitAnimationType);
    const trigger = patch.trigger ?? meta.animTrigger;
    const duration = patch.duration ?? meta.animDuration;
    const repeatTimes = patch.repeatTimes ?? meta.emphasisRepeat ?? meta.repeatTimes;
    const updated = updateAnimationState(element, { category, effectId: type, trigger, duration, delay: patch.delay, repeatTimes });

    const metaPatch = { ...meta, ...(patch.delay === undefined ? {} : { animDelay: patch.delay }) };
    return Object.keys(metaPatch).length ? { ...updated, meta: { ...(updated.meta || {}), ...metaPatch } } : updated;
  });
}
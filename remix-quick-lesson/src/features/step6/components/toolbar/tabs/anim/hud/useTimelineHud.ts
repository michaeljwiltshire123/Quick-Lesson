import { useState } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { AnimationCategory } from '../studio/types';
import { applyMultiSelectAnimation } from '../multiSelectAnimationService';

export function useTimelineHud(
  elements: SlideElement[],
  selectedElementIds: Set<string>,
  onUpdateElements?: (elements: SlideElement[]) => void,
  onUpdateElementMeta?: (elementId: string, meta: Record<string, any>) => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<AnimationCategory>('entrance');
  const [activeElementId, setActiveElementId] = useState<string | null>(null);

  const activeElement = elements.find((e) => e.id === activeElementId) || elements[0];
  const meta = activeElement?.meta || {};

  const openHud = (cat: AnimationCategory, elementId: string) => {
    setCategory(cat);
    setActiveElementId(elementId);
    setIsOpen(true);
  };

  const closeHud = () => setIsOpen(false);

  const updateTargets = (patch: Record<string, any>) => {
    const targetIds = selectedElementIds.size > 0 ? Array.from(selectedElementIds) : activeElementId ? [activeElementId] : [];
    if (onUpdateElements) {
      onUpdateElements(applyMultiSelectAnimation(elements, targetIds, { meta: patch }));
    } else if (onUpdateElementMeta && activeElementId) {
      onUpdateElementMeta(activeElementId, patch);
    }
  };

  const handleSelectEffect = (effectId: string) => {
    const patch: Record<string, any> = {};
    if (category === 'entrance') patch.animationType = effectId;
    else if (category === 'emphasis') { patch.emphasisEffect = effectId; patch.isPulseEmphasis = effectId === 'pulse'; patch.isSpinEmphasis = effectId === 'spin'; }
    else patch.exitAnimationType = effectId;
    updateTargets(patch);
  };

  const handleSelectTrigger = (trigger: string) => updateTargets({ animTrigger: trigger });
  const handleSelectDuration = (duration: number) => updateTargets({ animDuration: duration });
  const handleSelectRepeat = (repeatTimes: number) => updateTargets({ repeatTimes, emphasisRepeat: repeatTimes });
  const handleClear = () => {
    const patch: Record<string, any> = {};
    if (category === 'entrance') patch.animationType = 'none';
    else if (category === 'emphasis') { patch.emphasisEffect = 'none'; patch.isPulseEmphasis = false; patch.isSpinEmphasis = false; }
    else patch.exitAnimationType = 'none';
    updateTargets(patch);
  };

  return {
    isOpen, category, activeElement, openHud, closeHud,
    handleSelectEffect, handleSelectTrigger, handleSelectDuration, handleSelectRepeat, handleClear,
  };
}

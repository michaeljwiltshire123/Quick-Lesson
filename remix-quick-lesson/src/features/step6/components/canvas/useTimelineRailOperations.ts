import { SlideElement } from '../../types/slideTypes';
import { SlideAnimationRule } from '../../types/animationTypes';

export function useTimelineRailOperations(
  elements: SlideElement[],
  rules: SlideAnimationRule[],
  onUpdateElements: (elements: SlideElement[]) => void,
  onUpdateTheme?: (patch: any) => void,
) {
  const handleShiftRule = (rule: SlideAnimationRule, direction: 'left' | 'right') => {
    if (!rule.elementId) return;
    const currentIdx = rules.findIndex((r) => r.id === rule.id);
    if (currentIdx === -1) return;
    const targetIdx = direction === 'left' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= rules.length) return;

    const targetRule = rules[targetIdx];
    if (!targetRule.elementId) return;

    const updated = elements.map((el) => {
      if (el.id === rule.elementId) {
        return { ...el, meta: { ...(el.meta || {}), animationStep: targetIdx + 1 } };
      }
      if (el.id === targetRule.elementId) {
        return { ...el, meta: { ...(el.meta || {}), animationStep: currentIdx + 1 } };
      }
      return el;
    });

    onUpdateElements(updated);
  };

  const handleRemoveRule = (rule: SlideAnimationRule) => {
    if (rule.ruleType === 'page_entry') {
      onUpdateTheme?.({ transitionEffect: 'none' });
      return;
    }
    if (rule.ruleType === 'page_exit') {
      onUpdateTheme?.({ pageExitEffect: 'none' });
      return;
    }
    if (!rule.elementId) return;

    const updated = elements.map((el) => {
      if (el.id !== rule.elementId) return el;
      const meta = { ...(el.meta || {}) };
      if (rule.ruleType === 'entrance') delete meta.animationType;
      if (rule.ruleType === 'exit') delete meta.exitAnimationType;
      if (rule.ruleType === 'emphasis') delete meta.emphasisEffect;
      if (rule.ruleType === '3d') { delete meta.is3DZoom; delete meta.is3DCardFlip; }
      return { ...el, meta };
    });

    onUpdateElements(updated);
  };

  return { handleShiftRule, handleRemoveRule };
}

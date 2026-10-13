import { SlideElement } from '../types/slideTypes';

export type AnimationRuleType = 'page_entry' | 'page_exit' | 'entrance' | 'emphasis' | 'exit' | '3d' | 'special';

export interface SlideAnimationRule {
  id: string;
  elementId?: string;
  elementLabel?: string;
  ruleType: AnimationRuleType;
  effectId: string;
  trigger: 'onClick' | 'withPrevious' | 'afterPrevious';
  duration?: number;
  delay?: number;
  stepOrder: number;
}

export function extractSlideTimelineRules(elements: SlideElement[], theme?: any): SlideAnimationRule[] {
  const rules: SlideAnimationRule[] = [];

  const entryEffect = theme?.transitionEffect;
  if (entryEffect && entryEffect !== 'none') {
    rules.push({
      id: 'page-entry-rule', ruleType: 'page_entry', effectId: entryEffect, trigger: 'afterPrevious', stepOrder: 0, elementLabel: `Page Entry (${entryEffect})`,
    });
  }

  elements.forEach((el) => {
    const meta = el.meta || {};
    const label = el.caption || (el.type === 'text' ? el.content?.slice(0, 14) : el.type.toUpperCase());
    const step = Math.max(1, meta.animationStep || 1);

    if (meta.animationType && meta.animationType !== 'none') {
      rules.push({ id: `${el.id}-entrance`, elementId: el.id, elementLabel: label, ruleType: 'entrance', effectId: meta.animationType, trigger: meta.animTrigger || 'onClick', stepOrder: step });
    }
    if (meta.emphasisEffect && meta.emphasisEffect !== 'none') {
      rules.push({ id: `${el.id}-emphasis`, elementId: el.id, elementLabel: label, ruleType: 'emphasis', effectId: meta.emphasisEffect, trigger: 'onClick', stepOrder: step + 0.1 });
    }
    if (meta.isPulseEmphasis) {
      rules.push({ id: `${el.id}-pulse`, elementId: el.id, elementLabel: label, ruleType: 'emphasis', effectId: 'pulse', trigger: 'onClick', stepOrder: step + 0.11 });
    }
    if (meta.isSpinEmphasis) {
      rules.push({ id: `${el.id}-spin`, elementId: el.id, elementLabel: label, ruleType: 'emphasis', effectId: 'spin', trigger: 'onClick', stepOrder: step + 0.12 });
    }
    if (meta.isGrowShrink) {
      rules.push({ id: `${el.id}-grow`, elementId: el.id, elementLabel: label, ruleType: 'emphasis', effectId: 'grow_shrink', trigger: 'onClick', stepOrder: step + 0.13 });
    }
    if (meta.isPhysicsBounce) {
      rules.push({ id: `${el.id}-bounce`, elementId: el.id, elementLabel: label, ruleType: 'emphasis', effectId: 'physics_bounce', trigger: 'onClick', stepOrder: step + 0.14 });
    }
    if (meta.is3DZoom || meta.is3DCardFlip) {
      rules.push({ id: `${el.id}-3d`, elementId: el.id, elementLabel: label, ruleType: '3d', effectId: meta.is3DZoom ? '3d_zoom' : '3d_flip', trigger: 'onClick', stepOrder: step + 0.2 });
    }
    if (meta.exitAnimationType && meta.exitAnimationType !== 'none') {
      rules.push({ id: `${el.id}-exit`, elementId: el.id, elementLabel: label, ruleType: 'exit', effectId: meta.exitAnimationType, trigger: 'onClick', stepOrder: step + 0.3 });
    }
  });

  const sorted = rules.sort((a, b) => a.stepOrder - b.stepOrder);

  const exitEffect = theme?.pageExitEffect;
  if (exitEffect && exitEffect !== 'none') {
    sorted.push({ id: 'page-exit-rule', ruleType: 'page_exit', effectId: exitEffect, trigger: 'onClick', stepOrder: 999, elementLabel: `Page Exit (${exitEffect})` });
  }

  return sorted;
}

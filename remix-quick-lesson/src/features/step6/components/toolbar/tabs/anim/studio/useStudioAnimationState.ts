import { useState, useEffect } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { AnimationCategory, BulkTimingMode } from './types';
import { applyMultiSelectAnimation } from '../multiSelectAnimationService';
import { normalizeDelay, normalizeDuration } from '../timing/DurationInputGuard';

export function useStudioAnimationState(
  currentElement: SlideElement | undefined,
  elements: SlideElement[],
  selectedElementIds: Set<string>,
  onUpdateElementMeta: (meta: Record<string, any>) => void,
  onUpdateElements: (elements: SlideElement[]) => void,
) {
  const meta = currentElement?.meta || {};
  const [category, setCategory] = useState<AnimationCategory>('entrance');
  const [animationType, setAnimationType] = useState<string>(meta.animationType || 'fade_in');
  const [trigger, setTrigger] = useState<string>(meta.animTrigger || 'onClick');
  const [duration, setDurationValue] = useState<number>(normalizeDuration(meta.animDuration));
  const [delay, setDelayValue] = useState<number>(normalizeDelay(meta.animDelay));
  const setDuration = (value: number) => setDurationValue(normalizeDuration(value));
  const setDelay = (value: number) => setDelayValue(normalizeDelay(value));
  const [emphasisRepeat, setEmphasisRepeat] = useState<number>(meta.emphasisRepeat || 1);
  const [dimPrevious, setDimPrevious] = useState<boolean>(Boolean(meta.dimPrevious));
  const [animEasing, setAnimEasing] = useState<string>(meta.animEasing || 'ease-out');
  const [typewriterSpeed, setTypewriterSpeed] = useState<string>(meta.typewriterSpeed || 'none');
  const [motionPath, setMotionPath] = useState<string>(meta.motionPath || 'none');
  const [ambientLoop, setAmbientLoop] = useState<string>(meta.ambientLoop || 'none');
  const [repeatTimes, setRepeatTimes] = useState<number>(meta.repeatTimes || 1);
  const [isTimingModalOpen, setIsTimingModalOpen] = useState(false);
  const [pendingEffectId, setPendingEffectId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentElement) return;
    const m = currentElement.meta || {};
    setAnimationType(m.animationType || m.emphasisEffect || 'fade_in');
    setTrigger(m.animTrigger || 'onClick');
    setDuration(m.animDuration);
    setDelay(m.animDelay);
    setEmphasisRepeat(m.emphasisRepeat || 1);
    setDimPrevious(Boolean(m.dimPrevious));
    setAnimEasing(m.animEasing || 'ease-out');
    setTypewriterSpeed(m.typewriterSpeed || 'none');
    setMotionPath(m.motionPath || 'none');
    setAmbientLoop(m.ambientLoop || 'none');
    setRepeatTimes(m.repeatTimes || 1);
  }, [currentElement?.id]);

  const handleSelectCategory = (cat: AnimationCategory) => {
    setCategory(cat);
    const m = currentElement?.meta || {};
    if (cat === 'entrance') {
      setAnimationType(m.animationType && m.animationType !== 'none' ? m.animationType : 'fade_in');
    } else if (cat === 'emphasis') {
      setAnimationType(m.emphasisEffect && m.emphasisEffect !== 'none' ? m.emphasisEffect : 'pulse');
    } else {
      setAnimationType(m.exitAnimationType && m.exitAnimationType !== 'none' ? m.exitAnimationType : 'fade_out');
    }
  };

  const handleSelectAnimationType = (val: string) => {
    setAnimationType(val);
    if (selectedElementIds.size > 1) {
      setPendingEffectId(val);
      setIsTimingModalOpen(true);
    }
  };

  const handleConfirmTimingMode = (mode: BulkTimingMode) => {
    if (!pendingEffectId) return;
    const effectId = pendingEffectId;
    const updated = applyMultiSelectAnimation(elements, Array.from(selectedElementIds), (_el, index) => ({
      category,
      type: effectId,
      trigger: mode === 'together' ? 'withPrevious' : mode === 'successive' ? 'afterPrevious' : 'onClick',
      duration,
      repeatTimes: emphasisRepeat,
      delay: mode === 'successive' ? index * 0.25 : delay,
      meta: mode === 'onClick' ? { animationStep: index + 1 } : undefined,
    }));
    onUpdateElements(updated);
    setIsTimingModalOpen(false);
    setPendingEffectId(null);
  };

  return {
    category, setCategory: handleSelectCategory, animationType, setAnimationType: handleSelectAnimationType,
    trigger, setTrigger, duration, setDuration, delay, setDelay,
    emphasisRepeat, setEmphasisRepeat, dimPrevious, setDimPrevious,
    animEasing, setAnimEasing, typewriterSpeed, setTypewriterSpeed,
    motionPath, setMotionPath, ambientLoop, setAmbientLoop, repeatTimes, setRepeatTimes,
    isTimingModalOpen, setIsTimingModalOpen, handleConfirmTimingMode,
  };
}

import { SlideElement } from '../types/slideTypes';

export interface OrderedAnimationRecord {
  elementId: string;
  category: string;
}

const PHASE_ORDER: Record<string, number> = {
  entrance: 0,
  emphasis: 1,
  exit: 2,
};

export function prioritizeElementAnimationPhases<T extends OrderedAnimationRecord>(records: T[]): T[] {
  const ordered = [...records];
  const slotsByElement = new Map<string, number[]>();

  ordered.forEach((record, index) => {
    const slots = slotsByElement.get(record.elementId) || [];
    slots.push(index);
    slotsByElement.set(record.elementId, slots);
  });

  slotsByElement.forEach((slots) => {
    const phases = slots.map((index) => ordered[index]).sort(
      (a, b) => (PHASE_ORDER[a.category] ?? 3) - (PHASE_ORDER[b.category] ?? 3),
    );
    slots.forEach((slot, index) => {
      ordered[slot] = phases[index];
    });
  });

  return ordered;
}

export function shiftAnimationStep(
  elements: SlideElement[],
  elementId: string,
  direction: 'up' | 'down'
): SlideElement[] {
  const sorted = [...elements].sort((a, b) => (a.meta?.animationStep || 1) - (b.meta?.animationStep || 1));
  const idx = sorted.findIndex((e) => e.id === elementId);
  const tgt = direction === 'up' ? idx - 1 : idx + 1;
  if (idx < 0 || tgt < 0 || tgt >= sorted.length) return elements;
  const cStep = sorted[idx].meta?.animationStep || idx + 1;
  const tStep = sorted[tgt].meta?.animationStep || tgt + 1;
  return elements.map((el) => {
    if (el.id === sorted[idx].id) return { ...el, meta: { ...(el.meta || {}), animationStep: tStep } };
    if (el.id === sorted[tgt].id) return { ...el, meta: { ...(el.meta || {}), animationStep: cStep } };
    return el;
  });
}

import { DiscussionStarterCard } from '../types/starterCard';
import { LessonChunk } from '../../../types';

/**
 * Master Teacher Pedagogical Selection Engine:
 * Across all active lesson chunks:
 * Selects 2 diagnostic discussion starters per chunk with a 40% True/False and 60% dynamic balance
 * (e.g. 1 counter-intuitive True/False misconception + 1 deep dilemma/scale/disaster/tension),
 * prioritising prompts with rich misconception warnings and optimal classroom challenge.
 */
export function autoSuggestAndAttachStarters(
  allStarters: DiscussionStarterCard[],
  chunks: LessonChunk[]
): DiscussionStarterCard[] {
  // First clear any existing milestoneChunkId attachments to re-assign fresh
  const starterPool = allStarters.map((s) => ({ ...s }));

  chunks.forEach((chunk, chunkIdx) => {
    const chunkCandidates = starterPool.filter((s) => s.conceptId === chunk.id);
    if (chunkCandidates.length === 0) return;

    // Reset this chunk's existing attachments first
    chunkCandidates.forEach((c) => {
      c.milestoneChunkId = '';
    });

    const tfCards = chunkCandidates.filter((s) => s.formatType === 'true_false');
    const otherCards = chunkCandidates.filter((s) => s.formatType !== 'true_false');

    const chosen: DiscussionStarterCard[] = [];

    // Master Teacher rule: target 40% True/False across chunks.
    // In a 2-card quota per chunk: alternate or allocate 1 TF and 1 Other for optimal balance.
    const shouldIncludeTF = (chunkIdx % 5 < 2) && tfCards.length > 0;

    if (shouldIncludeTF && tfCards.length > 0) {
      // Pick best True/False (preferably false counter-intuitive misconception)
      const falseTF = tfCards.find((c) => c.isTrue === false) || tfCards[0];
      chosen.push(falseTF);

      if (otherCards.length > 0) {
        // Pick best diverse other format (prefer finger_scale or predict_disaster or paradox)
        const preferredOther = otherCards.find(
          (c) => c.formatType === 'finger_scale' || c.formatType === 'predict_disaster' || c.formatType === 'socratic_tension'
        ) || otherCards[0];
        chosen.push(preferredOther);
      } else if (tfCards.length > 1) {
        chosen.push(tfCards[1]);
      }
    } else {
      // Pick two diverse non-TF formats or 1 TF + 1 Other
      if (otherCards.length >= 2) {
        chosen.push(otherCards[0]);
        // Pick a second other card of a different format type if available
        const secondOther = otherCards.find((c) => c.formatType !== otherCards[0].formatType) || otherCards[1];
        chosen.push(secondOther);
      } else if (otherCards.length === 1) {
        chosen.push(otherCards[0]);
        if (tfCards.length > 0) chosen.push(tfCards[0]);
      } else if (tfCards.length >= 2) {
        chosen.push(tfCards[0], tfCards[1]);
      }
    }

    // Attach chosen cards to this chunk
    chosen.slice(0, 2).forEach((card) => {
      const target = starterPool.find((s) => s.id === card.id);
      if (target) {
        target.milestoneChunkId = chunk.id;
      }
    });
  });

  return starterPool;
}

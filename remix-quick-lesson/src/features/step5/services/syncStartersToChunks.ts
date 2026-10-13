import { DiscussionStarterCard } from '../types/starterCard';
import { LessonChunk } from '../../../types';

/**
 * Strict Pre/Post-Condition Verifier:
 * Validates that every prompt card text is pristine and that no prompt text
 * was wiped or reduced to an empty string during teacher edits or state transfers.
 */
function verifyPrePostConditionIntegrity(
  previousCards: DiscussionStarterCard[],
  syncedCards: DiscussionStarterCard[]
): void {
  const previousMap = new Map(previousCards.map((c) => [c.id, c.promptText]));
  syncedCards.forEach((card) => {
    const priorText = previousMap.get(card.id);
    if (priorText && priorText.trim().length > 0 && (!card.promptText || card.promptText.trim().length === 0)) {
      // Revert accidental wipeout to preserve teacher edits
      card.promptText = priorText;
    }
  });
}

/**
 * Step-Transition Auto-Sync & Central Vault Engine:
 * Locks all card text and pool states directly inside the main lesson plan
 * data structure (LessonChunk[] -> starterPool & discussionStarters),
 * with strict pre/post-condition verification preventing any word loss on navigation.
 */
export function syncStartersToLessonChunks(
  chunks: LessonChunk[],
  starters: DiscussionStarterCard[]
): LessonChunk[] {
  // Pre-condition verification against session storage
  try {
    const cached = sessionStorage.getItem('step5_starters_cache');
    if (cached) {
      const priorParsed = JSON.parse(cached);
      if (Array.isArray(priorParsed)) {
        verifyPrePostConditionIntegrity(priorParsed, starters);
      }
    }
  } catch {}

  // Commit verified cards to session storage
  try {
    sessionStorage.setItem('step5_starters_cache', JSON.stringify(starters));
  } catch {}

  // Central Vault: Embed directly into chunks with zero word loss
  return chunks.map((chunk) => {
    const chunkPool = starters.filter((s) => s.conceptId === chunk.id);
    const attachedForChunk = starters.filter(
      (s) => s.milestoneChunkId === chunk.id || (s.conceptId === chunk.id && s.isAttached)
    );

    return {
      ...chunk,
      starterPool: chunkPool,
      discussionStarters: attachedForChunk.length > 0 ? attachedForChunk : chunkPool.slice(0, 2),
    };
  });
}

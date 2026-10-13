import { DiscussionStarterCard } from '../types/starterCard';
import { LessonChunk } from '../../../types';

/** Extracts discussion starters from the current lesson's chunks only. */
export function extractStartersFromChunks(chunks: LessonChunk[]): DiscussionStarterCard[] {
  const extracted: DiscussionStarterCard[] = [];
  const seenIds = new Set<string>();

  chunks.forEach((chunk) => {
    // Collect from starterPool first (contains all generated cards for this chunk)
    if (Array.isArray(chunk.starterPool) && chunk.starterPool.length > 0) {
      chunk.starterPool.forEach((card) => {
        if (card && card.id && !seenIds.has(card.id)) {
          seenIds.add(card.id);
          extracted.push(card);
        }
      });
    }

    // Also collect from discussionStarters (attached active cards)
    if (Array.isArray(chunk.discussionStarters) && chunk.discussionStarters.length > 0) {
      chunk.discussionStarters.forEach((card) => {
        if (card && card.id) {
          const existing = extracted.find((c) => c.id === card.id);
          if (existing) {
            existing.milestoneChunkId = card.milestoneChunkId || chunk.id;
          } else if (!seenIds.has(card.id)) {
            seenIds.add(card.id);
            extracted.push({ ...card, milestoneChunkId: card.milestoneChunkId || chunk.id });
          }
        }
      });
    }
  });

  return extracted;
}

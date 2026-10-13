import { LessonChunk } from '../../../types';

/**
 * Pure, non-destructive reconciliation of conceptual milestones to LessonChunks.
 * Preserves custom teacher notes, scripts, and attachments across step transitions.
 */
export function reconcileMilestonesToChunks(
  milestones: string[],
  existingChunks: LessonChunk[],
): LessonChunk[] {
  const cleanMilestones = (milestones || []).map((m) => m.trim()).filter(Boolean);

  // If no existing chunks, initialize standard structure: Teaching chunks, 1 Closing (no Warm-up)
  if (!existingChunks || existingChunks.length === 0) {
    const teachingChunks: LessonChunk[] = cleanMilestones.map((milestone, idx) => ({
      id: `teaching-${idx + 1}`,
      type: 'teaching',
      title: milestone,
      durationMinutes: 15,
      isDraft: true,
    }));

    const closingChunk: LessonChunk = {
      id: 'closing',
      type: 'closing',
      title: 'Plenary & Synthesis',
      durationMinutes: 10,
      isDraft: true,
    };

    return [...teachingChunks, closingChunk];
  }

  // Identify existing closing chunk
  const existingClosing = existingChunks.find((c) => c.type === 'closing') || {
    id: 'closing',
    type: 'closing' as const,
    title: 'Plenary & Synthesis',
    durationMinutes: 10,
    isDraft: true,
  };

  const existingTeaching = existingChunks.filter((c) => c.type === 'teaching');

  // Sequentially map milestones to teaching chunks, preserving all custom teacher planning data
  const reconciledTeaching: LessonChunk[] = cleanMilestones.map((milestone, idx) => {
    const existing = existingTeaching[idx];
    if (existing) {
      return {
        ...existing,
        title: existing.title === milestone ? existing.title : milestone,
      };
    }
    return {
      id: `teaching-${Date.now()}-${idx + 1}`,
      type: 'teaching',
      title: milestone,
      durationMinutes: 15,
      isDraft: true,
    };
  });

  return [...reconciledTeaching, existingClosing];
}

import { DiscussionStarterCard } from '../types/starterCard';
import { LessonChunk } from '../../../types';
import { generateDiscussionStartersForChunk } from './starterGeneratorService';

const PREFERRED_FORMAT_ORDER = [
  'predict_disaster', 'socratic_tension', 'paradox',
  'forced_dichotomy', 'finger_scale', 'would_you_rather'
];

export async function ensureAndAutoAttachAllChunks(
  chunks: LessonChunk[],
  currentStarters: DiscussionStarterCard[],
  lessonTitle: string,
  subject: string
): Promise<DiscussionStarterCard[]> {
  let pool = currentStarters.map((s) => ({ ...s }));

  // 1. Check which chunks have no generated cards yet and generate them
  for (const chunk of chunks) {
    const hasCards = pool.some((s) => s.conceptId === chunk.id);
    if (!hasCards) {
      const generated = await generateDiscussionStartersForChunk({
        lessonTitle,
        subject,
        chunkId: chunk.id,
        chunkTitle: chunk.title,
        lessonNotes: chunk.classroomNotes || chunk.learningIntent,
      });
      pool = [...pool, ...generated];
    }
  }

  // 2. Select and attach 2 optimal diagnostic sparks (40% TF / 60% high-order) for EVERY chunk
  chunks.forEach((chunk) => {
    const candidates = pool.filter((s) => s.conceptId === chunk.id);
    if (candidates.length === 0) return;

    const tfList = candidates.filter((s) => s.formatType === 'true_false');
    const othersList = candidates.filter((s) => s.formatType !== 'true_false');

    // Reset attachments for this chunk
    pool.forEach((s) => {
      if (s.conceptId === chunk.id && s.milestoneChunkId === chunk.id) {
        s.milestoneChunkId = '';
      }
    });

    const chosen: DiscussionStarterCard[] = [];

    // 1st spark: Prefer counter-intuitive false statement or punchy true fact
    if (tfList.length > 0) {
      const bestTf = tfList.find((s) => s.isTrue === false) || tfList[0];
      chosen.push(bestTf);
    }

    // 2nd spark: Prioritise high-tension formats (Disaster, Socratic, Paradox, etc.)
    if (othersList.length > 0) {
      let bestOther = othersList.find((s) => s.formatType === PREFERRED_FORMAT_ORDER[0]);
      if (!bestOther) {
        bestOther = othersList.sort((a, b) => {
          const rankA = PREFERRED_FORMAT_ORDER.indexOf(a.formatType);
          const rankB = PREFERRED_FORMAT_ORDER.indexOf(b.formatType);
          return (rankA === -1 ? 99 : rankA) - (rankB === -1 ? 99 : rankB);
        })[0];
      }
      if (bestOther && !chosen.some((c) => c.id === bestOther?.id)) {
        chosen.push(bestOther);
      }
    }

    // Fill up to 2 if needed
    while (chosen.length < 2 && candidates.length > chosen.length) {
      const rem = candidates.find((c) => !chosen.some((x) => x.id === c.id));
      if (rem) chosen.push(rem);
      else break;
    }

    // Attach to chunk
    chosen.forEach((c) => {
      const target = pool.find((s) => s.id === c.id);
      if (target) target.milestoneChunkId = chunk.id;
    });
  });

  return pool;
}

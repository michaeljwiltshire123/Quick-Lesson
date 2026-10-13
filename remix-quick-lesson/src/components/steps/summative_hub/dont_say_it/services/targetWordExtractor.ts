import { LessonChunk } from '../../../../../types';
import { cleanTargetTerm } from './phraseSanitizer';
import { extractCandidatesFromLesson, synthesizeLessonVariants } from './lessonGroundedExtractor';

export function cleanTargetPhrase(raw: string): string {
  const cleaned = cleanTargetTerm(raw);
  return cleaned || '';
}

export function extractPunchyTargetWords(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  desiredCount = 8
): string[] {
  // 1. Gather all candidates strictly from lesson title, chunks, intents, and definitions
  const rawCandidates = extractCandidatesFromLesson(lessonTitle, chunks);

  // 2. Filter through strict phrase sanitizer (no fragments, no tasks, 1-3 words)
  const validTerms: string[] = [];
  rawCandidates.forEach((term) => {
    const cleaned = cleanTargetTerm(term);
    if (cleaned && !validTerms.includes(cleaned)) {
      validTerms.push(cleaned);
    }
  });

  // 3. If more cards are needed for teams/rounds, synthesize connected variants strictly from lesson roots
  const targetCount = Math.max(1, desiredCount);
  const finalPool = synthesizeLessonVariants(validTerms, lessonTitle, targetCount);

  return finalPool.slice(0, targetCount);
}

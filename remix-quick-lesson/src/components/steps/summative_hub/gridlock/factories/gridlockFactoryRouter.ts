import { GridlockQuestion } from '../types/gridlockTypes';
import { extractChunkGroundedQuestions } from './chunkGroundedGridlockFactory';
import { replaceRareLetterTraps } from './rareLetterReplacementEngine';
import { LessonChunk } from '../../../../../types';

export interface GridlockFactoryOptions {
  lessonTitle: string;
  chunks?: LessonChunk[];
  existingQuestions?: GridlockQuestion[];
  enableRareLetterReplacement?: boolean;
}

export const buildGroundedGridlockBoard = ({
  lessonTitle,
  chunks = [],
  existingQuestions,
  enableRareLetterReplacement = true,
}: GridlockFactoryOptions): GridlockQuestion[] => {
  let baseQuestions = existingQuestions && existingQuestions.length >= 25
    ? existingQuestions
    : extractChunkGroundedQuestions(lessonTitle, chunks);

  if (enableRareLetterReplacement) {
    baseQuestions = replaceRareLetterTraps(baseQuestions, chunks);
  }

  return (baseQuestions || []).map((q, idx) => {
    const term = (q?.targetAnswer || q?.letter || 'Concept').trim();
    return {
      ...q,
      id: q?.id || `gridlock-tile-${idx + 1}-${Date.now()}`,
      bloomsLevel: q?.bloomsLevel || (idx % 2 === 0 ? 'Understand' : 'Apply'),
      targetAnswer: term,
      acceptableAnswers: Array.from(new Set([
        term.toLowerCase(),
        `${term.toLowerCase()}s`,
        ...(q?.acceptableAnswers || []).map((a) => (a || '').toLowerCase()).filter(Boolean),
      ])).slice(0, 8),
    };
  });
};

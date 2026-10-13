import { GridlockQuestion } from '../types/gridlockTypes';
import { LessonChunk } from '../../../../../types';
import { extractCurriculumPhrases } from './curriculumPhraseExtractor';

const RARE_LETTER_TRAPS = new Set(['X', 'Z', 'Q']);

export const sanitizeTileLetter = (rawLetter: string): string => {
  return (rawLetter || 'A').trim().toUpperCase();
};

export const replaceRareLetterTraps = (
  questions: GridlockQuestion[],
  chunks: LessonChunk[] = []
): GridlockQuestion[] => {
  const phrases = extractCurriculumPhrases('Lesson', chunks);
  const usablePhrases = phrases.filter((p) => !RARE_LETTER_TRAPS.has(p.firstLetter.toUpperCase()));

  return (questions || []).map((q, idx) => {
    const letter = (q?.letter || '').toUpperCase();
    if (!RARE_LETTER_TRAPS.has(letter)) return q;

    const substitute = usablePhrases[idx % Math.max(1, usablePhrases.length)];
    if (!substitute) return q;

    if (substitute.anchorQuestion) {
      const a = substitute.anchorQuestion;
      return {
        ...q,
        letter: a.letter,
        targetAnswer: a.targetAnswer,
        prompt: a.prompt,
        backupPrompt: `Focus on ${substitute.chunkTitle}. What '${a.letter}' term fits?`,
        acceptableAnswers: a.acceptableAnswers,
        chunkTitle: substitute.chunkTitle,
      };
    }

    const subLetter = substitute.firstLetter.toUpperCase();
    return {
      ...q,
      letter: subLetter,
      targetAnswer: substitute.text,
      prompt: `What '${subLetter}' is a key technique or concept in ${substitute.chunkTitle}?`,
      backupPrompt: `Think of technical terms starting with '${subLetter}' in ${substitute.chunkTitle}.`,
      acceptableAnswers: [
        substitute.text.toLowerCase(),
        substitute.text,
        `${substitute.text.toLowerCase()}s`,
      ],
      chunkTitle: substitute.chunkTitle,
    };
  });
};

import { GridlockQuestion } from '../types/gridlockTypes';
import { LessonChunk } from '../../../../../types';
import { extractCurriculumPhrases } from '../factories/curriculumPhraseExtractor';

export const DEFAULT_GRID_LETTERS = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'R', 'S', 'T', 'U',
  'V', 'W', 'Y', 'B', 'M',
];

export function generateExtractedLessonGridlockQuestions(
  lessonTitle: string,
  chunks: LessonChunk[] = []
): GridlockQuestion[] {
  const phrases = extractCurriculumPhrases(lessonTitle, chunks);

  return DEFAULT_GRID_LETTERS.map((letter, idx) => {
    const matchingAnchor = phrases.find((p) => p.anchorQuestion?.letter === letter);
    if (matchingAnchor && matchingAnchor.anchorQuestion) {
      const a = matchingAnchor.anchorQuestion;
      return {
        id: `lesson-gq-anchor-${idx + 1}-${letter}`,
        letter: a.letter,
        prompt: a.prompt,
        backupPrompt: `Focus on ${matchingAnchor.chunkTitle}. What '${a.letter}' term fits?`,
        targetAnswer: a.targetAnswer,
        acceptableAnswers: a.acceptableAnswers,
        difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
        distinctionNote: `Focused on ${a.targetAnswer} in ${matchingAnchor.chunkTitle}.`,
      };
    }

    const matched = phrases.find((p) => p.firstLetter.toUpperCase() === letter) || phrases[idx % Math.max(1, phrases.length)];
    const target = matched ? matched.text : `${letter} Factor`;
    const targetLetter = matched ? matched.firstLetter.toUpperCase() : letter;

    return {
      id: `lesson-gq-${idx + 1}-${targetLetter}`,
      letter: targetLetter,
      prompt: `What '${targetLetter}' is key curriculum terminology in ${matched?.chunkTitle || lessonTitle}?`,
      backupPrompt: `What '${targetLetter}' concept applies here?`,
      targetAnswer: target,
      acceptableAnswers: [target.toLowerCase(), target, `${target.toLowerCase()}s`].slice(0, 8),
      difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
      distinctionNote: `Focused on ${target} in ${matched?.chunkTitle || lessonTitle}.`,
    };
  });
}

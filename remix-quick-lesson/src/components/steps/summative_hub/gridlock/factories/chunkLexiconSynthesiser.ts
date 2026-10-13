import { GridlockQuestion } from '../types/gridlockTypes';
import { LessonChunk } from '../../../../../types';
import { extractCurriculumPhrases, CurriculumPhrase } from './curriculumPhraseExtractor';

const DEFAULT_BOARD_LETTERS = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'R', 'S', 'T', 'U',
  'V', 'W', 'Q', 'X', 'Z'
];

function buildAnswerVariants(term: string): string[] {
  const lower = term.toLowerCase();
  const variants = [lower, term, `${lower}s`];
  const words = term.split(/\s+/);
  if (words.length > 1) {
    const acronym = words.map((w) => w[0]?.toLowerCase()).join('');
    variants.push(acronym, acronym.toUpperCase());
    variants.push(term.replace(/\s+/g, '-').toLowerCase());
  }
  return Array.from(new Set(variants)).slice(0, 8);
}

export function synthesiseRoundQuestions(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  roundIndex = 0
): GridlockQuestion[] {
  const phrases = extractCurriculumPhrases(lessonTitle, chunks);
  const anchorPhrases = phrases.filter((p) => p.anchorQuestion);

  return DEFAULT_BOARD_LETTERS.map((defaultLetter, idx) => {
    // 1. Prefer anchor phrases (e.g. "Rule of Thirds" -> 'T')
    const matchingAnchor = anchorPhrases.find((p) => p.anchorQuestion?.letter === defaultLetter);
    if (matchingAnchor && matchingAnchor.anchorQuestion) {
      const a = matchingAnchor.anchorQuestion;
      return {
        id: `syn-anchor-r${roundIndex + 1}-${a.letter}-${idx}`,
        letter: a.letter,
        targetAnswer: a.targetAnswer,
        prompt: a.prompt,
        backupPrompt: `Focus on ${matchingAnchor.chunkTitle}. What '${a.letter}' term fits?`,
        acceptableAnswers: a.acceptableAnswers,
        difficulty: 'medium',
        chunkTitle: matchingAnchor.chunkTitle,
        distinctionNote: `Assesses key vocabulary in ${matchingAnchor.chunkTitle}.`,
      };
    }

    // 2. Otherwise find single curriculum term
    const matchedTerm = phrases.find((p) => p.firstLetter.toUpperCase() === defaultLetter);
    const chosenPhrase: CurriculumPhrase = matchedTerm || phrases[(roundIndex + idx) % Math.max(1, phrases.length)] || {
      text: lessonTitle,
      firstLetter: defaultLetter,
      wordCount: 1,
      chunkTitle: lessonTitle,
      chunkIntent: 'Subject mastery',
    };

    const target = chosenPhrase.text;
    const tileLetter = chosenPhrase.firstLetter || defaultLetter;

    return {
      id: `syn-q-r${roundIndex + 1}-${tileLetter}-${idx}`,
      letter: tileLetter,
      targetAnswer: target,
      prompt: `What '${tileLetter}' is a key technique or concept in ${chosenPhrase.chunkTitle}?`,
      backupPrompt: `Think of technical terms starting with '${tileLetter}' in ${chosenPhrase.chunkTitle}.`,
      acceptableAnswers: buildAnswerVariants(target),
      difficulty: roundIndex % 2 === 0 ? 'easy' : 'medium',
      chunkIndex: idx % Math.max(1, chunks.length),
      chunkTitle: chosenPhrase.chunkTitle,
      distinctionNote: `Core subject terminology in ${chosenPhrase.chunkTitle}.`,
    };
  });
}

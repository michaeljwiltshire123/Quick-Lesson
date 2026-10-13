import { GridlockQuestion } from '../types/gridlockTypes';
import { LessonChunk } from '../../../../../types';
import { extractCurriculumPhrases } from './curriculumPhraseExtractor';

const BLOOMS_TAXONOMY_CYCLE: Array<NonNullable<GridlockQuestion['bloomsLevel']>> = [
  'Remember', 'Understand', 'Apply', 'Analyse', 'Evaluate',
];

export const extractChunkGroundedQuestions = (
  lessonTitle: string = 'Core Curriculum',
  chunks: LessonChunk[] = []
): GridlockQuestion[] => {
  const extractedList: GridlockQuestion[] = [];
  const phrases = extractCurriculumPhrases(lessonTitle, chunks);

  phrases.forEach((phrase, idx) => {
    if (extractedList.length >= 25) return;
    const blooms = BLOOMS_TAXONOMY_CYCLE[idx % BLOOMS_TAXONOMY_CYCLE.length];

    if (phrase.anchorQuestion) {
      const a = phrase.anchorQuestion;
      extractedList.push({
        id: `chunk-q-anchor-${idx + 1}`,
        letter: a.letter,
        targetAnswer: a.targetAnswer,
        prompt: a.prompt,
        backupPrompt: `Focus on ${phrase.chunkTitle}. What '${a.letter}' term fits?`,
        acceptableAnswers: a.acceptableAnswers,
        difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
        bloomsLevel: blooms,
        chunkTitle: phrase.chunkTitle,
        distinctionNote: `Assesses ${blooms} level understanding in ${phrase.chunkTitle}.`,
      });
      return;
    }

    const letter = phrase.firstLetter.toUpperCase();
    const term = phrase.text;

    extractedList.push({
      id: `chunk-q-term-${idx + 1}`,
      letter,
      targetAnswer: term,
      prompt: `What '${letter}' is key terminology in ${phrase.chunkTitle}?`,
      backupPrompt: `Focus on ${phrase.chunkTitle}. What '${letter}' concept applies?`,
      acceptableAnswers: [
        term.toLowerCase(),
        term,
        `${term.toLowerCase()}s`,
      ],
      difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
      bloomsLevel: blooms,
      chunkTitle: phrase.chunkTitle,
      distinctionNote: `Core vocabulary in ${phrase.chunkTitle}.`,
    });
  });

  // Pad to 25 if necessary with lesson concepts
  while (extractedList.length < 25) {
    const padIdx = extractedList.length;
    const parentChunk = chunks[padIdx % Math.max(1, chunks.length)];
    const title = parentChunk?.title || lessonTitle;
    const letter = String.fromCharCode(65 + (padIdx % 26));

    extractedList.push({
      id: `chunk-q-pad-${padIdx + 1}`,
      letter,
      targetAnswer: `${title} Principle`,
      prompt: `What '${letter}' connects to ${title}?`,
      backupPrompt: `Think of subject concepts in ${lessonTitle}.`,
      acceptableAnswers: [`${title.toLowerCase()} principle`],
      difficulty: 'medium',
      bloomsLevel: BLOOMS_TAXONOMY_CYCLE[padIdx % BLOOMS_TAXONOMY_CYCLE.length],
      chunkTitle: title,
    });
  }

  return extractedList.slice(0, 25);
};

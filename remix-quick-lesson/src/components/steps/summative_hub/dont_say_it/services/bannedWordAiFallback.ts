import { LessonChunk } from '../../../../../types';
import { SecretWordCard } from '../types/dontSayItTypes';
import { extractPunchyTargetWords } from './targetWordExtractor';

export function generateLocalFallbackBannedWords(
  targetWord: string,
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  count = 3
): string[] {
  const fullText = [
    lessonTitle,
    ...chunks.map((c) => `${c.title || ''} ${c.learningIntent || ''} ${c.coreExplanation || ''}`)
  ].join(' ');

  const targetParts = targetWord.toLowerCase().split(/\s+/);
  const words = fullText
    .replace(/[^a-zA-Z\s]/g, ' ')
    .split(/\s+/)
    .filter(
      (w) =>
        w.length >= 4 &&
        !targetParts.includes(w.toLowerCase()) &&
        !['the', 'and', 'with', 'that', 'this', 'from', 'they', 'have', 'were', 'what', 'when', 'will'].includes(w.toLowerCase())
    );

  const unique = Array.from(new Set(words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())));
  if (unique.length >= count) {
    return unique.slice(0, count);
  }

  const genericFallbacks = ['Definition', 'Application', 'Principle', 'Technique', 'Function', 'Structure'];
  return [...unique, ...genericFallbacks].slice(0, count);
}

export function buildFallbackCardsFromChunks(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  cardCount = 8
): SecretWordCard[] {
  const targetWords = extractPunchyTargetWords(lessonTitle, chunks, cardCount);

  return targetWords.map((term, idx) => {
    const aiWords = generateLocalFallbackBannedWords(term, lessonTitle, chunks, 4);
    return {
      id: `card-${idx + 1}-${Date.now()}`,
      targetWord: term,
      studentBannedWords: [],
      aiFallbackBannedWords: aiWords,
      activeBannedWords: aiWords,
      chunkIndex: idx % Math.max(1, chunks.length),
      hint: `Core concept from ${lessonTitle}.`,
    };
  });
}

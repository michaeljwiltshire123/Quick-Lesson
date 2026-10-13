import { LessonChunk } from '../../../../../types';
import { SecretWordCard } from '../types/dontSayItTypes';
import { extractPunchyTargetWords } from './targetWordExtractor';
import { generateLocalFallbackBannedWords } from './bannedWordAiFallback';

export interface PoolDimensions {
  teamCount: number;
  roundCount: number;
}

export function calculateRequiredCards(teamCount: number, roundCount: number): number {
  const safeTeams = Math.max(2, Math.min(4, teamCount || 2));
  const safeRounds = Math.max(1, Math.min(5, roundCount || 1));
  return safeTeams * safeRounds;
}

export function synchroniseCardPool(
  currentCards: SecretWordCard[],
  teamCount: number,
  roundCount: number,
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  bannedWordsPerCard = 3
): SecretWordCard[] {
  const targetCount = calculateRequiredCards(teamCount, roundCount);

  // If we already have exact or sufficient cards with custom edits, preserve them
  if (currentCards.length >= targetCount) {
    return currentCards.slice(0, targetCount);
  }

  // Need more cards: extract extra terms
  const existingWords = new Set(currentCards.map((c) => c.targetWord.toLowerCase()));
  const candidateWords = extractPunchyTargetWords(lessonTitle, chunks, targetCount + 10);
  const neededWords = candidateWords.filter((w) => !existingWords.has(w.toLowerCase()));

  const newCards: SecretWordCard[] = [...currentCards];

  for (let i = 0; i < targetCount - currentCards.length; i++) {
    const word = neededWords[i] || `Concept Term ${newCards.length + 1}`;
    const aiBanned = generateLocalFallbackBannedWords(word, lessonTitle, chunks, bannedWordsPerCard);
    newCards.push({
      id: `card-${newCards.length + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      targetWord: word,
      studentBannedWords: [],
      aiFallbackBannedWords: aiBanned,
      activeBannedWords: aiBanned,
      chunkIndex: newCards.length % Math.max(1, chunks.length),
      hint: `Curriculum term for ${lessonTitle}.`,
    });
  }

  return newCards;
}

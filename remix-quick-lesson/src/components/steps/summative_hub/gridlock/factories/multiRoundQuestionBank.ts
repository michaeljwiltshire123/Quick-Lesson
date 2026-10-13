import { GridlockQuestion, TournamentFormat } from '../types/gridlockTypes';
import { synthesiseRoundQuestions } from './chunkLexiconSynthesiser';
import { LessonChunk } from '../../../../../types';

export function getRoundsCountForFormat(format: TournamentFormat): number {
  switch (format) {
    case 'best-of-7':
      return 7;
    case 'best-of-5':
      return 5;
    case 'best-of-3':
    default:
      return 3;
  }
}

export function buildMultiRoundQuestionBank(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  format: TournamentFormat = 'best-of-3',
  existingQuestions: GridlockQuestion[] = []
): GridlockQuestion[][] {
  const totalRounds = getRoundsCountForFormat(format);
  const roundDecks: GridlockQuestion[][] = [];

  for (let round = 0; round < totalRounds; round++) {
    const roundStart = round * 25;
    const roundEnd = roundStart + 25;
    const providedChunk = existingQuestions.slice(roundStart, roundEnd);

    if (providedChunk.length >= 25) {
      roundDecks.push(providedChunk);
    } else {
      const synthetic = synthesiseRoundQuestions(lessonTitle, chunks, round);
      const combined = [
        ...providedChunk,
        ...synthetic.slice(providedChunk.length)
      ].slice(0, 25);
      roundDecks.push(combined);
    }
  }

  return roundDecks;
}

export function getQuestionForTileAndMatch(
  roundDecks: GridlockQuestion[][],
  tileIndex: number,
  matchNumber: number,
  lessonTitle: string,
  chunks: LessonChunk[] = []
): GridlockQuestion {
  const roundIdx = Math.max(0, matchNumber - 1);
  const deck = roundDecks[roundIdx];
  if (deck && deck[tileIndex]) {
    return deck[tileIndex];
  }
  const fallbackRound = synthesiseRoundQuestions(lessonTitle, chunks, roundIdx);
  return fallbackRound[tileIndex % fallbackRound.length];
}

import { GridlockQuestion, HexTile } from '../types/gridlockTypes';
import { synthesiseRoundQuestions } from '../factories/chunkLexiconSynthesiser';
import { LessonChunk } from '../../../../../types';

export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export function build5x5HexGridFromQuestions(
  questions: GridlockQuestion[],
  goldHexCount = 2,
  shouldShuffle = true,
  lessonTitle = 'Core Lesson',
  chunks: LessonChunk[] = []
): HexTile[][] {
  const grid: HexTile[][] = [];
  const goldIndices = goldHexCount > 0 ? [6, 18] : [];
  const primary25 = (questions && questions.length >= 25)
    ? questions.slice(0, 25)
    : synthesiseRoundQuestions(lessonTitle, chunks, 0);

  const orderedQuestions = shouldShuffle ? shuffleArray(primary25) : primary25;
  const remainingQuestions = (questions && questions.length > 25) ? questions.slice(25) : [];

  for (let r = 0; r < 5; r++) {
    const row: HexTile[] = [];
    for (let c = 0; c < 5; c++) {
      const idx = r * 5 + c;
      const q = orderedQuestions[idx] || synthesiseRoundQuestions(lessonTitle, chunks, 0)[idx];
      const backups: GridlockQuestion[] = [];

      for (let round = 1; round <= 6; round++) {
        const roundStart = (round - 1) * 25;
        const candidate = remainingQuestions[roundStart + idx];
        if (candidate) {
          backups.push(candidate);
        } else {
          const syntheticRound = synthesiseRoundQuestions(lessonTitle, chunks, round);
          backups.push(syntheticRound[idx % syntheticRound.length]);
        }
      }

      row.push({
        id: `tile-${r}-${c}`,
        row: r,
        col: c,
        letter: q.letter,
        isGold: goldIndices.includes(idx),
        owner: 'none',
        activeQuestion: q,
        backupQuestions: backups,
      });
    }
    grid.push(row);
  }

  return grid;
}

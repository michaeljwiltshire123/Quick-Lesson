import { HexTile, GridlockQuestion } from '../types/gridlockTypes';
import { synthesiseRoundQuestions } from '../factories/chunkLexiconSynthesiser';
import { LessonChunk } from '../../../../../types';

export function getNextBackupQuestion(
  tile: HexTile,
  lessonTitle = 'Core Lesson',
  chunks: LessonChunk[] = []
): {
  updatedTile: HexTile;
  hasMoreQuestions: boolean;
} {
  if (tile.backupQuestions && tile.backupQuestions.length > 0) {
    const [nextQuestion, ...remainingBackups] = tile.backupQuestions;
    const updatedTile: HexTile = {
      ...tile,
      activeQuestion: nextQuestion,
      backupQuestions: remainingBackups,
    };
    return { updatedTile, hasMoreQuestions: true };
  }

  // Synthesise fresh curriculum question if backups ever get exhausted
  const freshSynthetic = synthesiseRoundQuestions(lessonTitle, chunks, 2);
  const match = freshSynthetic.find((q) => q.letter === tile.letter) || freshSynthetic[0];
  const updatedTile: HexTile = {
    ...tile,
    activeQuestion: match,
    backupQuestions: [],
  };

  return { updatedTile, hasMoreQuestions: true };
}

export function advanceGridToNextMatchRound(
  grid: HexTile[][],
  matchNumber: number,
  lessonTitle = 'Core Lesson',
  chunks: LessonChunk[] = []
): HexTile[][] {
  return grid.map((row) =>
    row.map((tile) => {
      const { updatedTile } = getNextBackupQuestion(tile, lessonTitle, chunks);
      return {
        ...updatedTile,
        owner: 'none',
      };
    })
  );
}

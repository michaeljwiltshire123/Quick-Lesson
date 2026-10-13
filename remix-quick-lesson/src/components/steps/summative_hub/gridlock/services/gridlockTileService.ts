import { GridlockQuestion, HexTile } from '../types/gridlockTypes';
import { LessonChunk } from '../../../../../types';

export const createDefaultTileQuestion = (letter: string, customWord?: string): GridlockQuestion => {
  const word = customWord || `${letter.toUpperCase()} Term`;
  return {
    id: `q-${letter.toLowerCase()}-${Date.now()}`,
    letter: letter.toUpperCase(),
    targetAnswer: word,
    prompt: `What '${letter.toUpperCase()}' represents key subject vocabulary in this topic?`,
    backupPrompt: `What '${letter.toUpperCase()}' is essential terminology for this lesson?`,
    acceptableAnswers: [word.toLowerCase(), `${word.toLowerCase()}s`],
    difficulty: 'medium',
    bloomsLevel: 'Understand',
  };
};

export const reRollSingleTile = async (
  tile: HexTile,
  lessonTitle: string,
  chunks: LessonChunk[] = []
): Promise<GridlockQuestion> => {
  // Extract vocabulary candidate from lesson chunks matching the letter or pick highest relevance term
  const matchedChunk = chunks.find((c) =>
    (c.title + ' ' + c.learningIntent + ' ' + c.coreExplanation).toLowerCase().includes(tile.letter.toLowerCase())
  ) || chunks[0];

  const candidateWord = matchedChunk?.title?.split(' ')[0] || `${tile.letter.toUpperCase()} Factor`;

  return {
    id: `q-${tile.letter.toLowerCase()}-${Date.now()}`,
    letter: tile.letter.toUpperCase(),
    targetAnswer: candidateWord,
    prompt: `What '${tile.letter.toUpperCase()}' is defined in ${matchedChunk?.title || lessonTitle}?`,
    backupPrompt: `Think about ${matchedChunk?.learningIntent || lessonTitle}. What '${tile.letter.toUpperCase()}' applies here?`,
    acceptableAnswers: [candidateWord.toLowerCase(), `${candidateWord.toLowerCase()}s`],
    difficulty: 'medium',
    bloomsLevel: 'Apply',
    chunkTitle: matchedChunk?.title,
  };
};

export const swapTilePositions = (tiles: HexTile[][], r1: number, c1: number, r2: number, c2: number): HexTile[][] => {
  const newGrid = tiles.map((row) => row.map((tile) => ({ ...tile })));
  const temp = newGrid[r1][c1];
  newGrid[r1][c1] = { ...newGrid[r2][c2], row: r1, col: c1 };
  newGrid[r2][c2] = { ...temp, row: r2, col: c2 };
  return newGrid;
};

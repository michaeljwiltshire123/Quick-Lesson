import { TeamColor } from '../types/gridlockTypes';

export interface WinningPathResult {
  hasWon: boolean;
  winningTeam: TeamColor | null;
  pathTileIds: string[];
}

export function getHexNeighbors(row: number, col: number, maxRows = 5, maxCols = 5): { r: number; c: number }[] {
  const isOdd = row % 2 !== 0;
  const offsets = isOdd
    ? [
        { r: -1, c: 0 },
        { r: -1, c: 1 },
        { r: 0, c: -1 },
        { r: 0, c: 1 },
        { r: 1, c: 0 },
        { r: 1, c: 1 },
      ]
    : [
        { r: -1, c: -1 },
        { r: -1, c: 0 },
        { r: 0, c: -1 },
        { r: 0, c: 1 },
        { r: 1, c: -1 },
        { r: 1, c: 0 },
      ];

  return offsets
    .map((o) => ({ r: row + o.r, c: col + o.c }))
    .filter((p) => p.r >= 0 && p.r < maxRows && p.c >= 0 && p.c < maxCols);
}

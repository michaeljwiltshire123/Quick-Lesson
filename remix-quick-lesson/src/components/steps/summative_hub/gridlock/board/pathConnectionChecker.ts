import { HexTile } from '../types/gridlockTypes';
import { getHexNeighbors, WinningPathResult } from './hexNeighborFinder';

export { getHexNeighbors, type WinningPathResult };

export function checkRedLeftToRightWin(grid: HexTile[][]): WinningPathResult {
  const numRows = grid.length;
  const numCols = grid[0]?.length || 0;
  const visited = new Set<string>();
  const parentMap = new Map<string, string | null>();
  const queue: { r: number; c: number }[] = [];

  for (let r = 0; r < numRows; r++) {
    if (grid[r][0]?.owner === 'red') {
      const id = grid[r][0].id;
      visited.add(id);
      parentMap.set(id, null);
      queue.push({ r, c: 0 });
    }
  }

  let endTileId: string | null = null;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const currTile = grid[curr.r][curr.c];
    if (curr.c === numCols - 1) { endTileId = currTile.id; break; }

    for (const n of getHexNeighbors(curr.r, curr.c, numRows, numCols)) {
      const neighbor = grid[n.r][n.c];
      if (neighbor && neighbor.owner === 'red' && !visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        parentMap.set(neighbor.id, currTile.id);
        queue.push(n);
      }
    }
  }

  if (!endTileId) return { hasWon: false, winningTeam: null, pathTileIds: [] };
  const path: string[] = [];
  let curr: string | null = endTileId;
  while (curr) { path.push(curr); curr = parentMap.get(curr) || null; }
  return { hasWon: true, winningTeam: 'red', pathTileIds: path.reverse() };
}

export function checkBlueTopToBottomWin(grid: HexTile[][]): WinningPathResult {
  const numRows = grid.length;
  const numCols = grid[0]?.length || 0;
  const visited = new Set<string>();
  const parentMap = new Map<string, string | null>();
  const queue: { r: number; c: number }[] = [];

  for (let c = 0; c < numCols; c++) {
    if (grid[0][c]?.owner === 'blue') {
      const id = grid[0][c].id;
      visited.add(id);
      parentMap.set(id, null);
      queue.push({ r: 0, c });
    }
  }

  let endTileId: string | null = null;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const currTile = grid[curr.r][curr.c];
    if (curr.r === numRows - 1) { endTileId = currTile.id; break; }

    for (const n of getHexNeighbors(curr.r, curr.c, numRows, numCols)) {
      const neighbor = grid[n.r][n.c];
      if (neighbor && neighbor.owner === 'blue' && !visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        parentMap.set(neighbor.id, currTile.id);
        queue.push(n);
      }
    }
  }

  if (!endTileId) return { hasWon: false, winningTeam: null, pathTileIds: [] };
  const path: string[] = [];
  let curr: string | null = endTileId;
  while (curr) { path.push(curr); curr = parentMap.get(curr) || null; }
  return { hasWon: true, winningTeam: 'blue', pathTileIds: path.reverse() };
}

export interface GridTileItem {
  id: number;
  row: number;
  col: number;
  delay: number;
}

export function generateGridTiles(rows = 4, cols = 6, totalDuration = 1.4): GridTileItem[] {
  const tiles: GridTileItem[] = [];
  const maxDiagonal = (rows - 1) + (cols - 1);
  const maxDelay = totalDuration * 0.38;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const diagonal = r + c;
      const delay = (diagonal / maxDiagonal) * maxDelay;
      tiles.push({
        id: r * cols + c,
        row: r,
        col: c,
        delay,
      });
    }
  }
  return tiles;
}

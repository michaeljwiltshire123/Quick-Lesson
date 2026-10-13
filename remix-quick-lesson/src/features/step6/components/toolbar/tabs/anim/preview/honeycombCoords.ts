export interface HexCell {
  id: string;
  cx: number;
  cy: number;
  points: string;
  innerPoints: string;
  delay: number;
}

export function generateHoneycombCells(totalDuration: number): HexCell[] {
  const cells: HexCell[] = [];
  const R = 44;
  const dx = R * Math.sqrt(3);
  const dy = R * 1.5;
  const rInner = R * 0.65;

  for (let row = -1; row <= 6; row++) {
    const y = row * dy + 30;
    const xOffset = (row % 2 !== 0) ? dx / 2 : 0;

    for (let col = -1; col <= 10; col++) {
      const x = col * dx + xOffset;
      const dist = Math.hypot(x - 400, y - 225);
      const delay = Math.min((dist / 420) * (totalDuration * 0.5), totalDuration * 0.55);

      const pts = [0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return `${(x + R * Math.sin(rad)).toFixed(1)},${(y - R * Math.cos(rad)).toFixed(1)}`;
      }).join(' ');

      const inPts = [0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return `${(x + rInner * Math.sin(rad)).toFixed(1)},${(y - rInner * Math.cos(rad)).toFixed(1)}`;
      }).join(' ');

      cells.push({
        id: `hex-${row}-${col}`,
        cx: Math.round(x),
        cy: Math.round(y),
        points: pts,
        innerPoints: inPts,
        delay: parseFloat(delay.toFixed(3)),
      });
    }
  }
  return cells;
}

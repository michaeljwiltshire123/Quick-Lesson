import React from 'react';
import { HexTile, TeamColor } from '../types/gridlockTypes';
import { getHexNeighbors } from './pathConnectionChecker';

interface Props {
  grid: HexTile[][];
}

interface Point {
  x: number; y: number;
}

export const TerritoryHeatmapOverlay: React.FC<Props> = ({ grid }) => {
  const numRows = grid.length;
  const numCols = grid[0]?.length || 0;

  const getCenter = (row: number, col: number): Point => {
    const isOdd = row % 2 !== 0;
    const x = col * 90 + (isOdd ? 45 : 0) + 45;
    const y = row * 78 + 45;
    return { x, y };
  };

  const lines: { x1: number; y1: number; x2: number; y2: number; team: TeamColor }[] = [];
  const processed = new Set<string>();

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const tile = grid[r][c];
      if (tile?.owner === 'red' || tile?.owner === 'blue') {
        const team = tile.owner as TeamColor;
        const neighbors = getHexNeighbors(r, c, numRows, numCols);

        for (const n of neighbors) {
          const neighborTile = grid[n.r][n.c];
          if (neighborTile?.owner === team) {
            const pairKey = [tile.id, neighborTile.id].sort().join('-');
            if (!processed.has(pairKey)) {
              processed.add(pairKey);
              const p1 = getCenter(r, c);
              const p2 = getCenter(n.r, n.c);
              lines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, team });
            }
          }
        }
      }
    }
  }

  if (lines.length === 0) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
      <style>{`
        @keyframes territoryDash { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
      `}</style>
      {lines.map((l, idx) => (
        <React.Fragment key={`lines-group-${idx}`}>
          {/* Volumetric Under-glow line */}
          <line
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.team === 'red' ? '#EF4444' : '#3B82F6'}
            strokeWidth="14"
            strokeLinecap="round"
            className="opacity-30 filter blur-[4px]"
          />
          {/* Crawling Electric Laser Core */}
          <line
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.team === 'red' ? '#FCA5A5' : '#93C5FD'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="8 6"
            style={{ animation: 'territoryDash 1.2s linear infinite' }}
            className="opacity-95"
          />
        </React.Fragment>
      ))}
    </svg>
  );
};

import React from 'react';
import { HexTile } from '../types/gridlockTypes';
import { HexTileNode } from './HexTileNode';
import { TerritoryHeatmapOverlay } from './TerritoryHeatmapOverlay';
import { GridlockBoundaryWalls } from './GridlockBoundaryWalls';

interface Props {
  grid: HexTile[][];
  activeTileId: string | null;
  winningPathIds: string[];
  onTileClick?: (tile: HexTile) => void;
}

export const HexGridContainer: React.FC<Props> = ({
  grid,
  activeTileId,
  winningPathIds,
  onTileClick,
}) => {
  return (
    <div className="relative p-8 sm:p-10 pt-10 pb-10 bg-slate-950 rounded-3xl border-4 border-slate-700 shadow-2xl flex flex-col items-center justify-center overflow-x-auto min-w-[360px]">
      {/* 4-Sided Red and Blue Boundary Walls */}
      <GridlockBoundaryWalls />

      <div className="relative flex flex-col items-center justify-center py-2 z-0 my-1">
        <TerritoryHeatmapOverlay grid={grid} />

        {grid.map((row, rIdx) => {
          const isOdd = rIdx % 2 !== 0;
          return (
            <div
              key={`row-${rIdx}`}
              className={`flex items-center gap-2 sm:gap-3 transition-transform duration-300 ${
                isOdd ? 'translate-x-8 sm:translate-x-10 md:translate-x-12' : ''
              }`}
              style={{ marginTop: rIdx === 0 ? '0' : '-16px' }}
            >
              {row.map((tile) => (
                <HexTileNode
                  key={tile.id}
                  tile={tile}
                  isSelected={activeTileId === tile.id}
                  isInWinningPath={winningPathIds.includes(tile.id)}
                  onClick={() => onTileClick?.(tile)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

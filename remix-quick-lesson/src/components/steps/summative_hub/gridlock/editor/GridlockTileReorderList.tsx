import React, { useState } from 'react';
import { HexTile } from '../types/gridlockTypes';
import { ArrowLeftRight, Layers } from 'lucide-react';
import { swapTilePositions } from '../services/gridlockTileService';

interface Props {
  grid: HexTile[][];
  onGridChange: (newGrid: HexTile[][]) => void;
  onSelectTileToEdit: (tile: HexTile) => void;
}

export const GridlockTileReorderList: React.FC<Props> = ({ grid, onGridChange, onSelectTileToEdit }) => {
  const [selectedCoord, setSelectedCoord] = useState<{ r: number; c: number } | null>(null);
  const flattened = (grid || []).flatMap((row) => row || []);

  const handleTileClick = (tile: HexTile) => {
    if (!selectedCoord) {
      setSelectedCoord({ r: tile.row, c: tile.col });
      return;
    }
    if (selectedCoord.r === tile.row && selectedCoord.c === tile.col) {
      setSelectedCoord(null);
      return;
    }
    const updated = swapTilePositions(grid, selectedCoord.r, selectedCoord.c, tile.row, tile.col);
    onGridChange(updated);
    setSelectedCoord(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black uppercase text-[#2D2A26] tracking-wider">
            Hex Position Reorder Deck (5x5 Grid)
          </h4>
        </div>
        <span className="text-[11px] text-gray-500 font-medium">
          {selectedCoord ? 'Click target hex to swap positions' : 'Click a hex, then click another to swap'}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {flattened.map((tile) => {
          const isSelected = selectedCoord?.r === tile.row && selectedCoord?.c === tile.col;
          const displayLabel = (tile?.activeQuestion?.targetAnswer || tile?.letter || 'Hex').slice(0, 7);
          return (
            <button
              key={`reorder-${tile.id}-${tile.row}-${tile.col}`}
              type="button"
              onClick={() => handleTileClick(tile)}
              onDoubleClick={() => onSelectTileToEdit(tile)}
              title={`${tile.letter}: ${tile.activeQuestion?.targetAnswer || ''} (Double-click to edit)`}
              className={`p-2 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300 scale-105'
                  : 'bg-[#FAF8F5] text-[#2D2A26] border-[#2D2A26]/15 hover:bg-amber-50'
              }`}
            >
              <span className="text-sm font-mono font-black">{tile.letter}</span>
              <span className="text-[9px] font-bold truncate max-w-full text-gray-500">
                {displayLabel}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCoord && (
        <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center justify-between">
          <span className="font-bold flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Swapping Hex at Row {selectedCoord.r + 1}, Col {selectedCoord.c + 1}
          </span>
          <button type="button" onClick={() => setSelectedCoord(null)} className="underline cursor-pointer">Cancel</button>
        </div>
      )}
    </div>
  );
};

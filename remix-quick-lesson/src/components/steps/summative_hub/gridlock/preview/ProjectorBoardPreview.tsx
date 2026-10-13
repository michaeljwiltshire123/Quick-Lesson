import React from 'react';
import { HexTile, TournamentScore } from '../types/gridlockTypes';
import { HexGridContainer } from '../board/HexGridContainer';
import { Edit3, Sparkles } from 'lucide-react';
import { GridlockVoiceReader } from '../helpers/GridlockVoiceReader';

interface Props {
  grid: HexTile[][];
  activeTile: HexTile | null;
  scores: TournamentScore;
  winningPathIds?: string[];
  onSelectTile: (tile: HexTile) => void;
  onEditTile?: (tile: HexTile) => void;
}

export const ProjectorBoardPreview: React.FC<Props> = ({
  grid,
  activeTile,
  scores,
  winningPathIds = [],
  onSelectTile,
  onEditTile,
}) => {
  return (
    <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl p-4 sm:p-5 text-white space-y-3 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider">
            Red Squad ({scores.redWins})
          </span>
          <span className="text-xs font-mono text-gray-400 font-bold">vs</span>
          <span className="px-3 py-1 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider">
            Blue Squad ({scores.blueWins})
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
          Match {scores.currentMatch} • {scores.format}
        </span>
      </div>

      {activeTile ? (
        <div className="bg-black/60 border border-amber-400/40 p-3.5 rounded-2xl flex items-start justify-between gap-3 shadow-inner">
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Clue for Hexagon '{activeTile.letter}'
            </div>
            <div className="text-xs sm:text-sm font-black text-white leading-snug">
              {activeTile.activeQuestion?.prompt || `Keyword starting with ${activeTile.letter}`}
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <GridlockVoiceReader textToRead={activeTile.activeQuestion?.prompt || activeTile.letter} size="sm" />
            {onEditTile && (
              <button
                type="button"
                onClick={() => onEditTile(activeTile)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-white/10"
                title="Edit this tile"
              >
                <Edit3 className="w-3.5 h-3.5" /> <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-black/40 border border-white/10 rounded-2xl text-center text-xs text-gray-400 font-bold">
          Click any hexagon on the board below to challenge!
        </div>
      )}

      <div className="w-full flex items-center justify-center pt-1 pb-2">
        <HexGridContainer grid={grid} activeTileId={activeTile?.id || null} winningPathIds={winningPathIds} onTileClick={onSelectTile} />
      </div>
    </div>
  );
};

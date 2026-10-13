import React from 'react';
import { HexTile, TeamColor } from '../types/gridlockTypes';
import { Compass, Sparkles } from 'lucide-react';
import { PhoneMiniHexNode } from './PhoneMiniHexNode';

interface Props {
  grid: HexTile[][];
  choosingTeam: TeamColor;
  isUserTeamTurn: boolean;
  onSelectTile: (tile: HexTile) => void;
}

export const PhoneMiniBoardPicker: React.FC<Props> = ({
  grid,
  choosingTeam,
  isUserTeamTurn,
  onSelectTile,
}) => {
  const isRed = choosingTeam === 'red';

  return (
    <div className="space-y-2.5">
      <div
        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
          isRed ? 'bg-red-500/20 border-red-500/30 text-red-200' : 'bg-blue-500/20 border-blue-500/30 text-blue-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Compass className={`w-4 h-4 ${isRed ? 'text-red-400' : 'text-blue-400'}`} />
          <span className="font-bold">
            {isUserTeamTurn
              ? `Your Team's Turn! Choose a Hexagon:`
              : `Awaiting ${isRed ? 'Red' : 'Blue'} Team Selection...`}
          </span>
        </div>
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      </div>

      {/* Realistic Honeycomb Arena Mini-Board Container */}
      <div className="relative p-4 sm:p-5 pt-5 pb-5 bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-inner flex flex-col items-center justify-center overflow-x-auto">
        {/* Top/Bottom Blue Boundaries */}
        <div className="absolute top-1 inset-x-4 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 rounded-full shadow-xs shadow-blue-400/50" />
        <div className="absolute bottom-1 inset-x-4 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 rounded-full shadow-xs shadow-blue-400/50" />
        {/* Left/Right Red Boundaries */}
        <div className="absolute left-1 inset-y-4 w-1 bg-gradient-to-b from-red-500 via-rose-400 to-red-500 rounded-full shadow-xs shadow-red-400/50" />
        <div className="absolute right-1 inset-y-4 w-1 bg-gradient-to-b from-red-500 via-rose-400 to-red-500 rounded-full shadow-xs shadow-red-400/50" />

        <div className="flex flex-col items-center justify-center py-1 z-10">
          {grid.map((row, rIdx) => {
            const isOdd = rIdx % 2 !== 0;
            return (
              <div
                key={`mini-hex-row-${rIdx}`}
                className={`flex items-center gap-1 sm:gap-1.5 transition-transform duration-200 ${
                  isOdd ? 'translate-x-5 sm:translate-x-6' : ''
                }`}
                style={{ marginTop: rIdx === 0 ? '0' : '-8px' }}
              >
                {row.map((tile) => (
                  <PhoneMiniHexNode
                    key={tile.id}
                    tile={tile}
                    isInteractable={isUserTeamTurn}
                    onSelect={onSelectTile}
                  />
                ))}
              </div>
            );
          })}
        </div>

        <div className="text-[9px] font-mono uppercase text-gray-400 tracking-widest pt-2">
          {isUserTeamTurn ? 'Tap an unclaimed hexagon' : 'Synchronised battlefield view'}
        </div>
      </div>
    </div>
  );
};

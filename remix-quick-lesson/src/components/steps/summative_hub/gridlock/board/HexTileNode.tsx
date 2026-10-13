import React from 'react';
import { HexTile } from '../types/gridlockTypes';
import { Sparkles } from 'lucide-react';

interface Props {
  tile: HexTile;
  isSelected?: boolean;
  isInWinningPath?: boolean;
  onClick?: () => void;
}

export const HexTileNode: React.FC<Props> = ({ tile, isSelected, isInWinningPath, onClick }) => {
  const isRed = tile.owner === 'red';
  const isBlue = tile.owner === 'blue';
  const isClaimed = isRed || isBlue;

  let bgClasses = 'bg-white/90 text-[#2D2A26] border-slate-300 hover:border-amber-400';
  if (isRed) {
    bgClasses = 'bg-red-600 text-white border-red-700 shadow-md';
  } else if (isBlue) {
    bgClasses = 'bg-blue-600 text-white border-blue-700 shadow-md';
  }

  if (tile.isGold && !isClaimed) {
    bgClasses = 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-amber-950 border-amber-600 shadow-lg';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-16 h-18 sm:w-20 sm:h-22 md:w-24 md:h-26 flex flex-col items-center justify-center transition-all duration-500 transform cursor-pointer group focus:outline-hidden ${
        isSelected
          ? 'scale-110 z-20 ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-950 shadow-[0_0_28px_rgba(251,191,36,0.9)] animate-pulse'
          : 'hover:scale-105 z-10'
      } ${isInWinningPath ? 'animate-pulse ring-4 ring-emerald-400' : ''}`}
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      }}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-1 border-2 transition-colors duration-300 ${
          isSelected && !isClaimed
            ? 'bg-amber-100/95 text-amber-950 border-amber-400 ring-2 ring-amber-300 shadow-inner'
            : bgClasses
        }`}
      >
        {tile.isGold && !isClaimed && (
          <Sparkles className="w-3.5 h-3.5 text-amber-900 absolute top-2 animate-bounce" />
        )}

        <span
          className={`text-xl sm:text-2xl md:text-3xl font-black tracking-wider uppercase font-mono drop-shadow-xs ${
            isSelected && !isClaimed ? 'text-amber-950 scale-105 transition-transform' : ''
          }`}
        >
          {tile.letter}
        </span>

        {isSelected && !isClaimed && (
          <span className="text-[7px] font-black uppercase tracking-widest text-amber-900 bg-amber-300/80 px-1 py-0.2 rounded-xs animate-pulse">
            ACTIVE
          </span>
        )}

        {tile.isGold && !isClaimed && !isSelected && (
          <span className="text-[8px] font-black tracking-widest uppercase text-amber-900 mt-0.5">2x GOLD</span>
        )}

        {isClaimed && (
          <span className="text-[9px] font-bold uppercase tracking-wider opacity-90 mt-0.5">
            {isRed ? 'RED' : 'BLUE'}
          </span>
        )}
      </div>
    </button>
  );
};

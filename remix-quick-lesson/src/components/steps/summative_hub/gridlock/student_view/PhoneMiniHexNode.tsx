import React from 'react';
import { HexTile } from '../types/gridlockTypes';
import { Sparkles } from 'lucide-react';

interface Props {
  tile: HexTile;
  isInteractable: boolean;
  onSelect: (tile: HexTile) => void;
}

export const PhoneMiniHexNode: React.FC<Props> = ({ tile, isInteractable, onSelect }) => {
  const isRed = tile.owner === 'red';
  const isBlue = tile.owner === 'blue';
  const isClaimed = isRed || isBlue;
  const isUnclaimed = !isClaimed;
  const canClick = isUnclaimed && isInteractable;

  let bgStyles = 'bg-white/90 text-[#2D2A26] border-slate-300';
  if (isRed) {
    bgStyles = 'bg-red-600 text-white border-red-700 shadow-xs';
  } else if (isBlue) {
    bgStyles = 'bg-blue-600 text-white border-blue-700 shadow-xs';
  } else if (tile.isGold) {
    bgStyles = 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-amber-950 font-black border-amber-600 shadow-xs';
  }

  return (
    <button
      type="button"
      disabled={!canClick}
      onClick={() => canClick && onSelect(tile)}
      title={`Hexagon ${tile.letter}${tile.isGold ? ' (2x Gold)' : ''}`}
      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
      className={`relative w-10 h-11 sm:w-12 sm:h-13 flex flex-col items-center justify-center transition-all duration-200 transform select-none ${
        canClick
          ? 'cursor-pointer hover:scale-115 hover:z-20 active:scale-95 focus:outline-hidden hover:ring-2 hover:ring-amber-400 ring-offset-1 ring-offset-slate-900'
          : 'cursor-not-allowed opacity-95'
      }`}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-0.5 border ${
          canClick ? 'hover:bg-amber-100 hover:text-amber-950' : ''
        } ${bgStyles}`}
      >
        {tile.isGold && isUnclaimed && (
          <Sparkles className="w-2.5 h-2.5 text-amber-900 absolute top-1 animate-bounce" />
        )}
        <span className="font-mono font-black text-xs sm:text-sm tracking-wider uppercase drop-shadow-xs">
          {tile.letter}
        </span>
        {tile.isGold && isUnclaimed && (
          <span className="text-[6px] font-black tracking-tighter text-amber-950 leading-none">2X</span>
        )}
      </div>
    </button>
  );
};

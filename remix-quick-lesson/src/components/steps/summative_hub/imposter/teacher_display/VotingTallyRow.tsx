import React from 'react';
import { Player } from '../types/imposterTypes';

interface Props {
  player: Player;
  votes: number;
  isHighest: boolean;
}

export const VotingTallyRow: React.FC<Props> = ({ player, votes, isHighest }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
        isHighest ? 'bg-amber-50/80 border-amber-300' : 'bg-[#F8F6F0] border-[#2D2A26]/10'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-bold text-xs">
          {player.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-xs font-bold text-[#2D2A26]">{player.name}</p>
          <p className="text-[10px] text-[#2D2A26]/60">{votes} {votes === 1 ? 'vote cast' : 'votes cast'}</p>
        </div>
      </div>
      <span className={`text-base font-black font-mono px-3 py-1 rounded-lg ${isHighest ? 'bg-amber-200 text-amber-950' : 'bg-white text-[#2D2A26]'}`}>
        {votes}
      </span>
    </div>
  );
};

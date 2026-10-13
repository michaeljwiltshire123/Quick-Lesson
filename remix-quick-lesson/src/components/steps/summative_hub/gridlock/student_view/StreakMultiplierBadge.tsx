import React from 'react';
import { Flame, Zap } from 'lucide-react';

interface Props {
  streak: number;
  multiplier?: number;
}

export const StreakMultiplierBadge: React.FC<Props> = ({ streak, multiplier }) => {
  if (streak <= 1) return null;

  const currentMultiplier = multiplier || (streak >= 4 ? 3 : streak >= 2 ? 2 : 1);

  return (
    <div className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-[10px] font-black flex items-center gap-1 shadow-sm border border-amber-300/40 animate-bounce">
      <Flame className="w-3 h-3 fill-white text-orange-200" />
      <span>{streak}x Streak</span>
      <span className="bg-black/30 px-1 py-0.2 rounded text-[9px] font-mono flex items-center gap-0.5">
        <Zap className="w-2.5 h-2.5 text-yellow-300" />
        {currentMultiplier}x PTS
      </span>
    </div>
  );
};

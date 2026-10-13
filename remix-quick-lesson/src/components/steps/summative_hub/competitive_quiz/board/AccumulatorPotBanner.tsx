import React from 'react';
import { Coins, Sparkles, TrendingUp } from 'lucide-react';
import { BackgroundPatternId } from './SecretPatternRenderer';

interface Props {
  potValue: number;
  accumulatedPot?: number;
  patternId?: BackgroundPatternId;
}

export const AccumulatorPotBanner: React.FC<Props> = ({
  potValue,
  accumulatedPot = 1200,
}) => {
  return (
    <div className="relative z-10 px-4 py-2.5 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md shadow-lg flex items-center justify-between gap-3 text-white">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
          <Coins className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Arena Accumulator Pot
            </span>
            <span className="text-[10px] text-gray-400 font-mono flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              (+{potValue} pts this question)
            </span>
          </div>
          <div className="text-xl font-black font-mono tracking-tight text-amber-300">
            {accumulatedPot.toLocaleString()} pts
          </div>
        </div>
      </div>

      <div className="text-right">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
          Prize Vault
        </span>
        <span className="text-xs font-mono text-gray-300">
          Grows Every Round
        </span>
      </div>
    </div>
  );
};

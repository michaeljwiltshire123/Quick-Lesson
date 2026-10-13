import React from 'react';
import { Zap, Clock } from 'lucide-react';

interface Props {
  energyPoints: number;
  timeRemaining?: number;
}

export const ImposterEnergyBar: React.FC<Props> = ({ energyPoints, timeRemaining }) => {
  return (
    <div className="flex items-center justify-between bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-white/10 text-white">
      <div className="flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
        <span className="text-[11px] font-black uppercase text-amber-300">Attack Energy:</span>
        <span className="text-xs font-mono font-black text-rose-300 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-500/30">
          {energyPoints} pts
        </span>
      </div>

      {typeof timeRemaining === 'number' && (
        <div className="flex items-center gap-1 text-[10px] text-white/60 font-mono">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Next Round in {timeRemaining}s</span>
        </div>
      )}
    </div>
  );
};

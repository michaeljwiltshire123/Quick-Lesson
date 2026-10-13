import React from 'react';
import { Trophy, Clock, Flame } from 'lucide-react';

interface Props {
  timeLeft: number;
  totalTime?: number;
  isPaused?: boolean;
}

export const DecayingScoreGauge: React.FC<Props> = ({
  timeLeft,
  totalTime = 60,
  isPaused = false,
}) => {
  const safeTotal = totalTime > 0 ? totalTime : 60;
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / safeTotal) * 100));
  const availablePoints = Math.max(100, Math.round(1000 * (timeLeft / safeTotal)));
  const isUrgent = timeLeft <= 15;

  return (
    <div className="relative bg-slate-950 text-white p-4 rounded-2xl border-2 border-orange-500/30 shadow-2xl space-y-2.5 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isUrgent ? (
            <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
          ) : (
            <Clock className={`w-4 h-4 ${isPaused ? 'text-yellow-400' : 'text-amber-400'}`} />
          )}
          <span className="text-xs font-black uppercase tracking-wider text-slate-300">
            {isPaused ? 'Timer Paused' : 'Molten-Mercury Score Decay'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-sm font-black text-amber-300 drop-shadow">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{availablePoints} pts</span>
          </div>
          <div className={`font-mono text-base font-black px-2.5 py-0.5 rounded-lg border ${
            isUrgent
              ? 'bg-red-600 text-white border-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]'
              : 'bg-slate-900 text-amber-300 border-amber-500/30'
          }`}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Molten-Mercury Decay Channel */}
      <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-1000 relative ${
            isPaused
              ? 'bg-yellow-400'
              : isUrgent
              ? 'bg-gradient-to-r from-orange-600 via-red-500 to-amber-300 shadow-[0_0_12px_rgba(249,115,22,0.9)]'
              : 'bg-gradient-to-r from-amber-600 via-orange-400 to-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
          }`}
          style={{ width: `${progressPercent}%` }}
        >
          {/* Molten Liquid Tip */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-80 animate-ping" />
        </div>
      </div>
    </div>
  );
};

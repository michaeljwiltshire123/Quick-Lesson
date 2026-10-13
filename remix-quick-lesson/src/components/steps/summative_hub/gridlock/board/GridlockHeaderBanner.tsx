import React from 'react';
import { TournamentScore } from '../types/gridlockTypes';
import { Trophy, Timer, Flame, Star } from 'lucide-react';

interface Props {
  scores: TournamentScore;
  roundTimerSeconds: number;
  redStreak: number;
  blueStreak: number;
  currentMvp?: string;
}

export const GridlockHeaderBanner: React.FC<Props> = ({
  scores,
  roundTimerSeconds,
  redStreak,
  blueStreak,
  currentMvp,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-[#2D2A26] text-white p-3 sm:p-4 rounded-2xl border border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-4">
      {/* Red Team Score & Streak */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-lg border-2 border-red-400 shadow-md">
          {scores.redWins}
        </div>
        <div>
          <div className="text-xs font-black text-red-400 uppercase tracking-wider">Red Team</div>
          <div className="flex items-center gap-1 text-[11px] text-gray-300">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak: {redStreak}</span>
          </div>
        </div>
      </div>

      {/* Match Status & Timer */}
      <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl border border-white/10">
        <div className="text-center">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1">
            <Trophy className="w-3 h-3 text-[#F59E0B]" /> Match {scores.currentMatch}
          </div>
          <div className="text-xs font-black text-amber-400 uppercase">{scores.format}</div>
        </div>
        <div className="h-6 w-px bg-white/20" />
        <div className="flex items-center gap-1.5 font-mono text-lg font-black text-white">
          <Timer className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{formatTime(roundTimerSeconds)}</span>
        </div>
      </div>

      {/* Blue Team Score & MVP */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-xs font-black text-blue-400 uppercase tracking-wider">Blue Team</div>
          <div className="flex items-center justify-end gap-1 text-[11px] text-gray-300">
            <Flame className="w-3.5 h-3.5 text-blue-400" />
            <span>Streak: {blueStreak}</span>
          </div>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg border-2 border-blue-400 shadow-md">
          {scores.blueWins}
        </div>
      </div>

      {/* MVP Ticker */}
      {currentMvp && (
        <div className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/40 py-1 px-3 rounded-lg border border-amber-500/30">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>MVP Lead: {currentMvp}</span>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Flag, Trophy, Flame, Sparkles } from 'lucide-react';
import { RaceRunner } from '../types/minigameTypes';

interface Props {
  racers: RaceRunner[];
  bettingCountdownSeconds?: number;
  winner?: RaceRunner;
  cheers?: string[];
  onFinish?: () => void;
}

export const AvatarRaceProjectorBoard: React.FC<Props> = ({
  racers,
  bettingCountdownSeconds,
  winner,
  cheers = [],
  onFinish,
}) => {
  return (
    <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 text-white space-y-3.5 shadow-2xl relative overflow-hidden">
      {/* Race Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-amber-400 animate-bounce" />
          <h3 className="text-sm font-black uppercase tracking-wider text-white">The Avatar Grand Prix</h3>
        </div>
        <div className="flex items-center gap-2">
          {cheers.slice(-4).map((c, i) => (
            <span key={i} className="text-lg animate-bounce">{c}</span>
          ))}
          {bettingCountdownSeconds && bettingCountdownSeconds > 0 ? (
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">Wagers: {bettingCountdownSeconds}s</span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-rose-500 text-white font-black text-xs">LIVE SPRINT</span>
          )}
        </div>
      </div>

      {/* Racetrack Lanes */}
      <div className="space-y-2.5 py-1">
        {racers.map((racer, idx) => (
          <div key={racer.id} className="relative bg-black/40 rounded-2xl p-2 border border-white/10 flex items-center">
            <div className="w-24 shrink-0 flex items-center gap-1.5 font-bold text-xs truncate">
              <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-mono">{idx + 1}</span>
              <span className="truncate">{racer.name}</span>
            </div>
            <div className="relative flex-1 h-7 bg-slate-800 rounded-xl overflow-hidden mx-2 border border-white/5">
              <div
                className="absolute top-0 bottom-0 left-0 transition-all duration-150 rounded-xl flex items-center justify-end pr-1.5"
                style={{ width: `${Math.max(8, racer.positionPercent)}%`, backgroundColor: racer.avatarColor }}
              >
                <span className="text-xs">🏃</span>
              </div>
            </div>
            <div className="w-8 shrink-0 text-right font-mono text-xs font-black text-amber-400">{racer.positionPercent}%</div>
          </div>
        ))}
      </div>

      {/* Winner Podium & Prize Split */}
      {winner && (
        <div className="p-3.5 bg-amber-400/20 border-2 border-amber-400 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            <div>
              <span className="text-[10px] font-black uppercase text-amber-300">Podium Prize Split (60% / 30% / 10%)</span>
              <h4 className="text-xs font-black text-white">{winner.name} takes 1st place!</h4>
            </div>
          </div>
          <button type="button" onClick={onFinish} className="px-3 py-1.5 bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase cursor-pointer">Distribute Pot</button>
        </div>
      )}
    </div>
  );
};

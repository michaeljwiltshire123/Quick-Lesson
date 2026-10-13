import React from 'react';
import { TournamentScore, TeamColor } from '../types/gridlockTypes';
import { Users, Zap, Trophy } from 'lucide-react';

interface Props {
  scores: TournamentScore;
  redAccuracy: number;
  blueAccuracy: number;
  activeBuzzerTeam?: TeamColor | null;
}

export const TeamScoreTracker: React.FC<Props> = ({
  scores,
  redAccuracy,
  blueAccuracy,
  activeBuzzerTeam,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Red Squad Tracker */}
      <div className={`p-3.5 rounded-2xl border transition-all ${
        activeBuzzerTeam === 'red'
          ? 'bg-red-950/80 border-red-500 ring-2 ring-red-400'
          : 'bg-red-950/40 border-red-800/40 text-red-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-red-400 flex items-center gap-1">
            <Users className="w-3 h-3" /> Red Squad (Left ➜ Right)
          </span>
          {activeBuzzerTeam === 'red' && (
            <span className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-black rounded uppercase animate-pulse flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 fill-current" /> Buzzed
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-2xl font-black text-white">{scores.redWins} <span className="text-xs font-normal text-red-300">wins</span></div>
          <div className="text-xs font-mono font-bold text-red-300">{Math.max(1, redAccuracy)}% acc</div>
        </div>
      </div>

      {/* Blue Squad Tracker */}
      <div className={`p-3.5 rounded-2xl border transition-all ${
        activeBuzzerTeam === 'blue'
          ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-400'
          : 'bg-blue-950/40 border-blue-800/40 text-blue-100'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 flex items-center gap-1">
            <Users className="w-3 h-3" /> Blue Squad (Top ⬇ Bottom)
          </span>
          {activeBuzzerTeam === 'blue' && (
            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded uppercase animate-pulse flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 fill-current" /> Buzzed
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-2xl font-black text-white">{scores.blueWins} <span className="text-xs font-normal text-blue-300">wins</span></div>
          <div className="text-xs font-mono font-bold text-blue-300">{Math.max(1, blueAccuracy)}% acc</div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Users, Clock, Flame, ShieldAlert } from 'lucide-react';

interface Props {
  roomCode: string;
  lessonTitle: string;
  currentRound: number;
  remainingSeconds: number;
  totalSeconds: number;
  aliveCount: number;
  totalCount: number;
  isVotingOpen?: boolean;
}

export const MainBoardOverlay: React.FC<Props> = ({
  roomCode,
  lessonTitle,
  currentRound,
  remainingSeconds,
  totalSeconds,
  aliveCount,
  totalCount,
  isVotingOpen = false,
}) => {
  // Math guard: ensure strictly non-zero denominators
  const safeTotal = Math.max(1, totalSeconds);
  const safeRemaining = Math.max(1, remainingSeconds);
  const progressPercent = Math.min(100, Math.max(5, (safeRemaining / safeTotal) * 100));

  return (
    <div id="imposter-main-board-overlay" className="bg-[#2D2A26] text-white rounded-3xl p-5 shadow-lg border border-[#2D2A26]/30 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
              Round {currentRound}
            </span>
            <span className="text-xs text-white/60 font-mono tracking-widest">
              ROOM: <strong className="text-white font-black">{roomCode}</strong>
            </span>
          </div>
          <h2 className="text-lg font-black tracking-tight">{lessonTitle || 'Classroom Inquiry'}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
            <Users className="w-4 h-4 text-amber-400" />
            <div className="text-right">
              <p className="text-[10px] text-white/60 uppercase font-semibold">Active Pupils</p>
              <p className="text-xs font-bold text-white">{aliveCount} of {totalCount} Active</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
            <Clock className={`w-4 h-4 ${safeRemaining <= 10 ? 'text-rose-400 animate-pulse' : 'text-sky-400'}`} />
            <div className="text-right">
              <p className="text-[10px] text-white/60 uppercase font-semibold">Phase Timer</p>
              <p className="text-xs font-mono font-black text-white">{safeRemaining}s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            safeRemaining <= 10 ? 'bg-rose-500' : isVotingOpen ? 'bg-purple-500' : 'bg-amber-500'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {isVotingOpen && (
        <div className="flex items-center justify-between text-xs bg-purple-950/60 border border-purple-500/30 rounded-xl px-3.5 py-2 text-purple-200">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            Class Deliberation & Anonymous Ballot Active
          </span>
          <span className="text-[11px] text-purple-300">Pupils casting votes on mobile devices</span>
        </div>
      )}
    </div>
  );
};

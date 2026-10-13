import React from 'react';
import { UserCheck, ShieldAlert, Smartphone, Play, Sparkles, Users } from 'lucide-react';

interface Props {
  nextGuesserName: string;
  activeTeamName: string;
  opposingTeamName: string;
  submittedCount?: number;
  totalOpposingPlayers?: number;
  onStartRound: () => void;
}

export const InterTurnSetupBoard: React.FC<Props> = ({
  nextGuesserName,
  activeTeamName,
  opposingTeamName,
  submittedCount = 3,
  totalOpposingPlayers = 4,
  onStartRound,
}) => {
  return (
    <div className="bg-slate-900 border-4 border-amber-400 rounded-3xl p-6 text-white space-y-4 shadow-2xl text-center max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
          Between-Rounds Setup Screen
        </span>
        <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Next Turn Ready
        </span>
      </div>

      <div className="p-4 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 rounded-2xl border border-amber-400/50 space-y-1">
        <div className="text-xs font-black uppercase tracking-widest text-amber-300 flex items-center justify-center gap-1.5">
          <UserCheck className="w-4 h-4 text-amber-400" /> Next Guesser (Stand Facing Away From Screen)
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{nextGuesserName}</h2>
        <span className="inline-block px-3 py-0.5 bg-amber-400 text-slate-950 rounded-full text-xs font-black uppercase">
          {activeTeamName}
        </span>
      </div>

      <div className="p-3 bg-rose-950/80 border-2 border-rose-500/60 rounded-2xl space-y-1.5 text-rose-100">
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase text-rose-300 tracking-wider">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Opposing Sabotage Status ({opposingTeamName})</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-900/90 rounded-full text-xs font-bold border border-rose-400/40 text-white">
          <Users className="w-3.5 h-3.5 text-rose-300" />
          <span>Forbidden Words Locked In: {submittedCount} / {totalOpposingPlayers} Players Ready</span>
        </div>
      </div>

      <div className="p-4 bg-emerald-950/90 border-2 border-emerald-400 rounded-2xl space-y-2 text-emerald-100">
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase text-emerald-300 tracking-wider">
          <Smartphone className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Waiting for Opposing Judge:</span>
        </div>
        <button
          type="button"
          onClick={onStartRound}
          className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all transform active:scale-95"
        >
          <Play className="w-5 h-5 fill-current text-slate-950" />
          <span>START THE GAME (60s ROUND)</span>
        </button>
      </div>
    </div>
  );
};

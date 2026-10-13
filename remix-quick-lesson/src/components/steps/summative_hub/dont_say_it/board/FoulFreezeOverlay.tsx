import React from 'react';
import { ShieldAlert, AlertOctagon, Scale, CheckCircle, XCircle } from 'lucide-react';
import { JudgeVoteState } from '../types/dontSayItTypes';

interface Props {
  judgeVote?: JudgeVoteState;
  onConfirmFoul: () => void;
  onDismissFoul: () => void;
}

export const FoulFreezeOverlay: React.FC<Props> = ({
  judgeVote,
  onConfirmFoul,
  onDismissFoul,
}) => {
  return (
    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center text-white space-y-5 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-16 h-16 rounded-3xl bg-red-600/30 border-2 border-red-500 text-red-400 flex items-center justify-center shadow-2xl animate-pulse">
        <AlertOctagon className="w-10 h-10" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">
          <ShieldAlert className="w-4 h-4" /> Foul Flagged by Opposing Judge
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          REPLAY REVIEW / JUDGES CONFERRING
        </h2>
        <p className="text-xs text-slate-300">
          The 60-second clock is paused. Did the clue giver say a forbidden word or use an illegal gesture?
        </p>
      </div>

      {judgeVote && (
        <div className="flex items-center gap-4 bg-slate-900/80 px-5 py-2.5 rounded-2xl border border-white/10 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Scale className="w-4 h-4" />
            <span>Judge Objections: {judgeVote.votesAgainst}/{judgeVote.totalJudges}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onConfirmFoul}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <XCircle className="w-4 h-4" />
          <span>Foul Upheld (-200 pts)</span>
        </button>

        <button
          type="button"
          onClick={onDismissFoul}
          className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer border border-white/10"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Play On (Resume Clock)</span>
        </button>
      </div>
    </div>
  );
};

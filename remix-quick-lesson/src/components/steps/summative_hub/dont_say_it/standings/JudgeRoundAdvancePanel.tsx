import React from 'react';
import { ArrowRight, Scale, CheckCircle2 } from 'lucide-react';
import { RoundResolution } from '../types/roundResolutionTypes';

interface Props {
  judgeName: string;
  resolution: RoundResolution;
  nextTeamName: string;
  nextGuesserName: string;
  onAdvanceToSetup: () => void;
}

export const JudgeRoundAdvancePanel: React.FC<Props> = ({
  judgeName,
  resolution,
  nextTeamName,
  nextGuesserName,
  onAdvanceToSetup,
}) => {
  return (
    <div className="bg-slate-900 text-white p-5 rounded-3xl border-2 border-amber-400/50 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">Official Scrutineer</div>
            <div className="text-sm font-black text-white">{judgeName}</div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          Standings Review
        </span>
      </div>

      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1.5 text-left">
        <div className="text-[10px] font-black uppercase text-amber-400">Turn Result Recorded</div>
        <div className="text-xs text-gray-200">
          {resolution.reason === 'word_guessed'
            ? `Word correctly identified! +${resolution.pointsEarned} pts added to ${resolution.teamName}.`
            : resolution.reason === 'time_expired'
            ? `Time expired. 0 pts for ${resolution.teamName}.`
            : `Foul confirmed. Turn forfeited.`}
        </div>
      </div>

      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-left space-y-1">
        <div className="text-[10px] font-black uppercase text-amber-300">Up Next</div>
        <div className="text-xs text-white">
          <span className="font-bold text-amber-400">{nextTeamName}</span> (Guesser: <span className="font-bold">{nextGuesserName}</span>)
        </div>
      </div>

      <button
        type="button"
        onClick={onAdvanceToSetup}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95"
      >
        <span>Advance to Next Round Setup</span>
        <ArrowRight className="w-4 h-4 text-slate-950" />
      </button>
    </div>
  );
};

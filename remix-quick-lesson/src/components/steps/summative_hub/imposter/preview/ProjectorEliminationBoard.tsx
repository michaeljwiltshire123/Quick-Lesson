import React from 'react';
import { Award, Zap, Skull, ShieldCheck } from 'lucide-react';

interface Props {
  votedOutName?: string;
  isVotedImposter?: boolean;
  secretKilledName?: string;
  ghostMasterName?: string;
}

export const ProjectorEliminationBoard: React.FC<Props> = ({
  votedOutName = 'Amelia',
  isVotedImposter = true,
  secretKilledName = 'Oliver',
  ghostMasterName = 'Oliver',
}) => {
  return (
    <div className="space-y-3 py-1 text-center">
      {ghostMasterName && (
        <div className="p-3 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-400/50 rounded-2xl animate-pulse space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-300">
            <Award className="w-4 h-4 text-amber-300" /> Ghost Writing Master Accolade
          </div>
          <p className="text-xs text-white">
            Awarded to <strong className="text-amber-300">{ghostMasterName}</strong> for authoring high-quality decoy questions!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-rose-500/40 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
            Classroom Vote Result
          </span>
          <p className="text-sm font-black text-white">{votedOutName}</p>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300">
            {isVotedImposter ? <Skull className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            {isVotedImposter ? 'WAS AN IMPOSTER!' : 'WAS AN HONEST PLAYER'}
          </div>
        </div>

        {secretKilledName && (
          <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-rose-500/40 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
              Secret Imposter Kill
            </span>
            <p className="text-sm font-black text-white">{secretKilledName}</p>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300">
              <Zap className="w-3.5 h-3.5" /> ELIMINATED BY IMPOSTER
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

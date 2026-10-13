import React from 'react';
import { ArrowLeft, EyeOff, ShieldCheck } from 'lucide-react';

interface Props {
  energyPoints: number;
  cost: number;
  isArmed: boolean;
  onArmShadowVote: () => void;
  onBack: () => void;
}

export const ShadowVoteConfirmView: React.FC<Props> = ({
  energyPoints,
  cost,
  isArmed,
  onArmShadowVote,
  onBack,
}) => {
  const canAfford = energyPoints >= cost;

  return (
    <div className="space-y-2 text-white">
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <span className="text-[11px] font-black uppercase text-amber-300 flex items-center gap-1">
          <EyeOff className="w-3 h-3 text-purple-400" /> Shadow Vote ({cost} pts)
        </span>
      </div>

      <p className="text-[10px] text-white/70 leading-tight">
        Conceals all live vote counters on the main classroom board during the voting phase to prevent herd voting.
      </p>

      {isArmed ? (
        <div className="p-2.5 bg-purple-950/70 border border-purple-400/40 rounded-xl space-y-1 text-center">
          <div className="flex items-center justify-center gap-1 text-xs font-bold text-purple-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Shadow Vote Armed for Next Vote
          </div>
          <p className="text-[10px] text-white/70">
            Main display will show &ldquo;Closed Ballot Voting&rdquo; with counts hidden.
          </p>
        </div>
      ) : (
        <div className="p-2 bg-slate-950 rounded-xl border border-white/10 text-[10px] text-white/60">
          Main board will display &ldquo;Closed Ballot Voting&rdquo; instead of live numbers for the upcoming vote only.
        </div>
      )}

      <button
        type="button"
        disabled={!canAfford || isArmed}
        onClick={onArmShadowVote}
        className="w-full py-2 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs"
      >
        <EyeOff className="w-3.5 h-3.5" />
        <span>{isArmed ? 'Already Armed' : `Arm Shadow Vote (-${cost} pts)`}</span>
      </button>
    </div>
  );
};

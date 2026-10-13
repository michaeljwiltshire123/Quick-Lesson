import React from 'react';
import { ArrowLeft, Clock, Zap, Lightbulb } from 'lucide-react';

interface Props {
  energyPoints: number;
  cost: number;
  sneakPeekClue: string | null;
  onTriggerTimedPanic: () => void;
  onBack: () => void;
}

export const TimedPanicConfirmView: React.FC<Props> = ({
  energyPoints,
  cost,
  sneakPeekClue,
  onTriggerTimedPanic,
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
          <Clock className="w-3 h-3 text-rose-400" /> Timed Panic ({cost} pts)
        </span>
      </div>

      <p className="text-[10px] text-white/70 leading-tight">
        Halves the round timer for all pupils to create immediate urgency, and unlocks a secret topic clue for you.
      </p>

      {sneakPeekClue ? (
        <div className="p-2.5 bg-amber-950/70 border border-amber-500/40 rounded-xl space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300">
            <Lightbulb className="w-3 h-3" /> Exclusive Sneak-Peek Clue Unlocked:
          </div>
          <p className="text-xs font-semibold text-white">&ldquo;{sneakPeekClue}&rdquo;</p>
        </div>
      ) : (
        <div className="p-2 bg-slate-950 rounded-xl border border-white/10 text-[10px] text-white/60">
          Activating this attack will immediately cut the classroom timer in half and display the key technical term clue here.
        </div>
      )}

      <button
        type="button"
        disabled={!canAfford}
        onClick={onTriggerTimedPanic}
        className="w-full py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-xs"
      >
        <Zap className="w-3.5 h-3.5 fill-current" />
        <span>Trigger Timed Panic (-{cost} pts)</span>
      </button>
    </div>
  );
};

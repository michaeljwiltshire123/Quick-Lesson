import React, { useState } from 'react';
import { Check, X, Skull, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  isAlive: boolean;
  speedLimitSeconds: number;
  onAnswer: (choice: boolean) => void;
  hasAnswered: boolean;
}

export const BinaryBlitzPupilController: React.FC<Props> = ({
  isAlive,
  speedLimitSeconds,
  onAnswer,
  hasAnswered,
}) => {
  const [selected, setSelected] = useState<boolean | null>(null);

  const handlePress = (val: boolean) => {
    if (!isAlive || hasAnswered) return;
    setSelected(val);
    onAnswer(val);
  };

  if (!isAlive) {
    return (
      <div className="bg-black/90 p-6 rounded-3xl border-2 border-red-900 text-center space-y-3">
        <Skull className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
        <h4 className="text-red-400 font-black text-sm uppercase">You Have Been Eliminated!</h4>
        <p className="text-xs text-gray-400">
          Cheer on the surviving finalists! The jackpot is growing every round.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-5 rounded-3xl border-2 border-amber-400 text-white space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>SURVIVOR SHIELD ACTIVE</span>
        </div>
        <span className="text-xs font-mono font-black text-amber-400">{speedLimitSeconds}s SPEED CAP</span>
      </div>

      <p className="text-xs text-center font-bold text-gray-200">
        {hasAnswered ? 'Choice locked in! Awaiting round results...' : 'Lightning Round: Tap True or False!'}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={hasAnswered}
          onClick={() => handlePress(true)}
          className={`py-8 rounded-2xl font-black text-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
            selected === true
              ? 'bg-emerald-500 text-slate-950 scale-102 ring-4 ring-emerald-300'
              : 'bg-emerald-600/80 hover:bg-emerald-500 text-white disabled:opacity-50'
          }`}
        >
          <Check className="w-8 h-8" />
          <span>TRUE</span>
        </button>

        <button
          type="button"
          disabled={hasAnswered}
          onClick={() => handlePress(false)}
          className={`py-8 rounded-2xl font-black text-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
            selected === false
              ? 'bg-rose-500 text-slate-950 scale-102 ring-4 ring-rose-300'
              : 'bg-rose-600/80 hover:bg-rose-500 text-white disabled:opacity-50'
          }`}
        >
          <X className="w-8 h-8" />
          <span>FALSE</span>
        </button>
      </div>
    </div>
  );
};

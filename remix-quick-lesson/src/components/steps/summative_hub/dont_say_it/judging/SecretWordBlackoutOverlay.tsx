import React from 'react';
import { EyeOff, Scale, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AdjudicationState } from '../types/dontSayItTypes';

interface Props {
  adjudication?: AdjudicationState;
}

export const SecretWordBlackoutOverlay: React.FC<Props> = ({ adjudication }) => {
  if (!adjudication || !adjudication.isActive) return null;

  const isHeardTheWord = adjudication.type === 'heard_the_word';

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-40 rounded-3xl flex flex-col items-center justify-center p-6 text-center text-white space-y-4 animate-in fade-in zoom-in-95">
      <div className="relative">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border-2 ${
          isHeardTheWord
            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
            : 'bg-red-500/20 border-red-400 text-red-400'
        }`}>
          {isHeardTheWord ? <CheckCircle2 className="w-8 h-8" /> : <Scale className="w-8 h-8" />}
        </div>
        <div className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-900 border border-white/20 text-amber-400">
          <EyeOff className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-md">
        <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
          Anti-Peek Blackout Active
        </div>
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          {isHeardTheWord ? 'Word Verification in Progress' : 'Judges Conferring on Foul'}
        </h3>
        <p className="text-xs text-slate-300">
          {isHeardTheWord
            ? `${adjudication.triggeredByName} flagged "Heard the Word!". Judges are confirming.`
            : `${adjudication.triggeredByName} flagged a foul! Conferring on forbidden word infraction.`}
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-[11px] font-mono font-bold text-amber-300">
        <span>Frozen Potential: {adjudication.frozenPoints} pts</span>
        <span>•</span>
        <span>Time: {adjudication.frozenTimeLeft}s</span>
      </div>
    </div>
  );
};

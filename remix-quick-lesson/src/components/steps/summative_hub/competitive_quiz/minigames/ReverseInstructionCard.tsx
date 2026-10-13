import React, { useState } from 'react';
import { AlertCircle, Timer, CheckCircle, Zap } from 'lucide-react';

interface Props {
  prompt: string;
  negativeRuleDirective: string; // e.g. "Do NOT select the statement that is NOT correct!"
  options: string[];
  secondsRemaining: number;
  onLockInAnswer: (choiceIndex: number) => void;
  isLockedIn?: boolean;
}

export const ReverseInstructionCard: React.FC<Props> = ({
  prompt,
  negativeRuleDirective,
  options,
  secondsRemaining,
  onLockInAnswer,
  isLockedIn = false,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (isLockedIn) return;
    setSelectedIdx(idx);
    onLockInAnswer(idx);
  };

  return (
    <div className="bg-slate-900 border-2 border-rose-500 rounded-3xl p-4 text-white space-y-3 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-black uppercase">
          <Zap className="w-3 h-3" />
          <span>Reverse Mind-Bender</span>
        </span>
        <div className={`flex items-center gap-1 font-mono font-black text-xs ${secondsRemaining <= 3 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
          <Timer className="w-3.5 h-3.5" />
          <span>{secondsRemaining}s</span>
        </div>
      </div>

      {/* Double Negative Directive Stencil */}
      <div className="bg-rose-950/40 border border-rose-500/40 p-2.5 rounded-2xl flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-rose-200 uppercase tracking-wide leading-tight">
          {negativeRuleDirective}
        </p>
      </div>

      <p className="text-xs font-semibold text-gray-200">{prompt}</p>

      <div className="space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(idx)}
            disabled={isLockedIn}
            className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
              selectedIdx === idx
                ? 'bg-rose-500 text-white border-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/10'
            }`}
          >
            <span>{opt}</span>
            {selectedIdx === idx && <CheckCircle className="w-4 h-4 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
};

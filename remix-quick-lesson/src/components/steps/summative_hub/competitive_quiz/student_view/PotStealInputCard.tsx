import React, { useState } from 'react';
import { Coins, Sparkles, Check, Smartphone } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';

interface Props {
  activeQuestion: QuestionCard;
  onExecuteSteal: (selectedChoiceIndex: number) => void;
  onCancel: () => void;
}

export const PotStealInputCard: React.FC<Props> = ({ activeQuestion, onExecuteSteal, onCancel }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const options = activeQuestion.options || ['Option A', 'Option B', 'Option C', 'Option D'];
  const pot = activeQuestion.accumulatedPot || activeQuestion.potValue || 1200;

  const handleConfirm = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onExecuteSteal(selectedIdx);
    }, 500);
  };

  return (
    <div className="bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-4 text-white space-y-3.5 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Inverted Phone Pot Heist
            </h3>
            <p className="text-[10px] text-gray-400">
              Answer correctly to claim the <strong className="text-white font-mono">{pot} pts</strong> pot!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="px-2 py-1 bg-white/10 hover:bg-white/15 rounded-lg text-[10px] font-bold text-gray-300 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <div className="p-2.5 bg-black/40 rounded-xl border border-white/10 text-xs font-bold leading-snug">
        {activeQuestion.prompt}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={isSubmitted}
            onClick={() => setSelectedIdx(i)}
            className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
              selectedIdx === i
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md ring-1 ring-amber-300'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200'
            }`}
          >
            <span className="truncate">{opt}</span>
            {selectedIdx === i && <Check className="w-4 h-4 shrink-0 text-slate-950" />}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={selectedIdx === null || isSubmitted}
        onClick={handleConfirm}
        className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 disabled:opacity-40 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
      >
        <Smartphone className="w-3.5 h-3.5 rotate-180" />
        <span>{isSubmitted ? 'Locking In Answer for Pot...' : 'Lock In Answer to Win Pot'}</span>
      </button>
    </div>
  );
};

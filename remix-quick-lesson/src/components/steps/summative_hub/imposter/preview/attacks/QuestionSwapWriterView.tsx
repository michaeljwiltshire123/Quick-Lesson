import React, { useState } from 'react';
import { ArrowLeftRight, Check, ArrowLeft } from 'lucide-react';

interface Props {
  energyPoints: number;
  cost: number;
  onArmQuestionSwap: (customPrompt: string) => void;
  onBack: () => void;
}

export const QuestionSwapWriterView: React.FC<Props> = ({
  energyPoints,
  cost,
  onArmQuestionSwap,
  onBack,
}) => {
  const [promptText, setPromptText] = useState('');
  const canAfford = energyPoints >= cost;
  const isValid = promptText.trim().length >= 8 && promptText.length <= 120;

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
          <ArrowLeftRight className="w-3 h-3 text-rose-400" /> Question Swap (200 pts)
        </span>
      </div>

      <p className="text-[10px] text-white/70 leading-tight">
        Write your custom question to replace the intended prompt for honest pupils next round.
      </p>

      <div className="space-y-1">
        <div className="flex justify-between text-[9px] text-white/50">
          <span>Custom Question Prompt</span>
          <span className="font-mono">{promptText.length}/120</span>
        </div>
        <textarea
          rows={2}
          maxLength={120}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="e.g. Which membrane enzyme synthesises ATP during electron transport?"
          className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-400"
        />
      </div>

      <button
        type="button"
        disabled={!canAfford || !isValid}
        onClick={() => onArmQuestionSwap(promptText.trim())}
        className="w-full py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
      >
        <Check className="w-3.5 h-3.5" />
        <span>Arm Question Swap (-{cost} pts)</span>
      </button>
    </div>
  );
};

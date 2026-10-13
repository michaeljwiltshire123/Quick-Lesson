import React, { useState } from 'react';
import { Zap, CheckCircle, Lock, Timer } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';
import { FormatAnswerInputGrid } from './FormatAnswerInputGrid';

interface Props {
  card: QuestionCard;
  secondsRemaining: number;
  onLockInAnswer: (choiceIndex: number, wagerAmount?: number) => void;
  isLockedIn: boolean;
}

export const FormatAnswerCard: React.FC<Props> = ({
  card,
  secondsRemaining,
  onLockInAnswer,
  isLockedIn,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [wagerAmount, setWagerAmount] = useState<number>(100);

  const handleConfirm = () => {
    if (selectedChoice === null || isLockedIn) return;
    onLockInAnswer(selectedChoice, wagerAmount);
  };

  return (
    <div className="bg-slate-900 border border-white/15 rounded-3xl p-4 text-white space-y-3 shadow-xl">
      {/* Header with Format and Timer */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
          <Zap className="w-3 h-3 fill-slate-950" />
          <span>{card.formatLabel}</span>
        </span>
        <div className={`flex items-center gap-1 text-xs font-mono font-black ${secondsRemaining <= 3 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
          <Timer className="w-3.5 h-3.5" />
          <span>{secondsRemaining}s</span>
        </div>
      </div>

      {/* Question Prompt Preview */}
      <p className="text-xs md:text-sm font-bold text-gray-100 leading-snug line-clamp-2">
        {card.prompt}
      </p>

      {/* Interactive Options Area */}
      <FormatAnswerInputGrid
        card={card}
        selectedChoice={selectedChoice}
        onSelectChoice={(idx) => !isLockedIn && setSelectedChoice(idx)}
        wagerAmount={wagerAmount}
        onChangeWager={(w) => !isLockedIn && setWagerAmount(w)}
      />

      {/* Lock-in Action */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={selectedChoice === null || isLockedIn}
        className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
          isLockedIn
            ? 'bg-emerald-600 text-white cursor-default'
            : selectedChoice !== null
            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg'
            : 'bg-white/10 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLockedIn ? <CheckCircle className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        <span>{isLockedIn ? 'Answer Locked In!' : 'Lock In Answer'}</span>
      </button>
    </div>
  );
};

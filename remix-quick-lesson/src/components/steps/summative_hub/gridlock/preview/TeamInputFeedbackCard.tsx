import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  isCorrect: boolean;
  text: string;
}

export const TeamInputFeedbackCard: React.FC<Props> = ({ isCorrect, text }) => {
  return (
    <div
      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
        isCorrect
          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
          : 'bg-rose-500/20 border-rose-400 text-rose-300'
      }`}
    >
      {isCorrect ? (
        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
      ) : (
        <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
      )}
      <span>{text}</span>
    </div>
  );
};

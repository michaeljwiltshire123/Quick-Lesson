import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  isMatch?: boolean;
  hasSubmitted: boolean;
  typedText: string;
  targetAnswer?: string;
}

export const StudentSubmissionResultBanner: React.FC<Props> = ({
  isMatch,
  hasSubmitted,
  typedText,
  targetAnswer,
}) => {
  return (
    <div
      className={`p-4 rounded-xl border flex items-center gap-3 ${
        isMatch
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}
    >
      {isMatch ? (
        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-6 h-6 shrink-0 text-rose-600" />
      )}
      <div>
        <div className="text-xs font-black">
          {isMatch ? 'Verified Match!' : 'Wrong!'}
        </div>
        <p className="text-[11px] opacity-90 mt-0.5 font-medium">
          {isMatch
            ? `Accepted "${typedText}". Hexagon captured for your squad!`
            : targetAnswer
            ? `The correct answer was "${targetAnswer}". Turn concluded.`
            : `Time expired without answer. Turn concluded.`}
        </p>
      </div>
    </div>
  );
};

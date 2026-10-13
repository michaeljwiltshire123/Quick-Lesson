import React from 'react';
import { ShieldCheck, HelpCircle, FileText, AlertTriangle } from 'lucide-react';
import { LadderRungQuestion } from '../typesLadder';

interface Props {
  rung: LadderRungQuestion;
}

export const RungRigorBreakdownCard: React.FC<Props> = ({ rung }) => {
  const isRecall = rung.rungNumber <= 3;
  const isApplication = rung.rungNumber >= 4 && rung.rungNumber <= 7;
  const cognitiveDimension = isRecall ? 'Remember & Recall' : isApplication ? 'Understand & Apply' : 'Evaluate & Spot-the-Mistake';
  const cognitiveColor = isRecall ? 'text-amber-400 bg-amber-500/10' : isApplication ? 'text-teal-400 bg-teal-500/10' : 'text-orange-400 bg-orange-500/10';

  // Quality check rule validations
  const hasDoubleNegative = /\b(no|not|neither|never|none)\b.*\b(no|not|neither|never|none)\b/i.test(rung.prompt);
  const isPromptTooLong = rung.prompt.length > 150;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-gray-400">Rung Stage {rung.rungNumber}</span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cognitiveColor}`}>
          {cognitiveDimension}
        </span>
      </div>

      <p className="text-xs text-gray-200 font-medium line-clamp-2">{rung.prompt}</p>

      <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <FileText className="w-3 h-3" />
          <span>Choices: {rung.choices.length}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
          <ShieldCheck className="w-3 h-3" />
          <span>Timer: {rung.timerSeconds}s</span>
        </div>
        {hasDoubleNegative && (
          <div className="flex items-center gap-1 text-[10px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3" />
            <span>Double Negative Found</span>
          </div>
        )}
        {isPromptTooLong && (
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
            <AlertTriangle className="w-3 h-3" />
            <span>Prompt Length Issue</span>
          </div>
        )}
      </div>
    </div>
  );
};

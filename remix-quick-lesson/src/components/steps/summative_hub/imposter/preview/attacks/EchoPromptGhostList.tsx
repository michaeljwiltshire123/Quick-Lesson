import React from 'react';
import { Ghost, CheckCircle2 } from 'lucide-react';

interface Props {
  questions: string[];
  selectedQuestion: string;
  onSelectQuestion: (q: string) => void;
  category: string;
}

export const EchoPromptGhostList: React.FC<Props> = ({
  questions,
  selectedQuestion,
  onSelectQuestion,
  category,
}) => {
  return (
    <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
      <div className="flex items-center justify-between text-[10px] text-white/50 px-0.5">
        <span className="flex items-center gap-1 text-indigo-300 font-bold">
          <Ghost className="w-3 h-3 text-indigo-400" /> Topic Traps ({category}):
        </span>
        <span>Tap to choose</span>
      </div>

      {questions.map((q, idx) => {
        const isSelected = selectedQuestion === q;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(q)}
            className={`w-full p-2 text-left rounded-xl text-[11px] leading-snug border transition-all cursor-pointer flex items-start gap-2 ${
              isSelected
                ? 'bg-indigo-950/90 border-indigo-400 text-indigo-100 shadow-md ring-1 ring-indigo-400/50'
                : 'bg-slate-900/90 border-white/10 text-white/80 hover:bg-slate-800 hover:border-white/20'
            }`}
          >
            <div className="pt-0.5 flex-shrink-0">
              {isSelected ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-white/30" />
              )}
            </div>
            <p className="flex-1 font-medium">{q}</p>
          </button>
        );
      })}
    </div>
  );
};

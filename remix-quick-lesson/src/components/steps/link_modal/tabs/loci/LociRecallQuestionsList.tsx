import React from 'react';
import { HelpCircle, CheckSquare, Square } from 'lucide-react';
import Markdown from 'react-markdown';

interface Props {
  recallList: string[];
  selectedQuestions: string[];
  onToggleQuestion: (q: string) => void;
}

export const LociRecallQuestionsList: React.FC<Props> = ({
  recallList, selectedQuestions, onToggleQuestion,
}) => (
  <div className="space-y-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/70">
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1 font-bold text-emerald-950 text-[11px] uppercase tracking-wide">
        <HelpCircle className="w-3.5 h-3.5 text-emerald-700" /> Active Recall Questions ({selectedQuestions.length})
      </span>
      <span className="text-[10px] text-emerald-800 font-medium">Select prompts</span>
    </div>

    <div className="space-y-1">
      {recallList.map((q, qIdx) => {
        const isSelected = selectedQuestions.includes(q);
        return (
          <button
            key={qIdx}
            type="button"
            onClick={() => onToggleQuestion(q)}
            className={`w-full text-left p-1.5 rounded-lg border text-xs flex items-start gap-2 transition-all cursor-pointer ${
              isSelected
                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold shadow-xs'
                : 'bg-white/80 border-emerald-200/60 text-[#2D2A26]/80 hover:bg-white'
            }`}
          >
            <span className="mt-0.5 text-emerald-700">
              {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
            </span>
            <span className="leading-snug [&_strong]:font-bold [&_strong]:text-emerald-900">
              <Markdown>{q}</Markdown>
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

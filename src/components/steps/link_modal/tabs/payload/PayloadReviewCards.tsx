import React from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { QuizQuestionItem } from './types';

interface PayloadReviewCardsProps {
  questions: QuizQuestionItem[];
  onUpdateQuestion: (index: number, updated: QuizQuestionItem) => void;
}

export const PayloadReviewCards: React.FC<PayloadReviewCardsProps> = ({ questions, onUpdateQuestion }) => {
  if (questions.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl border border-dashed border-[#2D2A26]/20 bg-white/50">
        <HelpCircle className="w-8 h-8 text-[#D97706]/60 mx-auto mb-2" />
        <p className="text-xs font-semibold text-[#2D2A26]/80">No quiz questions generated yet.</p>
        <p className="text-[11px] text-[#2D2A26]/50 mt-0.5">Click "Synthesise Quiz Draft" above to create classroom-ready checks.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
      {questions.map((q, qIdx) => (
        <div key={q.id || qIdx} className="p-3.5 rounded-xl border border-[#2D2A26]/15 bg-white space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider">Question {qIdx + 1}</span>
            <span className="text-[10px] text-[#2D2A26]/50">Click option tick to set correct answer</span>
          </div>

          <input
            type="text"
            value={q.question}
            onChange={(e) => onUpdateQuestion(qIdx, { ...q, question: e.target.value })}
            placeholder="Question prompt..."
            className="w-full px-2.5 py-1.5 text-xs font-medium bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-lg text-[#2D2A26] focus:outline-none focus:border-[#D97706]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, optIdx) => {
              const isCorrect = q.correctAnswer === optIdx + 1;
              return (
                <div
                  key={optIdx}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs transition-colors ${
                    isCorrect ? 'border-emerald-500 bg-emerald-50/50' : 'border-[#2D2A26]/15 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onUpdateQuestion(qIdx, { ...q, correctAnswer: optIdx + 1 })}
                    className="cursor-pointer text-xs"
                    title="Mark as correct answer"
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isCorrect ? 'text-emerald-600' : 'text-[#2D2A26]/30'}`} />
                  </button>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const nextOpts = [...q.options];
                      nextOpts[optIdx] = e.target.value;
                      onUpdateQuestion(qIdx, { ...q, options: nextOpts });
                    }}
                    className="flex-1 text-xs bg-transparent text-[#2D2A26] focus:outline-none"
                    placeholder={`Option ${optIdx + 1}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-[#2D2A26]/10">
            <span className="text-[10px] font-bold text-[#2D2A26]/60 shrink-0">Rationale:</span>
            <input
              type="text"
              value={q.explanation || ''}
              onChange={(e) => onUpdateQuestion(qIdx, { ...q, explanation: e.target.value })}
              placeholder="Pupil feedback / pedagogical rationale..."
              className="flex-1 px-2 py-1 text-[11px] bg-[#F8F6F0] border border-[#2D2A26]/10 rounded-md text-[#2D2A26]/80 focus:outline-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

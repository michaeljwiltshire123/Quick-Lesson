import React, { useState, useEffect } from 'react';
import { Smartphone, Check, Send } from 'lucide-react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';

interface Props {
  question: SummativeQuizQuestion;
  onAnswerSubmitted?: (choiceIdx: number) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const StudentPhonePreview: React.FC<Props> = ({ question, onAnswerSubmitted }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset selection when question changes
  useEffect(() => {
    setSelectedIdx(null);
    setIsSubmitted(false);
  }, [question.id, question.questionNumber]);

  const handleSubmit = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
    setIsSubmitted(true);
    onAnswerSubmitted?.(idx);
  };

  return (
    <div className="bg-[#1E1C1A] p-4 rounded-3xl border-4 border-slate-700 shadow-2xl max-w-xs mx-auto text-white space-y-3.5">
      <div className="w-12 h-1 bg-white/20 rounded-full mx-auto" />
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-gray-400">
          <Smartphone className="w-3 h-3 text-amber-400" />
          <span>Pupil Screen (Q{question.questionNumber})</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold">
          Live Session
        </span>
      </div>

      <div className="text-xs font-semibold text-gray-200 line-clamp-3 min-h-[36px]">
        {question.prompt}
      </div>

      <div className="space-y-2">
        {question.choices.map((choice, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSubmit(idx)}
              className={`w-full p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md scale-[1.01]'
                  : 'bg-white/5 hover:bg-white/10 text-gray-200 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-black/20 flex items-center justify-center font-mono text-[10px]">
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="text-xs truncate max-w-[160px]">{choice}</span>
              </div>
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {isSubmitted && (
        <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center space-y-1 animate-in fade-in">
          <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-1">
            <Send className="w-3 h-3" /> Answer Logged
          </div>
          <p className="text-[10px] text-gray-400">Waiting for class reveal...</p>
        </div>
      )}
    </div>
  );
};

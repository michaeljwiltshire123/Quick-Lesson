import React from 'react';
import { X, Sparkles, CheckCheck } from 'lucide-react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';
import { CognitiveRigorCard } from './CognitiveRigorCard';
import { DistractorAnalysisCard } from './DistractorAnalysisCard';

interface Props {
  isOpen: boolean;
  questions: SummativeQuizQuestion[];
  quizTitle: string;
  gradeLevel?: string;
  onClose: () => void;
}

export const QuestionQualityInspectorModal: React.FC<Props> = ({
  isOpen,
  questions,
  quizTitle,
  gradeLevel,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#181614] text-white rounded-3xl border border-white/20 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
              Question Quality Inspector & Rigor Check
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5">
            <h4 className="text-xs font-bold text-amber-300">
              Assessment Pre-Check for: {quizTitle} ({gradeLevel || 'BTEC Level 3'})
            </h4>
            <p className="text-[11px] text-gray-300 mt-0.5">
              Verified against {gradeLevel || 'BTEC Level 3'} UK curriculum standards to prevent recall-only quizzes and superficial options.
            </p>
          </div>

          <CognitiveRigorCard questions={questions} />
          <DistractorAnalysisCard questions={questions} gradeLevel={gradeLevel} />
        </div>

        <div className="px-5 py-3 border-t border-white/10 bg-black/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black cursor-pointer shadow-md"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Ready for Classroom Delivery</span>
          </button>
        </div>
      </div>
    </div>
  );
};

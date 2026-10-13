import React from 'react';
import { Trash2, CheckCircle2, HelpCircle } from 'lucide-react';
import { SummativeQuizQuestion } from './typesSummativeQuiz';
import { LessonChunkBadge } from '../plain_quiz/tags/LessonChunkBadge';

interface Props {
  question: SummativeQuizQuestion;
  index: number;
  totalQuestions: number;
  onChange: (updated: SummativeQuizQuestion) => void;
  onDelete: () => void;
}

export const QuizQuestionEditorCard: React.FC<Props> = ({
  question, index, totalQuestions, onChange, onDelete,
}) => {
  const handleChoiceChange = (cIdx: number, val: string) => {
    const nc = [...question.choices];
    nc[cIdx] = val;
    onChange({ ...question, choices: nc });
  };

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
            Question {index + 1} of {totalQuestions}
          </span>
          <LessonChunkBadge
            chunkIndex={question.chunkIndex}
            chunkTitle={question.chunkTitle}
            compact
          />
        </div>
        {totalQuestions > 3 && (
          <button type="button" onClick={onDelete} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold text-[#2D2A26] mb-1">Question Prompt</label>
        <input
          type="text"
          value={question.prompt}
          onChange={(e) => onChange({ ...question, prompt: e.target.value })}
          className="w-full px-3.5 py-2 text-xs font-medium text-[#2D2A26] bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          placeholder="Enter question prompt..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#2D2A26]">Answer Choices (Mark Correct Answer)</label>
        {question.choices.map((choice, cIdx) => (
          <div key={cIdx} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...question, correctChoiceIndex: cIdx })}
              className={`p-1.5 rounded-lg border cursor-pointer transition-all ${
                question.correctChoiceIndex === cIdx
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-[#2D2A26]/40 border-[#2D2A26]/20 hover:border-amber-500'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#2D2A26]/70 w-5">{String.fromCharCode(65 + cIdx)}.</span>
            <input
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(cIdx, e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs font-medium text-[#2D2A26] bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              placeholder={`Choice ${String.fromCharCode(65 + cIdx)}`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-bold text-[#2D2A26] mb-1 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Explanatory Feedback</span>
        </label>
        <input
          type="text"
          value={question.explanation}
          onChange={(e) => onChange({ ...question, explanation: e.target.value })}
          className="w-full px-3.5 py-2 text-xs font-medium text-[#2D2A26] bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          placeholder="Why is this correct?"
        />
      </div>
    </div>
  );
};

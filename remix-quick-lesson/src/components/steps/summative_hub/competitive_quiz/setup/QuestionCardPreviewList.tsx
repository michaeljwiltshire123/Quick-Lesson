import React, { useState } from 'react';
import { RefreshCw, Zap, Clock } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';
import {
  QuestionReorderDeck,
  CompetitiveQuestionEditorModal,
  QuestionInspectorModal,
  CustomQuestionCreatorCard,
} from '../editor';

interface Props {
  questions: QuestionCard[];
  onChangeQuestions: (questions: QuestionCard[]) => void;
  onRefreshQuestions: () => void;
  isLoading?: boolean;
}

export const QuestionCardPreviewList: React.FC<Props> = ({
  questions,
  onChangeQuestions,
  onRefreshQuestions,
  isLoading,
}) => {
  const [editingCard, setEditingCard] = useState<QuestionCard | null>(null);
  const [inspectingCard, setInspectingCard] = useState<QuestionCard | null>(null);
  const estMins = Math.max(2, Math.ceil((questions.length * 25) / 60));

  const handleMove = (idx: number, delta: number) => {
    const target = idx + delta;
    if (target < 0 || target >= questions.length) return;
    const next = [...questions];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChangeQuestions(next);
  };

  const handleSaveCard = (updated: QuestionCard) => {
    onChangeQuestions(questions.map((q) => (q.id === updated.id ? updated : q)));
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-black uppercase tracking-wider text-[#2D2A26]">
            Curriculum Question Roster ({questions.length} Rounds)
          </h4>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1 border border-gray-200">
            <Clock className="w-3 h-3 text-emerald-600" /> ~{estMins} mins
          </span>
        </div>
        <button
          type="button"
          onClick={onRefreshQuestions}
          disabled={isLoading}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#2D2A26] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Re-Extract from Lesson with AI</span>
        </button>
      </div>

      <QuestionReorderDeck
        questions={questions}
        onMoveUp={(i) => handleMove(i, -1)}
        onMoveDown={(i) => handleMove(i, 1)}
        onEdit={(q) => setEditingCard(q)}
        onInspect={(q) => setInspectingCard(q)}
        onDelete={(i) => onChangeQuestions(questions.filter((_, idx) => idx !== i))}
      />

      <CustomQuestionCreatorCard onAddQuestion={(q) => onChangeQuestions([...questions, q])} />

      <CompetitiveQuestionEditorModal
        question={editingCard}
        isOpen={Boolean(editingCard)}
        onSave={handleSaveCard}
        onClose={() => setEditingCard(null)}
      />

      <QuestionInspectorModal
        question={inspectingCard}
        isOpen={Boolean(inspectingCard)}
        onClose={() => setInspectingCard(null)}
        onEdit={() => {
          setEditingCard(inspectingCard);
          setInspectingCard(null);
        }}
      />
    </div>
  );
};

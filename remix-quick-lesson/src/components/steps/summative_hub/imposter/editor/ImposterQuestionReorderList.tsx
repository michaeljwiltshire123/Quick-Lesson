import React from 'react';
import { ArrowUp, ArrowDown, Edit3, Trash2, RefreshCw } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { QUESTION_TYPE_LABELS } from '../services/imposterQuestionService';

interface Props {
  questions: ImposterQuestion[];
  onEdit: (question: ImposterQuestion) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onReRoll: (id: string) => void;
}

export const ImposterQuestionReorderList: React.FC<Props> = ({
  questions, onEdit, onDelete, onMoveUp, onMoveDown, onReRoll,
}) => {
  return (
    <div className="space-y-2">
      {questions.map((q, idx) => (
        <div
          key={q.id}
          className="bg-white border border-[#2D2A26]/15 hover:border-amber-400/60 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs transition-all"
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="w-5 text-center text-xs font-mono font-bold text-[#2D2A26]/50">
              #{idx + 1}
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
              {QUESTION_TYPE_LABELS[q.type] || 'Prompt'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#2D2A26] truncate">{q.prompt}</p>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#2D2A26]/60">
                <span className="font-medium text-emerald-700">Clue: {q.topicClue}</span>
                {q.chunkTitle && <span>• {q.chunkTitle}</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onReRoll(q.id)}
              className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 cursor-pointer"
              title="Re-roll this single question"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMoveUp(idx)}
              disabled={idx === 0}
              className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:bg-black/5 disabled:opacity-20 cursor-pointer"
              title="Move Up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onMoveDown(idx)}
              disabled={idx === questions.length - 1}
              className="p-1.5 rounded-lg text-[#2D2A26]/60 hover:bg-black/5 disabled:opacity-20 cursor-pointer"
              title="Move Down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onEdit(q)}
              className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-50 cursor-pointer"
              title="Edit Question"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            {questions.length > 2 && (
              <button
                type="button"
                onClick={() => onDelete(q.id)}
                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                title="Delete Question"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

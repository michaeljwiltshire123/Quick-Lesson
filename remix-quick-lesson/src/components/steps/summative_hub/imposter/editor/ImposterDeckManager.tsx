import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import { ImposterQuestionReorderList } from './ImposterQuestionReorderList';
import { CustomImposterQuestionCreator } from './CustomImposterQuestionCreator';
import { ImposterQuestionEditorModal } from './ImposterQuestionEditorModal';
import { reRollSingleQuestion } from '../services/imposterQuestionService';

interface Props {
  questions: ImposterQuestion[];
  onChangeQuestions: (updated: ImposterQuestion[]) => void;
  lessonTitle: string;
  chunks?: LessonChunk[];
  isGenerating?: boolean;
  onGenerateAi?: () => void;
}

export const ImposterDeckManager: React.FC<Props> = ({
  questions, onChangeQuestions, lessonTitle, chunks = [], isGenerating, onGenerateAi,
}) => {
  const [editingQuestion, setEditingQuestion] = useState<ImposterQuestion | null>(null);

  const handleReRoll = (id: string) => {
    const next = questions.map((q) => (q.id === id ? reRollSingleQuestion(q, lessonTitle, chunks) : q));
    onChangeQuestions(next);
  };

  const handleMove = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    const next = [...questions];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    onChangeQuestions(next);
  };

  const handleSaveEdit = (upd: ImposterQuestion) => {
    onChangeQuestions(questions.map((q) => (q.id === upd.id ? upd : q)));
  };

  return (
    <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#2D2A26]/15 space-y-3">
      <div className="flex flex-wrap items-center justify-between border-b border-[#2D2A26]/10 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider">
            Classroom Question Deck ({questions.length} Questions Ready)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {onGenerateAi && (
            <button
              type="button"
              disabled={isGenerating}
              onClick={onGenerateAi}
              className="py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{isGenerating ? 'Generating Questions...' : 'Generate AI Questions ✨'}</span>
            </button>
          )}
          <span className="text-[11px] text-[#2D2A26]/60 font-medium">Click to edit or re-roll prompts</span>
        </div>
      </div>

      <CustomImposterQuestionCreator
        lessonTitle={lessonTitle}
        onAdd={(newQ) => onChangeQuestions([newQ, ...questions])}
      />

      <ImposterQuestionReorderList
        questions={questions}
        onEdit={setEditingQuestion}
        onDelete={(id) => onChangeQuestions(questions.filter((q) => q.id !== id))}
        onMoveUp={(idx) => handleMove(idx, -1)}
        onMoveDown={(idx) => handleMove(idx, 1)}
        onReRoll={handleReRoll}
      />

      <ImposterQuestionEditorModal
        isOpen={Boolean(editingQuestion)}
        question={editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

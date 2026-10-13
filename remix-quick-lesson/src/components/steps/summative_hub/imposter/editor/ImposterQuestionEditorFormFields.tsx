import React from 'react';
import { ImposterQuestion, ImposterQuestionType } from '../types/imposterTypes';
import { QUESTION_TYPE_LABELS } from '../services/imposterQuestionService';

interface Props {
  draft: ImposterQuestion;
  onChange: (updated: Partial<ImposterQuestion>) => void;
}

export const ImposterQuestionEditorFormFields: React.FC<Props> = ({ draft, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-[#2D2A26] mb-1">Question Style</label>
          <select
            value={draft.type}
            onChange={(e) => onChange({ type: e.target.value as ImposterQuestionType })}
            className="w-full px-3 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl"
          >
            {Object.entries(QUESTION_TYPE_LABELS).map(([k, label]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-[#2D2A26] mb-1">Lesson Milestone Tag</label>
          <input
            type="text"
            value={draft.chunkTitle || ''}
            onChange={(e) => onChange({ chunkTitle: e.target.value })}
            className="w-full px-3 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl"
            placeholder="e.g. Stage 1: Photosynthesis"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-[#2D2A26] mb-1">Question Prompt</label>
        <textarea
          rows={2}
          value={draft.prompt}
          onChange={(e) => onChange({ prompt: e.target.value })}
          className="w-full px-3 py-2 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl"
          placeholder="Question prompt shown to all pupils..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-emerald-800 mb-1">Secret Topic Clue (Innocent)</label>
          <input
            type="text"
            value={draft.topicClue}
            onChange={(e) => onChange({ topicClue: e.target.value })}
            className="w-full px-3 py-1.5 text-xs bg-emerald-50/50 border border-emerald-200 rounded-xl"
            placeholder="Target concept"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-amber-800 mb-1">Imposter Bluff Hint</label>
          <input
            type="text"
            value={draft.imposterClue || draft.contextHint || ''}
            onChange={(e) => onChange({ imposterClue: e.target.value })}
            className="w-full px-3 py-1.5 text-xs bg-amber-50/50 border border-amber-200 rounded-xl"
            placeholder="Vague direction to aid bluffing"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-[#2D2A26] mb-1">Written Correct Answer</label>
        <input
          type="text"
          value={draft.correctAnswer || ''}
          onChange={(e) => onChange({ correctAnswer: e.target.value })}
          className="w-full px-3 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl font-medium"
          placeholder="e.g. Lactic acid / Thylakoid membrane"
        />
      </div>
    </div>
  );
};

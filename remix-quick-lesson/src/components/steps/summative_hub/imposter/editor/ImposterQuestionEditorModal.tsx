import React, { useState } from 'react';
import { X, Save, Sparkles } from 'lucide-react';
import { ImposterQuestion } from '../types/imposterTypes';
import { ImposterQuestionEditorFormFields } from './ImposterQuestionEditorFormFields';

interface Props {
  isOpen: boolean;
  question: ImposterQuestion | null;
  onClose: () => void;
  onSave: (updated: ImposterQuestion) => void;
}

export const ImposterQuestionEditorModal: React.FC<Props> = ({
  isOpen, question, onClose, onSave,
}) => {
  if (!isOpen || !question) return null;
  const [draft, setDraft] = useState<ImposterQuestion>({ ...question });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#2D2A26]/20 rounded-3xl max-w-xl w-full p-6 text-[#2D2A26] space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-100 text-amber-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-black text-sm text-[#2D2A26]">Edit Imposter Question</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <ImposterQuestionEditorFormFields
            draft={draft}
            onChange={(upd) => setDraft((prev) => ({ ...prev, ...upd }))}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-[#2D2A26]/10">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs font-bold text-[#2D2A26]/70 hover:bg-[#F8F6F0] rounded-xl cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

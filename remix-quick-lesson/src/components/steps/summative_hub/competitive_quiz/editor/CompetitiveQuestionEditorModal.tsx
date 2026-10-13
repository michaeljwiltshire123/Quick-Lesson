import React, { useState } from 'react';
import { X } from 'lucide-react';
import { QuestionCard } from '../types/competitiveQuizTypes';

const safeStr = (o: any): string => {
  if (typeof o === 'string') return o;
  if (o && typeof o === 'object') {
    return o.left && o.right ? `${o.left} ➔ ${o.right}` : o.text || Object.values(o).join(' ➔ ');
  }
  return String(o ?? '');
};

interface Props {
  question: QuestionCard | null;
  isOpen: boolean;
  onSave: (updated: QuestionCard) => void;
  onClose: () => void;
}

export const CompetitiveQuestionEditorModal: React.FC<Props> = ({
  question,
  isOpen,
  onSave,
  onClose,
}) => {
  if (!isOpen || !question) return null;

  const [prompt, setPrompt] = useState(question.prompt);
  const [options, setOptions] = useState<string[]>(() =>
    (question.options && question.options.length > 0 ? question.options : ['', '', '', '']).map(safeStr)
  );
  const [correctIndex, setCorrectIndex] = useState(question.correctIndex ?? 0);
  const [explanation, setExplanation] = useState(question.explanation || '');

  const handleOptionChange = (idx: number, val: string) => {
    const next = [...options];
    next[idx] = val;
    setOptions(next);
  };

  const handleSave = () => {
    onSave({ ...question, prompt, options, correctIndex, explanation });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 max-w-lg w-full text-white space-y-3.5 shadow-2xl text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="font-black uppercase text-amber-400">Edit Round: {question.formatLabel}</span>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-gray-300 font-bold mb-1">Question Prompt</label>
            <textarea rows={2} value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-slate-800 border border-white/15 rounded-xl p-2 text-white" />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Options (Radio = Correct Answer)</label>
            <div className="space-y-1">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="radio" name="correctOption" checked={correctIndex === i} onChange={() => setCorrectIndex(i)} className="accent-amber-400 cursor-pointer" />
                  <input type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} className={`w-full bg-slate-800 border rounded-xl p-1.5 text-white ${correctIndex === i ? 'border-amber-400 font-bold' : 'border-white/10'}`} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Pedagogical Explanation</label>
            <input type="text" value={explanation} onChange={(e) => setExplanation(e.target.value)} className="w-full bg-slate-800 border border-white/15 rounded-xl p-2 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
          <button type="button" onClick={onClose} className="px-3 py-1.5 text-gray-300 hover:text-white font-bold cursor-pointer">Cancel</button>
          <button type="button" onClick={handleSave} className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-xl uppercase text-xs cursor-pointer shadow-md">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

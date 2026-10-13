import React, { useState } from 'react';
import { Ghost, Sparkles, Send, X } from 'lucide-react';
import { ImposterQuestionType } from '../types/imposterTypes';

export interface DecoySubmission {
  prompt: string;
  type: ImposterQuestionType;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDecoy: (decoy: DecoySubmission) => void;
  studentName?: string;
}

const CATEGORIES: { type: ImposterQuestionType; label: string }[] = [
  { type: 'component_name_drop', label: 'Key Detail' },
  { type: 'real_world_app', label: 'Real Life' },
  { type: 'analogy_link', label: 'Comparison' },
  { type: 'action_verb', label: 'Action' },
];

export const GhostWorkshopModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmitDecoy,
  studentName = 'Player',
}) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<ImposterQuestionType>('component_name_drop');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmitDecoy({ prompt: prompt.trim(), type });
    setPrompt('');
    onClose();
  };

  return (
    <div id="ghost-workshop-modal" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-purple-300 max-w-md w-full p-5 shadow-2xl space-y-3.5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-100 text-purple-700"><Ghost className="w-4 h-4" /></span>
            <div>
              <h3 className="text-sm font-black text-[#2D2A26]">Ghost Helper Workshop</h3>
              <p className="text-[10px] text-[#2D2A26]/60">{studentName} • Write a Tricky Question</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#2D2A26]/50 hover:text-[#2D2A26] cursor-pointer"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-4 gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.type}
                type="button"
                onClick={() => setType(c.type)}
                className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                  type === c.type ? 'bg-purple-700 text-white border-purple-800' : 'bg-[#F8F6F0] text-[#2D2A26]/80 border-[#2D2A26]/15 hover:bg-stone-100'
                }`}
              >{c.label}</button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write a clever question about what we learned..."
            rows={3}
            maxLength={120}
            className="w-full p-2.5 rounded-xl text-xs bg-[#F8F6F0] border border-[#2D2A26]/20 focus:bg-white focus:border-purple-600 outline-none"
          />

          <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 flex items-center gap-2 text-[11px] text-purple-900">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-purple-600" />
            <span>If an imposter gets caught because of your question, you earn a bonus badge!</span>
          </div>

          <button
            type="submit"
            disabled={!prompt.trim()}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Send Question to the Group
          </button>
        </form>
      </div>
    </div>
  );
};

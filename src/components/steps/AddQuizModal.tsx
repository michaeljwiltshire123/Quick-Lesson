import React, { useState } from 'react';
import { X, HelpCircle, Sparkles } from 'lucide-react';

interface AddQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, details: string) => void;
}

export const AddQuizModal: React.FC<AddQuizModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onAdd(question.trim(), answer.trim() || 'Formative check quiz');
    setQuestion('');
    setAnswer('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#2D2A26]/15 rounded-2xl w-full max-w-md overflow-hidden shadow-xl flex flex-col">
        <div className="p-5 border-b border-[#2D2A26]/10 flex items-center justify-between bg-[#F8F6F0]/60">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D97706]" />
            <h3 className="text-sm font-bold text-[#2D2A26]">Add Quiz Check</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-black/5 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2D2A26] mb-1">Check Question / Prompt</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is the primary role of..."
              className="w-full text-xs bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl px-3 py-2.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#2D2A26] mb-1">Expected Answer / Key Detail</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Expected learner response..."
              className="w-full text-xs bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl px-3 py-2.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] text-xs font-bold rounded-xl border border-[#2D2A26]/20 cursor-pointer">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-[#F59E0B] hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Attach Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

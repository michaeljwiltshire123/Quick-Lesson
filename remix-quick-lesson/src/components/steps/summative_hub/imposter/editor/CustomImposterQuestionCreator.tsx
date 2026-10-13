import React, { useState } from 'react';
import { PlusCircle, Sparkles } from 'lucide-react';
import { ImposterQuestion, ImposterQuestionType } from '../types/imposterTypes';
import { QUESTION_TYPE_LABELS } from '../services/imposterQuestionService';

interface Props {
  lessonTitle: string;
  onAdd: (newQuestion: ImposterQuestion) => void;
}

export const CustomImposterQuestionCreator: React.FC<Props> = ({ lessonTitle, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<ImposterQuestionType>('component_name_drop');
  const [topicClue, setTopicClue] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [imposterClue, setImposterClue] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onAdd({
      id: `custom_imposter_${Date.now()}`,
      type,
      prompt: prompt.trim(),
      topicClue: topicClue.trim() || lessonTitle || 'Core Topic',
      correctAnswer: correctAnswer.trim() || 'Accurate curriculum answer',
      imposterClue: imposterClue.trim() || 'Bluff using context from peers',
      chunkTitle: 'Custom Lesson Stage',
    });
    setPrompt('');
    setTopicClue('');
    setCorrectAnswer('');
    setImposterClue('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 px-4 border border-dashed border-[#2D2A26]/30 hover:border-amber-500 rounded-2xl bg-[#F8F6F0]/60 text-xs font-bold text-[#2D2A26] flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <PlusCircle className="w-4 h-4 text-amber-600" />
        Add Bespoke Question Before Generating
      </button>
    );
  }

  return (
    <form onSubmit={handleCreate} className="p-4 bg-white border border-amber-300 rounded-2xl shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-[#2D2A26] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Add Bespoke Question Before Generating
        </span>
        <button type="button" onClick={() => setIsOpen(false)} className="text-[11px] font-bold text-gray-400 hover:text-gray-700 cursor-pointer">Cancel</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <select value={type} onChange={(e) => setType(e.target.value as ImposterQuestionType)} className="px-2.5 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl">
          {Object.entries(QUESTION_TYPE_LABELS).map(([k, label]) => (
            <option key={k} value={k}>{label}</option>
          ))}
        </select>
        <input type="text" placeholder="Topic Clue (e.g. Chloroplasts)" value={topicClue} onChange={(e) => setTopicClue(e.target.value)} className="px-2.5 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl" />
      </div>
      <input type="text" placeholder="Question Prompt shown to students..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full px-2.5 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input type="text" placeholder="Written Correct Answer (for Innocents)" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="px-2.5 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl font-medium" />
        <input type="text" placeholder="Imposter Bluff Hint (hidden from Innocents)" value={imposterClue} onChange={(e) => setImposterClue(e.target.value)} className="px-2.5 py-1.5 text-xs bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl font-medium" />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button type="submit" disabled={!prompt.trim()} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">
          Add to Deck
        </button>
      </div>
    </form>
  );
};

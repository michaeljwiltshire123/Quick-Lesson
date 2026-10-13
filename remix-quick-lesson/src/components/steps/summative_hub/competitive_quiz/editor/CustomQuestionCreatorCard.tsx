import React, { useState } from 'react';
import { PlusCircle, Check } from 'lucide-react';
import { QuestionCard, QuestionFormat } from '../types/competitiveQuizTypes';

interface Props {
  onAddQuestion: (card: QuestionCard) => void;
}

export const CustomQuestionCreatorCard: React.FC<Props> = ({ onAddQuestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState<QuestionFormat>('standard_mcq');
  const [options, setOptions] = useState<string[]>(['Option A', 'Option B', 'Option C', 'Option D']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newCard: QuestionCard = {
      id: `custom_q_${Date.now()}`,
      format,
      formatLabel: format.replace('_', ' ').toUpperCase(),
      prompt,
      options,
      correctIndex,
      explanation: 'Teacher-authored checkpoint question.',
      speedLimitSeconds: 10,
      potValue: 100,
      conceptCovered: 'Curriculum Core',
      difficulty: 'core',
    };

    onAddQuestion(newCard);
    setPrompt('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-2xl text-xs font-black text-amber-900 flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <PlusCircle className="w-4 h-4 text-amber-600" />
        <span>Add Custom Teacher Question</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-amber-300 rounded-2xl space-y-3 text-xs">
      <div className="flex items-center justify-between font-black text-slate-800">
        <span>Create Custom Round Question</span>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as QuestionFormat)}
          className="bg-white border rounded-lg p-1 text-[11px] font-bold"
        >
          <option value="standard_mcq">Standard Speed MCQ</option>
          <option value="spot_the_lie">Spot the Lie</option>
          <option value="odd_one_out">Odd One Out</option>
          <option value="binary_blitz">Binary Blitz</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Enter question prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-xl p-2 font-medium"
        required
      />

      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              type="radio"
              name="customCorrect"
              checked={correctIndex === i}
              onChange={() => setCorrectIndex(i)}
              className="accent-amber-500 cursor-pointer"
            />
            <input
              type="text"
              value={opt}
              onChange={(e) => {
                const next = [...options];
                next[i] = e.target.value;
                setOptions(next);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg p-1.5 text-[11px]"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1.5 text-gray-500 font-bold">
          Cancel
        </button>
        <button type="submit" className="px-4 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl">
          Insert Question
        </button>
      </div>
    </form>
  );
};

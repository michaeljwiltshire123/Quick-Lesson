import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { SecretWordCard } from '../types/dontSayItTypes';

interface Props {
  onAddCard: (card: SecretWordCard) => void;
}

export const CustomTabooCardCreator: React.FC<Props> = ({ onAddCard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetWord, setTargetWord] = useState('');
  const [bannedRaw, setBannedRaw] = useState('');
  const [hint, setHint] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetWord.trim()) return;

    const bannedList = bannedRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newCard: SecretWordCard = {
      id: `custom-card-${Date.now().toString(36)}`,
      targetWord: targetWord.trim(),
      studentBannedWords: bannedList.length ? bannedList : ['Concept', 'Term', 'Process', 'Theory'],
      aiFallbackBannedWords: bannedList,
      activeBannedWords: bannedList.length ? bannedList : ['Concept', 'Term', 'Process', 'Theory'],
      hint: hint.trim() || undefined,
    };

    onAddCard(newCard);
    setTargetWord('');
    setBannedRaw('');
    setHint('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50/50 rounded-xl font-bold text-xs text-gray-700 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
      >
        <Plus className="w-4 h-4 text-amber-600" />
        <span>Author Custom Taboo Card Manually</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleCreate} className="p-3.5 bg-amber-50/60 border border-amber-300 rounded-xl space-y-2.5 text-xs">
      <div className="flex items-center justify-between font-black uppercase text-amber-900 text-[11px]">
        <span>Author Custom Taboo Card</span>
        <button type="button" onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-black">Cancel</button>
      </div>

      <input
        type="text"
        placeholder="Target Concept Word (e.g. Respiration)"
        value={targetWord}
        onChange={(e) => setTargetWord(e.target.value)}
        className="w-full p-2 bg-white border border-gray-200 rounded-lg font-bold"
        required
      />

      <input
        type="text"
        placeholder="Forbidden Words (comma separated: e.g. Glucose, Oxygen, Energy)"
        value={bannedRaw}
        onChange={(e) => setBannedRaw(e.target.value)}
        className="w-full p-2 bg-white border border-gray-200 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Optional Hint / Diagnostic Note"
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        className="w-full p-2 bg-white border border-gray-200 rounded-lg"
      />

      <button
        type="submit"
        className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-lg text-xs uppercase flex items-center justify-center gap-1 cursor-pointer"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save New Card</span>
      </button>
    </form>
  );
};

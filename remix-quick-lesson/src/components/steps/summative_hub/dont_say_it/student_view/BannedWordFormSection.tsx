import React from 'react';
import { Plus, Send } from 'lucide-react';

interface Props {
  currentInput: string;
  bannedList: string[];
  maxWords: number;
  onInputChange: (val: string) => void;
  onAddWord: (e: React.FormEvent) => void;
  onRemoveWord: (idx: number) => void;
  onSubmit: () => void;
}

export const BannedWordFormSection: React.FC<Props> = ({
  currentInput,
  bannedList,
  maxWords,
  onInputChange,
  onAddWord,
  onRemoveWord,
  onSubmit,
}) => {
  return (
    <div className="space-y-3">
      <form onSubmit={onAddWord} className="flex gap-2">
        <input
          type="text"
          value={currentInput}
          disabled={bannedList.length >= maxWords}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type forbidden word..."
          className="flex-1 px-3 py-2 bg-white border border-[#2D2A26]/20 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#2D2A26] focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={!currentInput.trim() || bannedList.length >= maxWords}
          className="px-3 py-2 bg-[#2D2A26] text-white rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      <div className="flex flex-wrap gap-1.5 min-h-[36px]">
        {bannedList.map((w, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold rounded-lg flex items-center gap-1.5"
          >
            <span>{w}</span>
            <button
              type="button"
              onClick={() => onRemoveWord(idx)}
              className="text-rose-600 hover:text-rose-900 cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={bannedList.length === 0}
        className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 shadow-sm"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Lock In Forbidden Words</span>
      </button>
    </div>
  );
};

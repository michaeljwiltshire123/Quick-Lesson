import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, Bookmark, Feather, Award } from 'lucide-react';
import { LimerickItem } from './types';

interface Props {
  item: LimerickItem;
  onSelect: (id: string) => void;
  onAttach: (item: LimerickItem) => void;
}

export const LimerickCard: React.FC<Props> = ({ item, onSelect, onAttach }) => {
  const [recallMode, setRecallMode] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const getDisplayVerses = () => {
    if (!recallMode) return item.verses;
    return item.verses.map((line, idx) => {
      const words = line.split(' ');
      if (words.length <= 1) return line;
      if (difficulty === 'easy' && idx === item.verses.length - 1) {
        words[words.length - 1] = '_____';
      } else if (difficulty === 'medium' && (idx === item.verses.length - 1 || idx === item.verses.length - 2)) {
        words[words.length - 1] = '_____';
      } else if (difficulty === 'hard') {
        words[words.length - 1] = '_____';
        if (words.length > 4) words[Math.floor(words.length / 2)] = '_____';
      }
      return words.join(' ');
    });
  };

  return (
    <div className={`bg-white border rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between transition-all ${item.selected ? 'border-[#D97706] ring-2 ring-[#D97706]/20 bg-amber-50/20' : 'border-[#2D2A26]/15'}`}>
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
        <div className="flex items-center gap-1.5">
          <Feather className="w-4 h-4 text-[#D97706]" />
          <span className="text-xs font-bold text-[#2D2A26] uppercase tracking-wide">{item.style}</span>
        </div>
        <button
          type="button"
          onClick={() => setRecallMode(!recallMode)}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${recallMode ? 'bg-amber-100 text-amber-800' : 'bg-[#F8F6F0] text-[#2D2A26]/80 hover:bg-black/5'}`}
        >
          {recallMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {recallMode ? 'Recall Active' : 'Blank-out Mode'}
        </button>
      </div>

      {recallMode && (
        <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 flex items-center gap-1"><Award className="w-3 h-3 text-amber-600" /> Difficulty:</span>
            <div className="flex items-center gap-1">
              {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize cursor-pointer transition-all ${difficulty === lvl ? 'bg-amber-600 text-white shadow-2xs' : 'bg-white text-amber-900/70 border border-amber-200 hover:bg-amber-100'}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#F8F6F0] p-3 rounded-xl border border-[#2D2A26]/10 space-y-1">
        <h4 className="text-xs font-bold text-[#D97706] mb-1">{item.title}</h4>
        {getDisplayVerses().map((verse, i) => (
          <p key={i} className="text-xs font-medium text-[#2D2A26] italic leading-relaxed">{verse}</p>
        ))}
        {item.mnemonic && (
          <div className="mt-2 pt-2 border-t border-[#2D2A26]/10 text-[11px] font-semibold text-[#D97706]">
            🔑 Mnemonic: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#D97706]/20">{item.mnemonic}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={() => onSelect(item.id)}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${item.selected ? 'bg-[#D97706] text-white' : 'bg-[#F8F6F0] text-[#2D2A26] hover:bg-[#2D2A26]/10'}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {item.selected ? 'Selected' : 'Select'}
        </button>
        <button
          type="button"
          onClick={() => onAttach(item)}
          className="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Bookmark className="w-3.5 h-3.5" /> Attach
        </button>
      </div>
    </div>
  );
};

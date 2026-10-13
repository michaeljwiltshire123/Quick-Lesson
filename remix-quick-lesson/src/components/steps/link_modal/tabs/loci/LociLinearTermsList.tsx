import React from 'react';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

interface Props {
  terms: string[];
  onChangeTerms: (t: string[]) => void;
}

export const LociLinearTermsList: React.FC<Props> = ({ terms, onChangeTerms }) => {
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= terms.length) return;
    const copy = [...terms];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChangeTerms(copy);
  };

  const removeItem = (index: number) => {
    onChangeTerms(terms.filter((_, i) => i !== index));
  };

  const updateTermText = (index: number, newText: string) => {
    const copy = [...terms];
    copy[index] = newText;
    onChangeTerms(copy);
  };

  return (
    <div className="bg-white/95 border border-[#2D2A26]/15 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between text-[11px] font-bold text-[#2D2A26]/70 uppercase tracking-wide border-b border-[#2D2A26]/10 pb-1.5">
        <span>Linear Sequence ({terms.length}/15)</span>
        <button type="button" onClick={() => onChangeTerms([])} className="text-[10px] text-red-600 hover:underline cursor-pointer">Clear All</button>
      </div>

      <div className="max-h-[260px] overflow-y-auto space-y-1.5 pr-1">
        {terms.map((term, index) => (
          <div key={index} className="flex items-center gap-2 bg-[#F8F6F0] border border-[#2D2A26]/15 px-2.5 py-1.5 rounded-lg text-xs">
            <span className="font-mono font-black text-[#D97706] text-xs w-6">{index + 1}.</span>
            <input
              type="text"
              value={term}
              onChange={(e) => updateTermText(index, e.target.value)}
              className="flex-1 bg-transparent border-none text-xs font-semibold text-[#2D2A26] focus:outline-none"
            />
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0}
                className="p-1 rounded hover:bg-black/10 disabled:opacity-20 cursor-pointer"
                title="Move up in sequence"
              >
                <ChevronUp className="w-3.5 h-3.5 text-[#2D2A26]" />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 'down')}
                disabled={index === terms.length - 1}
                className="p-1 rounded hover:bg-black/10 disabled:opacity-20 cursor-pointer"
                title="Move down in sequence"
              >
                <ChevronDown className="w-3.5 h-3.5 text-[#2D2A26]" />
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="p-1 rounded hover:bg-red-100 text-[#2D2A26]/60 hover:text-red-600 cursor-pointer ml-1"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

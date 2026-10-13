import React from 'react';
import { Volume2, BookOpen, Trash2 } from 'lucide-react';
import { WordBreakdownItem } from './types';

interface Props {
  item: WordBreakdownItem;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export const WordIngestionRow: React.FC<Props> = ({ item, onToggleSelect, onRemove }) => (
  <div className={`p-3.5 rounded-xl border transition-all ${item.selected ? 'bg-white border-[#D97706]/40 shadow-xs' : 'bg-white/60 border-[#2D2A26]/10 opacity-75'}`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={item.selected ?? false}
          onChange={() => onToggleSelect(item.id)}
          className="mt-1 w-4 h-4 rounded text-[#D97706] focus:ring-[#D97706] border-gray-300 cursor-pointer"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-bold text-[#2D2A26]">{item.term}</h4>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-[#D97706] border border-amber-500/20">
              <Volume2 className="w-3 h-3" />
              {item.phonetics}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.rootBreakdown.map((morpheme, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                <BookOpen className="w-3 h-3 text-emerald-600" />
                <strong>{morpheme.part}</strong>
                <span className="text-emerald-700">({morpheme.origin || 'Greek/Latin'}: {morpheme.meaning})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="p-1 rounded text-[#2D2A26]/40 hover:text-red-600 hover:bg-red-50 cursor-pointer"
        title="Remove term"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

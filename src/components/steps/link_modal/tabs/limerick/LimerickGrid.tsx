import React from 'react';
import { LimerickItem } from './types';
import { LimerickCard } from './LimerickCard';
import { Sparkles, BookmarkCheck } from 'lucide-react';

interface Props {
  items: LimerickItem[];
  onSelect: (id: string) => void;
  onAttach: (item: LimerickItem) => void;
  onAttachAllSelected: () => void;
}

export const LimerickGrid: React.FC<Props> = ({ items, onSelect, onAttach, onAttachAllSelected }) => {
  const selectedCount = items.filter(it => it.selected).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-[#2D2A26] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Generated Verse Studio (4 Options)
        </h4>
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onAttachAllSelected}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 cursor-pointer shadow-2xs"
          >
            <BookmarkCheck className="w-3.5 h-3.5" /> Attach Selected ({selectedCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <LimerickCard key={item.id} item={item} onSelect={onSelect} onAttach={onAttach} />
        ))}
      </div>
    </div>
  );
};

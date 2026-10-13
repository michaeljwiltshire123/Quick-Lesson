import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { ALL_SEARCHABLE_STICKERS, StickerItem } from './stickerData';

interface StickerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSticker: (sticker: StickerItem) => void;
}

export const StickerSearchModal: React.FC<StickerSearchModalProps> = ({
  isOpen, onClose, onSelectSticker,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = ALL_SEARCHABLE_STICKERS.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase()) ||
    s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl space-y-4 border border-stone-200 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <h3 className="text-sm font-bold text-stone-800">Searchable Stickers & Emojis</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any sticker (e.g. rocket, star, books, atom, clock, heart)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 font-medium"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto grid grid-cols-6 gap-2 p-1">
          {filtered.map((stk) => (
            <button
              key={stk.id}
              type="button"
              onClick={() => { onSelectSticker(stk); onClose(); }}
              className="p-2 rounded-xl bg-stone-50 hover:bg-amber-100 hover:scale-110 border border-stone-200/70 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group"
              title={stk.name}
            >
              <span className="text-2xl">{stk.emoji}</span>
              <span className="text-[9px] text-stone-600 truncate w-full text-center group-hover:text-amber-950 font-medium">
                {stk.name}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-6 py-6 text-center text-xs text-stone-400">
              No matching stickers found. Try searching for "science", "idea", "star", or "maths".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { Search, Plus, Atom, BookOpen, Compass, Calculator, Palette, Globe2, Music, Microscope } from 'lucide-react';

interface CurriculumIconPickerProps {
  onInsertMedia: (newElement: SlideElement) => void;
  onClose: () => void;
}

const PRESET_ICONS = [
  { name: 'Atom (Physics/Chemistry)', icon: Atom, symbol: '⚛️', category: 'Science' },
  { name: 'Microscope (Biology)', icon: Microscope, symbol: '🔬', category: 'Science' },
  { name: 'Calculator (Maths)', icon: Calculator, symbol: '🧮', category: 'Maths' },
  { name: 'Compass (Geometry/Geography)', icon: Compass, symbol: '🧭', category: 'STEM' },
  { name: 'Book & Quill (English/Lit)', icon: BookOpen, symbol: '📖', category: 'Humanities' },
  { name: 'World Globe (History/Geog)', icon: Globe2, symbol: '🌍', category: 'Humanities' },
  { name: 'Palette (Fine Art/Design)', icon: Palette, symbol: '🎨', category: 'Arts' },
  { name: 'Music Note (Performing Arts)', icon: Music, symbol: '🎵', category: 'Arts' },
];

export const CurriculumIconPicker: React.FC<CurriculumIconPickerProps> = ({ onInsertMedia, onClose }) => {
  const [search, setSearch] = useState('');

  const filtered = PRESET_ICONS.filter((it) =>
    it.name.toLowerCase().includes(search.toLowerCase()) || it.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleInsertIcon = (item: typeof PRESET_ICONS[0]) => {
    const newElement: SlideElement = {
      id: `el-icon-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: 'text',
      x: 35,
      y: 35,
      width: 30,
      height: 25,
      content: `${item.symbol}\n${item.name.split(' ')[0]}`,
      meta: { isIconGraphic: true, iconName: item.name },
    };
    onInsertMedia(newElement);
    onClose();
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search curriculum symbols (e.g. Science, Maths)..."
          className="w-full text-xs pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
        {filtered.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleInsertIcon(item)}
              className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 text-left transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-amber-800">
                  <IconComp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-800 line-clamp-1">{item.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-stone-500">{item.category}</div>
                </div>
              </div>
              <Plus className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

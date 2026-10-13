import React, { useState } from 'react';
import { Search, Film, Palette } from 'lucide-react';
import { STYLE_PRESETS, StylePreset } from './presetData';

interface StylePresetGridProps {
  slideTitle?: string;
  onSelectPreset?: (preset: StylePreset) => void;
}

export const StylePresetGrid: React.FC<StylePresetGridProps> = ({ slideTitle = 'Classroom Concept', onSelectPreset }) => {
  const [activePreset, setActivePreset] = useState<StylePreset>(STYLE_PRESETS[0]);

  const handleSelect = (preset: StylePreset) => {
    setActivePreset(preset);
    if (onSelectPreset) onSelectPreset(preset);
  };

  const handleSearchImages = () => {
    const query = `${slideTitle} ${activePreset.searchSuffix}`.trim();
    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleSearchGifs = () => {
    const query = `${slideTitle} ${activePreset.searchSuffix}`.trim();
    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}&tbs=itp:animated`, '_blank');
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-[#2D2A26]/10 space-y-3.5 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-[#2D2A26] text-base">
          <Palette className="w-5 h-5 text-[#D97706]" />
          <span>8 Style Presets & Search Engine</span>
        </div>
        <span className="text-xs font-semibold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">Active: {activePreset.name}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STYLE_PRESETS.map((p) => {
          const isActive = activePreset.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelect(p)}
              className={`px-3 py-2 rounded-lg border text-left font-semibold text-sm transition-all cursor-pointer ${
                isActive ? 'bg-[#D97706]/10 border-[#D97706] text-[#D97706] font-bold shadow-2xs' : 'bg-[#F8F6F0]/60 border-[#2D2A26]/10 text-[#2D2A26] hover:bg-[#F8F6F0]'
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-3 pt-1">
        <button type="button" onClick={handleSearchImages} className="px-4 py-2 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/20 font-bold rounded-lg text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs">
          <Search className="w-4 h-4 text-[#D97706]" /> Search Images
        </button>
        <button type="button" onClick={handleSearchGifs} className="px-4 py-2 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/20 font-bold rounded-lg text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs">
          <Film className="w-4 h-4 text-purple-600" /> Search GIFs
        </button>
      </div>
    </div>
  );
};

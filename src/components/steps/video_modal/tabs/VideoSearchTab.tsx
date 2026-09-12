import React, { useState } from 'react';
import { Search, ExternalLink, Youtube, Sparkles } from 'lucide-react';
import { VIDEO_ARCHETYPES } from '../presetData';

interface VideoSearchTabProps {
  slideTitle: string;
}

export const VideoSearchTab: React.FC<VideoSearchTabProps> = ({ slideTitle }) => {
  const [selectedArchetype, setSelectedArchetype] = useState<string>(VIDEO_ARCHETYPES[0].label);
  const [customQuery, setCustomQuery] = useState<string>(slideTitle || '');

  const activeModifier = VIDEO_ARCHETYPES.find((a) => a.label === selectedArchetype)?.modifier || '';
  const fullSearchQuery = `${customQuery.trim()} ${activeModifier}`.trim();

  const handleLaunchYouTube = () => {
    if (!fullSearchQuery) return;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(fullSearchQuery)}&sp=EgIYAQ%3D%3D`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#2D2A26] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            Pedagogical Video Archetypes
          </label>
          <span className="text-[10px] font-bold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            ⏱️ &lt; 3 mins filter
          </span>
        </div>
        <p className="text-[11px] text-[#2D2A26]/60">
          Select an archetype to tune YouTube educational algorithms for targeted classroom hooks:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {VIDEO_ARCHETYPES.map((arch) => {
            const isSelected = selectedArchetype === arch.label;
            return (
              <button
                key={arch.label}
                type="button"
                onClick={() => setSelectedArchetype(arch.label)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#F59E0B] text-white border-amber-600 shadow-2xs'
                    : 'bg-white text-[#2D2A26]/75 border-[#2D2A26]/15 hover:border-[#D97706]/40 hover:bg-[#F8F6F0]'
                }`}
              >
                {arch.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#2D2A26]">Lesson Topic / Keyword</label>
        <div className="relative">
          <Search className="w-4 h-4 text-[#2D2A26]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="e.g. Newton's Third Law, Mitosis, Supply & Demand"
            className="w-full text-xs bg-white border border-[#2D2A26]/15 rounded-xl pl-9 pr-3 py-2.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
          />
        </div>
      </div>

      <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#2D2A26]/10 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#2D2A26]/70">
          <span className="font-semibold">Constructed YouTube Query:</span>
          <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#2D2A26]/10 truncate max-w-[240px]">
            {fullSearchQuery}
          </span>
        </div>
        <button
          type="button"
          onClick={handleLaunchYouTube}
          className="w-full py-2.5 px-4 bg-[#CC0000] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Youtube className="w-4 h-4" />
          <span>Launch YouTube Search in New Tab</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </div>
  );
};

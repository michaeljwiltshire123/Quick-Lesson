import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export type VideoModalTabKey = 'search' | 'ai_lab';

interface VideoModalTabBarProps {
  activeTab: VideoModalTabKey;
  onSelectTab: (tab: VideoModalTabKey) => void;
}

export const VideoModalTabBar: React.FC<VideoModalTabBarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div className="bg-[#F4F1EA] px-4 py-3 border-b border-[#2D2A26]/10 shrink-0">
      <div className="flex p-1.5 bg-[#E8E3D8] rounded-xl border border-[#2D2A26]/10 gap-2" role="tablist" aria-label="Video Resource Modes">
        <button
          type="button"
          role="tab"
          id="tab-video-search"
          aria-selected={activeTab === 'search'}
          aria-controls="panel-video-search"
          onClick={() => onSelectTab('search')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.99] ${
            activeTab === 'search'
              ? 'bg-white text-[#2D2A26] shadow-sm border border-[#2D2A26]/15 ring-1 ring-[#2D2A26]/5'
              : 'text-[#2D2A26]/65 hover:text-[#2D2A26] hover:bg-white/60 border border-transparent'
          }`}
        >
          <Search className={`w-4 h-4 shrink-0 transition-colors ${activeTab === 'search' ? 'text-[#D97706]' : 'text-[#2D2A26]/40'}`} />
          <span className="whitespace-nowrap">Quick Search & Details</span>
          {activeTab === 'search' && (
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 shrink-0 hidden sm:inline-block">
              Active Tab
            </span>
          )}
        </button>

        <button
          type="button"
          role="tab"
          id="tab-video-ai-lab"
          aria-selected={activeTab === 'ai_lab'}
          aria-controls="panel-video-ai-lab"
          onClick={() => onSelectTab('ai_lab')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-[0.99] ${
            activeTab === 'ai_lab'
              ? 'bg-white text-[#2D2A26] shadow-sm border border-[#2D2A26]/15 ring-1 ring-[#2D2A26]/5'
              : 'text-[#2D2A26]/65 hover:text-[#2D2A26] hover:bg-white/60 border border-transparent'
          }`}
        >
          <Sparkles className={`w-4 h-4 shrink-0 transition-colors ${activeTab === 'ai_lab' ? 'text-[#D97706]' : 'text-[#2D2A26]/40'}`} />
          <span className="whitespace-nowrap">AI Video Lab</span>
          {activeTab === 'ai_lab' && (
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 shrink-0 hidden sm:inline-block">
              Active Tab
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

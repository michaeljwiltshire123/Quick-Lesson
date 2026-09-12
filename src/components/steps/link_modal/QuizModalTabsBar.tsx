import React from 'react';
import { Sliders, Layers, Compass, Sparkles, Puzzle, Feather } from 'lucide-react';

export type QuizModalTab = 'setup' | 'breakdown' | 'words' | 'loci' | 'payloads' | 'limerick';

interface Props {
  activeTab: QuizModalTab;
  onChangeTab: (tab: QuizModalTab) => void;
}

export const QuizModalTabsBar: React.FC<Props> = ({ activeTab, onChangeTab }) => (
  <div className="flex items-center gap-1 bg-[#E8E3D8]/90 border-b border-[#2D2A26]/10 px-3 py-2 shrink-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button type="button" onClick={() => onChangeTab('setup')} className={`px-2.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all shrink-0 ${activeTab === 'setup' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'}`}><Sliders className="w-3.5 h-3.5 text-[#D97706]" /> Link &amp; QR</button>
    <button type="button" onClick={() => onChangeTab('breakdown')} className={`px-2.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all shrink-0 ${activeTab === 'breakdown' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'}`}><Layers className="w-3.5 h-3.5 text-[#D97706]" /> Concept Breakdown</button>
    <button type="button" onClick={() => onChangeTab('words')} className={`px-2.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all shrink-0 ${activeTab === 'words' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'}`}><Puzzle className="w-3.5 h-3.5 text-[#D97706]" /> Word Puzzles</button>
    <button type="button" onClick={() => onChangeTab('limerick')} className={`px-2.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all shrink-0 ${activeTab === 'limerick' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'}`}><Feather className="w-3.5 h-3.5 text-[#D97706]" /> Rhymes &amp; Limericks</button>
    <button type="button" onClick={() => onChangeTab('loci')} className={`px-2.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all shrink-0 ${activeTab === 'loci' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/15' : 'text-[#2D2A26]/70 hover:bg-white/50'}`}><Compass className="w-3.5 h-3.5 text-[#D97706]" /> Loci Generator</button>
    <button type="button" onClick={() => onChangeTab('payloads')} className={`px-2.5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all shrink-0 ${activeTab === 'payloads' ? 'bg-white text-[#2D2A26] shadow-2xs border border-[#2D2A26]/20' : 'text-[#2D2A26]/70 hover:bg-white/50'}`}><Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Quiz Maker</button>
  </div>
);

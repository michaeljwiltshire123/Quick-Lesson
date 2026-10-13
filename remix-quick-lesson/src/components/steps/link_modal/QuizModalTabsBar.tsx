import React from 'react';
import { Sliders, Layers, Compass, Sparkles, Puzzle, Feather, Lightbulb, BarChart2 } from 'lucide-react';

export type QuizModalTab = 'setup' | 'breakdown' | 'words' | 'acronym' | 'loci' | 'payloads' | 'limerick' | 'poll';

interface Props {
  activeTab: QuizModalTab;
  onChangeTab: (tab: QuizModalTab) => void;
}

interface TabItem {
  id: QuizModalTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROW_1: TabItem[] = [
  { id: 'setup', label: 'Link & QR', icon: Sliders },
  { id: 'breakdown', label: 'Concept Metaphor', icon: Layers },
  { id: 'acronym', label: 'Acronym Studio', icon: Lightbulb },
  { id: 'words', label: 'Word Puzzles', icon: Puzzle },
];

const ROW_2: TabItem[] = [
  { id: 'limerick', label: 'Rhymes & Limericks', icon: Feather },
  { id: 'loci', label: 'Loci Generator', icon: Compass },
  { id: 'payloads', label: 'Quiz Maker', icon: Sparkles },
  { id: 'poll', label: 'Interactive Poll', icon: BarChart2 },
];

export const QuizModalTabsBar: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  const renderPill = (tab: TabItem) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;
    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => onChangeTab(tab.id)}
        className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-all shadow-2xs border ${
          isActive
            ? 'bg-white text-[#2D2A26] border-[#F59E0B] shadow-xs'
            : 'bg-[#F8F6F0]/90 hover:bg-white text-[#2D2A26]/75 hover:text-[#2D2A26] border-[#2D2A26]/15'
        }`}
      >
        <Icon className={`w-3 h-3 ${isActive ? 'text-[#D97706]' : 'text-[#D97706]/80'}`} />
        <span>{tab.label}</span>
      </button>
    );
  };

  return (
    <div className="bg-[#EFECE6] border-b border-[#2D2A26]/10 px-3.5 py-2 shrink-0 flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 flex-wrap">
        {ROW_1.map(renderPill)}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {ROW_2.map(renderPill)}
      </div>
    </div>
  );
};

import React from 'react';
import { Layers, KeyRound, CheckSquare } from 'lucide-react';
import { SummativeTabKey } from './typesSummative';

interface Props {
  activeTab: SummativeTabKey;
  onSelectTab: (tab: SummativeTabKey) => void;
}

interface TabConfig {
  key: SummativeTabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isComingSoon?: boolean;
}

const TABS: TabConfig[] = [
  { key: 'performance_tasks', label: '20-Min Performance Tasks', icon: Layers },
  { key: 'summative_quiz', label: 'Summative Quiz', icon: CheckSquare },
  { key: 'escape_room', label: 'Escape Room', icon: KeyRound },
];

export const SummativeHubTabBar: React.FC<Props> = ({ activeTab, onSelectTab }) => (
  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15">
    {TABS.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.key;
      return (
        <button
          key={tab.key}
          type="button"
          disabled={tab.isComingSoon}
          onClick={() => onSelectTab(tab.key)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            isActive
              ? 'bg-[#2D2A26] text-white shadow-xs'
              : tab.isComingSoon
              ? 'bg-transparent text-[#2D2A26]/40 cursor-not-allowed'
              : 'bg-white text-[#2D2A26] hover:bg-black/5 border border-[#2D2A26]/10 cursor-pointer'
          }`}
        >
          <Icon className={`w-4 h-4 ${isActive ? 'text-[#F59E0B]' : 'text-current opacity-70'}`} />
          <span>{tab.label}</span>
          {tab.isComingSoon && (
            <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-[#2D2A26]/10 text-[#2D2A26]/60">
              Coming Soon
            </span>
          )}
        </button>
      );
    })}
  </div>
);

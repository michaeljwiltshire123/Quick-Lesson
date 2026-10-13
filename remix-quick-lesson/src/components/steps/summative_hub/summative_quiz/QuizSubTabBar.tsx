import React from 'react';
import { CheckSquare, Trophy, Zap, Users, Grid, MessageSquare } from 'lucide-react';

export type QuizSubTabKey =
  | 'plain'
  | 'ladder'
  | 'competitive'
  | 'imposter'
  | 'blockbusters'
  | 'dont_say_it';

export const TAB_TITLES: Record<QuizSubTabKey, string> = {
  plain: 'Plain Quiz',
  ladder: 'Ladder Quiz',
  competitive: 'Battle Quiz',
  imposter: 'Imposter',
  blockbusters: 'GridLock',
  dont_say_it: 'Dont Say it',
};

interface TabConfig {
  key: QuizSubTabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isComingSoon?: boolean;
}

const SUB_TABS: TabConfig[] = [
  { key: 'plain', label: 'Plain quiz', icon: CheckSquare },
  { key: 'ladder', label: 'Ladder quiz', icon: Trophy },
  { key: 'imposter', label: 'Imposter', icon: Users },
  { key: 'blockbusters', label: 'GridLock', icon: Grid },
  { key: 'competitive', label: 'Battle Quiz', icon: Zap },
  { key: 'dont_say_it', label: "Don't Say It!", icon: MessageSquare },
];

interface Props {
  activeSubTab: QuizSubTabKey;
  onSelectSubTab: (tab: QuizSubTabKey) => void;
}

export const QuizSubTabBar: React.FC<Props> = ({ activeSubTab, onSelectSubTab }) => (
  <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 overflow-x-auto">
    {SUB_TABS.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeSubTab === tab.key;
      return (
        <button
          key={tab.key}
          type="button"
          onClick={() => onSelectSubTab(tab.key)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            isActive
              ? 'bg-[#2D2A26] text-white shadow-xs'
              : 'bg-white text-[#2D2A26] hover:bg-black/5 border border-[#2D2A26]/10'
          }`}
        >
          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F59E0B]' : 'text-current opacity-70'}`} />
          <span>{tab.label}</span>
          {tab.isComingSoon && (
            <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 ml-0.5">
              Coming Soon
            </span>
          )}
        </button>
      );
    })}
  </div>
);

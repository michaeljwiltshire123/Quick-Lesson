import React from 'react';
import { Flag, Target, Clock, CheckCircle2, CornerDownRight, Trophy } from 'lucide-react';

export type SimulatorScreenMode = 'lobby' | 'picking' | 'answering' | 'correct' | 'bounce' | 'debrief';

interface Props {
  activeScreen: SimulatorScreenMode;
  onSelectScreen: (screen: SimulatorScreenMode) => void;
}

export const SimulatorScreenTabs: React.FC<Props> = ({ activeScreen, onSelectScreen }) => {
  const tabs: { id: SimulatorScreenMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'lobby', label: '1. Beginning Lobby', icon: Flag },
    { id: 'picking', label: '2. Picking Hexagon', icon: Target },
    { id: 'answering', label: '3. 30s Challenge', icon: Clock },
    { id: 'correct', label: '4. Question Right', icon: CheckCircle2 },
    { id: 'bounce', label: '5. Question Wrong (No Retry)', icon: CornerDownRight },
    { id: 'debrief', label: '6. After-Game / Reteach', icon: Trophy },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-black/50 rounded-2xl border border-white/10 scrollbar-thin">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectScreen(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all border ${
              isActive
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md scale-102'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

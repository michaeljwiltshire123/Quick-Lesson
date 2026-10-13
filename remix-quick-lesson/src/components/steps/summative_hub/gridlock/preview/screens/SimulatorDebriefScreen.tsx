import React from 'react';
import { Trophy, Star, Sparkles, RefreshCw } from 'lucide-react';
import { GridlockReteachCard } from '../../analytics/GridlockReteachCard';
import { useGridlockAnalyticsData } from '../../analytics/useGridlockAnalyticsData';
import { GridlockQuestion, TeamColor } from '../../types/gridlockTypes';

interface Props {
  lessonTitle: string;
  questions: GridlockQuestion[];
  winningTeam: TeamColor;
  onRestartMatch: () => void;
}

export const SimulatorDebriefScreen: React.FC<Props> = ({
  lessonTitle,
  questions,
  winningTeam,
  onRestartMatch,
}) => {
  const analytics = useGridlockAnalyticsData(questions, lessonTitle);
  const isRed = winningTeam === 'red';

  return (
    <div className="bg-[#1A1816] p-5 sm:p-6 rounded-3xl border-2 border-amber-500/30 shadow-2xl max-w-4xl mx-auto space-y-5 text-white animate-in zoom-in-95">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
          <div>
            <h2 className="text-base sm:text-lg font-black uppercase text-amber-300">
              {isRed ? 'RED SQUAD VICTORY!' : 'BLUE SQUAD VICTORY!'}
            </h2>
            <div className="text-[11px] text-gray-400">Match Bridge Complete • Final Podium & AI Reteach Coach</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onRestartMatch}
          className="py-2 px-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" /> <span>Play Next Match</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center space-y-1">
          <Star className="w-5 h-5 text-amber-400 mx-auto fill-amber-400" />
          <div className="text-[10px] uppercase font-bold text-gray-400">MVP Performer</div>
          <div className="text-xs font-black text-amber-300">Sophie T. (140 pts)</div>
        </div>
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-1">
          <Sparkles className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] uppercase font-bold text-gray-400">Average Class Accuracy</div>
          <div className="text-xs font-black text-emerald-300">{analytics.averageAccuracy}% Cohort Pass</div>
        </div>
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-center space-y-1">
          <Trophy className="w-5 h-5 text-blue-400 mx-auto" />
          <div className="text-[10px] uppercase font-bold text-gray-400">Hexagons Captured</div>
          <div className="text-xs font-black text-blue-300">{analytics.totalCapturedHexes} / 25 Nodes</div>
        </div>
      </div>

      {/* AI Concept Reteach Coach Card */}
      <div className="text-black">
        <GridlockReteachCard entries={analytics.entries} lessonTitle={lessonTitle} />
      </div>
    </div>
  );
};

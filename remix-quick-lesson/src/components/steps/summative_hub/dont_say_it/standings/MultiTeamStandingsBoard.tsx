import React from 'react';
import { TeamConfig } from '../types/dontSayItTypes';
import { ScoreRollUpCounter } from './ScoreRollUpCounter';
import { Trophy, Zap, Flame, Crown } from 'lucide-react';

interface Props {
  teams: TeamConfig[];
  activeTeamId: string;
  pointsAdded: number;
}

export const MultiTeamStandingsBoard: React.FC<Props> = ({ teams, activeTeamId, pointsAdded }) => {
  // Sort teams descending by score
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...teams.map((t) => t.score), 1000);

  return (
    <div className="bg-slate-900 border-2 border-white/10 rounded-3xl p-4 sm:p-5 space-y-3 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-black uppercase tracking-wider text-white">Current Standings & Scores</span>
        </div>
        <span className="text-[10px] text-gray-400 font-bold uppercase">{teams.length} Squads Competing</span>
      </div>

      <div className="space-y-2">
        {sortedTeams.map((team, index) => {
          const isCurrentActive = team.id === activeTeamId;
          const previousScore = isCurrentActive ? Math.max(0, team.score - pointsAdded) : team.score;
          const percent = Math.min(100, Math.round((team.score / maxScore) * 100));

          return (
            <div
              key={team.id}
              className={`p-3 rounded-2xl border transition-all ${
                isCurrentActive
                  ? 'bg-amber-500/15 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-black/40 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    index === 0 ? 'bg-amber-400 text-slate-950 shadow-xs' : 'bg-slate-800 text-gray-300'
                  }`}>
                    {index === 0 ? <Crown className="w-3.5 h-3.5 fill-current" /> : index + 1}
                  </span>
                  <span className="text-sm font-black text-white">{team.name}</span>
                  {index === 0 && (
                    <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-md text-[10px] font-bold border border-amber-400/30 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> 1st Place
                    </span>
                  )}
                  {isCurrentActive && pointsAdded > 0 && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-md text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-emerald-400" /> +{pointsAdded} Pts
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-base font-black">
                    {isCurrentActive && pointsAdded > 0 ? (
                      <ScoreRollUpCounter fromScore={previousScore} toScore={team.score} />
                    ) : (
                      <span className="font-mono text-white">{team.score.toLocaleString()}</span>
                    )}
                    <span className="text-[10px] text-gray-400 font-bold ml-1">pts</span>
                  </div>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    index === 0 ? 'bg-amber-400' : isCurrentActive ? 'bg-emerald-400' : 'bg-blue-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

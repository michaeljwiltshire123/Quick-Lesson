import React from 'react';
import { Medal, Crown, Star } from 'lucide-react';

export interface MvpRankEntry {
  rank: 1 | 2 | 3;
  studentName: string;
  team: 'red' | 'blue';
  score: number;
  fastestResponseSec: number;
}

interface Props {
  title?: string;
  isTournamentChampionView?: boolean;
  mvps: MvpRankEntry[];
}

export const MvpPodiumCard: React.FC<Props> = ({
  title = 'Game MVP Leaderboard',
  isTournamentChampionView = false,
  mvps,
}) => {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-amber-100 text-amber-900 border-amber-400';
      case 2:
        return 'bg-slate-200 text-slate-800 border-slate-400';
      case 3:
      default:
        return 'bg-amber-700/20 text-amber-900 border-amber-700/40';
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2D2A26]/10 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-[#2D2A26] uppercase tracking-wider flex items-center gap-1.5">
          {isTournamentChampionView ? (
            <Crown className="w-4 h-4 text-amber-500" />
          ) : (
            <Star className="w-4 h-4 text-[#F59E0B]" />
          )}
          {title}
        </h4>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8F6F0] text-gray-600">
          Top Performers
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {mvps.slice(0, 3).map((mvp) => {
          const isRed = mvp.team === 'red';
          return (
            <div
              key={`mvp-${mvp.rank}-${mvp.studentName}`}
              className={`p-3 rounded-xl border flex flex-col items-center text-center ${getMedalColor(
                mvp.rank
              )}`}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs mb-1.5 shadow-xs bg-white">
                {mvp.rank}
              </div>
              <div className="text-xs font-black truncate max-w-[120px]">{mvp.studentName}</div>
              <span
                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full mt-1 ${
                  isRed ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {isRed ? 'Red Team' : 'Blue Team'}
              </span>
              <div className="text-[10px] opacity-80 mt-1">
                {mvp.score} pts • {mvp.fastestResponseSec}s avg
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

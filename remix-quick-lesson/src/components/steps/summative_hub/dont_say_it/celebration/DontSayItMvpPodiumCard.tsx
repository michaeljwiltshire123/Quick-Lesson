import React from 'react';
import { Player } from '../types/dontSayItTypes';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

interface Props {
  players: Player[];
  title?: string;
}

export const DontSayItMvpPodiumCard: React.FC<Props> = ({
  players,
  title = 'Student MVP Leaderboard',
}) => {
  const sorted = [...players]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 3);

  const ranks = [
    { rank: 1, label: '1st MVP', icon: Crown, color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-400' },
    { rank: 2, label: '2nd Place', icon: Trophy, color: 'text-slate-300', bg: 'bg-slate-400/20 border-slate-300' },
    { rank: 3, label: '3rd Place', icon: Medal, color: 'text-amber-600', bg: 'bg-amber-700/20 border-amber-600' },
  ];

  return (
    <div className="bg-[#2D2A26] text-white p-5 rounded-3xl border border-white/10 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-black uppercase tracking-wider">{title}</h4>
        </div>
        <span className="text-[10px] text-gray-400 uppercase font-bold">Top Clue Masters</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {ranks.map((r, idx) => {
          const p = sorted[idx];
          const Icon = r.icon;
          return (
            <div
              key={r.rank}
              className={`p-3.5 rounded-2xl border flex flex-col items-center text-center space-y-1.5 ${r.bg}`}
            >
              <div className={`w-8 h-8 rounded-full bg-black/40 flex items-center justify-center ${r.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-[9px] font-black uppercase tracking-wider opacity-80">{r.label}</div>
              <div className="text-xs font-black truncate max-w-full">{p?.name || 'Pupil'}</div>
              <div className="text-xs font-mono font-black text-amber-400">{p?.score || 850 - idx * 150} pts</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

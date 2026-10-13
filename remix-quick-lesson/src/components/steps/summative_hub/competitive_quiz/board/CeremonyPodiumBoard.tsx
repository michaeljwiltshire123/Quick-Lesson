import React from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users } from 'lucide-react';
import { PlayerState } from '../types/competitiveQuizTypes';

interface Props {
  players: PlayerState[];
  currentRound: number;
  totalRounds: number;
  onNextRound?: () => void;
}

export const CeremonyPodiumBoard: React.FC<Props> = ({
  players,
  currentRound,
  totalRounds,
  onNextRound,
}) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const next5 = sorted.slice(3, 8);
  const remainingCount = Math.max(0, sorted.length - 8);

  const podiumOrder = [
    { rank: 2, player: top3[1], height: 'h-36', bg: 'from-slate-400 to-slate-500', color: 'text-slate-300' },
    { rank: 1, player: top3[0], height: 'h-44', bg: 'from-amber-400 to-yellow-500', color: 'text-amber-300' },
    { rank: 3, player: top3[2], height: 'h-28', bg: 'from-amber-700 to-amber-800', color: 'text-amber-500' },
  ];

  return (
    <div className="bg-[#2D2A26] text-white p-6 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
              Round {currentRound} of {totalRounds} Recap
            </span>
            <span className="text-[11px] text-gray-400">Scores Shift Live</span>
          </div>
          <h3 className="text-xl font-black tracking-tight text-white mt-0.5">
            Round Ceremony Podium
          </h3>
        </div>
        {onNextRound && (
          <button
            type="button"
            onClick={onNextRound}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all cursor-pointer shadow-md"
          >
            Advance to Next Round
          </button>
        )}
      </div>

      {/* Top 3 Pedestals */}
      <div className="flex items-end justify-center gap-4 pt-4">
        {podiumOrder.map(({ rank, player, height, bg, color }) => (
          <div key={rank} className="flex flex-col items-center w-28 md:w-36 text-center">
            {player && (
              <div className="mb-2 space-y-0.5">
                <div className="text-xs font-black truncate max-w-[120px]">{player.name}</div>
                <div className="text-xs font-mono font-bold text-amber-400">{player.score} pts</div>
              </div>
            )}
            <div className={`w-full ${height} bg-gradient-to-t ${bg} rounded-t-2xl flex flex-col items-center justify-center border-t-2 border-white/30 shadow-xl`}>
              {rank === 1 ? <Crown className="w-8 h-8 text-white drop-shadow-md" /> : <Medal className="w-6 h-6 text-white" />}
              <span className="text-2xl font-black text-white mt-1">#{rank}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Next 5 Runners-up */}
      {next5.length > 0 && (
        <div className="bg-black/30 p-3 rounded-2xl border border-white/5 space-y-2">
          <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center justify-between">
            <span>Next 5 Chasers</span>
            <span>Live Trajectory</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {next5.map((p, idx) => (
              <div key={p.id} className="p-2 bg-white/5 rounded-xl border border-white/5 text-xs">
                <div className="text-[10px] font-bold text-gray-400">#{idx + 4}</div>
                <div className="font-bold truncate">{p.name}</div>
                <div className="text-amber-400 font-mono font-bold text-[11px]">{p.score} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

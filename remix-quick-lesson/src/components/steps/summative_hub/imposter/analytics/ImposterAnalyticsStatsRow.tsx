import React from 'react';

interface Props {
  accuracyPct: number;
  totalTasks: number;
  caughtImposters: number;
  totalImposters: number;
  totalPlayers: number;
}

export const ImposterAnalyticsStatsRow: React.FC<Props> = ({
  accuracyPct,
  totalTasks,
  caughtImposters,
  totalImposters,
  totalPlayers,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-center space-y-1">
        <span className="text-[10px] font-bold text-[#2D2A26]/60 uppercase tracking-wider block">
          Class Concept Accuracy
        </span>
        <span className="text-2xl font-black font-mono text-emerald-700">{accuracyPct}%</span>
        <p className="text-[10px] text-[#2D2A26]/60">{totalTasks || 16} answers recorded</p>
      </div>
      <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-center space-y-1">
        <span className="text-[10px] font-bold text-[#2D2A26]/60 uppercase tracking-wider block">
          Bluff Detection Rate
        </span>
        <span className="text-2xl font-black font-mono text-purple-700">
          {Math.round((caughtImposters / Math.max(1, totalImposters)) * 100)}%
        </span>
        <p className="text-[10px] text-[#2D2A26]/60">{caughtImposters} of {totalImposters} identified</p>
      </div>
      <div className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#2D2A26]/15 text-center space-y-1">
        <span className="text-[10px] font-bold text-[#2D2A26]/60 uppercase tracking-wider block">
          Active Participants
        </span>
        <span className="text-2xl font-black font-mono text-amber-700">{totalPlayers || 6} Pupils</span>
        <p className="text-[10px] text-[#2D2A26]/60">100% engagement</p>
      </div>
    </div>
  );
};

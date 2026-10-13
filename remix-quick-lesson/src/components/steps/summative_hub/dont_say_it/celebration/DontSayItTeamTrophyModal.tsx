import React from 'react';
import { TeamConfig, Player } from '../types/dontSayItTypes';
import { DontSayItMvpPodiumCard } from './DontSayItMvpPodiumCard';
import { Trophy, Sparkles, RotateCcw, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  winningTeam: TeamConfig;
  allTeams: TeamConfig[];
  players: Player[];
  onOpenSummaryReport: () => void;
  onPlayAgain: () => void;
}

export const DontSayItTeamTrophyModal: React.FC<Props> = ({
  isOpen,
  winningTeam,
  allTeams,
  players,
  onOpenSummaryReport,
  onPlayAgain,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white w-full max-w-xl rounded-3xl p-6 sm:p-8 border-2 border-amber-400/60 shadow-2xl space-y-6 text-center animate-in zoom-in-95">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 text-amber-400 mx-auto flex items-center justify-center shadow-2xl animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Classroom Champions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {winningTeam.name} WINS!
          </h2>
          <p className="text-sm text-slate-300">
            Finished top of the leaderboard with <span className="font-mono font-black text-amber-400">{winningTeam.score}</span> total points.
          </p>
        </div>

        {/* MVP Podium */}
        <DontSayItMvpPodiumCard players={players} title="Match MVP Clue Masters" />

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onOpenSummaryReport}
            className="py-3 px-5 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>View Debrief Report</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="py-3 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play New Match</span>
          </button>
        </div>
      </div>
    </div>
  );
};

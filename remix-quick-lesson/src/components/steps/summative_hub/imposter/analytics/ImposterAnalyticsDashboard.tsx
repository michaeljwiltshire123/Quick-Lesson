import React from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import { Player, ImposterQuestion } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import { ImposterMasteryHeatmapCard } from './ImposterMasteryHeatmapCard';
import { ImposterReteachCoachCard } from './ImposterReteachCoachCard';
import { ImposterTargetedInterventionsCard } from './ImposterTargetedInterventionsCard';
import { ImposterAnalyticsStatsRow } from './ImposterAnalyticsStatsRow';

interface Props {
  lessonTitle: string;
  players: Player[];
  chunks?: LessonChunk[];
  questions?: ImposterQuestion[];
  roundsPlayed?: number;
  onPlayAgain?: () => void;
  onClose?: () => void;
}

export const ImposterAnalyticsDashboard: React.FC<Props> = ({
  lessonTitle, players = [], chunks = [], questions = [], roundsPlayed = 1, onPlayAgain, onClose,
}) => {
  const imposters = players.filter((p) => p.role === 'imposter');
  const innocents = players.filter((p) => p.role === 'innocent');
  const caughtImposters = imposters.filter((p) => !p.isAlive).length;
  const totalTasks = players.reduce((acc, p) => acc + (p.completedTasks || 0), 0);
  const accuracyPct = Math.round(
    innocents.length > 0
      ? (innocents.reduce((acc, p) => acc + p.score, 0) / Math.max(1, innocents.length * 15)) * 100
      : 76
  );

  return (
    <div id="imposter-analytics-dashboard" className="max-w-4xl mx-auto p-6 bg-white rounded-3xl border border-[#2D2A26]/15 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2D2A26]/10 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Post-Quiz Diagnostic Suite
          </span>
          <h2 className="text-xl font-black text-[#2D2A26] mt-1">{lessonTitle || 'Lesson'} • Game Debrief</h2>
          <p className="text-xs text-[#2D2A26]/60">
            {roundsPlayed} {roundsPlayed === 1 ? 'Round' : 'Rounds'} Completed • {caughtImposters} of {imposters.length} Imposters Unmasked
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-amber-300" />
            <span>Print Debrief Report</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 border border-[#2D2A26]/20 hover:bg-black/5 text-[#2D2A26] rounded-xl text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <ImposterAnalyticsStatsRow
        accuracyPct={accuracyPct}
        totalTasks={totalTasks}
        caughtImposters={caughtImposters}
        totalImposters={imposters.length}
        totalPlayers={players.length}
      />

      <ImposterMasteryHeatmapCard chunks={chunks} questions={questions} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <ImposterReteachCoachCard lessonTitle={lessonTitle} />
        <ImposterTargetedInterventionsCard players={players} />
      </div>

      {onPlayAgain && (
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={onPlayAgain}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" /> Play Next Game
          </button>
        </div>
      )}
    </div>
  );
};

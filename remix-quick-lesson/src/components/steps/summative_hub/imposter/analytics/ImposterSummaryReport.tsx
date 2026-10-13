import React from 'react';
import { Award, Printer, RotateCcw, Ghost } from 'lucide-react';
import { Player } from '../types/imposterTypes';
import { ConceptMasteryMetrics } from './ConceptMasteryMetrics';

interface Props {
  lessonTitle: string;
  roundsPlayed: number;
  players: Player[];
  onPlayAgain: () => void;
  onClose?: () => void;
}

export const ImposterSummaryReport: React.FC<Props> = ({
  lessonTitle,
  roundsPlayed,
  players,
  onPlayAgain,
}) => {
  const imposters = players.filter((p) => p.role === 'imposter');
  const allImpostersCaught = imposters.every((p) => !p.isAlive);
  const totalTasks = players.reduce((acc, p) => acc + (p.completedTasks || 0), 0);
  const ghosts = players.filter((p) => !p.isAlive && p.role !== 'imposter');

  const topicLabel = lessonTitle || 'our lesson topic';
  const SAMPLE_MISCONCEPTIONS = [
    `Key details and concepts in ${topicLabel}`,
    `Everyday examples of ${topicLabel}`,
  ];

  return (
    <div id="imposter-summary-report" className="max-w-2xl mx-auto p-6 bg-white rounded-3xl border border-[#2D2A26]/15 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Game Summary
          </span>
          <h2 className="text-lg font-black text-[#2D2A26] mt-1">{lessonTitle || 'Lesson'} • Game Summary</h2>
          <p className="text-xs text-[#2D2A26]/60">{roundsPlayed} {roundsPlayed === 1 ? 'Round' : 'Rounds'} Completed • {allImpostersCaught ? 'The team found all the imposters!' : 'The imposters stayed hidden!'}</p>
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${allImpostersCaught ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          <Award className="w-6 h-6" />
        </div>
      </div>

      <ConceptMasteryMetrics
        totalTasks={totalTasks || 12}
        correctTasks={Math.round((totalTasks || 12) * 0.75)}
        hijacksCount={imposters.length}
        misconceptions={SAMPLE_MISCONCEPTIONS}
      />

      {ghosts.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
            <Ghost className="w-4 h-4 text-purple-600" />
            <span>Ghost Helpers ({ghosts.length})</span>
          </div>
          <p className="text-xs text-purple-950">
            {ghosts.map((g) => g.name).join(', ')} wrote questions to help the group test their understanding.
          </p>
        </div>
      )}

      <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F8F6F0] hover:bg-stone-200 text-[#2D2A26] flex items-center gap-1.5 border border-[#2D2A26]/15 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> Print Game Summary
        </button>
        <button
          type="button"
          onClick={onPlayAgain}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Play Another Game
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ClimberProgress, QuestionSwapQueue, FallDiagnosticReport } from './typesLiveLadder';
import { LadderClimberLeaderboard } from './LadderClimberLeaderboard';
import { QuestionSwapSyncOverlay } from './QuestionSwapSyncOverlay';
import { LiveLadderQuestionCard } from './LiveLadderQuestionCard';
import { LadderQuizConfig } from '../typesLadder';
import { Download } from 'lucide-react';

interface Props {
  config: LadderQuizConfig;
  cohort: string;
  onNotice?: (msg: string) => void;
  onBack: () => void;
}

export const LiveLadderViewContainer: React.FC<Props> = ({ config, cohort, onNotice, onBack }) => {
  const [currentRungIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [swapQueue, setSwapQueue] = useState<QuestionSwapQueue | null>(null);
  const [climbers] = useState<ClimberProgress[]>([
    { id: 'c1', name: 'Alex T.', avatar: '🚀', currentRung: 3, score: 1500, shieldActive: true, eliminated: false, status: 'climbing' },
    { id: 'c2', name: 'Maya R.', avatar: '⭐', currentRung: 2, score: 300, shieldActive: false, eliminated: false, status: 'climbing' },
    { id: 'c3', name: 'Sam K.', avatar: '🦊', currentRung: 4, score: 3500, shieldActive: false, eliminated: false, status: 'climbing' },
  ]);

  const activeRung = config.rungs[currentRungIndex] || config.rungs[0];

  const handleExportDiagnostic = () => {
    const report: FallDiagnosticReport = {
      timestamp: new Date().toISOString(),
      cohort,
      failedRung: activeRung.rungNumber,
      misconceptionNotes: `Errors on Rung ${activeRung.rungNumber} (${activeRung.prompt}).`,
      recommendedIntervention: 'Revisit core concept card in next lesson starter.',
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ladder_diagnostics_${cohort.replace(/\s+/g, '_')}.json`;
    a.click();
    onNotice?.('Fall diagnostic report exported successfully.');
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Live Presentation Board</span>
          <h3 className="text-base font-bold text-[#2D2A26]">{config.title} ({cohort})</h3>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleExportDiagnostic}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D2A26] text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer">
            <Download className="w-3.5 h-3.5 text-amber-400" /><span>Diagnostics</span>
          </button>
          <button type="button" onClick={onBack}
            className="px-3 py-1.5 bg-[#F8F6F0] text-[#2D2A26] border border-[#2D2A26]/15 rounded-xl text-xs font-bold hover:bg-white cursor-pointer">
            Exit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <LiveLadderQuestionCard activeRung={activeRung} totalRungs={config.totalRungs} isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
            onQueueSwap={() => setSwapQueue({ pending: true, sourceRung: activeRung.rungNumber, newPrompt: 'Swap: ' + activeRung.prompt, newChoices: ['A', 'B', 'C', 'D'], newCorrectIndex: 0 })} />
        </div>
        <div>
          <LadderClimberLeaderboard climbers={climbers} totalRungs={config.totalRungs} skin={config.skin} currentRung={activeRung.rungNumber} />
        </div>
      </div>

      <QuestionSwapSyncOverlay queue={swapQueue} onExecuteSwap={() => setSwapQueue(null)} onCancelSwap={() => setSwapQueue(null)} />
    </div>
  );
};

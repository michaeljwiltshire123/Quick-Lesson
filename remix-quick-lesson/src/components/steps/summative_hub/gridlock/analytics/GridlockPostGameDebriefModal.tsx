import React from 'react';
import { GridlockAnalyticsDashboard } from './GridlockAnalyticsDashboard';
import { GridlockReteachCard } from './GridlockReteachCard';
import { useGridlockAnalyticsData } from './useGridlockAnalyticsData';
import { GridlockQuestion, TeamColor } from '../types/gridlockTypes';
import { X, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  lessonTitle: string;
  questions: GridlockQuestion[];
  winningTeam?: TeamColor;
  onClose: () => void;
  onNotice?: (msg: string) => void;
}

export const GridlockPostGameDebriefModal: React.FC<Props> = ({
  isOpen,
  lessonTitle,
  questions,
  winningTeam = 'red',
  onClose,
  onNotice,
}) => {
  const analytics = useGridlockAnalyticsData(questions, lessonTitle);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-[#FAF8F5] w-full max-w-5xl rounded-3xl border-2 border-[#2D2A26]/20 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-black uppercase text-[#2D2A26] tracking-wide">
              Post-Game Classroom Assessment & Debrief
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/5 hover:bg-black/10 transition-all text-[#2D2A26] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <GridlockAnalyticsDashboard
          lessonTitle={lessonTitle}
          winningTeam={winningTeam || analytics.winningTeam}
          averageAccuracy={analytics.averageAccuracy}
          totalCapturedHexes={analytics.totalCapturedHexes}
          totalMatchesPlayed={analytics.totalMatchesPlayed}
          entries={analytics.entries}
          onPrint={() => window.print()}
          onExportCsv={() => onNotice?.('Exported GridLock diagnostic CSV report!')}
        />

        <GridlockReteachCard entries={analytics.entries} lessonTitle={lessonTitle} />
      </div>
    </div>
  );
};


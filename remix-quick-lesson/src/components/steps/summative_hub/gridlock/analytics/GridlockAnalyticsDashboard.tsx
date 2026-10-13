import React from 'react';
import { Trophy, Zap, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';
import { GridlockQuestion } from '../types/gridlockTypes';
import { LetterMasteryEntry } from './ConceptMasteryMetrics';

interface Props {
  questions?: GridlockQuestion[];
  tournamentFormat?: string;
  lessonTitle?: string;
  winningTeam?: 'red' | 'blue';
  averageAccuracy?: number;
  totalCapturedHexes?: number;
  totalMatchesPlayed?: number;
  entries?: LetterMasteryEntry[];
  onPrint?: () => void;
  onExportCsv?: () => void;
}

export const GridlockAnalyticsDashboard: React.FC<Props> = ({
  questions = [], tournamentFormat = 'best-of-3', averageAccuracy = 76,
  totalCapturedHexes = 19, totalMatchesPlayed = 3, entries,
}) => {
  const displayEntries = entries || questions.slice(0, 3).map((q) => ({
    letter: q.letter, conceptPrompt: q.targetAnswer, accuracyPercentage: 54, totalAttempts: 12,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Match Outcome</span>
            <span className="text-sm font-black text-[#2D2A26]">Gold Team (2 - 1)</span>
          </div>
        </div>

        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">Avg Buzzer Latency</span>
            <span className="text-sm font-black text-[#2D2A26]">2.4 seconds</span>
          </div>
        </div>

        <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-bold">First-Buzz Accuracy</span>
            <span className="text-sm font-black text-[#2D2A26]">{averageAccuracy}% conversion</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" /> Contested Hex Hotspots
            </h5>
            <span className="text-[10px] text-gray-500 font-bold">3+ False Buzzes</span>
          </div>
          <div className="space-y-1.5">
            {displayEntries.slice(0, 3).map((item, idx) => (
              <div key={item.letter || idx} className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                    {item.letter}
                  </span>
                  <span className="font-bold text-[#2D2A26] truncate max-w-[180px]">{item.conceptPrompt}</span>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  {3 - idx} Steals
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-teal-600" /> Vocabulary Reteaching Triggers
            </h5>
            <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 font-bold">Follow-Up</span>
          </div>
          <p className="text-[11px] text-[#2D2A26]/80 leading-relaxed">
            Both teams hesitated on cellular transport mechanisms. Recommended: Conduct a 90-second recall drill on passive diffusion vs active transport.
          </p>
          <div className="p-2 bg-white rounded-xl border border-teal-200/80 text-[10px] text-teal-800 font-bold flex items-center justify-between">
            <span>Format: {tournamentFormat}</span>
            <span>{totalCapturedHexes} Hexes Conquered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

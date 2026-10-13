import React from 'react';
import { ConceptMasteryMetrics, LetterMasteryEntry } from './ConceptMasteryMetrics';
import { Printer, Download, Sparkles, CheckCircle, FileText } from 'lucide-react';

export interface GridlockSummaryReportData {
  lessonTitle: string;
  className: string;
  winningTeam: 'red' | 'blue';
  averageAccuracy: number;
  totalCapturedHexes: number;
  totalMatchesPlayed: number;
  masteryEntries: LetterMasteryEntry[];
}

interface Props {
  data: GridlockSummaryReportData;
  onPrint?: () => void;
  onExportCsv?: () => void;
  onNotice?: (msg: string) => void;
}

export const GridlockSummaryReport: React.FC<Props> = ({ data, onPrint, onExportCsv, onNotice }) => {
  return (
    <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-3xl border border-[#2D2A26]/15 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2D2A26]/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            GridLock Assessment Debrief
          </div>
          <h3 className="text-lg font-black text-[#2D2A26]">{data.lessonTitle}</h3>
          <p className="text-xs text-gray-600">Cohort: {data.className} • Completed Match Diagnostics</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportCsv}
            className="py-2 px-3 bg-white text-[#2D2A26] font-bold text-xs rounded-xl border border-[#2D2A26]/15 hover:bg-black/5 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="py-2 px-3.5 bg-[#2D2A26] text-white font-bold text-xs rounded-xl hover:bg-black flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Top Level Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 text-center">
          <div className="text-[10px] font-bold text-gray-500 uppercase">Class Accuracy</div>
          <div className="text-xl font-black text-[#2D2A26] mt-0.5">{Math.max(1, data.averageAccuracy)}%</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 text-center">
          <div className="text-[10px] font-bold text-gray-500 uppercase">Captured Hexes</div>
          <div className="text-xl font-black text-amber-600 mt-0.5">{data.totalCapturedHexes} / 25</div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 text-center">
          <div className="text-[10px] font-bold text-gray-500 uppercase">Winning Side</div>
          <div
            className={`text-sm font-black uppercase mt-1 ${
              data.winningTeam === 'red' ? 'text-red-600' : 'text-blue-600'
            }`}
          >
            {data.winningTeam === 'red' ? 'Red Team' : 'Blue Team'}
          </div>
        </div>
        <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 text-center">
          <div className="text-[10px] font-bold text-gray-500 uppercase">Matches Concluded</div>
          <div className="text-xl font-black text-[#2D2A26] mt-0.5">{data.totalMatchesPlayed}</div>
        </div>
      </div>

      {/* Concept Breakdown Table */}
      <ConceptMasteryMetrics entries={data.masteryEntries} />
    </div>
  );
};

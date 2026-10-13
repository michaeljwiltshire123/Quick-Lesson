import React from 'react';
import { Printer, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { QuizDiagnosticReport } from './analyticsTypes';
import { ConceptHeatmapCard } from './ConceptHeatmapCard';
import { PupilAlertsCard } from './PupilAlertsCard';

interface Props {
  report: QuizDiagnosticReport;
  onPrint?: () => void;
  onPlanFollowUp?: (topic: string) => void;
}

export const CompetitiveQuizAnalytics: React.FC<Props> = ({
  report,
  onPrint,
  onPlanFollowUp,
}) => {
  const handlePrint = () => {
    if (onPrint) onPrint();
    else if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="bg-[#2D2A26] border border-white/10 rounded-3xl p-5 text-white space-y-5 shadow-2xl">
      {/* Analytics Header & Summary Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
              Diagnostic Mastery Report
            </span>
            <span className="text-xs text-gray-400">{report.totalPupils} Pupils Analysed</span>
          </div>
          <h3 className="text-lg font-black text-white mt-1">
            {report.lessonTitle}: Class Performance
          </h3>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border border-white/10"
        >
          <Printer className="w-3.5 h-3.5 text-amber-400" />
          <span>Print Summary Handout</span>
        </button>
      </div>

      {/* Grid: Heatmap + Flagged Pupils */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConceptHeatmapCard concepts={report.concepts} />
        <PupilAlertsCard flaggedPupils={report.flaggedPupils} />
      </div>

      {/* Recommended Follow-up Chunks */}
      <div className="p-4 bg-black/30 border border-white/5 rounded-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
          <BookOpen className="w-4 h-4" />
          <span>Recommended Next Classroom Steps</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {report.recommendedFollowUpChunks.map((rec, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onPlanFollowUp?.(rec)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-400/20 text-xs font-medium text-gray-200 hover:text-amber-200 border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{rec}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

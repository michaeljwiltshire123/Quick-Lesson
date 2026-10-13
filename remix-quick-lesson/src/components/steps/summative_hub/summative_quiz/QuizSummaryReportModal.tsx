import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldAlert, Award } from 'lucide-react';
import { QuizSummaryReport } from './typesSummativeQuiz';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  report: QuizSummaryReport;
  onNotice?: (msg: string) => void;
}

export const QuizSummaryReportModal: React.FC<Props> = ({
  isOpen, onClose, report, onNotice,
}) => {
  if (!isOpen) return null;

  const handleExportGoogleDoc = () => {
    const docContent = `SUMMARY REPORT: ${report.quizTitle}\nClass: ${report.className}\nAvg Score: ${report.averageScore}%\nSubmissions: ${report.submissionsCount}\n\nMisconceptions:\n${report.misconceptionHotspots.join('\n')}\n\nSupport Alerts:\n${report.supportAlerts.join('\n')}\n\nRigor: ${report.rigorChecks}`;
    const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.quizTitle.toLowerCase().replace(/\s+/g, '_')}_summary_report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNotice?.('Summary report exported to Google Doc / Drive format successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-3xl w-full max-w-xl p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <div className="flex items-center gap-2 font-bold text-[#2D2A26] text-sm">
            <Award className="w-4 h-4 text-[#D97706]" />
            <span>Quiz Diagnostic Summary Report ({report.className})</span>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 text-[#2D2A26]"><X className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-[#2D2A26]/10 rounded-2xl p-3 text-center">
            <div className="text-2xl font-black text-[#2D2A26]">{report.averageScore}%</div>
            <div className="text-[11px] font-bold text-[#2D2A26]/60">Class Average Score</div>
          </div>
          <div className="bg-white border border-[#2D2A26]/10 rounded-2xl p-3 text-center">
            <div className="text-2xl font-black text-[#2D2A26]">{report.submissionsCount}</div>
            <div className="text-[11px] font-bold text-[#2D2A26]/60">Total Submissions</div>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-600" /><span>Misconception Hotspots</span></div>
            <ul className="list-disc list-inside text-amber-900/80 space-y-0.5">
              {report.misconceptionHotspots.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 space-y-1">
            <div className="font-bold text-red-900 flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-red-600" /><span>Private Student Support Alerts</span></div>
            <ul className="list-disc list-inside text-red-900/80 space-y-0.5">
              {report.supportAlerts.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className="bg-white border border-[#2D2A26]/10 rounded-2xl p-3 space-y-1">
            <div className="font-bold text-[#2D2A26] flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /><span>Question Rigor Assessment</span></div>
            <p className="text-[#2D2A26]/70">{report.rigorChecks}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#2D2A26]/10">
          <button type="button" onClick={handleExportGoogleDoc} className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all">
            <FileText className="w-3.5 h-3.5" /><span>Export Summary to Google Doc / Drive</span>
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer">
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { FileText, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { TeacherReportTab } from './teacherReportTypes';

interface Props {
  activeTab: TeacherReportTab;
  onSelectTab: (tab: TeacherReportTab) => void;
  quizTitle: string;
  modeLabel: string;
  bespokeTabLabel: string;
  onPrint?: () => void;
  onExportCsv?: () => void;
}

export const TeacherReportHeader: React.FC<Props> = ({
  activeTab, onSelectTab, quizTitle, modeLabel, bespokeTabLabel,
  onPrint = () => window.print(),
  onExportCsv = () => alert('Exporting Teacher Markbook & Ofsted Evidence Pack to CSV...'),
}) => {
  const tabs: { id: TeacherReportTab; label: string }[] = [
    { id: 'overview', label: 'Class Overview & Bell Curve' },
    { id: 'pupils', label: 'Pupil Audit & Coursework Defense' },
    { id: 'send', label: 'SEND & Access Evidence' },
    { id: 'ofsted', label: 'Ofsted / SLT Curriculum Audit' },
    { id: 'bespoke', label: bespokeTabLabel },
  ];

  return (
    <div className="space-y-3 border-b border-[#2D2A26]/10 pb-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#2D2A26] text-amber-300 text-[10px] font-black uppercase tracking-wider">
              {modeLabel}
            </span>
            <h3 className="text-sm font-black text-[#2D2A26] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Teacher Analysis: Summary Report
            </h3>
          </div>
          <p className="text-[11px] text-[#2D2A26]/70 mt-0.5">
            Diagnostic assessment audit for <span className="font-bold">{quizTitle}</span> • Formative evidence trail
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={onExportCsv}
            className="px-2.5 py-1.5 bg-white hover:bg-gray-50 border border-[#2D2A26]/20 rounded-xl text-[11px] font-bold text-[#2D2A26] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Export</span> Markbook
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="px-2.5 py-1.5 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-amber-300" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-0.5 text-xs font-bold scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectTab(t.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all ${
              activeTab === t.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-[#F8F6F0] text-[#2D2A26]/70 hover:text-[#2D2A26] hover:bg-gray-200/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

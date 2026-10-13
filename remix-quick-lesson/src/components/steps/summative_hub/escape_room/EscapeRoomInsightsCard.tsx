import React from 'react';
import { BarChart2 } from 'lucide-react';
import { TeacherMasterReportView, EscapeRoomCipherDeepDive } from '../teacher_report';
import { EscapeRoomConfig } from './typesEscape';

interface Props {
  insights: boolean;
  setInsights: (v: boolean) => void;
  config: EscapeRoomConfig;
  lessonTitle?: string;
}

export const EscapeRoomInsightsCard: React.FC<Props> = ({
  insights, setInsights, config, lessonTitle = 'Escape Room Challenge',
}) => {
  const displayTitle = config.customThemeTitle || lessonTitle;

  if (insights) {
    return (
      <div className="border border-[#2D2A26]/15 rounded-3xl p-4 bg-white space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26] flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-amber-600" /> Teacher Analysis: Summary Report
          </h4>
          <button
            type="button"
            onClick={() => setInsights(false)}
            className="text-[10px] font-bold text-gray-400 hover:text-[#2D2A26] cursor-pointer"
          >
            Hide
          </button>
        </div>
        <TeacherMasterReportView
          quizTitle={displayTitle}
          modeLabel="Escape Room"
          bespokeTabLabel="Lock Cipher & Escape Velocity Audit"
          bespokeNode={<EscapeRoomCipherDeepDive />}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white border border-[#2D2A26]/15 rounded-2xl p-3 shadow-xs">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
        <BarChart2 className="w-3.5 h-3.5 text-amber-500" /> Teacher Analysis: Summary Report
      </h4>
      <button
        type="button"
        onClick={() => setInsights(true)}
        className="text-[10px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 px-2.5 py-1 rounded-xl cursor-pointer transition-colors"
      >
        Reveal Analytics
      </button>
    </div>
  );
};

import React from 'react';
import { BarChart2 } from 'lucide-react';
import { TeacherMasterReportView, PlainQuizDeepDive } from '../../teacher_report';
import { SummativeQuizQuestion } from '../typesSummativeQuiz';

interface Props {
  insights: boolean;
  setInsights: (v: boolean) => void;
  quizTitle: string;
  questions: SummativeQuizQuestion[];
}

export const PlainQuizInsightsCard: React.FC<Props> = ({
  insights, setInsights, quizTitle, questions,
}) => {
  if (insights) {
    return (
      <div className="border border-[#2D2A26]/15 rounded-3xl p-4 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26] flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-emerald-600" /> Teacher Analysis: Summary Report
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
          quizTitle={quizTitle}
          modeLabel="Plain Quiz"
          bespokeTabLabel="Distractor & Trap Analysis"
          bespokeNode={<PlainQuizDeepDive />}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white border border-[#2D2A26]/15 rounded-2xl p-3 shadow-xs">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
        <BarChart2 className="w-3.5 h-3.5 text-gray-400" /> Teacher Analysis: Summary Report
      </h4>
      <button
        type="button"
        onClick={() => setInsights(true)}
        className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 px-2.5 py-1 rounded-xl cursor-pointer transition-colors"
      >
        Reveal Analytics
      </button>
    </div>
  );
};

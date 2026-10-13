import React from 'react';
import { BarChart2 } from 'lucide-react';
import { TeacherMasterReportView, CompetitiveSpeedAccuracyDeepDive } from '../../teacher_report';
import { QuestionCard } from '../types/competitiveQuizTypes';

interface Props {
  insights: boolean;
  setInsights: (v: boolean) => void;
  questions: QuestionCard[];
  totalRounds: number;
  lessonTitle?: string;
}

export const CompetitiveQuizInsightsCard: React.FC<Props> = ({
  insights, setInsights, questions, totalRounds, lessonTitle = 'Battle Challenge Arena',
}) => {
  if (insights) {
    return (
      <div className="border border-[#2D2A26]/15 rounded-3xl p-4 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26] flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-rose-600" /> Teacher Analysis: Summary Report
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
          quizTitle={lessonTitle}
          modeLabel="Battle Quiz"
          bespokeTabLabel="Speed-Accuracy Matrix & Streak Busters"
          bespokeNode={<CompetitiveSpeedAccuracyDeepDive />}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white border border-[#2D2A26]/15 rounded-2xl p-3 shadow-xs">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
        <BarChart2 className="w-3.5 h-3.5 text-rose-500" /> Teacher Analysis: Summary Report
      </h4>
      <button
        type="button"
        onClick={() => setInsights(true)}
        className="text-[10px] font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/50 px-2.5 py-1 rounded-xl cursor-pointer transition-colors"
      >
        Reveal Analytics
      </button>
    </div>
  );
};

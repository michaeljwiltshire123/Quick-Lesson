import React from 'react';
import { BarChart2, Printer } from 'lucide-react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';
import { MasteryHeatmapCard } from './MasteryHeatmapCard';
import { ReteachCoachCard } from './ReteachCoachCard';
import { TargetedInterventionsCard } from './TargetedInterventionsCard';

interface Props {
  quizTitle: string;
  questions: SummativeQuizQuestion[];
  className?: string;
}

export const PlainQuizAnalytics: React.FC<Props> = ({
  quizTitle,
  questions,
  className = 'Period 1 Media',
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#2D2A26]/15 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 rounded-xl">
            <BarChart2 className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#2D2A26]">Quiz Analytics & Post-Quiz Debrief</h2>
            <p className="text-xs text-gray-500 font-medium">{quizTitle} • {className}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2D2A26] hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs"
        >
          <Printer className="w-3.5 h-3.5 text-amber-300" />
          <span>Print Debrief Report</span>
        </button>
      </div>

      <MasteryHeatmapCard questions={questions} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReteachCoachCard quizTitle={quizTitle} />
        <TargetedInterventionsCard />
      </div>
    </div>
  );
};

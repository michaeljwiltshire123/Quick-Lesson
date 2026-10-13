import React from 'react';
import { Trophy, Award, Medal, FileText, RotateCcw } from 'lucide-react';
import { QuizSummaryReport } from '../typesSummativeQuiz';

interface Props {
  quizTitle: string;
  currentCohortTag: string;
  totalQuestions: number;
  onOpenReport: (report: QuizSummaryReport) => void;
  onReplay: () => void;
}

export const LiveQuizCeremonyScreen: React.FC<Props> = ({
  quizTitle, currentCohortTag, totalQuestions, onOpenReport, onReplay,
}) => {
  const reportData: QuizSummaryReport = {
    quizTitle,
    className: currentCohortTag,
    averageScore: 84,
    submissionsCount: 22,
    misconceptionHotspots: ['Distinction between key terms and supporting details', 'Evaluating evidence under timed conditions'],
    supportAlerts: ['Student #14 required extended support on Q3', 'Student #08 finished with 100% accuracy'],
    rigorChecks: 'High academic rigor; excellent discrimination index across medium and difficult questions.',
  };

  return (
    <div className="bg-[#181614] border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl text-center animate-in zoom-in-95 duration-300">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
        <Trophy className="w-3.5 h-3.5" />
        <span>Quiz Complete — Final Results</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white">{quizTitle}</h2>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto items-end pt-2">
        {/* 2nd Place */}
        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-1">
          <Medal className="w-6 h-6 text-slate-300 mx-auto" />
          <div className="text-xs font-bold text-gray-200">Maya K.</div>
          <div className="text-[10px] text-amber-400 font-mono font-bold">5,200 pts</div>
          <div className="h-16 bg-slate-700/50 rounded-t-xl flex items-center justify-center font-bold text-xs">2nd</div>
        </div>
        {/* 1st Place */}
        <div className="bg-amber-500/20 p-4 rounded-2xl border-2 border-amber-400 space-y-1 scale-105 shadow-xl">
          <Trophy className="w-7 h-7 text-amber-400 mx-auto" />
          <div className="text-sm font-bold text-amber-200">Alex P.</div>
          <div className="text-xs text-amber-300 font-mono font-bold">6,450 pts</div>
          <div className="h-24 bg-amber-500/40 rounded-t-xl flex items-center justify-center font-bold text-sm text-amber-200">1st</div>
        </div>
        {/* 3rd Place */}
        <div className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-1">
          <Award className="w-6 h-6 text-amber-600 mx-auto" />
          <div className="text-xs font-bold text-gray-200">Sam T.</div>
          <div className="text-[10px] text-amber-400 font-mono font-bold">4,850 pts</div>
          <div className="h-12 bg-slate-800/50 rounded-t-xl flex items-center justify-center font-black text-xs">3rd</div>
        </div>
      </div>

      {/* Class Statistics Badge */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-white/10 text-xs max-w-lg mx-auto">
        <div className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-amber-400" /><span className="font-bold">Class Average: 84%</span></div>
        <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-400" /><span className="font-bold">{totalQuestions} Questions Tested</span></div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => onOpenReport(reportData)}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Teacher Summary Report</span>
        </button>
        <button
          type="button"
          onClick={onReplay}
          className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 border border-white/15 cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Quiz</span>
        </button>
      </div>
    </div>
  );
};

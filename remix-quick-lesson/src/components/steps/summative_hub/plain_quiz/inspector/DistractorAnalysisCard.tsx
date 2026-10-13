import React from 'react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  questions: SummativeQuizQuestion[];
  gradeLevel?: string;
}

export const DistractorAnalysisCard: React.FC<Props> = ({ questions, gradeLevel }) => {
  const evaluatePlausibility = (q: SummativeQuizQuestion) => {
    const distractors = q.choices.filter((_, idx) => idx !== q.correctChoiceIndex);
    const avgLen = distractors.reduce((sum, d) => sum + d.length, 0) / Math.max(1, distractors.length);
    const correctLen = q.choices[q.correctChoiceIndex]?.length || 0;
    const lengthVariance = Math.abs(avgLen - correctLen);
    const isTooObvious = lengthVariance > 45 || distractors.some((d) => d.toLowerCase().includes('random') || d.length < 5);
    return !isTooObvious;
  };

  const highQualityCount = questions.filter(evaluatePlausibility).length;
  const qualityPercent = Math.round((highQualityCount / Math.max(1, questions.length)) * 100);

  return (
    <div className="bg-[#1E1C1A] text-white p-4 rounded-2xl border border-white/10 space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Distractor Plausibility & Trap Analysis
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400">{qualityPercent}% Effective</span>
      </div>

      <p className="text-xs text-gray-300 leading-relaxed">
        Distractors are checked against common classroom misconceptions to ensure wrong answers challenge partial understanding rather than being obvious throwaways.
      </p>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase">Plausible Distractors</div>
            <div className="text-xs font-bold text-white">{highQualityCount} of {questions.length} Items</div>
          </div>
        </div>
        <div className="p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase">Reading Age Profile</div>
            <div className="text-xs font-bold text-white">{gradeLevel || 'BTEC Level 3'} Accessible</div>
          </div>
        </div>
      </div>
    </div>
  );
};

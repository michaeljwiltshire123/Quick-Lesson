import React from 'react';
import { Trophy, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { SummativeQuizQuestion } from '../typesSummativeQuiz';

interface Props {
  question: SummativeQuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onNextQuestion: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Alex P.', score: (qIdx: number) => 1000 * (qIdx + 1) + 450, streak: '5 Streak' },
  { rank: 2, name: 'Maya K.', score: (qIdx: number) => 1000 * (qIdx + 1) + 200, streak: '4 Streak' },
  { rank: 3, name: 'Sam T.', score: (qIdx: number) => 1000 * (qIdx + 1) - 150, streak: '3 Streak' },
  { rank: 4, name: 'Jordan B.', score: (qIdx: number) => 950 * (qIdx + 1), streak: 'Correct' },
  { rank: 5, name: 'Chloe H.', score: (qIdx: number) => 900 * (qIdx + 1), streak: 'Correct' },
];

export const LiveQuizScoreboardScreen: React.FC<Props> = ({
  question, questionIndex, totalQuestions, onNextQuestion,
}) => {
  const isLastQuestion = questionIndex === totalQuestions - 1;
  const correctChoice = question.choices[question.correctChoiceIndex] || question.choices[0];

  return (
    <div className="bg-[#181614] border border-amber-500/30 rounded-3xl p-6 text-white space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Class Standings After Q{questionIndex + 1} of {totalQuestions}
          </span>
        </div>
        <button
          type="button"
          onClick={onNextQuestion}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <span>{isLastQuestion ? 'View Final Results' : `Next Question (Q${questionIndex + 2})`}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Answer Breakdown */}
        <div className="md:col-span-5 bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Correct Choice Revealed
          </span>
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-200">
            {OPTION_LETTERS[question.correctChoiceIndex]}: {correctChoice}
          </div>
          <p className="text-xs text-gray-300 leading-relaxed italic">
            "{question.explanation || 'Directly grounded in the core lesson concept.'}"
          </p>
        </div>

        {/* Top 5 Leaderboard */}
        <div className="md:col-span-7 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Class Standings
          </span>
          <div className="space-y-1.5">
            {LEADERBOARD_DATA.map((p) => (
              <div
                key={p.rank}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                  p.rank === 1 ? 'bg-amber-500/20 border-amber-400/50 text-amber-200' : 'bg-white/5 border-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center font-mono ${
                    p.rank === 1 ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-gray-300'
                  }`}>
                    #{p.rank}
                  </span>
                  <span>{p.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    {p.streak}
                  </span>
                  <span className="font-mono text-xs text-amber-300">{p.score(questionIndex)} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

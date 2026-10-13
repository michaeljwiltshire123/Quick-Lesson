import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, Clock } from 'lucide-react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';

interface Props {
  question: SummativeQuizQuestion;
  totalQuestions: number;
  onReadPrompt: () => void;
  isSpeaking: boolean;
  onTimeExpired?: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const TeacherBoardPreview: React.FC<Props> = ({
  question,
  totalQuestions,
  onReadPrompt,
  isSpeaking,
  onTimeExpired,
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(30);
    setIsPaused(false);
    const interval = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeExpired?.();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [question.id, isPaused, onTimeExpired]);

  return (
    <div className="bg-[#1E1C1A] text-white p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-mono font-bold">
            Question {question.questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="ml-1 text-[10px] text-gray-400 hover:text-white underline cursor-pointer"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onReadPrompt}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-amber-300'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'Reading...' : 'Read Aloud'}</span>
        </button>
      </div>

      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${(timeLeft / 30) * 100}%` }} />
      </div>

      <div className="text-base sm:text-lg font-bold text-gray-100 min-h-[48px] flex items-center">
        {question.prompt}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {question.choices.map((choice, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5"
          >
            <span className="w-6 h-6 rounded-lg bg-white/10 text-amber-300 font-bold text-xs flex items-center justify-center font-mono">
              {OPTION_LETTERS[idx]}
            </span>
            <span className="text-xs text-gray-200 font-medium">{choice}</span>
          </div>
        ))}
      </div>

      {question.explanation && (
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-400 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-300">Explanation: </span>
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

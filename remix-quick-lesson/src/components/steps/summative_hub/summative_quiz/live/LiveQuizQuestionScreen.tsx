import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { SummativeQuizQuestion } from '../typesSummativeQuiz';
import { StudentPhonePreview } from '../../plain_quiz/preview/StudentPhonePreview';
import { useTextToSpeech } from '../../plain_quiz/audio/useTextToSpeech';

interface Props {
  question: SummativeQuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onLockAndReveal: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export const LiveQuizQuestionScreen: React.FC<Props> = ({
  question, questionIndex, totalQuestions, onLockAndReveal,
}) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [submittedCount, setSubmittedCount] = useState(0);
  const { speak, stop, isSpeaking } = useTextToSpeech();

  useEffect(() => {
    setTimeLeft(30);
    setSubmittedCount(0);
    stop();

    const voiceTimer = setTimeout(() => {
      speak(question.prompt);
    }, 1000);

    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          onLockAndReveal();
          return 0;
        }
        return prev - 1;
      });
      setSubmittedCount((prev) => Math.min(24, prev + Math.floor(Math.random() * 3) + 1));
    }, 1000);

    return () => {
      clearTimeout(voiceTimer);
      clearInterval(countdownInterval);
    };
  }, [question.id, questionIndex, question.prompt, speak, stop, onLockAndReveal]);

  return (
    <div className="bg-[#181614] border border-white/10 rounded-3xl p-5 sm:p-6 text-white space-y-5 shadow-2xl animate-in fade-in">
      {/* Timer Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-bold font-mono">
          <span className="text-amber-400">Question {questionIndex + 1} of {totalQuestions}</span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded ${timeLeft <= 5 ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/10 text-gray-300'}`}>
              {timeLeft}s remaining
            </span>
            <button
              type="button"
              onClick={onLockAndReveal}
              className="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded text-[10px] font-bold cursor-pointer transition-all"
            >
              Skip Timer →
            </button>
          </div>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${(timeLeft / 30) * 100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-sm sm:text-base font-bold text-gray-100">{question.prompt}</span>
            <button type="button" onClick={() => speak(question.prompt)} className={`p-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/10 text-amber-300 hover:bg-white/20'}`}>
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {question.choices.map((choice, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="text-xs font-medium text-gray-200">{choice}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-2xl text-xs">
            <span className="text-emerald-300 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Pupil Submissions: {submittedCount} / 24</span>
            <button type="button" onClick={onLockAndReveal} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md">
              <Lock className="w-3.5 h-3.5" /> Lock Answers & View Leaderboard <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Pupil Device View</div>
          <StudentPhonePreview question={question} />
        </div>
      </div>
    </div>
  );
};

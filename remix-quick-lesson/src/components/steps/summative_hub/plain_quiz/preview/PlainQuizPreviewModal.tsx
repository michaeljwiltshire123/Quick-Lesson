import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, Users, HelpCircle, Trophy, Award } from 'lucide-react';
import { SummativeQuizQuestion } from '../../summative_quiz/typesSummativeQuiz';
import { TeacherBoardPreview } from './TeacherBoardPreview';
import { StudentPhonePreview } from './StudentPhonePreview';
import { LiveQuizWelcomeScreen } from '../../summative_quiz/live/LiveQuizWelcomeScreen';
import { LiveQuizScoreboardScreen } from '../../summative_quiz/live/LiveQuizScoreboardScreen';
import { LiveQuizCeremonyScreen } from '../../summative_quiz/live/LiveQuizCeremonyScreen';
import { useTextToSpeech } from '../audio/useTextToSpeech';

type PreviewStage = 'lobby' | 'question' | 'scoreboard' | 'ceremony';

interface Props {
  isOpen: boolean;
  questions: SummativeQuizQuestion[];
  quizTitle: string;
  onClose: () => void;
}

export const PlainQuizPreviewModal: React.FC<Props> = ({
  isOpen, questions, quizTitle, onClose,
}) => {
  const [stage, setStage] = useState<PreviewStage>('question');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [cohortTag, setCohortTag] = useState('Period 1 Media');
  const { speak, stop, isSpeaking } = useTextToSpeech();

  const currentQ = questions[currentIdx] || questions[0];

  useEffect(() => {
    if (!isOpen || stage !== 'question' || !currentQ) {
      stop();
      return;
    }
    stop();
    const timer = setTimeout(() => { speak(currentQ.prompt); }, 1000);
    return () => clearTimeout(timer);
  }, [isOpen, stage, currentIdx, currentQ?.id, speak, stop]);

  if (!isOpen || !currentQ) return null;

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#181614] text-white rounded-3xl border border-white/20 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header & Stage Switcher */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-white/10 gap-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
              Live Quiz Preview: {quizTitle}
            </span>
          </div>

          {/* Stage Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => { stop(); setStage('lobby'); }}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                stage === 'lobby' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> 1. Welcome
            </button>
            <button
              type="button"
              onClick={() => { setStage('question'); }}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                stage === 'question' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> 2. Question
            </button>
            <button
              type="button"
              onClick={() => { stop(); setStage('scoreboard'); }}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                stage === 'scoreboard' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" /> 3. Leaderboard
            </button>
            <button
              type="button"
              onClick={() => { stop(); setStage('ceremony'); }}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                stage === 'ceremony' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> 4. Results
            </button>
          </div>

          <button type="button" onClick={() => { stop(); onClose(); }} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {stage === 'lobby' && (
            <LiveQuizWelcomeScreen
              quizTitle={quizTitle}
              currentCohortTag={cohortTag}
              totalQuestions={questions.length}
              onChangeCohortTag={setCohortTag}
              onStartGame={() => setStage('question')}
              onExit={() => { stop(); onClose(); }}
            />
          )}

          {stage === 'question' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Classroom Board Display</span>
                <TeacherBoardPreview
                  question={currentQ}
                  totalQuestions={questions.length}
                  onReadPrompt={() => speak(currentQ.prompt)}
                  isSpeaking={isSpeaking}
                />
              </div>
              <div className="lg:col-span-5 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Pupil View</span>
                <StudentPhonePreview question={currentQ} />
              </div>
            </div>
          )}

          {stage === 'scoreboard' && (
            <LiveQuizScoreboardScreen
              question={currentQ}
              questionIndex={currentIdx}
              totalQuestions={questions.length}
              onNextQuestion={() => {
                if (currentIdx < questions.length - 1) {
                  setCurrentIdx((p) => p + 1);
                  setStage('question');
                } else {
                  setStage('ceremony');
                }
              }}
            />
          )}

          {stage === 'ceremony' && (
            <LiveQuizCeremonyScreen
              quizTitle={quizTitle}
              currentCohortTag={cohortTag}
              totalQuestions={questions.length}
              onOpenReport={() => { stop(); onClose(); }}
              onReplay={() => { setCurrentIdx(0); setStage('lobby'); }}
            />
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-black/30">
          <button
            type="button"
            onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-bold cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Question
          </button>
          <span className="text-xs font-mono text-amber-300">
            Q{currentIdx + 1} of {questions.length}
          </span>
          <button
            type="button"
            onClick={() => {
              if (stage === 'lobby') setStage('question');
              else if (stage === 'question') setStage('scoreboard');
              else if (stage === 'scoreboard') {
                if (currentIdx < questions.length - 1) {
                  setCurrentIdx((p) => p + 1);
                  setStage('question');
                } else {
                  setStage('ceremony');
                }
              } else setStage('lobby');
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold cursor-pointer shadow-md"
          >
            <span>Next Stage</span> <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

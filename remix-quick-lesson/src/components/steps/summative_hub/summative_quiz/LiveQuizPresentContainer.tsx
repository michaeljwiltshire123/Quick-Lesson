import React, { useState } from 'react';
import { QuizSummaryReport, SummativeQuizQuestion } from './typesSummativeQuiz';
import { LiveQuizWelcomeScreen } from './live/LiveQuizWelcomeScreen';
import { LiveQuizQuestionScreen } from './live/LiveQuizQuestionScreen';
import { LiveQuizScoreboardScreen } from './live/LiveQuizScoreboardScreen';
import { LiveQuizCeremonyScreen } from './live/LiveQuizCeremonyScreen';

interface Props {
  quizTitle: string;
  questions: SummativeQuizQuestion[];
  currentCohortTag: string;
  onChangeCohortTag: (tag: string) => void;
  onBackToEdit: () => void;
  onOpenSummary: (report: QuizSummaryReport) => void;
  onNotice?: (msg: string) => void;
}

export const LiveQuizPresentContainer: React.FC<Props> = ({
  quizTitle, questions, currentCohortTag, onChangeCohortTag, onBackToEdit, onOpenSummary, onNotice,
}) => {
  const [gameState, setGameState] = useState<'welcome' | 'question' | 'scoreboard' | 'ceremony'>('welcome');
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeQuestions = questions && questions.length > 0 ? questions : [
    { id: 'q1', questionNumber: 1, prompt: `Key principle of ${quizTitle}`, choices: ['Core Method', 'Option B', 'Option C', 'Option D'], correctChoiceIndex: 0, explanation: 'Primary lesson objective.' },
  ];

  const currentQ = activeQuestions[currentIdx] || activeQuestions[0];

  const handleStartGame = () => {
    setCurrentIdx(0);
    setGameState('question');
    onNotice?.(`Started live quiz for ${currentCohortTag}! 🚀`);
  };

  const handleLockAndReveal = () => {
    setGameState('scoreboard');
  };

  const handleNextQuestion = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx((p) => p + 1);
      setGameState('question');
    } else {
      setGameState('ceremony');
    }
  };

  return (
    <div className="space-y-4">
      {gameState === 'welcome' && (
        <LiveQuizWelcomeScreen
          quizTitle={quizTitle}
          currentCohortTag={currentCohortTag}
          totalQuestions={activeQuestions.length}
          onChangeCohortTag={onChangeCohortTag}
          onStartGame={handleStartGame}
          onExit={onBackToEdit}
        />
      )}

      {gameState === 'question' && (
        <LiveQuizQuestionScreen
          question={currentQ}
          questionIndex={currentIdx}
          totalQuestions={activeQuestions.length}
          onLockAndReveal={handleLockAndReveal}
        />
      )}

      {gameState === 'scoreboard' && (
        <LiveQuizScoreboardScreen
          question={currentQ}
          questionIndex={currentIdx}
          totalQuestions={activeQuestions.length}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {gameState === 'ceremony' && (
        <LiveQuizCeremonyScreen
          quizTitle={quizTitle}
          currentCohortTag={currentCohortTag}
          totalQuestions={activeQuestions.length}
          onOpenReport={onOpenSummary}
          onReplay={() => { setGameState('welcome'); setCurrentIdx(0); }}
        />
      )}
    </div>
  );
};

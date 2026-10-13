import React, { useState, useEffect } from 'react';
import { isAnswerFuzzyMatch } from '../helpers/fuzzyMatcher';
import { GridlockQuestionTimer } from './GridlockQuestionTimer';
import { StreakMultiplierBadge } from './StreakMultiplierBadge';
import { GridlockVoiceReader } from '../helpers/GridlockVoiceReader';
import { speakCurriculumPrompt, stopSpeaking } from '../helpers/gridlockSpeechEngine';
import { StudentInputForm } from './StudentInputForm';
import { StudentSubmissionResultBanner } from './StudentSubmissionResultBanner';
import { playCorrectChime, playBounceBuzzer } from '../helpers/audioBeepEngine';

interface Props {
  prompt: string;
  letter: string;
  targetAnswer: string;
  acceptableAnswers?: string[];
  onSubmitAnswer: (answer: string, isCorrect: boolean) => void;
  onTimeExpired?: () => void;
  disabled?: boolean;
  totalTimeSeconds?: number;
  allPlayersSubmitted?: boolean;
}

export const StudentTypedInputCard: React.FC<Props> = ({
  prompt,
  letter,
  targetAnswer,
  acceptableAnswers = [],
  onSubmitAnswer,
  onTimeExpired,
  disabled,
  totalTimeSeconds = 30,
  allPlayersSubmitted = false,
}) => {
  const [typedText, setTypedText] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTimeSeconds);
  const [feedback, setFeedback] = useState<{ isMatch: boolean; confidence: number } | null>(null);
  const [streakCount, setStreakCount] = useState(1);

  useEffect(() => {
    if (!prompt) return;
    const speechTimer = setTimeout(() => {
      speakCurriculumPrompt(prompt);
    }, 1000);

    return () => {
      clearTimeout(speechTimer);
      stopSpeaking();
    };
  }, [prompt]);

  useEffect(() => {
    if (hasSubmitted || allPlayersSubmitted || disabled) return;
    if (timeLeft <= 0) { onTimeExpired?.(); return; }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); onTimeExpired?.(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, hasSubmitted, allPlayersSubmitted, disabled, onTimeExpired]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedText.trim() || disabled || hasSubmitted || timeLeft === 0) return;
    const evalResult = isAnswerFuzzyMatch(typedText, targetAnswer, acceptableAnswers);
    setFeedback(evalResult);
    setHasSubmitted(true);
    if (evalResult.isMatch) { playCorrectChime(); setStreakCount((s) => s + 1); }
    else { playBounceBuzzer(); setStreakCount(1); }
    onSubmitAnswer(typedText.trim(), evalResult.isMatch);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/10 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2">
        <GridlockQuestionTimer timeLeft={timeLeft} totalTime={totalTimeSeconds} isAllSubmitted={hasSubmitted || allPlayersSubmitted} />
        <div className="flex items-center gap-2">
          <StreakMultiplierBadge streak={streakCount} />
          <GridlockVoiceReader textToRead={prompt} label="Read" size="sm" />
        </div>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <div className="w-12 h-12 rounded-xl bg-amber-400 text-[#2D2A26] flex items-center justify-center font-black text-2xl font-mono shadow-xs">
          {letter}
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Letter Clue</span>
          <h4 className="text-sm font-bold text-[#2D2A26]">Starts with letter "{letter}"</h4>
        </div>
      </div>
      <div className="bg-[#F8F6F0] p-3.5 rounded-xl border border-[#2D2A26]/10 text-xs font-medium text-[#2D2A26] leading-relaxed">
        {prompt}
      </div>
      {!hasSubmitted && timeLeft > 0 ? (
        <StudentInputForm typedText={typedText} letter={letter} timeLeft={timeLeft} disabled={disabled} onTypedTextChange={setTypedText} onSubmit={handleSubmit} />
      ) : (
        <StudentSubmissionResultBanner isMatch={feedback?.isMatch} hasSubmitted={hasSubmitted} typedText={typedText} targetAnswer={targetAnswer} />
      )}
    </div>
  );
};


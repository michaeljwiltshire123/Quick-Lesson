import { useState, useEffect } from 'react';
import { LadderQuizConfig, LifelineType } from '../typesLadder';
import { useTextToSpeech } from '../../../plain_quiz/audio';
import { useLadderQuestionBank } from './useLadderQuestionBank';

export type SimStep = 'welcome' | 'rules' | 'question' | 'reveal' | 'climb' | 'ceremony';

export const useLadderSimulatorState = (config: LadderQuizConfig, tts: ReturnType<typeof useTextToSpeech>) => {
  const [step, setStep] = useState<SimStep>('welcome');
  const [currentRung, setCurrentRung] = useState(1);
  const [score, setScore] = useState(0);
  const [lockedScore, setLockedScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [usedLifelines, setUsedLifelines] = useState<LifelineType[]>([]);
  const [activeQuestionLifelines, setActiveQuestionLifelines] = useState<LifelineType[]>([]);
  const [eliminatedChoices, setEliminatedChoices] = useState<number[]>([]);
  const [activeInterrupt, setActiveInterrupt] = useState<LifelineType | null>(null);
  const [pollStatsRevealed, setPollStatsRevealed] = useState(false);
  const [pollGraceTime, setPollGraceTime] = useState(10);
  const [peerSelected, setPeerSelected] = useState<string | null>(null);
  const [peerGraceTime, setPeerGraceTime] = useState(15);
  const [peerState, setPeerState] = useState<'none' | 'waiting' | 'advice'>('none');

  const { rungs, swapActiveQuestion, resetRungs } = useLadderQuestionBank(config);
  const currentQ = rungs.find((r) => r.rungNumber === currentRung) || rungs[0];
  const maxScore = rungs.reduce((acc, r) => acc + r.pointValue, 0);

  const resetStageLifelineFlags = () => {
    setActiveQuestionLifelines([]);
    setPollStatsRevealed(false);
    setPollGraceTime(10);
    setPeerState('none');
    setPeerSelected(null);
    setPeerGraceTime(15);
    setEliminatedChoices([]);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (activeInterrupt || pollStatsRevealed || peerState !== 'none') return;
    let delay = 0, next: SimStep | null = null, nextRung: number | null = null;
    if (step === 'rules') { delay = 12000; next = 'question'; }
    else if (step === 'reveal') { delay = 8000; next = 'climb'; }
    else if (step === 'climb') {
      delay = 4000;
      if (currentRung < config.totalRungs) { next = 'question'; nextRung = currentRung + 1; }
      else { next = 'ceremony'; }
    }
    if (delay > 0 && next) {
      const t = setTimeout(() => {
        resetStageLifelineFlags();
        if (nextRung) setCurrentRung(nextRung);
        setStep(next!);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [step, currentRung, activeInterrupt, pollStatsRevealed, peerState]);

  const handleTriggerLifeline = (type: LifelineType) => {
    if (usedLifelines.includes(type) || !currentQ) return;
    setUsedLifelines((p) => [...p, type]);
    setActiveQuestionLifelines((p) => [...p, type]);
    if (type === 'question_swap') {
      setActiveInterrupt(type);
      setTimeout(() => {
        const swapped = swapActiveQuestion(currentRung);
        setActiveInterrupt(null);
        if (swapped) tts.speak(`Here is your new question: ${swapped.prompt}. Look at the new options!`);
      }, 4000);
    } else if (type === 'fifty_fifty') {
      const wrong = currentQ.choices.map((_, i) => i).filter((i) => i !== currentQ.correctChoiceIndex);
      setEliminatedChoices(wrong.sort(() => 0.5 - Math.random()).slice(0, 2));
    }
  };

  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx); setStep('reveal');
    setPollStatsRevealed(false); setPeerState('none');
    const correct = idx === currentQ.correctChoiceIndex;
    const nextScore = score + (correct ? currentQ.pointValue : 0);
    setScore(nextScore);
    if (correct && [3, 7].includes(currentRung)) setLockedScore(nextScore);
    if (!correct) setScore(lockedScore);
    tts.speak(`The correct answer was Option ${['A', 'B', 'C', 'D'][currentQ.correctChoiceIndex]}... ${currentQ.explanation}.`);
  };

  const handleRestart = () => {
    setStep('welcome'); setCurrentRung(1); setScore(0); setLockedScore(0);
    setUsedLifelines([]); resetStageLifelineFlags(); resetRungs();
  };

  return {
    step, setStep, currentRung, setCurrentRung, score, lockedScore, selectedAnswer, currentQ, maxScore,
    usedLifelines, activeQuestionLifelines, eliminatedChoices, activeInterrupt, setActiveInterrupt,
    pollStatsRevealed, setPollStatsRevealed, pollGraceTime, setPollGraceTime,
    peerSelected, setPeerSelected, peerGraceTime, setPeerGraceTime, peerState, setPeerState,
    resetStageLifelineFlags, handleTriggerLifeline, handleSelectAnswer, handleRestart,
  };
};

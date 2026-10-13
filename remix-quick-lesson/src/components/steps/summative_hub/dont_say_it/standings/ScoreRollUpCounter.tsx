import React, { useEffect, useState } from 'react';
import { playTickSound } from '../utils/dontSayItSoundEffects';

interface Props {
  fromScore: number;
  toScore: number;
  durationMs?: number;
}

export const ScoreRollUpCounter: React.FC<Props> = ({ fromScore, toScore, durationMs = 1200 }) => {
  const [displayScore, setDisplayScore] = useState(fromScore);

  useEffect(() => {
    if (fromScore === toScore) {
      setDisplayScore(toScore);
      return;
    }

    const stepTime = 40;
    const totalSteps = Math.max(1, Math.floor(durationMs / stepTime));
    const scoreDiff = toScore - fromScore;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= totalSteps) {
        setDisplayScore(toScore);
        clearInterval(timer);
      } else {
        const progress = currentStep / totalSteps;
        // Ease-out curve
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        const currentVal = Math.round(fromScore + scoreDiff * easedProgress);
        setDisplayScore(currentVal);
        playTickSound();
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [fromScore, toScore, durationMs]);

  return (
    <span className="font-mono font-black text-amber-400 tracking-tight">
      {displayScore.toLocaleString()}
    </span>
  );
};

import { useState, useEffect } from 'react';

export function useStudioPlaybackTimer(maxSeconds: number = 5.0, maxStep: number = 1) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentTime < maxSeconds) {
        timer = setTimeout(() => setCurrentTime((t) => parseFloat((t + 0.2).toFixed(1))), 150);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentTime, maxSeconds]);

  const currentStep = Math.min(maxStep, Math.max(1, Math.floor((currentTime / maxSeconds) * maxStep) + 1));

  return {
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    currentStep,
  };
}

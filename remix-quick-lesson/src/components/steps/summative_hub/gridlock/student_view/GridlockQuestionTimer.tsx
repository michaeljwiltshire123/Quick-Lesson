import React, { useEffect } from 'react';
import { Timer, AlertTriangle } from 'lucide-react';
import { playAudioBeep, playFinalBuzzerSound } from '../helpers/audioBeepEngine';

interface Props {
  timeLeft: number;
  totalTime?: number;
  isAllSubmitted?: boolean;
}

export const GridlockQuestionTimer: React.FC<Props> = ({
  timeLeft,
  totalTime = 30,
  isAllSubmitted = false,
}) => {
  useEffect(() => {
    if (isAllSubmitted) return;
    if (timeLeft > 0 && timeLeft <= 10) {
      playAudioBeep(timeLeft === 1 ? 1200 : 880, 100);
    } else if (timeLeft === 0) {
      playFinalBuzzerSound();
    }
  }, [timeLeft, isAllSubmitted]);

  const isUrgent = timeLeft <= 10;
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-gray-500">
          <Timer className={`w-3.5 h-3.5 ${isUrgent ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
          <span className={isUrgent ? 'text-red-600 font-black' : ''}>
            {isAllSubmitted ? 'All Players Locked In' : isUrgent ? 'Final Countdown!' : 'Response Clock'}
          </span>
        </div>

        <div className={`font-mono text-sm font-black flex items-center gap-1 ${
          isUrgent ? 'text-red-600 scale-105 transition-transform animate-bounce' : 'text-[#2D2A26]'
        }`}>
          {isUrgent && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isUrgent ? 'bg-gradient-to-r from-amber-500 to-red-600 animate-pulse' : 'bg-amber-500'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

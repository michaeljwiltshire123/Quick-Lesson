import React, { useState, useEffect } from 'react';
import { Clock, Volume2, Pause, Play } from 'lucide-react';

interface Props {
  initialSeconds: number;
  isTTSSpeaking: boolean;
  isManualPaused: boolean;
  onTimerEnd?: () => void;
}

export const LiveLadderTimerSync: React.FC<Props> = ({
  initialSeconds, isTTSSpeaking, isManualPaused, onTimerEnd,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => { setTimeLeft(initialSeconds); }, [initialSeconds]);

  useEffect(() => {
    if (isTTSSpeaking || isManualPaused || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); onTimerEnd?.(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTTSSpeaking, isManualPaused, timeLeft, onTimerEnd]);

  const pct = Math.max(0, (timeLeft / initialSeconds) * 100);

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-bold text-[#2D2A26]">
        <span className="flex items-center gap-1.5">
          {isTTSSpeaking ? (
            <span className="flex items-center gap-1 text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300 animate-pulse">
              <Volume2 className="w-3.5 h-3.5" /> TTS Reading Prompt - Timer Paused
            </span>
          ) : isManualPaused ? (
            <span className="flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-0.5 rounded-lg">
              <Pause className="w-3.5 h-3.5" /> Timer Paused
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <Play className="w-3.5 h-3.5" /> Active Countdown
            </span>
          )}
        </span>
        <span className="flex items-center gap-1 font-extrabold text-[#2D2A26]">
          <Clock className="w-3.5 h-3.5 text-[#F59E0B]" /> {timeLeft}s / {initialSeconds}s
        </span>
      </div>
      <div className="w-full bg-[#F8F6F0] h-2 rounded-full overflow-hidden border border-[#2D2A26]/10">
        <div className={`h-full transition-all duration-1000 ${pct > 50 ? 'bg-emerald-500' : pct > 20 ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

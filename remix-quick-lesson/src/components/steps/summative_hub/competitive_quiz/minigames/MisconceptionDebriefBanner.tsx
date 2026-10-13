import React, { useEffect, useState } from 'react';
import { Lightbulb, CheckCircle2, XCircle, Timer } from 'lucide-react';

interface Props {
  conceptCovered: string;
  trapOption: string;
  whyTrapWasWrong: string;
  correctAnswerText: string;
  durationSeconds?: number;
  onComplete: () => void;
}

export const MisconceptionDebriefBanner: React.FC<Props> = ({
  conceptCovered,
  trapOption,
  whyTrapWasWrong,
  correctAnswerText,
  durationSeconds = 5,
  onComplete,
}) => {
  const [seconds, setSeconds] = useState(durationSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  return (
    <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 text-white space-y-3 shadow-2xl relative animate-in fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300">
            5-Second Learning Lock-in: {conceptCovered}
          </h4>
        </div>
        <div className="flex items-center gap-1 font-mono text-xs font-black text-amber-300">
          <Timer className="w-3.5 h-3.5" />
          <span>{seconds}s</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Correct Solution */}
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Why the Correct Answer Works:</span>
          </div>
          <p className="text-gray-200">{correctAnswerText}</p>
        </div>

        {/* Why Trap Was Wrong */}
        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-2xl space-y-1">
          <div className="flex items-center gap-1.5 text-rose-300 font-bold">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>Common Trap Decoy ({trapOption}):</span>
          </div>
          <p className="text-gray-200">{whyTrapWasWrong}</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { DigitalStyle } from '../../../types/timerTypes';

interface DigitalClockFaceProps {
  mins: number;
  secs: number;
  style?: DigitalStyle;
  progressPct: number;
  accentColor: string;
  isRunning: boolean;
}

export const DigitalClockFace: React.FC<DigitalClockFaceProps> = ({
  mins, secs, style = 'radial', progressPct, accentColor, isRunning,
}) => {
  const padMins = mins < 10 ? `0${mins}` : mins;
  const padSecs = secs < 10 ? `0${secs}` : secs;

  if (style === 'neon') {
    return (
      <div className="flex flex-col items-center justify-center py-1">
        <div
          style={{ textShadow: `0 0 12px ${accentColor}` }}
          className="font-mono font-black text-3xl md:text-4xl text-stone-900 tracking-wider flex items-center"
        >
          <span>{padMins}</span>
          <span className={`px-0.5 ${isRunning ? 'animate-pulse' : ''}`}>:</span>
          <span>{padSecs}</span>
        </div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-stone-500 mt-0.5">Neon Digital</div>
      </div>
    );
  }

  if (style === 'radial') {
    const strokeDash = 2 * Math.PI * 38;
    const offset = strokeDash - (progressPct / 100) * strokeDash;
    return (
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#E7E5E4" strokeWidth="7" />
          <circle
            cx="50" cy="50" r="38" fill="none" stroke={accentColor} strokeWidth="7"
            strokeDasharray={strokeDash} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-black text-xl text-stone-900">{padMins}:{padSecs}</span>
          <span className="text-[8px] font-extrabold text-stone-500">{Math.round(100 - progressPct)}% Left</span>
        </div>
      </div>
    );
  }

  if (style === 'flip') {
    return (
      <div className="flex items-center justify-center gap-1.5 py-1">
        <div className="bg-stone-900 text-amber-300 font-mono font-black text-2xl px-2.5 py-1.5 rounded-lg shadow-inner border border-stone-700">
          {padMins}
        </div>
        <span className="font-mono font-black text-stone-800 text-xl">:</span>
        <div className="bg-stone-900 text-amber-300 font-mono font-black text-2xl px-2.5 py-1.5 rounded-lg shadow-inner border border-stone-700">
          {padSecs}
        </div>
      </div>
    );
  }

  // Default: Horizon Progress Bar
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-1.5 py-1">
      <div className="font-mono font-black text-3xl text-stone-900 tracking-tight">
        {padMins}:{padSecs}
      </div>
      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%`, backgroundColor: accentColor }} />
      </div>
    </div>
  );
};

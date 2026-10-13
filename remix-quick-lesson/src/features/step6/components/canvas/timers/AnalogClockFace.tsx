import React from 'react';
import { AnalogueStyle } from '../../../types/timerTypes';

interface AnalogClockFaceProps {
  mins: number;
  secs: number;
  style?: AnalogueStyle;
  progressPct: number;
  accentColor: string;
}

export const AnalogClockFace: React.FC<AnalogClockFaceProps> = ({
  mins, secs, style = 'wall', progressPct, accentColor,
}) => {
  const secondDeg = (secs / 60) * 360;
  const minuteDeg = ((mins % 60) / 60) * 360 + (secs / 60) * 6;

  if (style === 'iris') {
    return (
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div
          style={{ background: `conic-gradient(${accentColor} ${progressPct}%, #F5F5F4 ${progressPct}% 100%)` }}
          className="w-full h-full rounded-full border-2 border-stone-300 shadow-inner flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xs">
            <span className="font-mono font-black text-xs text-stone-800">{mins}:{secs < 10 ? `0${secs}` : secs}</span>
          </div>
        </div>
      </div>
    );
  }

  if (style === 'stopwatch') {
    return (
      <div className="relative w-28 h-28 mx-auto flex flex-col items-center">
        <div className="w-4 h-2 bg-stone-700 rounded-t-sm -mb-0.5" />
        <div className="relative w-24 h-24 rounded-full border-4 border-stone-800 bg-white shadow-md flex items-center justify-center">
          <div className="absolute inset-1 rounded-full border border-dashed border-stone-300" />
          <div
            style={{ transform: `rotate(${secondDeg}deg)` }}
            className="absolute w-0.5 h-10 bg-red-600 origin-bottom bottom-1/2 left-[calc(50%-1px)] transition-transform duration-300"
          />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 z-10" />
          <span className="absolute bottom-3 font-mono font-bold text-[9px] text-stone-600">{mins}:{secs < 10 ? `0${secs}` : secs}</span>
        </div>
      </div>
    );
  }

  if (style === 'hourglass') {
    return (
      <div className="flex flex-col items-center justify-center space-y-1 py-1">
        <div className="w-16 h-20 relative flex flex-col items-center justify-between p-1 bg-amber-100/60 rounded-xl border-2 border-amber-800">
          <div className="w-12 h-8 bg-amber-300/80 rounded-t-lg transition-all" style={{ height: `${Math.max(4, 32 * (1 - progressPct / 100))}px` }} />
          <div className="w-1 h-3 bg-amber-600 animate-pulse" />
          <div className="w-12 h-8 bg-amber-400 rounded-b-lg transition-all" style={{ height: `${Math.max(4, 32 * (progressPct / 100))}px` }} />
        </div>
        <span className="font-mono font-black text-xs text-stone-800">{mins}:{secs < 10 ? `0${secs}` : secs}</span>
      </div>
    );
  }

  // Default: Classic Classroom Wall Clock
  return (
    <div className="relative w-28 h-28 mx-auto rounded-full bg-white border-4 border-stone-800 shadow-md flex items-center justify-center">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <div key={deg} style={{ transform: `rotate(${deg}deg)` }} className="absolute w-full h-full flex justify-center pt-0.5">
          <div className={`w-0.5 ${deg % 90 === 0 ? 'h-2 bg-stone-900' : 'h-1 bg-stone-400'}`} />
        </div>
      ))}
      <div style={{ transform: `rotate(${minuteDeg}deg)` }} className="absolute w-1 h-8 bg-stone-900 origin-bottom bottom-1/2 left-[calc(50%-2px)] rounded-full transition-transform duration-300" />
      <div style={{ transform: `rotate(${secondDeg}deg)` }} className="absolute w-0.5 h-10 bg-red-600 origin-bottom bottom-1/2 left-[calc(50%-1px)] rounded-full transition-transform duration-300" />
      <div className="w-2.5 h-2.5 rounded-full bg-stone-900 z-10" />
    </div>
  );
};

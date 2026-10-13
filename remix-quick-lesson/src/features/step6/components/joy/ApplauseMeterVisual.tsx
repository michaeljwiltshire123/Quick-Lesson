import React from 'react';
import { ExternalLink, Volume2, Activity } from 'lucide-react';

interface ApplauseMeterVisualProps {
  liveVolume: number;
  peakVolume: number;
  isConnected: boolean;
  isBlocked: boolean;
  quietTimerSeconds: number;
}

export const ApplauseMeterVisual: React.FC<ApplauseMeterVisualProps> = ({
  liveVolume, peakVolume, isConnected, isBlocked, quietTimerSeconds,
}) => {
  const angle = (value: number) => -80 + (value / 100) * 160;
  return (
    <>
      <div className="flex w-full items-center justify-between px-1 text-[10px] font-black text-amber-300">
        <span className="flex items-center gap-1"><Volume2 className="h-3.5 w-3.5" />Applause-O-Meter</span>
        <span>{isConnected ? 'Live Mic' : isBlocked ? 'Mic Blocked' : 'Mic Off'}</span>
      </div>
      <div className="relative flex h-20 w-36 flex-col items-center justify-end overflow-hidden">
        <svg viewBox="0 0 100 55" className="h-full w-full">
          <path d="M 10 50 A 40 40 0 0 1 35 18" fill="none" stroke="#22C55E" strokeWidth="8" />
          <path d="M 35 18 A 40 40 0 0 1 65 18" fill="none" stroke="#EAB308" strokeWidth="8" />
          <path d="M 65 18 A 40 40 0 0 1 90 50" fill="none" stroke="#EF4444" strokeWidth="8" />
          <text x="18" y="44" fill="#A7F3D0" fontSize="4.5">Quiet</text>
          <text x="40" y="14" fill="#FEF08A" fontSize="4.5">Cheers</text>
        </svg>
        <div style={{ transform: `rotate(${angle(peakVolume)}deg)` }} className="absolute bottom-1 h-15 w-1 origin-bottom rounded-full bg-rose-500" />
        <div style={{ transform: `rotate(${angle(liveVolume)}deg)` }} className="absolute bottom-1 h-14 w-1 origin-bottom rounded-full bg-amber-300" />
      </div>
      <div className="w-full rounded-xl border border-amber-500/40 bg-stone-900 p-2 font-mono text-xs">
        <Activity className="mr-2 inline h-3 w-3 text-emerald-400" />Live level {liveVolume} / peak {peakVolume}
      </div>
      {isBlocked && <a href={window.location.href} target="_blank" rel="noreferrer"><ExternalLink className="mr-1 inline h-3 w-3" />Open app in a browser tab for mic access</a>}
      {!isBlocked && quietTimerSeconds > 0 && <p className="text-xs">Score reset in {Math.max(0, 4 - quietTimerSeconds)}s</p>}
    </>
  );
};

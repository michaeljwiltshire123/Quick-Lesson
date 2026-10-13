import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  isOffline: boolean;
  onForcedResignation: () => void;
  onManualReconnect: () => void;
}

export const WifiRecoveryGuard: React.FC<Props> = ({
  isOffline,
  onForcedResignation,
  onManualReconnect,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(120);

  useEffect(() => {
    if (!isOffline) {
      setSecondsRemaining(120);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onForcedResignation();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOffline, onForcedResignation]);

  if (!isOffline) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div id="wifi-recovery-guard-modal" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-rose-300 max-w-sm w-full p-5 shadow-2xl space-y-4 text-center animate-in fade-in">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
          <WifiOff className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            Connection Paused
          </span>
          <h3 className="text-base font-black text-[#2D2A26]">Reconnecting to the Game</h3>
          <p className="text-xs text-[#2D2A26]/70">
            Looks like your internet dropped for a moment! Don't worry, we're holding your place.
          </p>
        </div>

        <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-200/80 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-900">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Time left to rejoin:</span>
          </div>
          <p className="text-2xl font-mono font-black text-rose-700">{timeFormatted}</p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={onManualReconnect}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#2D2A26] hover:bg-black text-white flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try Reconnecting Now
          </button>
          <button
            type="button"
            onClick={onForcedResignation}
            className="text-[11px] text-[#2D2A26]/60 hover:text-rose-700 py-1 font-medium cursor-pointer"
          >
            Leave this round
          </button>
        </div>
      </div>
    </div>
  );
};

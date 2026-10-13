import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface Props {
  roleLabel: string;
  pupilName: string;
  children: React.ReactNode;
}

export const DevicePhoneMockup: React.FC<Props> = ({ roleLabel, pupilName, children }) => {
  return (
    <div className="w-full max-w-[340px] mx-auto bg-slate-900 rounded-[36px] p-3 border-4 border-slate-700 shadow-2xl space-y-2 flex flex-col">
      {/* Top Phone Speaker & Status Bar */}
      <div className="flex items-center justify-between px-3 pt-1 text-[10px] text-gray-400">
        <span className="font-mono font-bold">09:41</span>
        <div className="w-16 h-3.5 bg-black rounded-full mx-auto -mt-1 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
        </div>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <BatteryMedium className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Pupil Role Header Badge */}
      <div className="flex items-center justify-between px-2 py-1 bg-black/40 rounded-xl border border-white/10 text-[10px]">
        <span className="font-bold text-gray-300 truncate max-w-[120px]">{pupilName}</span>
        <span className="font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
          {roleLabel}
        </span>
      </div>

      {/* Interactive Screen Surface */}
      <div className="flex-1 bg-slate-950 rounded-[24px] p-2 overflow-y-auto max-h-[460px] border border-white/5 custom-scrollbar">
        {children}
      </div>

      {/* Bottom Home Indicator */}
      <div className="w-24 h-1 bg-gray-600 rounded-full mx-auto mt-1" />
    </div>
  );
};

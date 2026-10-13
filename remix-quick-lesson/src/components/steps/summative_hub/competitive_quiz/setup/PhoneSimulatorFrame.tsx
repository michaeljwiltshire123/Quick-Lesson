import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const PhoneSimulatorFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-[320px] mx-auto bg-slate-950 rounded-[40px] p-3.5 border-4 border-slate-700 shadow-2xl ring-1 ring-white/10 relative">
      {/* Top Notch Speaker */}
      <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700" />
      </div>

      {/* Simulated Phone Status Bar */}
      <div className="flex justify-between items-center px-3 text-[10px] text-gray-400 font-mono mb-2">
        <span>09:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      {/* Phone Screen Canvas */}
      <div className="bg-slate-900 rounded-[28px] p-2.5 min-h-[440px] max-h-[500px] overflow-y-auto border border-white/5">
        {children}
      </div>

      {/* Home Indicator Bar */}
      <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2" />
    </div>
  );
};

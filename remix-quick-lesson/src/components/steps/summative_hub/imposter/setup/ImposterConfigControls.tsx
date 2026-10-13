import React from 'react';
import { Users, Clock, Printer, ShieldAlert } from 'lucide-react';
import { ImposterRoomConfig } from '../types/imposterTypes';

interface Props {
  config: ImposterRoomConfig;
  onChange: (updated: Partial<ImposterRoomConfig>) => void;
}

export const ImposterConfigControls: React.FC<Props> = ({ config, onChange }) => {
  return (
    <div id="imposter-config-controls" className="space-y-4">
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2D2A26] uppercase tracking-wide mb-2">
          <Users className="w-3.5 h-3.5 text-amber-600" />
          Imposter Allocation
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 3] as const).map((num) => (
            <button
              key={num}
              id={`btn-imposter-count-${num}`}
              type="button"
              onClick={() => onChange({ imposterCount: num })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                config.imposterCount === num
                  ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                  : 'bg-[#F8F6F0] text-[#2D2A26]/80 border-[#2D2A26]/15 hover:border-amber-400'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {num} {num === 1 ? 'Imposter' : 'Imposters'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2D2A26] uppercase tracking-wide mb-2">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Task Round Timer
        </label>
        <div className="grid grid-cols-2 gap-2">
          {([30, 60] as const).map((sec) => (
            <button
              key={sec}
              id={`btn-timer-${sec}s`}
              type="button"
              onClick={() => onChange({ timerPreset: sec })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                config.timerPreset === sec
                  ? 'bg-[#2D2A26] text-white border-[#1C1A17] shadow-sm'
                  : 'bg-[#F8F6F0] text-[#2D2A26]/80 border-[#2D2A26]/15 hover:border-[#2D2A26]/40'
              }`}
            >
              {sec} Seconds
            </button>
          ))}
        </div>
      </div>

      <div className="pt-1 border-t border-[#2D2A26]/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Printer className="w-4 h-4 text-[#2D2A26]/60" />
          <div>
            <p className="text-xs font-semibold text-[#2D2A26]">Offline & Printable Mode</p>
            <p className="text-[11px] text-[#2D2A26]/60">Generate physical role slips for students</p>
          </div>
        </div>
        <button
          id="btn-toggle-offline-mode"
          type="button"
          onClick={() => onChange({ offlinePrintable: !config.offlinePrintable })}
          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border ${
            config.offlinePrintable ? 'bg-amber-600 border-amber-700' : 'bg-stone-300 border-stone-400'
          }`}
          aria-label="Toggle offline printable mode"
        >
          <span
            className={`block w-4 h-4 rounded-full bg-white transition-transform ${
              config.offlinePrintable ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

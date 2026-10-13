import React from 'react';
import { Users, Timer, Sparkles, Smartphone, Coins } from 'lucide-react';
import { CompetitiveQuizConfig, PotPatternId } from '../types/competitiveQuizTypes';

interface Props {
  config: CompetitiveQuizConfig;
  onChangeConfig: (updated: CompetitiveQuizConfig) => void;
}

export const RoomConfigControls: React.FC<Props> = ({ config, onChangeConfig }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-[#2D2A26]/15 shadow-xs space-y-3 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {/* Mode Selector */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-gray-200 space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>Format</span>
          </label>
          <div className="grid grid-cols-2 gap-1">
            {(['individual', 'teams'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onChangeConfig({ ...config, mode: m })}
                className={`py-1 rounded-lg font-bold capitalize cursor-pointer transition-all ${
                  config.mode === m
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {m === 'teams' ? 'Squads' : 'Solo'}
              </button>
            ))}
          </div>
        </div>

        {/* Speed Limit */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-gray-200 space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-rose-500" />
            <span>Timer Per Question</span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[6, 8, 10, 15].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => onChangeConfig({ ...config, speedLimitSeconds: sec })}
                className={`py-1 rounded-lg font-bold cursor-pointer transition-all ${
                  config.speedLimitSeconds === sec
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>

        {/* Pot Multiplier */}
        <div className="p-2.5 bg-slate-50 rounded-xl border border-gray-200 space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500" />
            <span>Pot Escalation</span>
          </label>
          <select
            value={config.potPatternId}
            onChange={(e) => onChangeConfig({ ...config, potPatternId: e.target.value as PotPatternId })}
            className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg font-semibold text-xs focus:outline-hidden"
          >
            <option value="static">Fixed Pot (150 pts)</option>
            <option value="escalating">Escalating Growth</option>
            <option value="jackpot_rush">Jackpot Rush (Double Last 2)</option>
          </select>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-black/5">
        <button
          type="button"
          onClick={() => onChangeConfig({ ...config, allowPowerUps: !config.allowPowerUps })}
          className={`px-2.5 py-1 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer border transition-all ${
            config.allowPowerUps ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tactical Power-Ups: {config.allowPowerUps ? 'On' : 'Off'}</span>
        </button>
        <button
          type="button"
          onClick={() => onChangeConfig({ ...config, gyroStealingEnabled: !config.gyroStealingEnabled })}
          className={`px-2.5 py-1 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer border transition-all ${
            config.gyroStealingEnabled ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone Gyro Steal: {config.gyroStealingEnabled ? 'Active' : 'Off'}</span>
        </button>
      </div>
    </div>
  );
};

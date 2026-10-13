import React from 'react';
import { DontSayItRoomConfig } from '../types/dontSayItTypes';
import { Clock, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

interface Props {
  config: DontSayItRoomConfig;
  onChangeConfig: (updated: DontSayItRoomConfig) => void;
}

export const DontSayItMatchParamGrid: React.FC<Props> = ({ config, onChangeConfig }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 space-y-1.5">
        <label className="text-[11px] font-bold text-gray-600 uppercase flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-600" /> Match Rounds
        </label>
        <select
          value={config.totalRounds || 2}
          onChange={(e) => onChangeConfig({ ...config, totalRounds: Number(e.target.value) })}
          className="w-full px-3 py-1.5 bg-white border border-[#2D2A26]/15 rounded-lg text-xs font-bold"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r} {r === 1 ? 'Round' : 'Rounds'}</option>
          ))}
        </select>
      </div>

      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 space-y-1.5">
        <label className="text-[11px] font-bold text-gray-600 uppercase flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600" /> Round Timer
        </label>
        <select
          value={config.timeLimitSeconds}
          onChange={(e) => onChangeConfig({ ...config, timeLimitSeconds: Number(e.target.value) })}
          className="w-full px-3 py-1.5 bg-white border border-[#2D2A26]/15 rounded-lg text-xs font-bold"
        >
          {[30, 45, 60, 90].map((sec) => (
            <option key={sec} value={sec}>{sec} Seconds</option>
          ))}
        </select>
      </div>

      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 space-y-1.5">
        <label className="text-[11px] font-bold text-gray-600 uppercase flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Words / Opponent
        </label>
        <select
          value={config.bannedWordsPerCard || 2}
          onChange={(e) => onChangeConfig({ ...config, bannedWordsPerCard: Number(e.target.value) })}
          className="w-full px-3 py-1.5 bg-white border border-[#2D2A26]/15 rounded-lg text-xs font-bold"
        >
          {[1, 2, 3].map((cnt) => (
            <option key={cnt} value={cnt}>{cnt} {cnt === 1 ? 'Word' : 'Words'} / Pupil</option>
          ))}
        </select>
      </div>

      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-gray-700 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Fallback
          </span>
          <span className="text-[10px] text-gray-500">Auto-fill if too slow</span>
        </div>
        <input
          type="checkbox"
          checked={config.allowAiFallback}
          onChange={(e) => onChangeConfig({ ...config, allowAiFallback: e.target.checked })}
          className="w-4 h-4 accent-amber-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

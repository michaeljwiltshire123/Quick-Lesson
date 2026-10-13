import React from 'react';
import { TournamentFormat } from '../types/gridlockTypes';
import { Trophy, Sparkles, Volume2 } from 'lucide-react';

interface Props {
  tournamentFormat: TournamentFormat;
  onFormatChange: (f: TournamentFormat) => void;
  goldHexCount: number;
  onGoldHexToggle: () => void;
  onOpenVoiceSettings?: () => void;
}

export const GridlockConfigControls: React.FC<Props> = ({
  tournamentFormat,
  onFormatChange,
  goldHexCount,
  onGoldHexToggle,
  onOpenVoiceSettings,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="bg-white p-3.5 rounded-xl border border-[#2D2A26]/10 space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26] uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
          Tournament Format
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(['best-of-3', 'best-of-5', 'best-of-7'] as TournamentFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => onFormatChange(fmt)}
              className={`py-1.5 px-1 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                tournamentFormat === fmt
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-xs'
                  : 'bg-white text-[#2D2A26] border-[#2D2A26]/15 hover:bg-black/5'
              }`}
            >
              {fmt === 'best-of-3' ? 'Bo3' : fmt === 'best-of-5' ? 'Bo5' : 'Bo7'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-[#2D2A26]/10 space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Special Hexagons
        </label>
        <button
          type="button"
          onClick={onGoldHexToggle}
          className={`w-full py-1.5 px-2.5 flex items-center justify-between rounded-lg border transition-all cursor-pointer ${
            goldHexCount > 0
              ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
              : 'bg-white border-[#2D2A26]/15 text-[#2D2A26] font-medium'
          }`}
        >
          <span className="text-xs">2 Gold Hexes (2x Pts)</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            goldHexCount > 0 ? 'bg-amber-200 text-amber-900' : 'bg-gray-100 text-gray-500'
          }`}>
            {goldHexCount > 0 ? 'Active' : 'Off'}
          </span>
        </button>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-[#2D2A26]/10 space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26] uppercase tracking-wider">
          <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
          Host Voice & Speech
        </label>
        <button
          type="button"
          onClick={onOpenVoiceSettings}
          className="w-full py-1.5 px-2.5 flex items-center justify-between rounded-lg border border-[#2D2A26]/15 hover:border-indigo-400 bg-white hover:bg-indigo-50/50 text-[#2D2A26] text-xs font-bold transition-all cursor-pointer"
        >
          <span className="text-xs">UK Voice & Speed</span>
          <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-bold">
            Configure
          </span>
        </button>
      </div>
    </div>
  );
};

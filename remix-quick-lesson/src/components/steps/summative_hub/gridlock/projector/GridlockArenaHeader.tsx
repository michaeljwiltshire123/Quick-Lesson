import React from 'react';
import { Monitor, Smartphone, Split, Sliders } from 'lucide-react';
import { TeamColor } from '../types/gridlockTypes';

interface Props {
  roomCode: string;
  viewLayout: 'projector' | 'dual' | 'phone';
  onViewLayoutChange: (layout: 'projector' | 'dual' | 'phone') => void;
  onClaimTile: (team: TeamColor) => void;
  onOpenVoiceSettings?: () => void;
}

export const GridlockArenaHeader: React.FC<Props> = ({
  roomCode,
  viewLayout,
  onViewLayoutChange,
  onClaimTile,
  onOpenVoiceSettings,
}) => {
  return (
    <div className="bg-[#2D2A26] text-white p-3.5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-xs font-black uppercase text-amber-400">Classroom Arena Live</span>
        <span className="text-[11px] text-gray-300">Room: {roomCode}</span>
      </div>

      <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
        <button
          type="button"
          onClick={() => onViewLayoutChange('projector')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            viewLayout === 'projector' ? 'bg-white text-[#2D2A26] shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" /> Main Screen
        </button>
        <button
          type="button"
          onClick={() => onViewLayoutChange('dual')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            viewLayout === 'dual' ? 'bg-white text-[#2D2A26] shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Split className="w-3.5 h-3.5" /> Dual Screen
        </button>
        <button
          type="button"
          onClick={() => onViewLayoutChange('phone')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
            viewLayout === 'phone' ? 'bg-white text-[#2D2A26] shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" /> Pupil Phone
        </button>
      </div>

      <div className="flex items-center gap-2">
        {onOpenVoiceSettings && (
          <button
            type="button"
            onClick={onOpenVoiceSettings}
            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-bold rounded-lg cursor-pointer border border-white/15 flex items-center gap-1"
            title="Configure Voice Persona & Speed"
          >
            <Sliders className="w-3.5 h-3.5" /> <span>Voice Controls</span>
          </button>
        )}
        <button type="button" onClick={() => onClaimTile('red')} className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer">
          + Claim Red
        </button>
        <button type="button" onClick={() => onClaimTile('blue')} className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer">
          + Claim Blue
        </button>
      </div>
    </div>
  );
};

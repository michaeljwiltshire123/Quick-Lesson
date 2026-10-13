import React from 'react';
import { ShieldAlert, Clock, Smartphone } from 'lucide-react';
import { AntiCheatConfig } from './typesEscape';

interface Props {
  antiCheat: AntiCheatConfig;
  onToggle: (key: keyof AntiCheatConfig) => void;
}

export const AntiCheatToolbar: React.FC<Props> = ({ antiCheat, onToggle }) => (
  <div className="flex flex-wrap items-center gap-2">
    <button
      type="button"
      onClick={() => onToggle('tabFocusDetection')}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
        antiCheat.tabFocusDetection ? 'bg-amber-100/70 border-amber-400 text-amber-900' : 'bg-white border-[#2D2A26]/15 text-[#2D2A26]/60'
      }`}
    >
      <ShieldAlert className="w-3 h-3 text-[#D97706]" />
      <span>Tab-Focus Guard</span>
    </button>
    <button
      type="button"
      onClick={() => onToggle('cooldownSeconds20')}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
        antiCheat.cooldownSeconds20 ? 'bg-amber-100/70 border-amber-400 text-amber-900' : 'bg-white border-[#2D2A26]/15 text-[#2D2A26]/60'
      }`}
    >
      <Clock className="w-3 h-3 text-[#D97706]" />
      <span>20s Cooldown Guard</span>
    </button>
    <button
      type="button"
      onClick={() => onToggle('jigsawDeviceLock')}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
        antiCheat.jigsawDeviceLock ? 'bg-amber-100/70 border-amber-400 text-amber-900' : 'bg-white border-[#2D2A26]/15 text-[#2D2A26]/60'
      }`}
    >
      <Smartphone className="w-3 h-3 text-[#D97706]" />
      <span>Jigsaw Device Lock</span>
    </button>
  </div>
);

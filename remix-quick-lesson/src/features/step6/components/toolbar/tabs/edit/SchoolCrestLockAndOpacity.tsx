import React from 'react';
import { Lock, Unlock, Sliders } from 'lucide-react';

interface SchoolCrestLockAndOpacityProps {
  isLocked: boolean;
  opacity: number;
  onToggleCrestLock?: (isLocked: boolean) => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  setOpacity: (val: number) => void;
}

export const SchoolCrestLockAndOpacity: React.FC<SchoolCrestLockAndOpacityProps> = ({
  isLocked, opacity, onToggleCrestLock, onUpdateCrestOpacity, setOpacity,
}) => {
  return (
    <div className="pt-1.5 border-t border-stone-200/80 space-y-1.5">
      <button
        type="button"
        onClick={() => onToggleCrestLock?.(!isLocked)}
        className={`w-full py-1 px-2 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
          isLocked ? 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100' : 'bg-amber-100 border-amber-400 text-amber-950 hover:bg-amber-200'
        }`}
      >
        {isLocked ? <Lock className="w-3 h-3 text-blue-700" /> : <Unlock className="w-3 h-3 text-amber-800" />}
        <span>{isLocked ? '🔒 Locked on Theme (Click to Move)' : '🔓 Unlocked (Drag to reposition all)'}</span>
      </button>

      <div className="space-y-0.5">
        <div className="flex items-center justify-between text-[10px] text-stone-600 font-medium">
          <span className="flex items-center gap-1"><Sliders className="w-3 h-3 text-amber-700" />Watermark Opacity</span>
          <span className="font-bold">{opacity}%</span>
        </div>
        <input
          type="range" min="15" max="100" value={opacity}
          onChange={(e) => { const val = parseInt(e.target.value); setOpacity(val); onUpdateCrestOpacity?.(val); }}
          className="w-full accent-amber-800 h-1 bg-stone-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};

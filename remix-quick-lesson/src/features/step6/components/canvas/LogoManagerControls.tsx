import React from 'react';
import { Lock, Unlock, Sliders, Link } from 'lucide-react';

interface LogoManagerControlsProps {
  isLocked: boolean;
  opacity: number;
  onToggleLock: (isLocked: boolean) => void;
  onUpdateOpacity: (val: number) => void;
}

export const LogoManagerControls: React.FC<LogoManagerControlsProps> = ({
  isLocked, opacity, onToggleLock, onUpdateOpacity,
}) => {
  return (
    <div className="pt-2 border-t border-stone-100 space-y-2">
      <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-1.5 text-[10.5px] font-semibold text-amber-900">
        <Link className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span>Auto-linked: Clicking this logo on any slide returns to Aims & Outcomes.</span>
      </div>

      <button
        type="button"
        onClick={() => onToggleLock(!isLocked)}
        className={`w-full py-1.5 px-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
          isLocked ? 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100' : 'bg-amber-100 border-amber-400 text-amber-950 hover:bg-amber-200'
        }`}
      >
        {isLocked ? <Lock className="w-3.5 h-3.5 text-blue-700" /> : <Unlock className="w-3.5 h-3.5 text-amber-800" />}
        <span>{isLocked ? '🔒 Locked on Theme (Click to Move)' : '🔓 Unlocked (Drag to reposition all)'}</span>
      </button>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-stone-600 font-semibold">
          <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5 text-amber-700" />Logo Opacity</span>
          <span className="font-extrabold">{opacity}%</span>
        </div>
        <input
          type="range" min="15" max="100" value={opacity}
          onChange={(e) => onUpdateOpacity(parseInt(e.target.value))}
          className="w-full accent-amber-800 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};

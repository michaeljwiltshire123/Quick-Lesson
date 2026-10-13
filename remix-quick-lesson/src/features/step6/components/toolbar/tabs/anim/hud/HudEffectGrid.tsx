import React from 'react';
import { AnimationCategory } from '../studio/types';
import { HUD_ENTRANCE_EFFECTS, HUD_ANIMATION_EFFECTS, HUD_EXIT_EFFECTS, HudEffectOption } from './hudTypes';
import { Check } from 'lucide-react';

interface HudEffectGridProps {
  category: AnimationCategory;
  selectedEffectId: string | null;
  onSelectEffect: (effectId: string) => void;
}

export const HudEffectGrid: React.FC<HudEffectGridProps> = ({
  category, selectedEffectId, onSelectEffect,
}) => {
  const options = category === 'entrance'
    ? HUD_ENTRANCE_EFFECTS
    : category === 'emphasis'
    ? HUD_ANIMATION_EFFECTS
    : HUD_EXIT_EFFECTS;

  return (
    <div className="space-y-1.5 select-none">
      <div className="flex items-center justify-between text-[11px] font-extrabold text-stone-700">
        <span>1. Choose Style</span>
        <span className="text-[9.5px] text-stone-400 font-medium">Click to pick</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {options.map((opt) => {
          const isSelected = selectedEffectId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectEffect(opt.id)}
              className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-14 ${
                isSelected
                  ? 'bg-amber-100/90 border-amber-600 ring-2 ring-amber-400 font-black text-amber-950 shadow-2xs'
                  : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-stone-50 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm">{opt.icon}</span>
                {isSelected && <Check className="w-3 h-3 text-amber-800 shrink-0" />}
              </div>
              <div className="text-[10.5px] font-bold leading-tight truncate w-full">
                {opt.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

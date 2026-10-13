import React from 'react';
import { AnimationCategory } from '../studio/types';
import { HudEffectGrid } from './HudEffectGrid';
import { HudTriggerSelector } from './HudTriggerSelector';
import { HudPacingSelector } from './HudPacingSelector';
import { X, Check, Trash2, Layers } from 'lucide-react';

interface TimelineHudPopoverProps {
  isOpen: boolean;
  category: AnimationCategory;
  elementLabel: string;
  selectedCount: number;
  effectId: string | null;
  trigger: string;
  duration: number;
  repeatTimes: number;
  onSelectEffect: (id: string) => void;
  onSelectTrigger: (trig: string) => void;
  onSelectDuration: (dur: number) => void;
  onSelectRepeat: (rep: number) => void;
  onClearEffect: () => void;
  onClose: () => void;
}

export const TimelineHudPopover: React.FC<TimelineHudPopoverProps> = ({
  isOpen, category, elementLabel, selectedCount, effectId, trigger, duration,
  repeatTimes, onSelectEffect, onSelectTrigger, onSelectDuration, onSelectRepeat,
  onClearEffect, onClose,
}) => {
  if (!isOpen) return null;

  const title = category === 'entrance' ? 'Entrance Options' : category === 'emphasis' ? 'Animation Options' : 'Exit Options';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] flex items-center justify-center p-3 animate-in fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl max-w-sm w-full p-3.5 shadow-2xl space-y-3 text-stone-800 animate-in zoom-in-95"
      >
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-bold text-xs text-stone-900">{title}</span>
            {selectedCount > 1 ? (
              <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200 flex items-center gap-1">
                <Layers className="w-2.5 h-2.5" />
                <span>{selectedCount} Selected</span>
              </span>
            ) : (
              <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                {elementLabel}
              </span>
            )}
          </div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-stone-100 rounded-lg cursor-pointer text-stone-400 hover:text-stone-700 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <HudEffectGrid category={category} selectedEffectId={effectId} onSelectEffect={onSelectEffect} />
        <HudTriggerSelector currentTrigger={trigger} onSelectTrigger={onSelectTrigger} />
        <HudPacingSelector category={category} duration={duration} repeatTimes={repeatTimes} onSelectDuration={onSelectDuration} onSelectRepeat={onSelectRepeat} />

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={onClearEffect}
            className="px-2.5 py-1.5 rounded-xl border border-stone-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-stone-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            <span>None (Clear)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            <Check className="w-3 h-3" />
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};

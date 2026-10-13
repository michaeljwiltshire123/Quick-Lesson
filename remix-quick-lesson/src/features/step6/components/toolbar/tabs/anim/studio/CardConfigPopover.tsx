import React, { useEffect } from 'react';
import { AnimationCategory } from './types';
import { GhostTriggerSegment } from './ghost/GhostTriggerSegment';
import { GhostSpeedSegment } from './ghost/GhostSpeedSegment';
import { X, Check, Sparkles } from 'lucide-react';

interface CardConfigPopoverProps {
  isOpen: boolean;
  effectName: string;
  category: AnimationCategory;
  trigger: string;
  duration: number;
  repeatTimes: number;
  onTriggerChange: (val: string) => void;
  onDurationChange: (val: number) => void;
  onRepeatChange: (val: number) => void;
  onClose: () => void;
}

export const CardConfigPopover: React.FC<CardConfigPopoverProps> = ({
  isOpen, effectName, category, trigger, duration, repeatTimes,
  onTriggerChange, onDurationChange, onRepeatChange, onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 bg-black/25 backdrop-blur-[2px] flex items-center justify-center p-3 animate-in fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-72 bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-2xl rounded-2xl p-3.5 space-y-3 text-stone-800 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-bold text-xs text-stone-900 capitalize truncate">
              {effectName || 'Effect'} Options
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <GhostTriggerSegment trigger={trigger} onSelectTrigger={onTriggerChange} />

        <GhostSpeedSegment
          duration={duration}
          repeatTimes={repeatTimes}
          category={category}
          onSelectDuration={onDurationChange}
          onSelectRepeat={onRepeatChange}
        />

        <button
          type="button"
          onClick={onClose}
          className="w-full py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
        >
          <Check className="w-3 h-3" />
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};

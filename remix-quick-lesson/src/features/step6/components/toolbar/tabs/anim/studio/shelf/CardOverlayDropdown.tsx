import React, { useEffect } from 'react';
import { AnimationCategory } from '../types';
import { GoogleSheetsTriggerItems } from './GoogleSheetsTriggerItems';
import { GoogleSheetsDurationSlider } from './GoogleSheetsDurationSlider';
import { OverlayAddButton } from './OverlayAddButton';
import { X, SlidersHorizontal } from 'lucide-react';

interface CardOverlayDropdownProps {
  isOpen: boolean;
  cardName: string;
  category: AnimationCategory;
  trigger: string;
  duration: number;
  repeatTimes: number;
  isRightColumn?: boolean;
  onSelectTrigger: (trigger: string) => void;
  onSelectDuration: (duration: number) => void;
  onSelectRepeat: (repeatTimes: number) => void;
  onAddToTimeline?: () => void;
  onClose: () => void;
}

export const CardOverlayDropdown: React.FC<CardOverlayDropdownProps> = ({
  isOpen, cardName, category, trigger, duration, repeatTimes,
  onSelectTrigger, onSelectDuration, onSelectRepeat, onAddToTimeline, onClose,
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
      onClick={(e) => e.stopPropagation()}
      className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-amber-500 p-2 select-none text-stone-800 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-100"
    >
      <div className="flex items-center justify-between px-1 pb-1 border-b border-stone-200/80">
        <div className="flex items-center gap-1.5 min-w-0">
          <SlidersHorizontal className="w-3 h-3 text-amber-700 shrink-0" />
          <span className="text-[10px] font-extrabold text-amber-950 uppercase tracking-wider truncate">
            {cardName}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-0.5 rounded-md hover:bg-stone-200 text-stone-500 hover:text-stone-800 cursor-pointer transition-colors"
          title="Close timing menu"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <GoogleSheetsTriggerItems
        trigger={trigger}
        onSelectTrigger={onSelectTrigger}
      />

      <GoogleSheetsDurationSlider
        duration={duration}
        onSelectDuration={onSelectDuration}
        isEmphasis={category === 'emphasis'}
        repeatTimes={repeatTimes}
        onSelectRepeat={onSelectRepeat}
      />

      {onAddToTimeline && (
        <OverlayAddButton onAdd={onAddToTimeline} />
      )}
    </div>
  );
};

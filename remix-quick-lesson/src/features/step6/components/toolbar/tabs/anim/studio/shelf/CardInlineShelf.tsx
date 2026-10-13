import React from 'react';
import { AnimationCategory } from '../types';
import { ShelfTriggerPills } from './ShelfTriggerPills';
import { ShelfSpeedPills } from './ShelfSpeedPills';
import { ShelfRepeatPills } from './ShelfRepeatPills';
import { Check } from 'lucide-react';

interface CardInlineShelfProps {
  category: AnimationCategory;
  trigger: string;
  duration: number;
  repeatTimes: number;
  onSelectTrigger: (trigger: string) => void;
  onSelectDuration: (duration: number) => void;
  onSelectRepeat: (repeatTimes: number) => void;
}

export const CardInlineShelf: React.FC<CardInlineShelfProps> = ({
  category,
  trigger,
  duration,
  repeatTimes,
  onSelectTrigger,
  onSelectDuration,
  onSelectRepeat,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mt-2 pt-2 border-t border-amber-300/80 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-150 text-stone-900"
    >
      <div className="flex items-center justify-between text-[9px] font-black text-amber-900">
        <span className="flex items-center gap-1">
          <Check className="w-2.5 h-2.5 text-amber-700" />
          Active Settings
        </span>
        <span className="text-[8.5px] font-medium text-amber-800/80">
          Tap any option to update instantly
        </span>
      </div>

      <ShelfTriggerPills
        trigger={trigger}
        onSelectTrigger={onSelectTrigger}
      />

      <ShelfSpeedPills
        duration={duration}
        onSelectDuration={onSelectDuration}
      />

      {category === 'emphasis' && (
        <ShelfRepeatPills
          repeatTimes={repeatTimes}
          onSelectRepeat={onSelectRepeat}
        />
      )}
    </div>
  );
};

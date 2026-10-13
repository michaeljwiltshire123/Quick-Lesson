import React from 'react';
import { AnimationCategory, AnimationCatalogCard } from './studio/types';
import { AnimationCardGrid } from './studio/AnimationCardGrid';
import { Sparkles, Zap, LogOut, Clock } from 'lucide-react';

interface ElementStudioControlsProps {
  category: AnimationCategory;
  animationType: string;
  trigger: string;
  duration: number;
  repeatTimes: number;
  onSelectCategory?: (val: AnimationCategory) => void;
  onAnimationTypeChange: (val: string) => void;
  onTriggerChange: (val: string) => void;
  onDurationChange: (val: number) => void;
  onRepeatTimesChange: (val: number) => void;
  onQuickPreview?: (card: AnimationCatalogCard) => void;
  onAddToTimeline?: (card: AnimationCatalogCard) => void;
  [key: string]: any;
}

export const ElementStudioControls: React.FC<ElementStudioControlsProps> = ({
  category, animationType, trigger, duration, repeatTimes,
  onSelectCategory, onAnimationTypeChange, onTriggerChange, onDurationChange, onRepeatTimesChange,
  onQuickPreview, onAddToTimeline,
}) => {
  const triggerLabel = trigger === 'withPrevious' ? 'With Previous' : trigger === 'afterPrevious' ? 'After Previous' : 'On Click';

  return (
    <div className="space-y-2.5 text-xs text-stone-700 select-none">
      <div className="grid grid-cols-3 gap-1 p-1 bg-stone-200/80 rounded-2xl border border-stone-300 text-xs font-black shadow-inner">
        <button
          type="button"
          onClick={() => onSelectCategory?.('entrance')}
          className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            category === 'entrance'
              ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700 font-extrabold'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>1. Entry</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory?.('emphasis')}
          className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            category === 'emphasis'
              ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-700 font-extrabold'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span>2. Animation</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectCategory?.('exit')}
          className={`py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            category === 'exit'
              ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-700 font-extrabold'
              : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>3. Exit</span>
        </button>
      </div>

      <div className="flex items-center justify-between px-2.5 py-1 bg-stone-100 rounded-xl border border-stone-200 text-[10.5px] font-semibold text-stone-600">
        <span className="capitalize">
          Phase: <strong className="text-stone-900">{category === 'entrance' ? 'Entry' : category === 'emphasis' ? 'Animation' : 'Exit'}</strong>
        </span>
        <div className="flex items-center gap-2">
          <span className="bg-white px-2 py-0.5 rounded-md border border-stone-200 text-stone-800 shadow-2xs font-bold">⚡ {triggerLabel}</span>
          <span className="bg-white px-2 py-0.5 rounded-md border border-stone-200 text-stone-800 shadow-2xs font-mono font-bold flex items-center gap-0.5"><Clock className="w-2.5 h-2.5 text-amber-700" />{duration.toFixed(1)}s</span>
        </div>
      </div>

      <AnimationCardGrid
        category={category}
        selectedId={animationType}
        trigger={trigger}
        duration={duration}
        repeatTimes={repeatTimes}
        onSelectEffect={(card) => onAnimationTypeChange(card.id)}
        onSelectTrigger={onTriggerChange}
        onSelectDuration={onDurationChange}
        onSelectRepeat={onRepeatTimesChange}
        onQuickPreview={onQuickPreview}
        onAddToTimeline={onAddToTimeline}
      />
    </div>
  );
};

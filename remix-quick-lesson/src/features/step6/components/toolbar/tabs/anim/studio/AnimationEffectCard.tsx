import React, { useState } from 'react';
import { AnimationCatalogCard } from './types';
import { Check, Sparkles, Play, ChevronDown, Clock } from 'lucide-react';
import { CardOverlayDropdown } from './shelf/CardOverlayDropdown';

interface AnimationEffectCardProps {
  card: AnimationCatalogCard;
  isSelected: boolean;
  isDropdownOpen: boolean;
  isRightColumn?: boolean;
  trigger?: string;
  duration?: number;
  repeatTimes?: number;
  onSelect: (card: AnimationCatalogCard) => void;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  onSelectTrigger?: (trigger: string) => void;
  onSelectDuration?: (duration: number) => void;
  onSelectRepeat?: (repeatTimes: number) => void;
  onQuickPreview?: (card: AnimationCatalogCard) => void;
  onAddToTimeline?: (card: AnimationCatalogCard) => void;
}

export const AnimationEffectCard: React.FC<AnimationEffectCardProps> = ({
  card, isSelected, isDropdownOpen, isRightColumn = false,
  trigger = 'onClick', duration = 0.8, repeatTimes = 1,
  onSelect, onToggleDropdown, onCloseDropdown,
  onSelectTrigger, onSelectDuration, onSelectRepeat, onQuickPreview, onAddToTimeline,
}) => {
  const triggerLabel = trigger === 'withPrevious' ? 'With Prev' : trigger === 'afterPrevious' ? 'After Prev' : 'On Click';

  return (
    <div
      onClick={() => { onSelect(card); onQuickPreview?.(card); }}
      className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all relative flex flex-col justify-between select-none col-span-1 h-[156px] ${
        isSelected
          ? 'bg-amber-50/95 border-amber-500 shadow-md ring-2 ring-amber-400 font-bold text-amber-950'
          : 'bg-white border-stone-200 hover:border-amber-400 hover:bg-stone-50/90 text-stone-800 shadow-2xs'
      }`}
    >
      <div className="flex items-start justify-between gap-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-800' : 'text-stone-400'}`} />
          <span className="text-xs font-black tracking-tight leading-tight truncate">{card.name}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {isSelected && (
            <span className="w-4 h-4 rounded-full bg-amber-800 text-white flex items-center justify-center">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          )}
          {onQuickPreview && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onQuickPreview(card); }}
              className="p-1 rounded-md bg-stone-100 hover:bg-amber-200 text-stone-700 hover:text-amber-950 cursor-pointer"
              title="Preview effect on slide"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
            </button>
          )}
        </div>
      </div>

      <p className="text-[10.5px] text-stone-500 line-clamp-2 leading-relaxed font-normal">{card.description}</p>

      <div className="flex items-center justify-between pt-1.5 border-t border-stone-100 gap-1">
        <span className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider">{card.category}</span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); if (!isSelected) onSelect(card); onToggleDropdown(); }}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black cursor-pointer transition-all ${
            isSelected ? 'bg-amber-200 hover:bg-amber-300 text-amber-950 shadow-2xs' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title="Configure trigger and timing"
        >
          <Clock className="w-3 h-3 text-amber-800 shrink-0" />
          <span>{triggerLabel} • {duration.toFixed(1)}s</span>
          <ChevronDown className="w-3 h-3 opacity-70 shrink-0" />
        </button>
      </div>

      <CardOverlayDropdown
        isOpen={isDropdownOpen} cardName={card.name} category={card.category}
        trigger={trigger} duration={duration} repeatTimes={repeatTimes} isRightColumn={isRightColumn}
        onSelectTrigger={onSelectTrigger || (() => {})} onSelectDuration={onSelectDuration || (() => {})}
        onSelectRepeat={onSelectRepeat || (() => {})}
        onAddToTimeline={onAddToTimeline ? () => onAddToTimeline(card) : undefined}
        onClose={onCloseDropdown}
      />
    </div>
  );
};

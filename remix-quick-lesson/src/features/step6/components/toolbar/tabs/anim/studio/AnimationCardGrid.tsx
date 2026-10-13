import React, { useState } from 'react';
import {
  AnimationCategory,
  AnimationCatalogCard,
  CATALOG_ENTRANCE_CARDS,
  CATALOG_ANIMATION_CARDS,
  CATALOG_EXIT_CARDS,
} from './types';
import { AnimationEffectCard } from './AnimationEffectCard';

interface AnimationCardGridProps {
  category: AnimationCategory;
  selectedId: string;
  trigger?: string;
  duration?: number;
  repeatTimes?: number;
  onSelectEffect: (card: AnimationCatalogCard) => void;
  onSelectTrigger?: (trigger: string) => void;
  onSelectDuration?: (duration: number) => void;
  onSelectRepeat?: (repeatTimes: number) => void;
  onQuickPreview?: (card: AnimationCatalogCard) => void;
  onAddToTimeline?: (card: AnimationCatalogCard) => void;
}

export const AnimationCardGrid: React.FC<AnimationCardGridProps> = ({
  category, selectedId, trigger, duration, repeatTimes,
  onSelectEffect, onSelectTrigger, onSelectDuration, onSelectRepeat,
  onQuickPreview, onAddToTimeline,
}) => {
  const [openDropdownCardId, setOpenDropdownCardId] = useState<string | null>(null);

  const cards = category === 'entrance'
    ? CATALOG_ENTRANCE_CARDS
    : category === 'emphasis'
    ? CATALOG_ANIMATION_CARDS
    : CATALOG_EXIT_CARDS;

  const title = category === 'entrance'
    ? 'Entrance Options (How element appears)'
    : category === 'emphasis'
    ? 'Animation Options (In-slide movement)'
    : 'Exit Options (How element leaves)';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-wider text-amber-950">
          {title}
        </span>
        <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
          {cards.length} Styles Available
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 max-h-[350px] overflow-y-auto p-1 scrollbar-thin">
        {cards.map((card, index) => (
          <AnimationEffectCard
            key={card.id}
            card={card}
            isSelected={selectedId === card.id}
            isDropdownOpen={openDropdownCardId === card.id}
            isRightColumn={index % 2 === 1}
            trigger={trigger}
            duration={duration}
            repeatTimes={repeatTimes}
            onSelect={onSelectEffect}
            onToggleDropdown={() => {
              setOpenDropdownCardId((prev) => (prev === card.id ? null : card.id));
            }}
            onCloseDropdown={() => setOpenDropdownCardId(null)}
            onSelectTrigger={onSelectTrigger}
            onSelectDuration={onSelectDuration}
            onSelectRepeat={onSelectRepeat}
            onQuickPreview={onQuickPreview}
            onAddToTimeline={onAddToTimeline}
          />
        ))}
      </div>
    </div>
  );
};

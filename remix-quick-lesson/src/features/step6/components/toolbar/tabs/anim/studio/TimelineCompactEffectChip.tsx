import React from 'react';
import { ElementTimelineEffect } from './types';
import { Sparkles, Zap, LogOut, Play, X } from 'lucide-react';
import { TimelineTriggerCycleBadge } from '../timeline/TimelineTriggerCycleBadge';
import { TimelineSpeedCycleBadge } from '../timeline/TimelineSpeedCycleBadge';

interface TimelineCompactEffectChipProps {
  effect: ElementTimelineEffect;
  index: number;
  onCycleTrigger: (trigger: string) => void;
  onCycleDuration: (duration: number) => void;
  onQuickPlay: () => void;
  onRemove: () => void;
}

export const TimelineCompactEffectChip: React.FC<TimelineCompactEffectChipProps> = ({
  effect,
  index,
  onCycleTrigger,
  onCycleDuration,
  onQuickPlay,
  onRemove,
}) => {
  const isEntrance = effect.category === 'entrance';
  const isEmphasis = effect.category === 'emphasis';
  const Icon = isEntrance ? Sparkles : isEmphasis ? Zap : LogOut;

  const bgClass = isEntrance
    ? 'bg-sky-700 text-white border-sky-800'
    : isEmphasis
    ? 'bg-purple-700 text-white border-purple-800'
    : 'bg-rose-700 text-white border-rose-800';

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`px-1.5 py-0.5 rounded-lg border font-bold text-[9px] flex items-center gap-1 shrink-0 select-none shadow-2xs transition-all ${bgClass}`}
      title={`${effect.category.toUpperCase()}: ${effect.effectId.replace(/_/g, ' ')}`}
    >
      <span className="w-3.5 h-3.5 rounded bg-black/25 text-white font-mono text-[8px] flex items-center justify-center shrink-0">
        {index + 1}
      </span>

      <Icon className="w-2.5 h-2.5 shrink-0 opacity-90" />

      <span className="capitalize truncate max-w-[62px] font-semibold text-[9px]">
        {effect.effectId.replace(/_/g, ' ')}
      </span>

      <TimelineTriggerCycleBadge
        trigger={effect.trigger}
        onCycleTrigger={onCycleTrigger}
        className="px-1 py-0 h-4 rounded text-[8px] leading-none"
      />

      <TimelineSpeedCycleBadge
        duration={effect.duration}
        onCycleDuration={onCycleDuration}
        className="px-1 py-0 h-4 rounded text-[8px] leading-none font-mono"
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onQuickPlay();
        }}
        className="p-0.5 hover:bg-black/25 active:scale-95 rounded text-white cursor-pointer transition-colors"
        title="Preview this effect on canvas"
      >
        <Play className="w-2.5 h-2.5 fill-current" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="p-0.5 hover:bg-black/25 active:scale-95 rounded text-white opacity-70 hover:opacity-100 cursor-pointer transition-colors"
        title="Remove this effect from timeline"
      >
        <X className="w-2.5 h-2.5 stroke-[2.5]" />
      </button>
    </div>
  );
};

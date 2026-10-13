import React, { useState } from 'react';
import { AnimationCategory } from './types';
import { Sparkles, Zap, Repeat } from 'lucide-react';
import { TimelineTriggerCycleBadge } from '../timeline/TimelineTriggerCycleBadge';
import { TimelineSpeedCycleBadge } from '../timeline/TimelineSpeedCycleBadge';
import { TimelineSlotActions } from './TimelineSlotActions';

interface TimelineSlotItemProps {
  category: AnimationCategory;
  effectId: string | null;
  trigger?: string;
  repeat?: number;
  duration?: number;
  isActiveTab: boolean;
  onSlotClick: () => void;
  onRemoveEffect: () => void;
  onQuickPlay?: () => void;
  onCycleTrigger?: (trigger: string) => void;
  onCycleDuration?: (duration: number) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export const TimelineSlotItem: React.FC<TimelineSlotItemProps> = ({
  category, effectId, trigger, repeat, duration, isActiveTab,
  onSlotClick, onRemoveEffect, onQuickPlay, onCycleTrigger, onCycleDuration, onDrop,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isEntrance = category === 'entrance';
  const isEmphasis = category === 'emphasis';

  const defaultTitle = isEntrance ? '+ Entrance' : isEmphasis ? '+ Animation' : '+ Exit';
  const Icon = isEntrance ? Sparkles : isEmphasis ? Zap : Sparkles;

  const bgStyle = effectId
    ? isEntrance ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
    : isEmphasis ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
    : 'bg-rose-500 text-white border-rose-600 shadow-sm'
    : 'bg-white text-stone-400 border-dashed border-stone-300 hover:border-amber-500 hover:text-stone-600';

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSlotClick(); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={`relative px-2 py-1 rounded-xl border font-bold text-[10px] flex items-center gap-1 shrink-0 transition-all cursor-pointer select-none ${bgStyle} ${
        isActiveTab ? 'ring-2 ring-amber-400 scale-[1.02]' : ''
      }`}
      title={`Click to show ${isEmphasis ? 'Animation' : category} in catalogue`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span className="capitalize truncate max-w-[85px]">
        {effectId ? effectId.replace(/_/g, ' ') : defaultTitle}
      </span>

      {effectId && onCycleTrigger && (
        <TimelineTriggerCycleBadge trigger={trigger} onCycleTrigger={onCycleTrigger} />
      )}

      {effectId && onCycleDuration && (
        <TimelineSpeedCycleBadge duration={duration} onCycleDuration={onCycleDuration} />
      )}

      {effectId && repeat && repeat > 1 && (
        <span className="flex items-center gap-0.5 font-black bg-black/20 px-1 py-0.5 rounded-sm text-[8px] text-white">
          <Repeat className="w-2 h-2" />
          {repeat}
        </span>
      )}

      {effectId && (
        <TimelineSlotActions
          isHovered={isHovered}
          onQuickPlay={onQuickPlay}
          onRemoveEffect={onRemoveEffect}
        />
      )}
    </div>
  );
};

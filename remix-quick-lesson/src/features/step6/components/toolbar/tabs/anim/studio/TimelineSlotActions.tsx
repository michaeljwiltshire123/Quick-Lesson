import React from 'react';
import { Play, Trash2 } from 'lucide-react';

interface TimelineSlotActionsProps {
  isHovered: boolean;
  onQuickPlay?: () => void;
  onRemoveEffect: () => void;
}

export const TimelineSlotActions: React.FC<TimelineSlotActionsProps> = ({
  isHovered,
  onQuickPlay,
  onRemoveEffect,
}) => {
  return (
    <div className="flex items-center gap-0.5 ml-1">
      {isHovered && onQuickPlay && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickPlay();
          }}
          className="p-0.5 bg-black/30 hover:bg-black/50 rounded text-white cursor-pointer transition-all"
          title="Quick preview motion"
        >
          <Play className="w-2.5 h-2.5 fill-current" />
        </button>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveEffect();
        }}
        className="p-0.5 hover:bg-black/30 rounded text-white/80 hover:text-white cursor-pointer transition-all"
        title="Remove this effect"
      >
        <Trash2 className="w-2.5 h-2.5" />
      </button>
    </div>
  );
};

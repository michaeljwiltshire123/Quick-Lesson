import React from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { GripVertical } from 'lucide-react';
import { TimelineTriggerCycleBadge } from './TimelineTriggerCycleBadge';
import { TimelineSpeedCycleBadge } from './TimelineSpeedCycleBadge';

interface TimelineTrackRowProps {
  element: SlideElement;
  index: number;
  isSelected: boolean;
  maxSeconds: number;
  onSelect: () => void;
  onDragRowStart: (idx: number) => void;
  onDropRow: (targetIdx: number) => void;
  onUpdateElementMeta: (id: string, patch: Record<string, any>) => void;
}

export const TimelineTrackRow: React.FC<TimelineTrackRowProps> = ({
  element, index, isSelected, maxSeconds, onSelect, onDragRowStart, onDropRow, onUpdateElementMeta,
}) => {
  const meta = element.meta || {};
  const duration = Math.max(0.2, meta.animDuration ?? 0.8);
  const delay = Math.max(0.0, meta.animDelay ?? 0.0);
  const label = element.caption || (element.type === 'text' ? element.content?.slice(0, 16) : element.type);

  const leftPercent = Math.min(90, (delay / maxSeconds) * 100);
  const widthPercent = Math.min(100 - leftPercent, (duration / maxSeconds) * 100);

  const handleStartBarDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const initialDelay = delay;

    const handleMouseMove = (ev: MouseEvent) => {
      const deltaX = ev.clientX - startX;
      const deltaSec = deltaX / 60;
      const newDelay = Math.max(0, Math.min(maxSeconds - 0.4, initialDelay + deltaSec));
      onUpdateElementMeta(element.id, { animDelay: parseFloat(newDelay.toFixed(1)) });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      draggable
      onDragStart={() => onDragRowStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropRow(index)}
      onClick={onSelect}
      className={`h-9 border-b border-stone-200/90 flex items-center select-none cursor-pointer transition-colors ${
        isSelected ? 'bg-amber-100/70' : 'bg-white hover:bg-stone-50'
      }`}
    >
      <div className="w-44 px-2 flex items-center gap-1.5 shrink-0 border-r border-stone-200">
        <GripVertical className="w-3.5 h-3.5 text-stone-400 cursor-grab active:cursor-grabbing shrink-0" />
        <span className="w-4 h-4 rounded-full bg-amber-800 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
          {meta.animationStep || index + 1}
        </span>
        <span className="truncate text-xs font-bold text-stone-900">{label || 'Element'}</span>
      </div>

      <div className="flex-1 relative h-full flex items-center overflow-hidden px-1">
        <div
          onMouseDown={handleStartBarDrag}
          style={{ left: `${leftPercent}%`, width: `${Math.max(16, widthPercent)}%` }}
          className="absolute h-6 bg-amber-700/90 hover:bg-amber-800 text-white rounded-md flex items-center px-1.5 gap-1 text-[10px] font-bold shadow-xs cursor-move truncate transition-[width]"
          title="Drag bar to shift start delay, or click badges to cycle"
        >
          <TimelineTriggerCycleBadge
            trigger={meta.animTrigger}
            onCycleTrigger={(t) => onUpdateElementMeta(element.id, { animTrigger: t })}
          />
          <TimelineSpeedCycleBadge
            duration={duration}
            onCycleDuration={(d) => onUpdateElementMeta(element.id, { animDuration: d })}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { TimelineRuler } from './TimelineRuler';
import { TimelinePlayhead } from './TimelinePlayhead';
import { TimelineTrackRow } from './TimelineTrackRow';

interface VisualAnimationTimelineProps {
  elements: SlideElement[];
  selectedElementId: string | null;
  currentTime: number;
  maxSeconds?: number;
  onScrubTime: (sec: number) => void;
  onSelectElementId: (id: string) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
  onUpdateElementMeta: (id: string, patch: Record<string, any>) => void;
}

export const VisualAnimationTimeline: React.FC<VisualAnimationTimelineProps> = ({
  elements, selectedElementId, currentTime, maxSeconds = 5,
  onScrubTime, onSelectElementId, onUpdateElements, onUpdateElementMeta,
}) => {
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);

  const sorted = [...elements].sort((a, b) => (a.meta?.animationStep || 1) - (b.meta?.animationStep || 1));

  const handleDropRow = (targetIndex: number) => {
    if (draggedRowIndex === null || draggedRowIndex === targetIndex) return;
    const reordered = [...sorted];
    const [moved] = reordered.splice(draggedRowIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    const updated = reordered.map((el, idx) => ({
      ...el, meta: { ...(el.meta || {}), animationStep: idx + 1 },
    }));
    onUpdateElements(updated);
    setDraggedRowIndex(null);
  };

  return (
    <div className="border border-stone-300 rounded-2xl overflow-hidden bg-white shadow-2xs text-xs">
      <div className="flex">
        <div className="w-44 h-7 bg-stone-200/90 border-r border-b border-stone-300 flex items-center px-3 font-bold text-[11px] text-stone-700 shrink-0">
          Hold & Drag to Reorder
        </div>
        <div className="flex-1 relative">
          <TimelineRuler maxSeconds={maxSeconds} onScrubTime={onScrubTime} />
        </div>
      </div>

      <div className="relative max-h-48 overflow-y-auto">
        <div className="relative">
          <TimelinePlayhead currentTime={currentTime} maxSeconds={maxSeconds} />
          {sorted.map((el, i) => (
            <TimelineTrackRow
              key={el.id} element={el} index={i} isSelected={el.id === selectedElementId}
              maxSeconds={maxSeconds} onSelect={() => onSelectElementId(el.id)}
              onDragRowStart={(idx) => setDraggedRowIndex(idx)} onDropRow={handleDropRow}
              onUpdateElementMeta={onUpdateElementMeta}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

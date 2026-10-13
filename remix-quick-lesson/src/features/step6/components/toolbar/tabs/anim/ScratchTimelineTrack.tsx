import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { ElementStudioBulkToolbar } from './ElementStudioBulkToolbar';
import { ScratchBlockCard } from './ScratchBlockCard';
import { Flag, Play, Sparkles } from 'lucide-react';

interface ScratchTimelineTrackProps {
  elements: SlideElement[];
  selectedElementId: string | null;
  onSelectElementId: (id: string) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const ScratchTimelineTrack: React.FC<ScratchTimelineTrackProps> = ({
  elements, selectedElementId, onSelectElementId, onUpdateElements,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(elements.map((e) => e.id));
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const sorted = [...elements].sort((a, b) => (a.meta?.animationStep || 1) - (b.meta?.animationStep || 1));

  const handleDrop = (dropTargetIdx: number) => {
    if (dragIdx === null || dragIdx === dropTargetIdx) return;
    const reordered = [...sorted];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(dropTargetIdx, 0, moved);

    onUpdateElements(reordered.map((el, i) => ({
      ...el, meta: { ...(el.meta || {}), animationStep: i + 1 },
    })));
    setDragIdx(null);
  };

  const handleBulkStagger = () => {
    onUpdateElements(elements.map((el, i) => {
      if (!selectedIds.includes(el.id)) return el;
      return { ...el, meta: { ...(el.meta || {}), animDelay: parseFloat((i * 0.2).toFixed(1)), animationStep: i + 1 } };
    }));
  };

  return (
    <div className="space-y-2 p-3 bg-stone-100/90 border-2 border-stone-300 rounded-3xl text-xs shadow-inner">
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4CB565] text-white font-black text-xs rounded-xl shadow-xs border border-[#3CA354]">
          <Flag className="w-3.5 h-3.5 fill-white" />
          <span>When Slide Advances (Scratch Blocks)</span>
        </div>
        <span className="text-[11px] font-bold text-stone-500">Hold & drag any block to reorder</span>
      </div>

      <ElementStudioBulkToolbar
        elements={elements} selectedIds={selectedIds}
        onToggleSelectAll={() => setSelectedIds(selectedIds.length === elements.length ? [] : elements.map((e) => e.id))}
        onApplyBulkStagger={handleBulkStagger}
        onApplyBulkTrigger={(trigger) => onUpdateElements(elements.map((el) => selectedIds.includes(el.id) ? { ...el, meta: { ...(el.meta || {}), animTrigger: trigger } } : el))}
        onApplyBulkDuration={(dur) => onUpdateElements(elements.map((el) => selectedIds.includes(el.id) ? { ...el, meta: { ...(el.meta || {}), animDuration: dur } } : el))}
      />

      <div className="flex gap-2.5 overflow-x-auto p-1.5 pb-2.5 min-h-[110px] items-center">
        {sorted.map((el, i) => (
          <ScratchBlockCard
            key={el.id} element={el} index={i}
            isSelected={el.id === selectedElementId} isDragging={dragIdx === i}
            onSelect={() => onSelectElementId(el.id)}
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', String(i)); setDragIdx(i); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleDrop(i); }}
            onDragEnd={() => setDragIdx(null)}
          />
        ))}
      </div>
    </div>
  );
};

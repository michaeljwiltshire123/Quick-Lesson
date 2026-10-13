import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { ElementStudioBulkToolbar } from './ElementStudioBulkToolbar';
import { ElementStudioTimelineCard } from './ElementStudioTimelineCard';

interface ElementStudioTimelineTrackProps {
  elements: SlideElement[];
  selectedElementId: string | null;
  onSelectElementId: (id: string) => void;
  onShiftStep: (elementId: string, direction: 'up' | 'down') => void;
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const ElementStudioTimelineTrack: React.FC<ElementStudioTimelineTrackProps> = ({
  elements, selectedElementId, onSelectElementId, onShiftStep, onUpdateElements,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(elements.map((e) => e.id));

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleBulkStagger = () => {
    onUpdateElements(elements.map((el, i) => {
      if (!selectedIds.includes(el.id)) return el;
      return { ...el, meta: { ...(el.meta || {}), animDelay: parseFloat((i * 0.2).toFixed(1)), animationStep: i + 1 } };
    }));
  };

  const sorted = [...elements].sort((a, b) => (a.meta?.animationStep || 1) - (b.meta?.animationStep || 1));

  return (
    <div className="space-y-2 p-3 bg-stone-100/90 border border-stone-200 rounded-2xl text-xs">
      <ElementStudioBulkToolbar
        elements={elements} selectedIds={selectedIds}
        onToggleSelectAll={() => setSelectedIds(selectedIds.length === elements.length ? [] : elements.map((e) => e.id))}
        onApplyBulkStagger={handleBulkStagger}
        onApplyBulkTrigger={(trigger) => onUpdateElements(elements.map((el) => selectedIds.includes(el.id) ? { ...el, meta: { ...(el.meta || {}), animTrigger: trigger } } : el))}
        onApplyBulkDuration={(duration) => onUpdateElements(elements.map((el) => selectedIds.includes(el.id) ? { ...el, meta: { ...(el.meta || {}), animDuration: duration } } : el))}
      />

      <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
        {sorted.map((el, i) => (
          <ElementStudioTimelineCard
            key={el.id} element={el} index={i} total={sorted.length}
            isSelected={el.id === selectedElementId} isChecked={selectedIds.includes(el.id)}
            onSelect={() => onSelectElementId(el.id)} onToggleCheck={(e) => toggleSelect(el.id, e)}
            onShift={(dir) => onShiftStep(el.id, dir)}
            onUpdateMeta={(patch) => onUpdateElements(elements.map((x) => x.id === el.id ? { ...x, meta: { ...(x.meta || {}), ...patch } } : x))}
          />
        ))}
      </div>
    </div>
  );
};

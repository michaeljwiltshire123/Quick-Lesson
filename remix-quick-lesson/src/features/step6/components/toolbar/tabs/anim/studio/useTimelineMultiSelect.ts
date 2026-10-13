import { useState } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';

export function useTimelineMultiSelect(elements: SlideElement[], initialSelectedId?: string | null) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    return initialSelectedId ? new Set([initialSelectedId]) : new Set();
  });
  const [lastAnchorIndex, setLastAnchorIndex] = useState<number>(0);

  const handleRowSelect = (e: React.MouseEvent, elementId: string, index: number) => {
    let next = new Set(selectedIds);

    if (e.shiftKey) {
      // Range selection between lastAnchorIndex and index
      const start = Math.min(lastAnchorIndex, index);
      const end = Math.max(lastAnchorIndex, index);
      for (let i = start; i <= end; i++) {
        if (elements[i]) next.add(elements[i].id);
      }
    } else if (e.ctrlKey || e.metaKey) {
      // Toggle individual selection
      if (next.has(elementId)) {
        next.delete(elementId);
      } else {
        next.add(elementId);
      }
      setLastAnchorIndex(index);
    } else {
      // Single select
      next = new Set([elementId]);
      setLastAnchorIndex(index);
    }

    setSelectedIds(next);
  };

  const selectAll = () => setSelectedIds(new Set(elements.map((e) => e.id)));
  const clearSelection = () => setSelectedIds(new Set());

  return {
    selectedIds,
    setSelectedIds,
    handleRowSelect,
    selectAll,
    clearSelection,
    isMultiSelected: selectedIds.size > 1,
  };
}

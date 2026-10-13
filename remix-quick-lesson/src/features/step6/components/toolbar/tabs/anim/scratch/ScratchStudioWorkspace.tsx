import React, { useState } from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { AnimationCategory, AnimationCatalogCard } from '../studio/types';
import { TimelineSequenceHeader } from '../studio/TimelineSequenceHeader';
import { TimelineElementRow } from '../studio/TimelineElementRow';
import { TimelineRowConnectors } from '../studio/TimelineRowConnectors';
import { removeTimelineEffect, updateTimelineEffect, commitEffectToElement } from '../studio/shelf/applyEffectHelper';

interface ScratchStudioWorkspaceProps {
  elements: SlideElement[];
  selectedElementIds: Set<string>;
  activeCategory?: AnimationCategory;
  selectedCard?: AnimationCatalogCard | null;
  onSelectElementIds: (ids: Set<string>) => void;
  onSetActiveCategory?: (cat: AnimationCategory) => void;
  onUpdateElementMeta: (elementId: string, meta: Record<string, any>) => void;
  onUpdateElements?: (elements: SlideElement[]) => void;
  onQuickPlayEffect?: (elementId: string, cat: AnimationCategory) => void;
  onAssignSelectedEffect?: (elementId: string, cat: AnimationCategory) => void;
}

export const ScratchStudioWorkspace: React.FC<ScratchStudioWorkspaceProps> = ({
  elements, selectedElementIds = new Set(), activeCategory = 'entrance', selectedCard,
  onSelectElementIds, onSetActiveCategory, onUpdateElements, onQuickPlayEffect,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleRowClick = (e: React.MouseEvent, id: string) => {
    let next = new Set(selectedElementIds);
    if (e.shiftKey) next.add(id);
    else if (e.ctrlKey || e.metaKey) { if (next.has(id)) next.delete(id); else next.add(id); }
    else next = new Set([id]);
    onSelectElementIds(next);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (!onUpdateElements) return;
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= elements.length) return;
    const next = [...elements];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onUpdateElements(next);
  };

  const handleRemoveEffectUid = (elementId: string, effectUid: string) => {
    if (!onUpdateElements) return;
    onUpdateElements(elements.map((el) => (el.id === elementId ? removeTimelineEffect(el, effectUid) : el)));
  };

  const handleUpdateEffectUid = (elementId: string, effectUid: string, patch: any) => {
    if (!onUpdateElements) return;
    onUpdateElements(elements.map((el) => (el.id === elementId ? updateTimelineEffect(el, effectUid, patch) : el)));
  };

  const handleAddSelectedToElement = (elementId: string, cat?: AnimationCategory) => {
    if (!onUpdateElements) return;
    const targetCat = cat || activeCategory;
    if (onSetActiveCategory && cat) onSetActiveCategory(cat);
    const effectId = (selectedCard && selectedCard.category === targetCat)
      ? selectedCard.id
      : (targetCat === 'entrance' ? 'fade_in' : targetCat === 'emphasis' ? 'pulse' : 'fade_out');
    onUpdateElements(elements.map((el) => (el.id === elementId ? commitEffectToElement(el, {
      category: targetCat, effectId, trigger: 'onClick', duration: 0.8, repeatTimes: 1,
    }) : el)));
    onQuickPlayEffect?.(elementId, targetCat);
  };

  return (
    <div className="space-y-2 p-3 bg-white border-2 border-stone-300 rounded-3xl shadow-sm text-xs select-none">
      <TimelineSequenceHeader
        totalElements={elements.length} selectedCount={selectedElementIds.size} zoomLevel={zoomLevel}
        onZoomIn={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))} onZoomOut={() => setZoomLevel((z) => Math.max(0.75, z - 0.15))}
        onResetZoom={() => setZoomLevel(1)}
        onResetSequence={() => onUpdateElements?.(elements.map((el) => ({ ...el, meta: {} })))}
        onBulkClearSelected={() => onUpdateElements?.(elements.map((el) => selectedElementIds.has(el.id) ? { ...el, meta: {} } : el))}
      />
      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }} className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
        {elements.map((el, i) => (
          <React.Fragment key={el.id}>
            {i > 0 && <TimelineRowConnectors currentElement={el} previousElement={elements[i - 1]} />}
            <TimelineElementRow
              element={el} index={i} totalElements={elements.length} isSelected={selectedElementIds.has(el.id)} activeCategory={activeCategory}
              selectedCard={selectedCard}
              onRowClick={(e) => handleRowClick(e, el.id)} onActivateCategory={onSetActiveCategory}
              onRemoveEffectUid={handleRemoveEffectUid} onUpdateEffectUid={handleUpdateEffectUid}
              onAddSelectedToElement={handleAddSelectedToElement}
              onMoveUp={() => handleMove(i, 'up')} onMoveDown={() => handleMove(i, 'down')}
              onQuickPlay={(id, effectId) => onQuickPlayEffect?.(id, activeCategory)}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

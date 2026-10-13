import React from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { AnimationCategory, AnimationCatalogCard, ElementTimelineEffect } from './types';
import { TimelineCompactEffectChip } from './TimelineCompactEffectChip';
import { TimelineRowReorder } from './TimelineRowReorder';
import { getTimelineEffectsForElement } from './shelf/applyEffectHelper';
import { Plus } from 'lucide-react';

interface TimelineElementRowProps {
  element: SlideElement;
  index: number;
  totalElements: number;
  isSelected: boolean;
  activeCategory: AnimationCategory;
  selectedCard?: AnimationCatalogCard | null;
  onRowClick: (e: React.MouseEvent) => void;
  onActivateCategory?: (cat: AnimationCategory, elementId: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onQuickPlay: (elementId: string, effectId: string) => void;
  onRemoveEffectUid?: (elementId: string, effectUid: string) => void;
  onUpdateEffectUid?: (elementId: string, effectUid: string, patch: Partial<ElementTimelineEffect>) => void;
  onAddSelectedToElement?: (elementId: string, cat?: AnimationCategory) => void;
  onRemoveEffect?: (elementId: string, cat: AnimationCategory) => void;
  onAssignSelectedEffect?: (elementId: string, cat: AnimationCategory) => void;
}

export const TimelineElementRow: React.FC<TimelineElementRowProps> = ({
  element, index, totalElements, isSelected, activeCategory,
  onRowClick, onActivateCategory, onMoveUp, onMoveDown, onQuickPlay,
  onRemoveEffectUid, onUpdateEffectUid, onAddSelectedToElement, onAssignSelectedEffect,
}) => {
  const effects = getTimelineEffectsForElement(element);
  const letter = String.fromCharCode(65 + (index % 26));
  const label = element.caption || (element.type === 'text' ? element.content?.slice(0, 16) : element.type.toUpperCase());

  const handleAdd = (cat?: AnimationCategory) => {
    const targetCat = cat || activeCategory;
    if (onActivateCategory) onActivateCategory(targetCat, element.id);
    if (onAddSelectedToElement) onAddSelectedToElement(element.id, targetCat);
    else onAssignSelectedEffect?.(element.id, targetCat);
  };

  return (
    <div
      onClick={onRowClick}
      className={`p-1.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
        isSelected ? 'bg-amber-100/90 border-amber-600 shadow-sm ring-1 ring-amber-400' : 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-white'
      }`}
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <TimelineRowReorder index={index} total={totalElements} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />
        <span className="w-4 h-4 rounded-full bg-amber-800 text-white font-black text-[9px] flex items-center justify-center shrink-0 shadow-2xs">
          {letter}
        </span>
        <span className="text-[10px] font-bold text-stone-800 max-w-[95px] truncate" title={label}>{label}</span>
      </div>

      <div className="flex items-center gap-1 p-0.5 bg-stone-200/70 rounded-lg border border-stone-300/70 overflow-x-auto flex-1 min-h-[28px]">
        {effects.length === 0 ? (
          <div className="flex items-center gap-1">
            <button type="button" onClick={(e) => { e.stopPropagation(); handleAdd('entrance'); }} className="px-1.5 py-0.5 rounded-md border border-dashed border-sky-400 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-[8.5px] flex items-center gap-0.5 cursor-pointer">
              <Plus className="w-2.5 h-2.5" /><span>+ Entry</span>
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); handleAdd('emphasis'); }} className="px-1.5 py-0.5 rounded-md border border-dashed border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-[8.5px] flex items-center gap-0.5 cursor-pointer">
              <Plus className="w-2.5 h-2.5" /><span>+ Animation</span>
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); handleAdd('exit'); }} className="px-1.5 py-0.5 rounded-md border border-dashed border-rose-400 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-[8.5px] flex items-center gap-0.5 cursor-pointer">
              <Plus className="w-2.5 h-2.5" /><span>+ Exit</span>
            </button>
          </div>
        ) : (
          <>
            {effects.map((effect, effIdx) => (
              <TimelineCompactEffectChip
                key={effect.id || `eff-${effIdx}`} effect={effect} index={effIdx}
                onCycleTrigger={(t) => onUpdateEffectUid?.(element.id, effect.id, { trigger: t as any })}
                onCycleDuration={(d) => onUpdateEffectUid?.(element.id, effect.id, { duration: d })}
                onQuickPlay={() => onQuickPlay(element.id, effect.effectId)}
                onRemove={() => onRemoveEffectUid?.(element.id, effect.id)}
              />
            ))}
            <button type="button" onClick={(e) => { e.stopPropagation(); handleAdd(); }} className="px-1.5 py-0.5 rounded-md border border-dashed border-stone-400 hover:border-amber-600 hover:bg-amber-50 text-stone-600 hover:text-amber-900 font-black text-[8.5px] flex items-center gap-0.5 shrink-0 cursor-pointer">
              <Plus className="w-2.5 h-2.5 stroke-[3]" /><span>Add</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { SlideElement } from '../../../../../types/slideTypes';
import { MotionAnimationItem } from './motionPanelTypes';
import { MotionAnimationCardRow } from './MotionAnimationCardRow';
import { BatchAnimationGroup } from './BatchAnimationGroup';
import { applyMultiSelectAnimation } from '../multiSelectAnimationService';
import { normalizeMotionAnimationOrders } from './motionAnimationHelpers';
import { Plus, Play, Square } from 'lucide-react';

interface MotionObjectAnimationsSectionProps {
  items: MotionAnimationItem[];
  selectedElementId: string | null;
  selectedElementIds?: string[];
  onSelectElementId: (id: string) => void;
  onSelectElementIds?: (ids: string[]) => void;
  onAddAnimation: () => void;
  onUpdateAnimation: (animId: string, patch: Partial<MotionAnimationItem>) => void;
  onDeleteAnimation: (animId: string) => void;
  onReorderAnimation?: (animId: string, direction: 'up' | 'down') => void;
  onPlaySlide: () => void;
  isPlaying?: boolean;
  elements: SlideElement[];
  onUpdateElements: (elements: SlideElement[]) => void;
}

export const MotionObjectAnimationsSection: React.FC<MotionObjectAnimationsSectionProps> = ({
  items, selectedElementId, selectedElementIds = [], onSelectElementId, onSelectElementIds, onAddAnimation, onUpdateAnimation,
  onDeleteAnimation, onReorderAnimation, onPlaySlide, isPlaying = false,
  elements, onUpdateElements,
}) => {
  const isMultiSelect = selectedElementIds.length > 1;
  const selectedAnimation = items.find((item) => selectedElementIds.includes(item.elementId));

  return (
    <div className="space-y-3 pt-1 select-none">
      <div className="text-xs font-semibold text-stone-800 tracking-tight">Object Animations</div>

      {isMultiSelect && (
        <BatchAnimationGroup 
          selectedCount={selectedElementIds.length} 
          duration={selectedAnimation?.duration ?? 0.8}
          trigger={selectedAnimation?.trigger ?? 'onClick'}
          onUpdate={(patch) => onUpdateElements(normalizeMotionAnimationOrders(applyMultiSelectAnimation(elements, selectedElementIds, patch)))}
        />
      )}

      {items.length === 0 ? (
        <p className="text-[11px] text-stone-500 italic py-1">No animations yet on this slide.</p>
      ) : (
        <div className="space-y-1.5">
          {items.map((item, idx) => (
            <MotionAnimationCardRow
              key={item.id}
              item={item}
              isSelected={selectedElementIds.includes(item.elementId)}
              onSelect={() => onSelectElementIds?.([item.elementId])}
              onUpdate={(patch) => onUpdateAnimation(item.id, patch)}
              onDelete={() => onDeleteAnimation(item.id)}
              onMoveUp={idx > 0 && onReorderAnimation ? () => onReorderAnimation(item.id, 'up') : undefined}
              onMoveDown={idx < items.length - 1 && onReorderAnimation ? () => onReorderAnimation(item.id, 'down') : undefined}
            />
          ))}
        </div>
      )}

      <div className="pt-1">
        <button
          type="button"
          onClick={onAddAnimation}
          className="bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-md py-1.5 px-3 text-xs text-stone-800 font-medium cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
          <span>Add animation</span>
        </button>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onPlaySlide}
          className="bg-[#F4B400] hover:bg-[#E0A400] active:bg-[#C99300] text-stone-900 font-bold px-7 py-2 rounded-md shadow-xs text-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

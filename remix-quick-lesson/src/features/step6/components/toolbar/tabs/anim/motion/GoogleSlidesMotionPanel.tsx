import React from 'react';
import { SlideElement, CanvasTheme } from '../../../../../types/slideTypes';
import { MotionSlideTransitionSection } from './MotionSlideTransitionSection';
import { MotionObjectAnimationsSection } from './MotionObjectAnimationsSection';
import { extractAllMotionItems, addAnimationsToElements, deleteAnimationFromElements, normalizeMotionAnimationOrders } from './motionAnimationHelpers';
import { reorderAnimationInElements } from './motionReorderHelper';
import { useMotionPlayback } from '../../../../../hooks/useMotionPlayback';
import { X } from 'lucide-react';
import { updateAnimationRecord } from '../../../../../services/animationStateUpdater';
import { getAnimationStepPlan } from '../../../../../utils/animationStepPlan';

interface GoogleSlidesMotionPanelProps {
  currentTheme?: Partial<CanvasTheme>;
  elements: SlideElement[];
  selectedElementId?: string | null;
  selectedElementIds?: string[];
  onSelectElementId?: (id: string | null) => void;
  onSelectElementIds?: (ids: string[]) => void;
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onApplyThemeToAll?: (theme: Partial<CanvasTheme>) => void;
  onUpdateElements?: (elements: SlideElement[]) => void;
  onClose?: () => void;
}

export const GoogleSlidesMotionPanel: React.FC<GoogleSlidesMotionPanelProps> = ({
  currentTheme, elements = [], selectedElementId = null, selectedElementIds, onSelectElementId, onSelectElementIds,
  onUpdateTheme, onApplyThemeToAll, onUpdateElements, onClose,
}) => {
  const { isPlaying, startPlayback, stopPlayback } = useMotionPlayback();
  const items = extractAllMotionItems(elements);

  const handleAdd = () => {
    if (!onUpdateElements || elements.length === 0) return;
    const targets = selectedElementIds && selectedElementIds.length > 0 
      ? selectedElementIds 
      : (selectedElementId ? [selectedElementId] : [elements[0].id]);
    
    onUpdateElements(addAnimationsToElements(elements, targets));
    if (targets.length === 1) onSelectElementId?.(targets[0]);
  };

  const handleUpdate = (animId: string, patch: any) => {
    if (onUpdateElements) onUpdateElements(normalizeMotionAnimationOrders(updateAnimationRecord(elements, animId, patch)));
  };

  const handleDelete = (animId: string) => {
    if (onUpdateElements) onUpdateElements(deleteAnimationFromElements(elements, animId));
  };

  const handleReorder = (animId: string, direction: 'up' | 'down') => {
    if (onUpdateElements) onUpdateElements(reorderAnimationInElements(elements, animId, direction));
  };

  const handlePlay = () => {
    if (isPlaying) stopPlayback();
    else {
      const plan = getAnimationStepPlan(elements);
      startPlayback(Math.max(1, plan.maxStep), Object.fromEntries(plan.autoAdvanceAfterStep));
    }
  };

  return (
    <div className="bg-white rounded-xl text-stone-900 text-xs font-sans select-none space-y-3 p-1">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#F4B400]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
            <circle cx="12" cy="12" r="4" fill="#FBBC04" opacity="0.6" />
          </svg>
          <span className="text-sm font-medium text-stone-900">Motion</span>
        </div>
        {onClose && (
          <button
            type="button" onClick={onClose}
            className="p-1 hover:bg-stone-100 rounded-full text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <MotionSlideTransitionSection
        currentTransition={currentTheme?.transitionEffect || 'none'}
        onChangeTransition={(transId) => onUpdateTheme({ transitionEffect: transId })}
        onApplyToAll={() => onApplyThemeToAll?.({ transitionEffect: currentTheme?.transitionEffect || 'none' })}
      />

      <MotionObjectAnimationsSection
        items={items}
        selectedElementId={selectedElementId}
        selectedElementIds={selectedElementIds}
        onSelectElementId={(id) => onSelectElementId?.(id)}
        onSelectElementIds={(ids) => onSelectElementIds?.(ids)}
        onAddAnimation={handleAdd}
        onUpdateAnimation={handleUpdate}
        onDeleteAnimation={handleDelete}
        onReorderAnimation={handleReorder}
        onPlaySlide={handlePlay}
        isPlaying={isPlaying}
        elements={elements}
        onUpdateElements={onUpdateElements || (() => {})}
      />
    </div>
  );
};

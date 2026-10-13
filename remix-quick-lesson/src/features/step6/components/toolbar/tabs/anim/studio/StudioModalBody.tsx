import React from 'react';
import { SlideElement, SlideItem } from '../../../../../types/slideTypes';
import { FullSlideAnimationCanvasPreview } from '../FullSlideAnimationCanvasPreview';
import { ElementStudioControls } from '../ElementStudioControls';
import { ScratchStudioWorkspace } from '../scratch/ScratchStudioWorkspace';
import { AnimationCategory, AnimationCatalogCard } from './types';

interface StudioModalBodyProps {
  activeSlide?: SlideItem;
  elements: SlideElement[];
  currentElement: SlideElement;
  selectedIds: Set<string>;
  previewEffectId: string | null;
  state: any;
  onSelectElementId: (id: string) => void;
  setSelectedIds: (ids: Set<string>) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
  onQuickPreview: (card: AnimationCatalogCard) => void;
  onAddToTimeline: (card?: AnimationCatalogCard) => void;
  onAssignSelectedToSlot: (targetElementId: string, slotCat: AnimationCategory) => void;
  triggerLivePreview: (effectId: string) => void;
}

export const StudioModalBody: React.FC<StudioModalBodyProps> = ({
  activeSlide, elements, currentElement, selectedIds, previewEffectId, state,
  onSelectElementId, setSelectedIds, onUpdateElements, onQuickPreview, onAddToTimeline,
  onAssignSelectedToSlot, triggerLivePreview,
}) => {
  return (
    <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(92vh-135px)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FullSlideAnimationCanvasPreview
          slide={activeSlide}
          elements={elements}
          selectedElementId={currentElement.id}
          previewEffectId={previewEffectId}
          onSelectElementId={(id) => {
            onSelectElementId(id);
            setSelectedIds(new Set([id]));
          }}
          onUpdateElements={onUpdateElements}
          maxStep={Math.max(1, ...elements.map((e) => e.meta?.animationStep || 1))}
        />
        <ElementStudioControls
          category={state.category}
          animationType={state.animationType}
          trigger={state.trigger}
          duration={state.duration}
          repeatTimes={state.repeatTimes}
          onSelectCategory={(cat) => {
            state.setCategory(cat);
            const defaultEffect = cat === 'entrance' ? 'fade_in' : cat === 'emphasis' ? 'pulse' : 'fade_out';
            triggerLivePreview(defaultEffect);
          }}
          onAnimationTypeChange={(val) => {
            state.setAnimationType(val);
            triggerLivePreview(val);
          }}
          onTriggerChange={state.setTrigger}
          onDurationChange={state.setDuration}
          onRepeatTimesChange={state.setRepeatTimes}
          onQuickPreview={onQuickPreview}
          onAddToTimeline={onAddToTimeline}
        />
      </div>

      <ScratchStudioWorkspace
        elements={elements}
        selectedElementIds={selectedIds}
        activeCategory={state.category}
        onSelectElementIds={(ids) => {
          setSelectedIds(ids);
          if (ids.size > 0) onSelectElementId(Array.from(ids)[0]);
        }}
        onSetActiveCategory={state.setCategory}
        onUpdateElementMeta={(id, metaPatch) =>
          onUpdateElements(elements.map((el) => (el.id === id ? { ...el, meta: { ...(el.meta || {}), ...metaPatch } } : el)))
        }
        onUpdateElements={onUpdateElements}
        onQuickPlayEffect={(_id, _cat) => triggerLivePreview(state.animationType)}
        onAssignSelectedEffect={onAssignSelectedToSlot}
      />
    </div>
  );
};

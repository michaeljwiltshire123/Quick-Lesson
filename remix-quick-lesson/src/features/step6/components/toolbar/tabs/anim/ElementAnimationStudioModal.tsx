import React, { useState } from 'react';
import { SlideElement, SlideItem } from '../../../../types/slideTypes';
import { ElementStudioHeader } from './ElementStudioHeader';
import { ElementStudioFooter } from './ElementStudioFooter';
import { AnimationTimingModal } from './studio/AnimationTimingModal';
import { useStudioAnimationState } from './studio/useStudioAnimationState';
import { commitEffectToElement } from './studio/shelf/applyEffectHelper';
import { AnimationCatalogCard, AnimationCategory } from './studio/types';
import { StudioModalBody } from './studio/StudioModalBody';

interface ElementAnimationStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  elements: SlideElement[];
  selectedElementId: string | null;
  onSelectElementId: (id: string) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
  onUpdateElementMeta: (meta: Record<string, any>) => void;
  activeSlide?: SlideItem;
}

export const ElementAnimationStudioModal: React.FC<ElementAnimationStudioModalProps> = ({
  isOpen, onClose, elements, selectedElementId, onSelectElementId, onUpdateElements, onUpdateElementMeta, activeSlide,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(selectedElementId ? [selectedElementId] : []));
  const currentElement = elements.find((e) => selectedIds.has(e.id) || e.id === selectedElementId) || elements[0];
  const [applied, setApplied] = useState(false);
  const [previewEffectId, setPreviewEffectId] = useState<string | null>(null);

  const state = useStudioAnimationState(currentElement, elements, selectedIds, onUpdateElementMeta, onUpdateElements);

  if (!isOpen || !currentElement) return null;

  const triggerLivePreview = (effectId: string) => {
    setPreviewEffectId(null);
    requestAnimationFrame(() => setPreviewEffectId(effectId));
  };

  const handleAddToTimeline = (card?: AnimationCatalogCard) => {
    const effectId = card?.id || state.animationType;
    const cat = card?.category || state.category;
    const updated = elements.map((el) => (selectedIds.has(el.id) || el.id === currentElement.id
      ? commitEffectToElement(el, { category: cat, effectId, trigger: state.trigger, duration: state.duration, repeatTimes: state.repeatTimes })
      : el));
    onUpdateElements(updated);
    triggerLivePreview(effectId);
  };

  const handleAssignSelectedToSlot = (targetElementId: string, slotCat: AnimationCategory) => {
    const updated = elements.map((el) => (el.id === targetElementId
      ? commitEffectToElement(el, { category: slotCat, effectId: state.animationType, trigger: state.trigger, duration: state.duration, repeatTimes: state.repeatTimes })
      : el));
    onUpdateElements(updated);
    triggerLivePreview(state.animationType);
  };

  const handleApply = () => {
    handleAddToTimeline();
    setApplied(true);
    setTimeout(() => { setApplied(false); onClose(); }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in select-none">
      <div className="bg-[#FAF9F5] border border-stone-300 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col justify-between shadow-2xl overflow-hidden text-stone-900">
        <ElementStudioHeader onClose={onClose} />
        <StudioModalBody
          activeSlide={activeSlide} elements={elements} currentElement={currentElement} selectedIds={selectedIds}
          previewEffectId={previewEffectId} state={state} onSelectElementId={onSelectElementId} setSelectedIds={setSelectedIds}
          onUpdateElements={onUpdateElements} onQuickPreview={(card) => triggerLivePreview(card.id)}
          onAddToTimeline={handleAddToTimeline} onAssignSelectedToSlot={handleAssignSelectedToSlot}
          triggerLivePreview={triggerLivePreview}
        />
        <ElementStudioFooter
          animationType={state.animationType} trigger={state.trigger} duration={state.duration} applied={applied} onApply={handleApply}
          onClear={() => { onUpdateElementMeta({ animationType: 'none', isPulseEmphasis: false, timelineEffects: [] }); onClose(); }}
        />
        <AnimationTimingModal
          isOpen={state.isTimingModalOpen} selectedCount={selectedIds.size} effectName={state.animationType.replace(/_/g, ' ')}
          onConfirm={state.handleConfirmTimingMode} onCancel={() => state.setIsTimingModalOpen(false)}
        />
      </div>
    </div>
  );
};

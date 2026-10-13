import React from 'react';
import { SlideItem, SlideElement } from '../../types/slideTypes';
import { GoogleSlidesInsertBar } from './GoogleSlidesInsertBar';
import { ActiveSlideCanvas } from './ActiveSlideCanvas';
import { cycleSlideLayouts } from '../../hooks/useStep6Actions';
import { SpeakerNotesPanel } from '../notes/SpeakerNotesPanel';

interface EditorCanvasColumnProps {
  slides: SlideItem[];
  activeSlide?: SlideItem;
  activeSlideIndex: number;
  elements: SlideElement[];
  existingCrest?: SlideElement;
  selectedElementId: string | null;
  selectedElementIds?: string[];
  canUndo?: boolean;
  canRedo?: boolean;
  crestActions: any;
  onSelectElementId: (id: string | null) => void;
  onSelectElementIds?: (ids: string[]) => void;
  onSelectSlide: (idx: number) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onOpenTimers: () => void;
  onOpenPresent: () => void;
  onUpdateActiveSlide: (patch: Partial<SlideItem>) => void;
  onUpdateAllSlides: (newSlides: SlideItem[]) => void;
  onUpdateElements: (els: SlideElement[]) => void;
}

export const EditorCanvasColumn: React.FC<EditorCanvasColumnProps> = ({
  slides, activeSlide, activeSlideIndex, elements, existingCrest, selectedElementId, selectedElementIds,
  canUndo, canRedo, crestActions, onSelectElementId, onSelectElementIds, onSelectSlide, onUndo, onRedo,
  onOpenTimers, onOpenPresent, onUpdateActiveSlide, onUpdateAllSlides, onUpdateElements,
}) => {
  return (
    <div className="lg:col-span-6 space-y-2 sticky top-3 self-start">
      <GoogleSlidesInsertBar
        slides={slides} activeSlide={activeSlide} activeSlideIndex={activeSlideIndex}
        elements={elements} existingCrest={existingCrest}
        onInsertElement={(el) => onUpdateActiveSlide({ elements: [...elements, el] })}
        onApplyLayoutTemplate={() => onUpdateActiveSlide({ elements: cycleSlideLayouts(elements) })}
        onCycleLayout={() => onUpdateActiveSlide({ elements: cycleSlideLayouts(elements) })}
        onOpenTimers={onOpenTimers} onOpenPresent={onOpenPresent}
        onUpdateActiveSlide={onUpdateActiveSlide} onUpdateAllSlides={onUpdateAllSlides}
        onAddCrestToAllSlides={crestActions.handleAddCrestToAll} onRemoveCrestFromAllSlides={crestActions.handleRemoveCrestFromAll}
        onUpdateCrestOpacity={crestActions.handleUpdateCrestOpacity} onToggleCrestLock={crestActions.handleToggleCrestLock}
      />

      {activeSlide ? (
        <div className="space-y-2">
          <ActiveSlideCanvas
            slide={{ ...activeSlide, elements }} slides={slides} slideNumber={activeSlideIndex + 1}
            selectedElementId={selectedElementId} selectedElementIds={selectedElementIds}
            onSelectElementId={onSelectElementId} onSelectElementIds={onSelectElementIds} onSelectSlide={onSelectSlide}
            canUndo={canUndo} canRedo={canRedo} onUndo={onUndo} onRedo={onRedo}
            onUpdateTitle={(title) => onUpdateActiveSlide({ title })} onUpdateSubtitle={(subtitle) => onUpdateActiveSlide({ subtitle })}
            onUpdateElements={onUpdateElements}
          />
          <SpeakerNotesPanel
            notes={activeSlide.speakerNotes}
            onUpdateNotes={(patch) => onUpdateActiveSlide({
              speakerNotes: { ...activeSlide.speakerNotes, ...patch },
            })}
          />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center border-2 border-dashed border-stone-200 rounded-2xl p-12 text-stone-400 font-medium text-sm">
          No slide selected
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { SlideItem } from '../types/slideTypes';
import { SlideNavigatorColumn } from './SlideNavigatorColumn';
import { EditorCanvasColumn } from './canvas/EditorCanvasColumn';
import { RightEditorToolbar } from './toolbar/RightEditorToolbar';
import { Step6EditorModals } from './Step6EditorModals';
import { deduplicateSlideElements, autoBeautifySlideElements } from '../hooks/useStep6Actions';
import { useEditorKeyboardShortcuts } from '../hooks/useEditorKeyboardShortcuts';
import { useCrestSlideActions } from '../hooks/useCrestSlideActions';
import { useVideoAttachmentAction } from '../hooks/useVideoAttachmentAction';
import { getSelectedElementStrict } from '../utils/slideSelectionUtils';
interface Step6EditorGridProps {
  slides: SlideItem[]; lessonTitle?: string; activeSlideIndex: number; activeSlide?: SlideItem;
  canUndo?: boolean; canRedo?: boolean; onUndo?: () => void; onRedo?: () => void;
  onSelectSlide: (index: number) => void; onReorderSlides: (startIndex: number, endIndex: number) => void;
  onMergeSlides: (sourceIndex: number, targetIndex: number) => void; onAddBlankSlide: () => void;
  onDuplicateSlide: (index: number) => void; onDeleteSlide: (index: number) => void;
  onUpdateActiveSlide: (patch: Partial<SlideItem>) => void; onApplyThemeToAll: (theme: any) => void;
  onUpdateAllSlides: (newSlides: SlideItem[]) => void; onOpenPresent: () => void;
  onOpenWarmup: () => void;
}

export const Step6EditorGrid: React.FC<Step6EditorGridProps> = ({
  slides, lessonTitle, activeSlideIndex, activeSlide, canUndo, canRedo, onUndo, onRedo,
  onSelectSlide, onReorderSlides, onMergeSlides, onAddBlankSlide,
  onDuplicateSlide, onDeleteSlide, onUpdateActiveSlide, onApplyThemeToAll, onUpdateAllSlides, onOpenPresent, onOpenWarmup,
}) => {
  const [isTimersOpen, setIsTimersOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const selectedElementId = selectedElementIds[0] || null;
  const setSelectedElementId = (id: string | null) => setSelectedElementIds(id ? [id] : []);
  const elements = deduplicateSlideElements(activeSlide?.elements || []);
  const selectedElement = getSelectedElementStrict(elements, selectedElementId);
  const existingCrest = elements.find((e) => e.meta?.isSchoolCrest || e.meta?.isSchoolLogo);
  const crestActions = useCrestSlideActions({ slides, onUpdateAllSlides });
  const { handleApplyVideoAttachment } = useVideoAttachmentAction({ activeSlide, elements, onUpdateActiveSlide });
  useEditorKeyboardShortcuts({
    onDeleteSelected: () => {
      if (selectedElementIds.length > 0 && activeSlide) {
        onUpdateActiveSlide({ elements: elements.filter((el) => !selectedElementIds.includes(el.id)) });
        setSelectedElementIds([]);
      }
    },
    onNavigateSlide: (direction) => onSelectSlide(Math.max(0, Math.min(slides.length - 1, activeSlideIndex + direction))),
    onUndo, onRedo,
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[640px]">
      <SlideNavigatorColumn slides={slides} activeIndex={activeSlideIndex} lessonTitle={lessonTitle || 'Current lesson'}
        onSelect={onSelectSlide} onMove={onReorderSlides} onMerge={onMergeSlides} onDelete={onDeleteSlide}
        onAdd={onAddBlankSlide} onOpenWarmup={onOpenWarmup}
        onInsert={(element) => activeSlide && onUpdateActiveSlide({ elements: [...elements, element] })} />
      <EditorCanvasColumn
        slides={slides} activeSlide={activeSlide} activeSlideIndex={activeSlideIndex}
        elements={elements} existingCrest={existingCrest} selectedElementId={selectedElementId}
        selectedElementIds={selectedElementIds}
        canUndo={canUndo} canRedo={canRedo} crestActions={crestActions}
        onSelectElementId={setSelectedElementId} onSelectElementIds={setSelectedElementIds} onSelectSlide={onSelectSlide}
        onUndo={onUndo} onRedo={onRedo} onOpenTimers={() => setIsTimersOpen(true)} onOpenPresent={onOpenPresent}
        onUpdateActiveSlide={onUpdateActiveSlide} onUpdateAllSlides={onUpdateAllSlides}
        onUpdateElements={(els) => onUpdateActiveSlide({ elements: deduplicateSlideElements(els) })}
      />
      <div className="lg:col-span-3 sticky top-3 self-start">
        {activeSlide && (
          <RightEditorToolbar
            slides={slides}
            activeSlide={{ ...activeSlide, elements }} selectedElement={selectedElement}
            selectedElementId={selectedElementId}
            selectedElementIds={selectedElementIds}
            onSelectElementId={setSelectedElementId}
            onSelectElementIds={setSelectedElementIds}
            onUpdateTheme={(theme) => onUpdateActiveSlide({ theme: { ...(activeSlide.theme || {}), ...theme } })}
            onApplyThemeToAll={onApplyThemeToAll}
            onUpdateElementMeta={(id, meta) => onUpdateActiveSlide({ elements: elements.map((el) => (el.id === id ? { ...el, meta: { ...(el.meta || {}), ...meta } } : el)) })}
            onUpdateElements={(els) => onUpdateActiveSlide({ elements: deduplicateSlideElements(els) })}
            onInsertMedia={(el) => onUpdateActiveSlide({ elements: [...elements, el] })}
            onAutoBeautify={() => onUpdateActiveSlide({ elements: autoBeautifySlideElements(elements) })}
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onAddCrestToAllSlides={crestActions.handleAddCrestToAll} onRemoveCrestFromAllSlides={crestActions.handleRemoveCrestFromAll}
            onUpdateCrestOpacity={crestActions.handleUpdateCrestOpacity} onToggleCrestLock={crestActions.handleToggleCrestLock}
            onUpdateAllSlides={onUpdateAllSlides}
          />
        )}
      </div>
      <Step6EditorModals
        isTimersOpen={isTimersOpen} isVideoModalOpen={isVideoModalOpen} slideTitle={activeSlide?.title}
        onCloseTimers={() => setIsTimersOpen(false)} onCloseVideoModal={() => setIsVideoModalOpen(false)}
        onInsertTimer={(el) => activeSlide && onUpdateActiveSlide({ elements: [...elements, el] })}
        onApplyVideoAttachment={handleApplyVideoAttachment}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { LessonChunk } from '../../../types';
import { useSlideDeckState } from '../hooks/useSlideDeckState';
import { useEditorKeyboardShortcuts } from '../hooks/useEditorKeyboardShortcuts';
import { createNewBlankSlide } from '../hooks/useStep6Actions';
import { saveSlideDeckToSession, syncSlideDeckToLessonChunks } from '../services/slideSyncService';
import { applyPairedTransitionToSlideDeck } from '../utils/transitionPairingUtils';
import { SlideDeckHeader } from './SlideDeckHeader';
import { Step6EditorGrid } from './Step6EditorGrid';
import { Step6ToStep7Navigation } from './Step6ToStep7Navigation';
import { PresenterFullscreenModal } from './canvas/PresenterFullscreenModal';
import { LiveLessonTransitionsModal } from './toolbar/tabs/anim/LiveLessonTransitionsModal';
import { createWarmupSlide } from './retrieval/createWarmupSlide';

interface Step6ContainerProps {
  lessonTitle?: string;
  subject?: string;
  chunks?: LessonChunk[];
  learningObjectives?: string[];
  onUpdateChunks?: (chunks: LessonChunk[]) => void;
  onBack?: () => void;
  onContinue?: () => void;
}

export const Step6Container: React.FC<Step6ContainerProps> = ({
  lessonTitle = 'Classroom Lesson',
  subject = 'Curriculum Topic',
  chunks = [],
  learningObjectives = [],
  onUpdateChunks,
  onBack = () => {},
  onContinue = () => {},
}) => {
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);
  const [isTransitionsOpen, setIsTransitionsOpen] = useState(false);
  const {
    slides, activeSlideIndex, activeSlide, setActiveSlideIndex,
    updateActiveSlide, updateAllSlides, reorderSlides, mergeSlides, addSlide, deleteSlide,
    duplicateSlide, applyThemeToAllSlides, undo, redo, canUndo, canRedo,
  } = useSlideDeckState(lessonTitle, subject, chunks, learningObjectives);

  useEditorKeyboardShortcuts({
    onUndo: undo, onRedo: redo,
    onDuplicate: () => duplicateSlide(activeSlideIndex),
  });

  useEffect(() => {
    saveSlideDeckToSession(lessonTitle, slides);
  }, [lessonTitle, slides]);

  const handleContinue = () => {
    saveSlideDeckToSession(lessonTitle, slides);
    if (onUpdateChunks) onUpdateChunks(syncSlideDeckToLessonChunks(slides, chunks));
    onContinue();
  };

  const totalMinutes = slides.reduce((acc, s) => acc + (s.speakerNotes?.timingMinutes || 5), 0);
  const openWarmup = () => {
    const existing = slides.findIndex((slide) => slide.archetype === 'warmup');
    if (existing >= 0) { setActiveSlideIndex(existing); return; }
    const target = Math.min(2, slides.length);
    updateAllSlides([...slides.slice(0, target), createWarmupSlide(), ...slides.slice(target)]);
    setActiveSlideIndex(target);
  };

  return (
    <div className="w-full px-1 sm:px-2 py-3 space-y-3">
      <SlideDeckHeader
        lessonTitle={lessonTitle} slideCount={slides.length}
        canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} onBack={onBack}
        onOpenPageTransitions={() => setIsTransitionsOpen(true)}
      />

      <Step6EditorGrid
        slides={slides} lessonTitle={lessonTitle} activeSlideIndex={activeSlideIndex} activeSlide={activeSlide}
        canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo}
        onSelectSlide={setActiveSlideIndex} onReorderSlides={reorderSlides}
        onMergeSlides={mergeSlides} onAddBlankSlide={() => addSlide(createNewBlankSlide(activeSlide))}
        onDuplicateSlide={duplicateSlide} onDeleteSlide={deleteSlide}
        onUpdateActiveSlide={updateActiveSlide} onApplyThemeToAll={applyThemeToAllSlides}
        onUpdateAllSlides={updateAllSlides}
        onOpenPresent={() => setIsPresenterOpen(true)}
        onOpenWarmup={openWarmup}
      />

      <Step6ToStep7Navigation
        slideCount={slides.length} totalMinutes={totalMinutes}
        onBack={onBack} onContinue={handleContinue}
      />

      <PresenterFullscreenModal
        isOpen={isPresenterOpen} slides={slides} initialIndex={activeSlideIndex}
        onClose={() => setIsPresenterOpen(false)}
      />

      <LiveLessonTransitionsModal
        isOpen={isTransitionsOpen}
        onClose={() => setIsTransitionsOpen(false)}
        onApplyTransition={(transId, applyToAll, isExit) => {
          const updated = applyPairedTransitionToSlideDeck(slides, activeSlideIndex, transId, Boolean(isExit), applyToAll);
          updateAllSlides(updated);
        }}
      />
    </div>
  );
};

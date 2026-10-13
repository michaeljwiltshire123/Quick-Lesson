import { useState, useCallback, useMemo } from 'react';
import { SlideItem, CanvasTheme } from '../types/slideTypes';
import { LessonChunk } from '../../../types';
import { createDefaultSlideDeck } from '../constants/defaultSlideDeck';
import { reorderSlideList, mergeSlideItems, duplicateSlideItem } from './slideDeckOperations';
import { loadSlideDeckFromSession } from '../services/slideSyncService';

export function useSlideDeckState(
  lessonTitle: string,
  subject: string,
  chunks: LessonChunk[],
  learningObjectives: string[] = []
) {
  const initialDeck = useMemo(
    () => createDefaultSlideDeck(lessonTitle, subject, chunks, learningObjectives),
    [lessonTitle, subject, chunks, learningObjectives]
  );

  const [slides, setSlides] = useState<SlideItem[]>(() => loadSlideDeckFromSession(lessonTitle) || initialDeck);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [past, setPast] = useState<SlideItem[][]>([]);
  const [future, setFuture] = useState<SlideItem[][]>([]);

  const commitState = useCallback((nextSlides: SlideItem[]) => {
    setPast((prev) => [...prev.slice(-19), slides]);
    setFuture([]);
    setSlides(nextSlides);
  }, [slides]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [slides, ...f]);
    setSlides(prev);
  }, [past, slides]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, slides]);
    setSlides(next);
  }, [future, slides]);

  const updateActiveSlide = useCallback((patch: Partial<SlideItem>) => {
    commitState(slides.map((s, i) => (i === activeSlideIndex ? { ...s, ...patch } : s)));
  }, [slides, activeSlideIndex, commitState]);

  const updateAllSlides = useCallback((newSlides: SlideItem[]) => {
    commitState(newSlides);
  }, [commitState]);

  const reorderSlides = useCallback((start: number, end: number) => {
    commitState(reorderSlideList(slides, start, end));
    setActiveSlideIndex(end);
  }, [slides, commitState]);

  const mergeSlides = useCallback((source: number, target: number) => {
    const merged = mergeSlideItems(slides, source, target);
    commitState(merged);
    setActiveSlideIndex(Math.min(target, merged.length - 1));
  }, [slides, commitState]);

  const addSlide = useCallback((newSlide: SlideItem, atIndex?: number) => {
    const target = atIndex ?? activeSlideIndex + 1;
    commitState([...slides.slice(0, target), newSlide, ...slides.slice(target)]);
    setActiveSlideIndex(target);
  }, [slides, activeSlideIndex, commitState]);

  const deleteSlide = useCallback((index: number) => {
    if (slides.length <= 1) return;
    commitState(slides.filter((_, i) => i !== index));
    setActiveSlideIndex((p) => Math.min(p, slides.length - 2));
  }, [slides, commitState]);

  const duplicateSlide = useCallback((index: number) => {
    commitState(duplicateSlideItem(slides, index));
    setActiveSlideIndex(index + 1);
  }, [slides, commitState]);

  const applyThemeToAllSlides = useCallback((theme: Partial<CanvasTheme>) => {
    setPast((prev) => [...prev.slice(-19), slides]);
    setFuture([]);
    setSlides((curr) => curr.map((s) => ({ ...s, theme: { ...(s.theme || {}), ...theme } })));
  }, [slides]);

  return {
    slides, activeSlideIndex, activeSlide: slides[activeSlideIndex] || slides[0],
    setActiveSlideIndex, updateActiveSlide, updateAllSlides, reorderSlides,
    mergeSlides, addSlide, deleteSlide, duplicateSlide, applyThemeToAllSlides,
    undo, redo, canUndo: past.length > 0, canRedo: future.length > 0,
  };
}

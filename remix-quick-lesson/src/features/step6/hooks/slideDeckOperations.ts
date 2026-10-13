import { SlideItem } from '../types/slideTypes';
import { mergedElements, mergedNotes } from './slideMergeHelpers';

export function reorderSlideList(
  slides: SlideItem[],
  startIndex: number,
  endIndex: number
): SlideItem[] {
  if (startIndex < 0 || endIndex < 0 || startIndex >= slides.length || endIndex >= slides.length) {
    return slides;
  }
  const result = [...slides];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function mergeSlideItems(
  slides: SlideItem[],
  sourceIndex: number,
  targetIndex: number
): SlideItem[] {
  if (
    sourceIndex === targetIndex ||
    sourceIndex < 0 ||
    targetIndex < 0 ||
    sourceIndex >= slides.length ||
    targetIndex >= slides.length
  ) {
    return slides;
  }
  const source = slides[sourceIndex];
  const target = slides[targetIndex];

  const mergedSlide: SlideItem = {
    ...target,
    elements: mergedElements(target.elements, source.elements),
    speakerNotes: mergedNotes(target.speakerNotes, source.speakerNotes),
  };

  const next = [...slides];
  next[targetIndex] = mergedSlide;
  next.splice(sourceIndex, 1);
  return next;
}

export function duplicateSlideItem(slides: SlideItem[], index: number): SlideItem[] {
  if (index < 0 || index >= slides.length) return slides;
  const target = slides[index];
  const copy: SlideItem = {
    ...target,
    id: `slide-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: `${target.title} (Copy)`,
    elements: target.elements.map((el) => ({
      ...el,
      id: `el-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    })),
  };
  const next = [...slides];
  next.splice(index + 1, 0, copy);
  return next;
}

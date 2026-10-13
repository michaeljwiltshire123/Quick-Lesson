import { SlideItem } from '../types/slideTypes';
import { LessonChunk } from '../../../types';

const SLIDE_SESSION_KEY_PREFIX = 'quicklesson_step6_deck_';

export function saveSlideDeckToSession(lessonKey: string, slides: SlideItem[]): void {
  try {
    const key = `${SLIDE_SESSION_KEY_PREFIX}${lessonKey || 'active'}`;
    sessionStorage.setItem(key, JSON.stringify(slides));
  } catch (err) {
    console.warn('Session storage quota exceeded or unavailable. Retaining in-memory slide state.', err);
  }
}

export function loadSlideDeckFromSession(lessonKey: string): SlideItem[] | null {
  try {
    const key = `${SLIDE_SESSION_KEY_PREFIX}${lessonKey || 'active'}`;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as SlideItem[];
  } catch (err) {
    console.warn('Failed to load slide deck from session storage', err);
    return null;
  }
}

export function syncSlideDeckToLessonChunks(
  slides: SlideItem[],
  chunks: LessonChunk[]
): LessonChunk[] {
  if (!chunks || chunks.length === 0) return chunks;

  return chunks.map((chunk) => {
    const matchingSlide = slides.find((s) => s.chunkId === chunk.id);
    if (!matchingSlide) return chunk;

    const notes = matchingSlide.speakerNotes;
    const glossaryText = notes.glossary && notes.glossary.length > 0
      ? notes.glossary.map((g) => `${g.term}: ${g.definition}`).join('; ')
      : chunk.vocabulary;

    const readingText = notes.furtherReading && notes.furtherReading.length > 0
      ? notes.furtherReading.filter(Boolean).join('\n')
      : chunk.furtherReading;

    return {
      ...chunk,
      title: matchingSlide.title || chunk.title,
      durationMinutes: Math.max(1, notes.timingMinutes || chunk.durationMinutes),
      teacherScript: notes.teacherScript || chunk.teacherScript,
      vocabulary: glossaryText,
      furtherReading: readingText,
      pitfalls: notes.misconceptionsWarning || chunk.pitfalls,
      retrievalCues: notes.retrievalCues || chunk.retrievalCues,
      stepByStep: notes.stepInstructions || chunk.stepByStep,
    };
  });
}

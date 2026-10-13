import { SlideItem } from '../types/slideTypes';

export interface ConceptBeginningSlide {
  slide: SlideItem;
  index: number;
  conceptNumber: number;
  title: string;
  timingMinutes?: number;
}

export function getAimsAndOutcomesSlideIndex(slides: SlideItem[]): number {
  const idx = slides.findIndex(
    (s) => s.archetype === 'aims_outcomes' || s.id === 'slide-aims-outcomes' || s.title?.toLowerCase().includes('aims')
  );
  return idx !== -1 ? idx : Math.min(1, slides.length - 1);
}

export function getConceptBeginningSlides(slides: SlideItem[]): ConceptBeginningSlide[] {
  const conceptSlides: ConceptBeginningSlide[] = [];
  const seenChunkIds = new Set<string>();
  let conceptCount = 0;

  slides.forEach((slide, index) => {
    // If explicitly marked as chunk_teaching or first slide of a chunk
    if (slide.archetype === 'chunk_teaching' || slide.chunkId) {
      const chunkKey = slide.chunkId || slide.id;
      if (!seenChunkIds.has(chunkKey)) {
        seenChunkIds.add(chunkKey);
        conceptCount++;
        conceptSlides.push({
          slide,
          index,
          conceptNumber: conceptCount,
          title: slide.title || `Concept ${conceptCount}`,
          timingMinutes: slide.speakerNotes?.timingMinutes,
        });
      }
    } else if (
      slide.archetype !== 'title' &&
      slide.archetype !== 'aims_outcomes' &&
      slide.archetype !== 'warmup' &&
      slide.archetype !== 'closing'
    ) {
      conceptCount++;
      conceptSlides.push({
        slide,
        index,
        conceptNumber: conceptCount,
        title: slide.title || `Section ${conceptCount}`,
        timingMinutes: slide.speakerNotes?.timingMinutes,
      });
    }
  });

  return conceptSlides;
}

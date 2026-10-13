import { SlideItem } from '../types/slideTypes';

export function getMatchingExitTransition(entry: string): string {
  if (!entry || entry === 'none') return 'none';
  if (entry === 'fade' || entry === 'fade_in') return 'fade_out';
  if (entry === 'slide_right') return 'slide_right';
  if (entry === 'slide_left') return 'slide_left';
  if (entry === 'slide_top') return 'slide_top';
  if (entry === 'slide_bottom') return 'slide_bottom';
  if (entry === 'zoom') return 'zoom_out';
  if (entry === 'flip') return 'flip';
  if (entry === 'dissolve') return 'dissolve';
  return entry;
}

export function getMatchingEntryTransition(exit: string): string {
  if (!exit || exit === 'none') return 'none';
  if (exit === 'fade_out' || exit === 'fade') return 'fade';
  if (exit === 'slide_right') return 'slide_right';
  if (exit === 'slide_left') return 'slide_left';
  if (exit === 'slide_top') return 'slide_top';
  if (exit === 'slide_bottom') return 'slide_bottom';
  if (exit === 'zoom_out' || exit === 'zoom') return 'zoom';
  if (exit === 'flip') return 'flip';
  if (exit === 'dissolve') return 'dissolve';
  return exit;
}

export function applyPairedTransitionToSlideDeck(
  slides: SlideItem[],
  targetIndex: number,
  transitionId: string,
  isExit: boolean,
  applyToAll: boolean
): SlideItem[] {
  if (applyToAll) {
    const entryId = isExit ? getMatchingEntryTransition(transitionId) : transitionId;
    const exitId = isExit ? transitionId : getMatchingExitTransition(transitionId);
    return slides.map((s) => ({
      ...s,
      theme: {
        ...(s.theme || {}),
        transitionEffect: entryId,
        pageExitEffect: exitId,
      },
    }));
  }

  const updated = [...slides];
  const current = updated[targetIndex];
  if (!current) return updated;

  if (isExit) {
    const entryMatch = getMatchingEntryTransition(transitionId);
    updated[targetIndex] = {
      ...current,
      theme: { ...(current.theme || {}), pageExitEffect: transitionId },
    };
    if (targetIndex < updated.length - 1) {
      const nextSlide = updated[targetIndex + 1];
      updated[targetIndex + 1] = {
        ...nextSlide,
        theme: { ...(nextSlide.theme || {}), transitionEffect: entryMatch },
      };
    }
  } else {
    const exitMatch = getMatchingExitTransition(transitionId);
    updated[targetIndex] = {
      ...current,
      theme: { ...(current.theme || {}), transitionEffect: transitionId },
    };
    if (targetIndex > 0) {
      const prevSlide = updated[targetIndex - 1];
      updated[targetIndex - 1] = {
        ...prevSlide,
        theme: { ...(prevSlide.theme || {}), pageExitEffect: exitMatch },
      };
    }
  }

  return updated;
}

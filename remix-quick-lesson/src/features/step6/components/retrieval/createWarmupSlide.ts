import { SlideItem } from '../../types/slideTypes';

export function createWarmupSlide(): SlideItem {
  return {
    id: `slide-warmup-${Date.now()}`, title: 'Warm-up slide', archetype: 'warmup',
    isHidden: true, layoutPattern: 'single_column', elements: [],
    theme: { backgroundColor: '#F2F7FA', cardColor: '#FFFFFF', textColor: '#203344', accentColor: '#3B82A0' },
    speakerNotes: { teacherScript: '', pedagogicalTips: [], timingMinutes: 5, retrievalCues: '' },
  };
}

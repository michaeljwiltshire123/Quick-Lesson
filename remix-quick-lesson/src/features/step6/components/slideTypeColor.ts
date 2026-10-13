import { SlideItem } from '../types/slideTypes';

export function slideTypeColor(slide: SlideItem): string {
  if (slide.archetype === 'title') return 'border-stone-300 bg-stone-50';
  if (slide.archetype === 'aims_outcomes') return 'border-emerald-200 bg-emerald-50';
  if (slide.archetype === 'warmup') return 'border-sky-200 bg-sky-50';
  if (slide.elements.some((item) => item.type === 'video' || item.type === 'image')) return 'border-violet-200 bg-violet-50';
  if (/diagnostic|starter|question/i.test(slide.title)) return 'border-blue-200 bg-blue-50';
  if (/summative|assessment|task/i.test(slide.title)) return 'border-rose-200 bg-rose-50';
  if (/formative|check|retrieval/i.test(slide.title)) return 'border-amber-200 bg-amber-50';
  return 'border-teal-200 bg-teal-50';
}

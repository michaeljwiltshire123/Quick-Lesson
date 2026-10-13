import { SlideItem } from '../../types/slideTypes';

export function linkAimsToChunks(slides: SlideItem[]): SlideItem[] {
  const aims = slides.find((slide) => slide.archetype === 'aims_outcomes');
  if (!aims) return slides;
  const body = aims.elements.find((element) => element.id === 'el-aims-body');
  if (!body) return slides;
  const concepts = slides.filter((slide) => Boolean(slide.chunkId) && slide.archetype !== 'warmup');
  const outcomes = body.content.split(/\r?\n/);
  const targets = outcomes.map((line, index) => {
    const text = line.replace(/^\s*\d+[.)]?\s*/, '').toLowerCase();
    const match = concepts.find((slide) => text.includes(slide.title.toLowerCase()) || slide.title.toLowerCase().includes(text));
    return (match || concepts[index % Math.max(1, concepts.length)])?.id || '';
  });
  body.meta = { ...(body.meta || {}), outcomeTargets: targets };
  return slides;
}

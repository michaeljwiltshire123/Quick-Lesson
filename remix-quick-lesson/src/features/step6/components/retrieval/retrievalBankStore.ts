import { SlideItem } from '../../types/slideTypes';

export interface RetrievalPrompt { id: string; lesson: string; prompt: string }
const deckPrefix = 'quicklesson_step6_deck_';

export function extractRetrievalPrompts(lesson: string, slides: SlideItem[]): RetrievalPrompt[] {
  const prompts = slides.flatMap((slide) => slide.elements.flatMap((element) => {
    const meta = element.meta || {};
    const prompt = element.type === 'poll' || meta.isMysteryBox || slide.archetype === 'warmup'
      ? element.content : element.content.includes('?') ? element.content : '';
    return prompt.trim() ? [{ id: `${lesson}:${slide.id}:${element.id}`, lesson, prompt: prompt.trim() }] : [];
  }));
  const cues = slides.flatMap((slide) => (slide.speakerNotes.retrievalCues || '').split(/\r?\n/)
    .map((prompt, index) => ({ id: `${lesson}:${slide.id}:cue:${index}`, lesson, prompt: prompt.trim() }))
    .filter((item) => item.prompt));
  return [...prompts, ...cues];
}

export function rememberRetrievalPrompts(lesson: string, slides: SlideItem[]) {
  void lesson; void slides;
}

export function loadRetrievalPrompts(): RetrievalPrompt[] {
  const saved: RetrievalPrompt[] = [];
  for (let index = 0; index < sessionStorage.length; index++) {
    const key = sessionStorage.key(index);
    if (!key?.startsWith(deckPrefix)) continue;
    try {
      const deck = JSON.parse(sessionStorage.getItem(key) || '[]') as SlideItem[];
      saved.push(...extractRetrievalPrompts(key.slice(deckPrefix.length), deck));
    } catch (error) { console.warn(`Could not read saved lesson slides from ${key}.`, error); }
  }
  return saved;
}

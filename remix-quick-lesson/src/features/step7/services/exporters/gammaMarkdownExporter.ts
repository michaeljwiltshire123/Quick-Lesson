import { SlideItem } from '../../../step6/types/slideTypes';

const clean = (value: string) => value.replace(/<[^>]*>/g, '').trim();

export function toGammaMarkdown(slides: SlideItem[]): string {
  return slides.map((slide) => {
    const parts = [`# ${slide.title}`, slide.subtitle || ''];
    slide.elements.forEach((element) => {
      if (element.type === 'image' || element.type === 'video') {
        parts.push(element.type === 'image' ? `![${element.caption || slide.title}](${element.content})` : `[Watch ${element.caption || slide.title}](${element.content})`);
      } else if (element.content) parts.push(clean(element.content));
    });
    return parts.filter(Boolean).join('\n\n');
  }).join('\n\n---\n\n');
}

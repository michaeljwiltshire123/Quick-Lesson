import { LessonChunk } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';

export interface WorksheetItem { title: string; text: string }
export function worksheetVocabulary(chunks: LessonChunk[], slides: SlideItem[]): WorksheetItem[] {
  const values = chunks.flatMap((chunk) => (chunk.vocabulary || '').split(/[;\n]/))
    .map((entry) => entry.trim()).filter(Boolean);
  const glossary = slides.flatMap((slide) => slide.speakerNotes.glossary || [])
    .map((item) => `${item.term}: ${item.definition}`);
  return unique([...values, ...glossary].map((entry) => {
    const [title, ...meaning] = entry.split(':');
    return { title: title.trim(), text: meaning.join(':').trim() };
  }));
}

export function worksheetTasks(chunks: LessonChunk[]): WorksheetItem[] {
  return chunks.flatMap((chunk) => {
    const title = chunk.formativeTaskTitle?.trim();
    const text = [chunk.formativeTaskDetails, chunk.formativeTaskGrouping].filter(Boolean).join('\n');
    return title || text ? [{ title: title || chunk.title, text }] : [];
  });
}

export function worksheetQuestions(chunks: LessonChunk[], slides: SlideItem[]): WorksheetItem[] {
  const prompts = chunks.flatMap((chunk) => [...(chunk.discussionStarters || []), ...(chunk.starterPool || []).filter((card) => card?.isAttached)])
    .map((card) => ({ title: card.formatType || 'Check question', text: String(card.promptText || '').trim() }))
    .filter((item) => item.text);
  const slidePrompts = slides.filter((slide) => /question|true or false|check|quiz/i.test(slide.title))
    .flatMap((slide) => slide.elements.filter((element) => element.content.trim()).map((element) => ({ title: slide.title, text: element.content.trim() })));
  return unique([...prompts, ...slidePrompts]);
}

function unique(items: WorksheetItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.title}|${item.text}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}

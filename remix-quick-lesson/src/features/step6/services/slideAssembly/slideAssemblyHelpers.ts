import { LessonChunk } from '../../../../types';
import { SlideItem, SlideElement, SpeakerNotesData } from '../../types/slideTypes';
import { slideTheme, styledContentElement, themeIndex } from './slideVisualStyle';
import { studentTitle } from './studentTitles';

export const cleanText = (value?: string) => (value || '').trim();
export const textElement = (id: string, content: string, y = 24): SlideElement => ({
  id, type: 'text', x: 10, y, width: 80, height: 64, content,
});

const split = (value?: string) => cleanText(value).split(/\n|;/).map((s) => s.trim()).filter(Boolean);
const glossary = (value?: string) => split(value).flatMap((entry) => {
  const [term, ...definition] = entry.split(':');
  return term && definition.length ? [{ term: term.trim(), definition: definition.join(':').trim() }] : [];
});

export function notesForChunk(chunk: LessonChunk): SpeakerNotesData {
  return {
    teacherScript: [chunk.teacherScript, chunk.classroomNotes].filter(Boolean).join('\n\n'),
    stepInstructions: chunk.stepByStep,
    retrievalCues: chunk.retrievalCues,
    misconceptionsWarning: chunk.pitfalls,
    glossary: glossary(chunk.vocabulary || chunk.vocabularyTags),
    furtherReading: split(chunk.furtherReading),
    studySuggestions: split(chunk.researchTips || chunk.plusOneScaffolds),
    pedagogicalTips: chunk.pitfalls ? [chunk.pitfalls] : [],
    timingMinutes: Math.max(1, chunk.durationMinutes || 5),
  };
}

export function createContentSlide(
  chunk: LessonChunk, id: string, title: string, content: string, archetype: SlideItem['archetype'] = 'chunk_teaching',
): SlideItem {
  const theme = slideTheme(themeIndex(id), archetype);
  return {
    id, title: studentTitle(title), archetype, chunkId: chunk.id, layoutPattern: 'single_column',
    theme, elements: [styledContentElement(textElement(`el-${id}`, content), theme.accentColor || '#B85C38')],
    speakerNotes: notesForChunk(chunk),
  };
}

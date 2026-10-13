import { LessonChunk } from '../../../types';
import { SlideItem } from '../types/slideTypes';
import { assembleChunkSlides } from './slideAssembly/chunkSlideAssembly';
import { textElement } from './slideAssembly/slideAssemblyHelpers';
import { coverShapes, slideTheme } from './slideAssembly/slideVisualStyle';
import { linkAimsToChunks } from './slideAssembly/linkAimsToChunks';

export function assembleSlideData(
  lessonTitle: string, subject: string, chunks: LessonChunk[], learningObjectives: string[],
): SlideItem[] {
  const title = lessonTitle.trim() || 'Classroom Lesson';
  const warmup: SlideItem = {
    id: 'slide-warmup-retrieval', title: 'Warm-up slide', archetype: 'warmup', isHidden: true,
    layoutPattern: 'single_column', elements: [], theme: slideTheme(2, 'warmup'),
    speakerNotes: { teacherScript: '', pedagogicalTips: [], timingMinutes: 5, retrievalCues: '' },
  };
  const slides: SlideItem[] = [{
    id: 'slide-title', title, archetype: 'title', layoutPattern: 'single_column', elements: coverShapes(),
    theme: slideTheme(0, 'title'),
    speakerNotes: { teacherScript: '', pedagogicalTips: [], timingMinutes: 3 },
  }];
  const objectives = learningObjectives.map((item) => item.trim()).filter(Boolean);
  const aims = objectives.length ? objectives : chunks.map((chunk) => chunk.learningIntent || chunk.title).filter(Boolean).slice(0, 6);
  slides.push({
    id: 'slide-aims-outcomes', title: 'Lesson Aims & Outcomes', archetype: 'aims_outcomes',
    layoutPattern: 'single_column',
    theme: slideTheme(1, 'aims_outcomes'),
    elements: [{
      ...textElement('el-aims-body', aims.map((item, i) => `${i + 1}.  ${item}`).join('\n')),
      x: 8, y: 26, width: 84, height: 64, fillColor: '#FFFFFF', borderColor: '#3A776855',
      borderWidth: 1, borderRadius: 18, textStyle: { fontSize: 22, lineHeight: 1.5, color: '#20332F' },
    }],
    speakerNotes: { teacherScript: '', pedagogicalTips: [], timingMinutes: 4 },
  });
  slides.push(warmup);
  chunks.forEach((chunk) => {
    slides.push(...assembleChunkSlides(chunk));
  });
  return linkAimsToChunks(slides);
}

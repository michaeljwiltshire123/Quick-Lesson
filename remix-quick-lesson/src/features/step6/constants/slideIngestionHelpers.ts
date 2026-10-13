import { SlideItem } from '../types/slideTypes';
import { LessonChunk } from '../../../types';

export function createMediaSlidesForChunk(chunk: LessonChunk, baseIndex: number): SlideItem[] {
  const extraSlides: SlideItem[] = [];

  if (chunk.attachments && chunk.attachments.length > 0) {
    chunk.attachments.forEach((att, attIdx) => {
      const isVideo = att.type === 'video' || att.url?.includes('mp4') || att.url?.includes('youtube') || att.url?.includes('vimeo');
      extraSlides.push({
        id: `slide-media-${chunk.id || baseIndex}-${attIdx}`,
        title: chunk.title || 'Key Concept Visual',
        subtitle: undefined,
        archetype: 'custom',
        chunkId: chunk.id,
        layoutPattern: 'hero_media',
        elements: [
          {
            id: `el-media-att-${chunk.id}-${attIdx}`,
            type: isVideo ? 'video' : 'image',
            x: 10,
            y: 18,
            width: 80,
            height: 72,
            content: att.url || '',
            caption: att.name || '',
            meta: isVideo ? { startTime: 0, endTime: 60 } : undefined,
          },
        ],
        speakerNotes: {
          teacherScript: `Direct pupils' attention to the ${isVideo ? 'video clip' : 'visual schematic'}.`,
          pedagogicalTips: ['Prompt pupils to identify the core phenomenon depicted.'],
          timingMinutes: 3,
        },
      });
    });
  }

  return extraSlides;
}

export function createDiagnosticPollSlide(chunk: LessonChunk, baseIndex: number): SlideItem | null {
  if (!chunk.formativeTaskTitle && !chunk.formativeTaskDetails && !chunk.title?.toLowerCase().includes('quiz')) return null;

  return {
    id: `slide-cfu-${chunk.id || baseIndex}`,
    title: chunk.formativeTaskTitle ? `Check: ${chunk.formativeTaskTitle}` : `Check for Understanding: ${chunk.title}`,
    subtitle: 'Adaptive live poll or 1–5 finger vote',
    archetype: 'custom',
    chunkId: chunk.id,
    layoutPattern: 'single_column',
    elements: [
      {
        id: `el-poll-${chunk.id || baseIndex}`,
        type: 'poll',
        x: 10,
        y: 25,
        width: 80,
        height: 55,
        content: chunk.formativeTaskDetails || `Which statement best explains the mechanism of ${chunk.title}?`,
        meta: {
          pollType: 'multiple_choice',
          options: ['Option A: Core mechanism', 'Option B: Common misconception', 'Option C: Secondary effect', 'Option D: Alternative view'],
          correctAnswer: 0,
          showTeacherAnswer: false,
        },
      },
    ],
    speakerNotes: {
      teacherScript: 'Present this check for understanding. Have pupils vote before revealing the correct explanation.',
      pedagogicalTips: ['Cold-call pupils who chose contrasting options to explain their reasoning.'],
      timingMinutes: 4,
    },
  };
}

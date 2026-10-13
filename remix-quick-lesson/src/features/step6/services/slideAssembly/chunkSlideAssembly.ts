import { LessonChunk } from '../../../../types';
import { SlideElement, SlideItem } from '../../types/slideTypes';
import { cleanText, createContentSlide, notesForChunk } from './slideAssemblyHelpers';
import { createDiscussionSlides, createTaskSlides } from './interactionSlides';
import { studentTitle } from './studentTitles';
import { slideTheme, themeIndex } from './slideVisualStyle';

function contentSlide(chunk: LessonChunk): SlideItem[] {
  const intent = chunk.type === 'teaching' ? chunk.learningIntent : undefined;
  const content = [...new Set([intent, chunk.coreExplanation, chunk.theoryBullets, chunk.teacherScript, chunk.classroomNotes]
    .map(cleanText).filter(Boolean))].join('\n\n');
  return content ? [createContentSlide(chunk, `slide-chunk-${chunk.id}`, chunk.title, content)] : [];
}

function contextSlide(chunk: LessonChunk): SlideItem[] {
  const content = [chunk.vocabulary, chunk.realWorldContext, chunk.metaphor].map(cleanText).filter(Boolean).join('\n\n');
  return content ? [createContentSlide(chunk, `slide-context-${chunk.id}`, 'Words and Connections', content)] : [];
}

function exampleSlide(chunk: LessonChunk): SlideItem[] {
  const example = cleanText(chunk.workedExample);
  return example ? [createContentSlide(chunk, `slide-example-${chunk.id}`, `${chunk.title}: Worked example`, example)] : [];
}

function videoTime(value?: string): number | undefined {
  if (!value) return undefined;
  const parts = value.split(':').map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  return parts.reduce((seconds, part) => seconds * 60 + part, 0);
}

function attachmentSlides(chunk: LessonChunk): SlideItem[] {
  return (chunk.attachments || []).flatMap((attachment, index) => {
    const video = attachment.type === 'video' || /mp4|youtube|vimeo/i.test(attachment.url || '');
    const visual = attachment.type === 'image' || video;
    const content = visual ? attachment.url || attachment.fileBase64 || '' :
      [attachment.name, attachment.cfuPrompt, ...(attachment.questSteps || [])].filter(Boolean).join('\n\n');
    const mediaSource = visual ? content || attachment.microThumbnail || '' : content;
    const title = video ? chunk.title || attachment.name : attachment.name || chunk.title;
    const caption = video ? attachment.pauseCue ? `Watch for: ${attachment.pauseCue}` : 'Watch and notice the key idea' : attachment.name;
    const mediaElement = {
      id: `el-media-${chunk.id}-${index}`, type: (visual ? (video ? 'video' : 'image') : 'text') as SlideElement['type'],
      x: 10, y: 17, width: 80, height: video ? 58 : 72, content: mediaSource, caption: caption || '',
      meta: {
        attachmentType: attachment.type, platform: attachment.platform,
        url: attachment.url, fileBase64: attachment.fileBase64, chunkAttachment: { ...attachment },
        startTime: attachment.startTime, endTime: attachment.endTime,
        loopStartSec: videoTime(attachment.startTime), loopEndSec: videoTime(attachment.endTime),
        pauseCue: attachment.pauseCue, cfuPrompt: attachment.cfuPrompt,
        udlPathway: attachment.udlPathway, sharingMode: attachment.sharingMode,
        questSteps: attachment.questSteps, qrDesign: attachment.qrDesign,
        linkUrl: !visual ? attachment.url : undefined,
      },
      ...(!visual ? { fillColor: '#FFFFFF', borderColor: '#B85C3855', borderWidth: 1, borderRadius: 18,
        textStyle: { fontSize: 20, lineHeight: 1.45, color: '#292722' } } : {}),
    };
    const media: SlideItem = {
      id: `slide-media-${chunk.id}-${attachment.id || index}`, title: studentTitle(title),
      archetype: 'custom', chunkId: chunk.id, layoutPattern: 'hero_media',
      theme: slideTheme(themeIndex(chunk.id + attachment.id), 'custom'),
      elements: [mediaElement, ...(video && attachment.cfuPrompt ? [{
        id: `el-video-prompt-${chunk.id}-${index}`, type: 'text' as const,
        x: 10, y: 79, width: 80, height: 15,
        content: `As you watch, consider: ${attachment.cfuPrompt}`,
        fillColor: '#FFFFFF', borderColor: '#B85C3855', borderWidth: 1, borderRadius: 12,
        textStyle: { fontSize: 15, color: '#292722' },
      }] : [])],
      speakerNotes: notesForChunk(chunk),
    };
    return [media];
  });
}

export function assembleChunkSlides(chunk: LessonChunk): SlideItem[] {
  const slides: SlideItem[] = [];
  if (chunk.type === 'warmup' && cleanText(chunk.learningIntent)) {
    slides.push(createContentSlide(chunk, `slide-warmup-${chunk.id}`, chunk.title, cleanText(chunk.learningIntent), 'warmup'));
  }
  slides.push(...contentSlide(chunk), ...contextSlide(chunk), ...exampleSlide(chunk), ...createTaskSlides(chunk));
  slides.push(...createDiscussionSlides(chunk), ...attachmentSlides(chunk));
  if (chunk.type === 'closing' && cleanText(chunk.learningIntent)) {
    slides.push(createContentSlide(chunk, `slide-closing-${chunk.id}`, chunk.title, cleanText(chunk.learningIntent), 'closing'));
  }
  return slides;
}

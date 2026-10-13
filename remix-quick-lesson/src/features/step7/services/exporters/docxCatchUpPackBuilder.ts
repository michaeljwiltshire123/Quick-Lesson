import { Paragraph } from 'docx';
import { LessonChunk, ModuleScheme } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';
import { downloadFile, safeFilename } from './downloadFile';
import { bullet, compactHeading, compactTitle, documentBlob, paragraph } from './docxUtils';
import { worksheetVocabulary } from './worksheetContent';

export async function buildCatchUpDocx(title: string, chunks: LessonChunk[], slides: SlideItem[], scheme: ModuleScheme) {
  const objectives = slides.find((slide) => slide.archetype === 'aims_outcomes')?.elements.map((item) => item.content).filter(Boolean) || [];
  const goals = objectives.length ? objectives : chunks.map((chunk) => chunk.learningIntent).filter(Boolean) as string[];
  const concepts = [...worksheetVocabulary(chunks, slides), ...chunks.flatMap((chunk) => {
    const text = [chunk.coreExplanation, chunk.theoryBullets, chunk.realWorldContext].filter(Boolean).join('\n');
    return text ? [{ title: chunk.title, text }] : [];
  })];
  const tasks = chunks.filter((chunk) => chunk.type === 'closing' && (chunk.formativeTaskTitle || chunk.formativeTaskDetails))
    .map((chunk) => [chunk.formativeTaskTitle, chunk.formativeTaskDetails].filter(Boolean).join(': '));
  const reading = chunks.flatMap((chunk) => (chunk.furtherReading || '').split(/\n|;/).map((line) => line.trim()).filter(Boolean));
  const body: Paragraph[] = [compactTitle(`${title || scheme.unitName || 'Lesson'} · Catch-up guide`),
    paragraph([scheme.courseTitle, scheme.unitName].filter(Boolean).join(' · ')),
    compactHeading('Core lesson goal'), ...goals.map(bullet), compactHeading('Key concepts & meanings'),
    ...concepts.map((item) => bullet(item.text ? `${item.title}: ${item.text}` : item.title)),
    compactHeading('What to do to catch up'), ...chunks.map((chunk) => bullet([chunk.title, chunk.learningIntent, chunk.formativeTaskTitle, chunk.formativeTaskDetails].filter(Boolean).join(' — '))),
    compactHeading('Summative task'), ...(tasks.length ? tasks.map(bullet) : [paragraph('No summative task was recorded in the lesson materials.')]),
    compactHeading('Reading list'), ...reading.map(bullet)];
  for (const [index, items] of [[goals.length, 'lesson goal'], [concepts.length, 'key concepts'], [tasks.length, 'summative task'], [reading.length, 'reading list']] as [number, string][]) {
    if (!index) body.push(paragraph(`No ${items} was recorded in the lesson materials.`));
  }
  return documentBlob(body, true);
}

export async function downloadCatchUpDocx(title: string, chunks: LessonChunk[], slides: SlideItem[], scheme: ModuleScheme) {
  const file = await buildCatchUpDocx(title, chunks, slides, scheme);
  downloadFile(file, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', `${safeFilename(title)}-catch-up.docx`);
}

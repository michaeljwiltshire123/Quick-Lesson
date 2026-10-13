import { Paragraph } from 'docx';
import { LessonChunk } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';
import { downloadFile, safeFilename } from './downloadFile';
import { bullet, documentBlob, documentTitle, heading, paragraph } from './docxUtils';
import { worksheetQuestions, worksheetTasks, worksheetVocabulary } from './worksheetContent';

export async function buildWorksheetDocx(title: string, chunks: LessonChunk[], slides: SlideItem[]) {
  const vocabulary = worksheetVocabulary(chunks, slides);
  const tasks = worksheetTasks(chunks);
  const questions = worksheetQuestions(chunks, slides);
  const children: Paragraph[] = [documentTitle(title || 'Lesson Worksheet'),
    paragraph('Name: ____________________________________     Date: ____________________'),
    heading('Section A · Vocabulary'), ...(vocabulary.length ? vocabulary.map((item) => bullet(item.text ? `${item.title} — ${item.text}` : item.title)) : [paragraph('No vocabulary items are saved in this lesson.')]),
    heading('Section B · Task Cards'), ...(tasks.length ? tasks.flatMap((task) => [paragraph(task.title, { bold: true }), paragraph(task.text)]) : [paragraph('No task cards are saved in this lesson.')]),
    heading('Section C · Check Questions'), ...(questions.length ? questions.flatMap((question) => [paragraph(question.title, { bold: true }), paragraph(question.text), paragraph('Answer: ______________________________________________________________')]) : [paragraph('No check questions are saved in this lesson.')])];
  return documentBlob(children);
}

export async function downloadWorksheetDocx(title: string, chunks: LessonChunk[], slides: SlideItem[]) {
  const file = await buildWorksheetDocx(title, chunks, slides);
  downloadFile(file, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', `${safeFilename(title)}-worksheet.docx`);
}

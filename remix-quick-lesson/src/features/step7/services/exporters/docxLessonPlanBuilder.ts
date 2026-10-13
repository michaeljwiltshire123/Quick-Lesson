import { AlignmentType, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';
import { LessonChunk } from '../../../../types';
import { downloadFile, safeFilename } from './downloadFile';
import { documentBlob, documentTitle, paragraph } from './docxUtils';

const headers = ['Timing', 'Phase', 'Teacher Script', 'Student Activity', 'SEN Support'];
const cell = (text: string, width: number, header = false) => new TableCell({
  children: [new Paragraph({ children: [new TextRun({ text, bold: header })], alignment: AlignmentType.LEFT })],
  shading: header ? { fill: 'F3E6D9' } : undefined,
  width: { size: width, type: WidthType.PERCENTAGE },
});

export async function buildLessonPlanDocx(title: string, chunks: LessonChunk[]) {
  const widths = [10, 15, 30, 25, 20];
  const rows = [new TableRow({ children: headers.map((label, index) => cell(label, widths[index], true)) }),
    ...chunks.map((chunk) => new TableRow({ children: [
      cell(`${chunk.durationMinutes} min`, widths[0]), cell(`${chunk.type}\n${chunk.title}`, widths[1]),
      cell(chunk.teacherScript || '', widths[2]), cell(studentActivity(chunk), widths[3]),
      cell(chunk.plusOneScaffolds || chunk.classroomNotes || '', widths[4]),
    ] }))];
  const table = new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: [1540, 2310, 4619, 3850, 3079] });
  const body = [documentTitle(`${title || 'Lesson'} · Lesson Plan`),
    paragraph(`Total planned time: ${chunks.reduce((sum, chunk) => sum + (Number(chunk.durationMinutes) || 0), 0)} minutes`), table];
  return documentBlob(body, false, true);
}

function studentActivity(chunk: LessonChunk) {
  const discussion = (chunk.discussionStarters || []).map((card) => card?.promptText).filter(Boolean);
  return [chunk.formativeTaskTitle, chunk.formativeTaskDetails, ...discussion].filter(Boolean).join('\n');
}

export async function downloadLessonPlanDocx(title: string, chunks: LessonChunk[]) {
  const file = await buildLessonPlanDocx(title, chunks);
  downloadFile(file, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', `${safeFilename(title)}-lesson-plan.docx`);
}

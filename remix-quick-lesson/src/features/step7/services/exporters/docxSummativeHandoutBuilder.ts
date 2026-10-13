import { SelectedSummativeTask } from '../../../../types';
import { downloadFile, safeFilename } from './downloadFile';
import { bullet, compactHeading, compactTitle, documentBlob, paragraph } from './docxUtils';

export async function downloadSummativeHandout(title: string, task: SelectedSummativeTask) {
  const doc = await documentBlob([
    compactTitle(task.title), paragraph(`${title} · ${task.formatLabel}`),
    compactHeading('Student task'), paragraph(task.description),
    compactHeading('Instructions'), paragraph(task.handoutPrompt),
    compactHeading('Assessment criteria'), ...(task.criteriaCodes.length ? task.criteriaCodes.map(bullet) : [paragraph('No criteria recorded.')]),
    compactHeading('Concepts to draw on'), ...(task.coveredConcepts.length ? task.coveredConcepts.map(bullet) : [paragraph('Use the concepts from your lesson notes.')]),
  ]);
  downloadFile(doc, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', `${safeFilename(title)}-summative-task.docx`);
}

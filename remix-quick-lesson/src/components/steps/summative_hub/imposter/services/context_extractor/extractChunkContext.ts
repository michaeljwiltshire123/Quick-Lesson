import { LessonChunk } from '../../../../../../types';

export interface ChunkPedagogyContext {
  chunkId: string;
  title: string;
  type: string;
  learningIntent: string;
  teacherModeling: string[]; // "I Do"
  studentTasks: string[];    // "You Do"
  mediaCfuPrompts: string[];
}

export function extractChunkContext(chunks: LessonChunk[] = []): ChunkPedagogyContext[] {
  return chunks.map((chunk) => {
    const teacherModeling: string[] = [];
    if (chunk.teacherScript?.trim()) teacherModeling.push(chunk.teacherScript.trim());
    if (chunk.coreExplanation?.trim()) teacherModeling.push(chunk.coreExplanation.trim());
    if (chunk.workedExample?.trim()) teacherModeling.push(chunk.workedExample.trim());
    if (chunk.theoryBullets?.trim()) teacherModeling.push(chunk.theoryBullets.trim());

    const studentTasks: string[] = [];
    if (chunk.formativeTaskTitle?.trim()) studentTasks.push(chunk.formativeTaskTitle.trim());
    if (chunk.formativeTaskDetails?.trim()) studentTasks.push(chunk.formativeTaskDetails.trim());
    if (chunk.stepByStep?.trim()) studentTasks.push(chunk.stepByStep.trim());

    const mediaCfuPrompts: string[] = [];
    if (chunk.attachments?.length) {
      chunk.attachments.forEach((att) => {
        if (att.cfuPrompt?.trim()) mediaCfuPrompts.push(`${att.name}: ${att.cfuPrompt.trim()}`);
      });
    }

    return {
      chunkId: chunk.id,
      title: chunk.title || 'Untitled Stage',
      type: chunk.type || 'teaching',
      learningIntent: chunk.learningIntent?.trim() || '',
      teacherModeling,
      studentTasks,
      mediaCfuPrompts,
    };
  });
}

import { LessonChunk } from '../../../../types';

export function createClassroomPost(title: string, chunks: LessonChunk[]) {
  const tasks = chunks.map((chunk) => chunk.formativeTaskTitle).filter(Boolean);
  const topics = chunks.map((chunk) => `• ${chunk.title}${chunk.learningIntent ? ` — ${chunk.learningIntent}` : ''}`);
  return { title: `${title}: lesson update`, body: [`Today's lesson: ${title}`, '', 'What we learned:', ...topics,
    tasks.length ? `\nPractice tasks:\n${tasks.map((task) => `• ${task}`).join('\n')}` : ''].filter(Boolean).join('\n') };
}

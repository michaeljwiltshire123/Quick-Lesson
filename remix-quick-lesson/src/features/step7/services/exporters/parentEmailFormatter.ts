import { LessonChunk } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';

export function formatParentEmail(title: string, subject: string, chunks: LessonChunk[], slides: SlideItem[]) {
  const objectives = slides.find((slide) => slide.archetype === 'aims_outcomes')?.elements.map((item) => item.content).filter(Boolean) || [];
  const goals = objectives.length ? objectives : chunks.map((chunk) => chunk.learningIntent).filter(Boolean) as string[];
  const homework = chunks.map((chunk) => [chunk.formativeTaskTitle, chunk.formativeTaskDetails].filter(Boolean).join(': ')).filter(Boolean);
  return [
    `Subject: ${title} — lesson summary`,
    '',
    `Hello,`,
    `In ${title}${subject ? ` (${subject})` : ''}, students explored:`,
    ...chunks.map((chunk) => `• ${chunk.title}: ${chunk.learningIntent || chunk.coreExplanation || ''}`),
    goals.length ? `\nLesson goals:\n${goals.map((goal) => `• ${goal}`).join('\n')}` : '',
    homework.length ? `\nPractice / homework:\n${homework.map((task) => `• ${task}`).join('\n')}` : '',
    '\nBest wishes',
  ].filter(Boolean).join('\n');
}

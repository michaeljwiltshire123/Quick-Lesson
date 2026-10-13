import { LessonChunk } from '../../../../types';
import { escapeHtml } from './fillInWorksheetGenerator';

export function emailDigest(title: string, chunks: LessonChunk[], lessonLink: string) {
  const subjects = chunks.map((chunk) => `• ${chunk.title}: ${chunk.learningIntent || chunk.coreExplanation || ''}`);
  const tasks = chunks.map((chunk) => chunk.formativeTaskTitle).filter(Boolean);
  const body = [`Lesson summary: ${title}`, '', ...subjects, '', `Homework / practice: ${tasks.join('; ') || 'No homework task was specified.'}`, '', `Resources: ${lessonLink}`].join('\n');
  return { body, mailto: `mailto:?subject=${encodeURIComponent(`${title} — lesson summary`)}&body=${encodeURIComponent(body)}` };
}

export function auditBrief(chunks: LessonChunk[], criteria: string[], brief = '') {
  const corpus = `${brief} ${chunks.map((c) => [c.title, c.learningIntent, c.coreExplanation, c.workedExample, c.formativeTaskDetails].join(' ')).join(' ')}`.toLowerCase();
  const checks = [...criteria, ...['P1', 'M1', 'D1'].filter((code) => new RegExp(`\\b${code}\\b`, 'i').test(brief))]
    .filter((value, index, all) => all.indexOf(value) === index);
  return checks.map((criterion) => ({ criterion, matched: corpus.includes(criterion.toLowerCase()) }));
}

export const auditHtml = (results: ReturnType<typeof auditBrief>) => `<h2>Brief & syllabus audit</h2><p>Text-match screening only; verify alignment with the source brief.</p><ul>${results.map((item) => `<li>${escapeHtml(item.criterion)}: ${item.matched ? 'Evidence found' : 'No matching slide text'}</li>`).join('')}</ul>`;

import { SlideItem } from '../../../step6/types/slideTypes';
import { LessonChunk } from '../../../../types';
import { escapeHtml } from './fillInWorksheetGenerator';

export function absentPackHtml(title: string, slides: SlideItem[], chunks: LessonChunk[]) {
  const vocabulary = chunks.flatMap((chunk) => (chunk.vocabulary || '').split(/[;\n]/).filter(Boolean));
  const practice = chunks.map((chunk) => [chunk.formativeTaskTitle, chunk.formativeTaskDetails].filter(Boolean).join(': ')).filter(Boolean);
  const pages = slides.map((slide) => `<article><h2>${escapeHtml(slide.title)}</h2>${slide.elements.map((el) => el.type === 'image'
    ? `<img src="${el.content}" alt="${escapeHtml(el.caption || '')}">` : `<p>${escapeHtml(el.content)}</p>`).join('')}</article>`);
  return `<!doctype html><meta charset="utf-8"><title>${escapeHtml(title)} Catch-up</title><style>body{font:16px Arial;max-width:850px;margin:auto}article{break-after:page}img{max-width:100%}@media print{button{display:none}}</style><h1>${escapeHtml(title)}: Catch-up Pack</h1>${pages.join('')}<h2>Vocabulary</h2><ul>${vocabulary.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ul><h2>Practice</h2><ol>${practice.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ol><button onclick="print()">Print / Save PDF</button>`;
}

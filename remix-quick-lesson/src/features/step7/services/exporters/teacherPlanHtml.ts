import { SlideItem } from '../../../step6/types/slideTypes';
import { escapeHtml } from './fillInWorksheetGenerator';

export function teacherPlanHtml(title: string, slides: SlideItem[]) {
  return `<!doctype html><meta charset="utf-8"><title>${escapeHtml(title)} Teacher Plan</title><style>body{font:15px Arial;max-width:850px;margin:2cm auto;color:#161616}section{break-inside:avoid;border-bottom:1px solid #777;padding:1em 0}small{font-weight:bold}</style><h1>${escapeHtml(title)} — Teacher Plan & Answer Key</h1>${slides.map((slide, index) => `<section><small>Slide ${index + 1} · ${slide.speakerNotes.timingMinutes} minutes</small><h2>${escapeHtml(slide.title)}</h2><p>${escapeHtml(slide.speakerNotes.teacherScript || '')}</p><p><b>Answer / retrieval:</b> ${escapeHtml(slide.speakerNotes.retrievalCues || slide.elements.map((e) => e.content).join(' '))}</p><p><b>Misconception:</b> ${escapeHtml(slide.speakerNotes.misconceptionsWarning || '')}</p></section>`).join('')}<button onclick="print()">Print / Save PDF</button>`;
}

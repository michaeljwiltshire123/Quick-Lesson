import { SlideItem } from '../../../step6/types/slideTypes';

export function worksheetHtml(title: string, slides: SlideItem[]) {
  const content = slides.flatMap((slide) => slide.elements
    .filter((element) => element.type === 'text' && element.content.trim())
    .map((element) => `<section><h2>${slide.title}</h2><p>${escapeHtml(element.content).replace(/\b([\w-]{5,})\b/g, '________')}</p></section>`));
  return `<!doctype html><html><meta charset="utf-8"><title>${escapeHtml(title)} worksheet</title>
  <style>body{font:16px Arial;max-width:800px;margin:2cm auto;color:#222}h1{border-bottom:2px solid}section{margin:24px 0;break-inside:avoid}p{line-height:2}@media print{button{display:none}}</style>
  <h1>${escapeHtml(title)} — Student Worksheet</h1><p>Name: ____________________ Date: __________</p>${content.join('')}<button onclick="print()">Print / Save PDF</button></html>`;
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char));

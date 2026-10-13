import PptxGenJS from 'pptxgenjs';
import { SlideElement } from '../../../step6/types/slideTypes';

const inch = (percent: number, total: number) => percent * total / 100;
const shapeMap: Record<string, PptxGenJS.ShapeType> = {
  circle: 'ellipse' as PptxGenJS.ShapeType, rounded: 'roundRect' as PptxGenJS.ShapeType,
  rectangle: 'rect' as PptxGenJS.ShapeType, diamond: 'diamond' as PptxGenJS.ShapeType, star: 'star5' as PptxGenJS.ShapeType,
};

export function writePptxElement(slide: PptxGenJS.Slide, element: SlideElement, slideIndex: Map<string, number> = new Map()) {
  const box = { x: inch(element.x, 13.333), y: inch(element.y, 7.5), w: inch(element.width, 13.333), h: inch(element.height, 7.5) };
  const aimsIndex = slideIndex.get('slide-aims-outcomes');
  if (element.type === 'image' && element.content.startsWith('data:image')) {
    slide.addImage({ data: element.content, ...box, hyperlink: hasLogoLink(element) && aimsIndex ? { slide: aimsIndex } : undefined });
  } else if (element.type === 'image' && /^https?:\/\//i.test(element.content)) {
    slide.addImage({ path: element.content, ...box, hyperlink: hasLogoLink(element) && aimsIndex ? { slide: aimsIndex } : undefined });
  } else if (element.type === 'table' && element.tableData) {
    const rows = [element.tableData.headers || [], ...element.tableData.rows].map((row) => row.map((text) => ({ text })));
    slide.addTable(rows, { ...box, border: { color: element.borderColor?.replace('#', '') || 'D6D3D1', pt: 1 } });
  } else if (element.type === 'shape') {
    slide.addShape(shapeMap[element.shapeType || 'rounded'] || 'rect' as PptxGenJS.ShapeType, {
      ...box, fill: { color: element.fillColor?.replace('#', '') || 'FFFFFF' },
      line: { color: element.borderColor?.replace('#', '') || 'FFFFFF', width: element.borderWidth || 0 },
    });
    if (element.content) slide.addText(element.content, {
      ...box, fontSize: element.textStyle?.fontSize || 22, color: element.textStyle?.color?.replace('#', '') || '292722',
      align: element.textStyle?.align || 'center', valign: 'middle', margin: 0.12,
    });
  } else {
    const content = element.type === 'video' || element.meta?.linkUrl
      ? `${element.caption || 'Open resource'}\n${element.content || element.meta.linkUrl}` : element.content;
    const link = safeLink(element.type === 'video' ? element.content : element.meta?.linkUrl);
    const clean = content.replace(/<[^>]*>/g, '');
    const lines = clean.split(/\r?\n/);
    const targets = element.meta?.outcomeTargets as string[] | undefined;
    const runs = targets ? lines.map((text, index) => ({
      text, options: { breakLine: index < lines.length - 1, hyperlink: slideIndex.get(targets[index]) ? { slide: slideIndex.get(targets[index]) } : undefined },
    })) : clean;
    slide.addText(runs, {
      ...box, fontSize: element.textStyle?.fontSize || 22, bold: element.textStyle?.bold,
      italic: element.textStyle?.italic, color: element.textStyle?.color?.replace('#', '') || '292722',
      underline: element.textStyle?.underline ? { style: 'sng' } : undefined, fontFace: element.textStyle?.fontFamily,
      align: element.textStyle?.align, hyperlink: link ? { url: link } : undefined,
      breakLine: false, valign: 'middle', margin: 0.12,
    });
  }

  function hasLogoLink(element: SlideElement) {
    return Boolean(element.meta?.isSchoolLogo || element.meta?.isSchoolCrest || element.meta?.isAimsReturnAnchor);
  }
}

function safeLink(value: unknown) {
  return typeof value === 'string' && /^https?:\/\//i.test(value) ? value : undefined;
}

import { Document, HeadingLevel, PageOrientation, Packer, Paragraph, TextRun } from 'docx';

export const paragraph = (text: string, options: { bold?: boolean; color?: string; size?: number } = {}) =>
  new Paragraph({ children: [new TextRun({ text, ...options })], spacing: { after: 100 } });

export const documentTitle = (text: string) => new Paragraph({
  text, heading: HeadingLevel.TITLE,
  spacing: { after: 160 },
});
export const compactTitle = (text: string) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 28, color: '2D2A26' })], spacing: { after: 80 },
});

export const heading = (text: string) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 24, color: '9A4B2A' })],
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 220, after: 100 },
  border: { bottom: { color: 'B85C38', style: 'single', size: 8, space: 4 } },
});
export const compactHeading = (text: string) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 19, color: '9A4B2A' })],
  heading: HeadingLevel.HEADING_1, spacing: { before: 90, after: 40 },
  border: { bottom: { color: 'B85C38', style: 'single', size: 6, space: 2 } },
});

export const bullet = (text: string) => new Paragraph({
  text, bullet: { level: 0 }, indent: { left: 300 }, spacing: { after: 60 },
});

export async function documentBlob(children: (Paragraph | import('docx').Table)[], compact = false, landscape = false) {
  const document = new Document({
    creator: 'Quick Lesson',
    styles: { default: { document: { run: { font: 'Aptos', size: compact ? 17 : 20, color: '2D2A26' }, paragraph: { spacing: { after: compact ? 20 : 80 } } } } },
    sections: [{ properties: { page: {
      size: landscape ? { width: 16838, height: 11906, orientation: PageOrientation.LANDSCAPE }
        : { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
      margin: { top: compact ? 360 : 720, right: 720, bottom: compact ? 360 : 720, left: 720 },
    } }, children }],
  });
  return Packer.toBlob(document);
}

import { CurvedTextType } from '../../../types/visualAidEffectTypes';

interface BannerOptions {
  text: string;
  curvedType: CurvedTextType;
  curvedDegree: number;
  verticalShift?: number;
  fontFamily?: string;
  color?: string;
  bold?: boolean;
}

export function generateCurvedBannerPng({
  text,
  curvedType,
  curvedDegree = 45,
  verticalShift = 0,
  fontFamily = 'Inter, system-ui, -apple-system, sans-serif',
  color = '#92400E',
  bold = true,
}: BannerOptions): string {
  const cleanHtml = (text || 'Banner Title').replace(/<br\s*[\/]?>/gi, '\n').replace(/<[^>]*>/g, '');
  const rawLines = cleanHtml.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean);
  const lines = rawLines.length > 0 ? rawLines : ['Banner Title'];
  const lineCount = lines.length;

  const deg = Math.max(15, Math.min(95, curvedDegree));
  const norm = (deg - 15) / 80; // 0.0 to 1.0

  const maxLen = Math.max(1, ...lines.map((l) => l.length));
  const fontSize = Math.max(22, Math.min(48, Math.floor(880 / Math.max(8, maxLen * 0.62))));
  const lineGap = Math.round(fontSize * 1.3);
  const insetX = Math.round(25 + norm * 50);

  const pathDefs = lines.map((_, i) => {
    let d = '';

    if (curvedType === 'arc-up') {
      // Anchored at bottom with safe top ceiling and vertical shift slider
      const lineBaseY = 300 + verticalShift - (lineCount - 1 - i) * lineGap;
      const lift = Math.round(25 + norm * 205);
      const linePeakY = Math.max(40, lineBaseY - lift);
      const ctrlY = 2 * linePeakY - lineBaseY;
      d = `M ${insetX},${lineBaseY} Q 500,${ctrlY} ${1000 - insetX},${lineBaseY}`;
    } else if (curvedType === 'arc-down') {
      // Anchored at top with safe bottom floor and vertical shift slider
      const lineTopY = 45 + verticalShift + i * lineGap;
      const drop = Math.round(25 + norm * 205);
      const lineBottomY = Math.min(320, lineTopY + drop);
      const ctrlY = 2 * lineBottomY - lineTopY;
      d = `M ${insetX},${lineTopY} Q 500,${ctrlY} ${1000 - insetX},${lineTopY}`;
    } else {
      // Wave: Centered around mid with vertical shift
      const totalH = (lineCount - 1) * lineGap;
      const wMid = (175 - totalH / 2) + i * lineGap + verticalShift;
      const waveAmp = Math.round(15 + norm * 70);
      d = `M ${insetX},${wMid} Q 280,${wMid - waveAmp} 500,${wMid} T ${1000 - insetX},${wMid}`;
    }

    return `<path id="p${i}" d="${d}" fill="none" />`;
  }).join('');

  const textNodes = lines.map((line, i) => {
    const safe = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return `<text fill="${color}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${bold ? 'bold' : '600'}" text-anchor="middle"><textPath href="#p${i}" xlink:href="#p${i}" startOffset="50%">${safe}</textPath></text>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 360" width="1000" height="360" preserveAspectRatio="none"><defs>${pathDefs}</defs>${textNodes}</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

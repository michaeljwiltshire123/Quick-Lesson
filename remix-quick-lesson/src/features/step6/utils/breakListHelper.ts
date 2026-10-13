import { SlideElement } from '../types/slideTypes';

export function canBreakElementIntoList(element?: SlideElement | null): boolean {
  if (!element || element.type !== 'text' || !element.content) return false;
  const raw = element.content.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>|<\/li>/gi, '\n').replace(/<[^>]*>/g, '');
  const lines = raw.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  return lines.length >= 2;
}

export function breakListIntoSeparateBoxes(element: SlideElement): SlideElement[] {
  if (!element || element.type !== 'text') return [element];

  const raw = (element.content || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>|<\/li>/gi, '\n')
    .replace(/<[^>]*>/g, '');

  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return [element];

  const count = lines.length;
  const startX = element.x ?? 10;
  const startY = Math.max(24, element.y ?? 24);
  const width = element.width ?? 80;
  const totalHeight = Math.min(65, Math.max(28, element.height ?? 50));
  const gap = 2.5;
  const itemHeight = Math.max(9, (totalHeight - (count - 1) * gap) / count);

  return lines.map((line, idx) => ({
    id: `el-split-${Date.now().toString(36)}-${idx}`,
    type: 'text' as const,
    x: startX,
    y: Math.min(88, startY + idx * (itemHeight + gap)),
    width,
    height: itemHeight,
    content: line,
    textStyle: element.textStyle ? { ...element.textStyle } : undefined,
    fillColor: element.fillColor || '#FFFFFF',
    borderColor: element.borderColor || '#E2E8F0',
    borderWidth: element.borderWidth ?? 1,
    borderRadius: element.borderRadius ?? 10,
    meta: {
      ...(element.meta || {}),
      animationStep: idx + 1,
      timelineEffects: undefined,
    },
  }));
}

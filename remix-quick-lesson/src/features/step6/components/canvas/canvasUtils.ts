import { SlideElement, CanvasAspectRatio, CanvasTheme } from '../../types/slideTypes';

export function calculateAutoFitFontSize(
  textLength: number,
  boxWidth: number,
  boxHeight: number
): number {
  if (textLength <= 0) return 18;
  if (boxHeight >= 20 && textLength < 35) return Math.min(36, Math.max(24, Math.round(boxHeight * 1.1)));
  if (boxHeight >= 15 && textLength < 60) return Math.min(26, Math.max(18, Math.round(boxHeight * 0.9)));
  if (textLength < 120) return Math.min(20, Math.max(14, Math.round(boxHeight * 0.6)));
  return Math.min(16, Math.max(12, Math.round(boxHeight * 0.4)));
}

export function reorderElementLayers(
  elements: SlideElement[],
  targetId: string,
  direction: 'front' | 'back'
): SlideElement[] {
  const index = elements.findIndex((el) => el.id === targetId);
  if (index === -1) return elements;

  const result = [...elements];
  const [target] = result.splice(index, 1);
  if (direction === 'front') {
    result.push(target);
  } else {
    result.unshift(target);
  }
  return result;
}

export function getAspectRatioStyle(ratio: CanvasAspectRatio): string {
  switch (ratio) {
    case '4:3':
      return 'aspect-[4/3] max-w-4xl';
    case 'A4':
      return 'aspect-[1/1.414] max-w-2xl';
    case '16:9':
    default:
      return 'aspect-[16/9] max-w-5xl';
  }
}

export function getCanvasPatternBackground(pattern?: string, isGrid?: boolean, isDark?: boolean): string {
  if (isGrid) {
    return isDark ? 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)' : 'radial-gradient(circle, rgba(168,162,158,0.25) 1px, transparent 1px)';
  }
  if (pattern === 'maths_grid') {
    return 'linear-gradient(rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.2) 1px, transparent 1px)';
  }
  if (pattern === 'dots') {
    return 'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)';
  }
  return 'none';
}

export interface ImageAdjustmentMeta {
  shadowStyle?: string;
  shadowDistance?: number;
  shadowBlur?: number;
  shadowOpacity?: number;
  shadowColor?: string;
  brightness?: number; // 50 to 150 (default 100)
  contrast?: number;   // 50 to 150 (default 100)
  saturation?: number; // 0 to 200 (default 100)
  imageRadius?: number; // 0, 8, 16, 999
  imageBorderWidth?: number; // 0, 1, 2, 4
  imageBorderColor?: string;
  isInvertedMask?: boolean;
}

export function computeImageDropShadow(meta?: Record<string, any>): string {
  if (!meta) return 'none';
  const style = meta.shadowStyle || 'none';
  if (style === 'none' && !meta.shadowBlur && !meta.shadowDistance) return 'none';

  const dist = meta.shadowDistance ?? (style === 'sharp' ? 6 : style === 'reflection' ? 14 : style === 'floating' ? 12 : style === 'glow' ? 0 : 6);
  const blur = meta.shadowBlur ?? (style === 'sharp' ? 0 : style === 'glow' ? 14 : style === 'reflection' ? 16 : style === 'floating' ? 20 : 10);
  const rawOpacity = (meta.shadowOpacity ?? (style === 'glow' ? 65 : style === 'floating' ? 45 : 30)) / 100;
  const col = meta.shadowColor || (style === 'glow' ? '#D97706' : '#1C1917');

  // Convert hex to rgba
  let rgba = `rgba(0, 0, 0, ${rawOpacity})`;
  if (col.startsWith('#') && col.length === 7) {
    const r = parseInt(col.slice(1, 3), 16);
    const g = parseInt(col.slice(3, 5), 16);
    const b = parseInt(col.slice(5, 7), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${rawOpacity})`;
  } else if (col.startsWith('rgb')) {
    rgba = col;
  }

  const x = style === 'sharp' ? dist : 0;
  const y = dist;
  return `drop-shadow(${x}px ${y}px ${blur}px ${rgba})`;
}

export function computeImageFilter(meta?: Record<string, any>): string {
  if (!meta) return 'none';
  const filters: string[] = [];
  if (meta.isInvertedMask) filters.push('invert(1) hue-rotate(180deg)');
  if (meta.brightness !== undefined && meta.brightness !== 100) filters.push(`brightness(${meta.brightness}%)`);
  if (meta.contrast !== undefined && meta.contrast !== 100) filters.push(`contrast(${meta.contrast}%)`);
  if (meta.saturation !== undefined && meta.saturation !== 100) filters.push(`saturate(${meta.saturation}%)`);
  return filters.length > 0 ? filters.join(' ') : 'none';
}

export function computeImageBorderRadius(meta?: Record<string, any>): number {
  if (!meta) return 0;
  if (meta.imageRadius !== undefined) return meta.imageRadius;
  return 0;
}

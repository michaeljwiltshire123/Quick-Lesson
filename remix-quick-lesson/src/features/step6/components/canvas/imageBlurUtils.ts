export type ImageBlurType =
  | 'none'
  | 'overall'
  | 'vignette'
  | 'feather'
  | 'tiltshift'
  | 'radial'
  | 'aspectFill'
  | 'surface'
  | 'lens'
  | 'motion';

export interface ImageBlurConfig {
  blurType?: ImageBlurType;
  blurAmount?: number;
}

export function computeBlurStyle(meta?: Record<string, any>): {
  filter?: string;
  maskImage?: string;
  WebkitMaskImage?: string;
} {
  if (!meta) return {};
  const type = (meta.blurType as ImageBlurType) || 'none';
  const amount = meta.blurAmount ?? 8;
  if (type === 'none' || amount <= 0) return {};

  switch (type) {
    case 'overall':
    case 'lens':
      return { filter: `blur(${amount}px)` };

    case 'surface':
      return {
        filter: `blur(${Math.min(2.5, amount / 4)}px) contrast(110%) brightness(102%)`,
      };

    case 'motion':
      return {
        filter: `blur(${amount}px)`,
      };

    case 'feather': {
      const mask = `radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 98%)`;
      return { maskImage: mask, WebkitMaskImage: mask };
    }

    default:
      return {};
  }
}

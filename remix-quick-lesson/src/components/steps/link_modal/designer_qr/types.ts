export type QrDotShape = 'rounded' | 'dots' | 'squares';

export interface QrDesignConfig {
  fgColor: string;
  bgColor: string;
  dotShape: QrDotShape;
  centerIcon: string;
  customIconBase64?: string;
  enabled: boolean;
}

export const DEFAULT_QR_CONFIG: QrDesignConfig = {
  fgColor: '#92400E',
  bgColor: '#FEF3C7',
  dotShape: 'rounded',
  centerIcon: '📚',
  enabled: false,
};

export interface ColorPreset {
  name: string;
  fg: string;
  bg: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Warm Amber', fg: '#92400E', bg: '#FEF3C7' },
  { name: 'Midnight Dark', fg: '#F8FAFC', bg: '#0F172A' },
  { name: 'Ocean Azure', fg: '#0369A1', bg: '#E0F2FE' },
  { name: 'Emerald Mint', fg: '#047857', bg: '#DCFCE7' },
  { name: 'Berry Rose', fg: '#BE123C', bg: '#FFE4E6' },
  { name: 'Royal Violet', fg: '#6D28D9', bg: '#F3E8FF' },
];

export const EMOJI_OPTIONS = ['', '📚', '🎯', '💡', '🎬', '🚀', '📝', '🔍', '⭐', '🧩'];

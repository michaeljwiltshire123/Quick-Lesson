/**
 * Visual Aid Text Effects & Curve Types
 * British English spelling throughout.
 */

export type CurvedTextType = 'none' | 'arc-up' | 'arc-down' | 'wave';

export type RibbonGradientId =
  | 'none'
  | 'union-jack'
  | 'gold-medal'
  | 'olympic'
  | 'royal-purple'
  | 'emerald'
  | 'custom';

export interface VisualAidTextStylePatch {
  curvedType?: CurvedTextType;
  curvedDegree?: number;
  curveRadius?: number;
  stickerOutline?: 'none' | 'white' | 'gold' | 'slate';
  is3DBlock?: boolean;
  ribbonGradient?: RibbonGradientId;
  customRibbonUrl?: string;
}

export interface DrawingPoint {
  x: number;
  y: number;
}

export interface DrawingStroke {
  id: string;
  points: DrawingPoint[];
  color: string;
  width: number;
  isHighlighter?: boolean;
}

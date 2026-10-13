/**
 * Slide & Media Layout Editor - Core Data Contracts
 * British English spelling and teacher-centric terminology.
 */

export type SlideElementType = 'text' | 'image' | 'video' | 'poll' | 'shape' | 'table';

export interface CanvasTheme {
  id: string;
  name: string;
  backgroundColor: string;
  cardColor: string;
  cardBorderColor?: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  isDyslexicFriendly?: boolean;
  lineHeight?: number;
  backgroundPattern?: string;
  transitionEffect?: string;
  pageExitEffect?: string;
  isRainbowHeader?: boolean;
}

export interface ElementTextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
  highlight?: string;
  fontSize?: number;
  listType?: 'none' | 'bullet' | 'number';
  textShadow?: boolean;
  neonGlow?: boolean;
  letterSpacing?: number;
  lineHeight?: number;
  casing?: 'normal' | 'uppercase' | 'lowercase' | 'capitalize';
  bulletIcon?: string;
  isRainbow?: boolean;
}

export interface SlideElement {
  id: string;
  type: SlideElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  caption?: string;
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: number;
  shapeType?: 'rectangle' | 'rounded' | 'circle' | 'callout' | 'arrow_right' | 'arrow_double' | 'sticky_note' | 'diamond' | 'star';
  textStyle?: ElementTextStyle;
  tableData?: { headers?: string[]; rows: string[][] };
  crop?: { top: number; right: number; bottom: number; left: number };
  meta?: Record<string, any>;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface SpeakerNotesData {
  teacherScript: string;
  dupeLine?: string;
  stepInstructions?: string;
  studySuggestions?: string[];
  zeroTechPlan?: string;
  pedagogicalTips: string[];
  timingMinutes: number;
  retrievalCues?: string;
  misconceptionsWarning?: string;
  glossary?: GlossaryItem[];
  furtherReading?: string[];
}

export type SlideArchetype = 'title' | 'aims_outcomes' | 'warmup' | 'chunk_teaching' | 'closing' | 'custom';
export type CanvasAspectRatio = '16:9' | '4:3' | 'A4';

export interface SlideItem {
  id: string;
  title: string;
  subtitle?: string;
  archetype: SlideArchetype;
  chunkId?: string;
  elements: SlideElement[];
  speakerNotes: SpeakerNotesData;
  theme?: Partial<CanvasTheme>;
  layoutPattern?: 'single_column' | 'split_two' | 'hero_media' | 'cards_grid';
  isDraft?: boolean;
  isHidden?: boolean;
}

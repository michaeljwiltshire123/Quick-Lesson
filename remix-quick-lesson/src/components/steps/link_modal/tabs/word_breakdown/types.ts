export type ClueType = 'rebus' | 'image' | 'riddle';
export type RebusStyle = 'phonetic' | 'conceptual';
export type WordStudioStep = 'ingestion' | 'studio';

export interface RootMorpheme {
  part: string;
  meaning: string;
  origin?: 'Greek' | 'Latin' | 'Old English' | 'French';
}

export interface WordBreakdownItem {
  id: string;
  term: string;
  phonetics: string;
  rootBreakdown: RootMorpheme[];
  puzzleType: ClueType;
  rebusStyle?: RebusStyle;
  emojiRebus: string;
  phoneticRebus?: string;
  phoneticHint?: string;
  conceptualRebus?: string;
  conceptualHint?: string;
  riddleClue: string;
  imagePrompt: string;
  imageUrl?: string;
  selected?: boolean;
}

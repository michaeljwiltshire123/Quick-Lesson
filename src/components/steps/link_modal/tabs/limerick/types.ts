export type PoetryStyle = 'limerick' | 'couplet' | 'ballad' | 'rap';

export interface LimerickItem {
  id: string;
  title: string;
  style: PoetryStyle;
  verses: string[];
  mnemonic?: string;
  takeawayGoal: string;
  selected?: boolean;
}

export interface LimerickFormState {
  concept: string;
  takeawayGoal: string;
  mnemonic: string;
  style: PoetryStyle;
}

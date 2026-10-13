export enum PollType {
  Single = 'single',
  Multi = 'multi',
  Likert = 'likert',
  Ranking = 'ranking',
  Open = 'open',
  Image = 'image',
  Wordcloud = 'wordcloud',
}

export interface PollOption {
  id: string;
  text: string;
  imageUrl?: string;
  isCorrect?: boolean;
}

export interface PollItem {
  id: string;
  question: string;
  pollType: PollType;
  options: PollOption[];
  timerSeconds: number | null;
  isAnonymous: boolean;
  isBlindVoting: boolean;
  enableConfidenceMeter: boolean;
  misconceptionExplainer: string;
}

export interface PollFormState {
  question: string;
  pollType: PollType;
  options: PollOption[];
  timerSeconds: number | null;
  isAnonymous: boolean;
  isBlindVoting: boolean;
  enableConfidenceMeter: boolean;
  misconceptionExplainer: string;
}

export interface PollSuggestion {
  id: string;
  question: string;
  pollType: PollType;
  options: string[];
  misconceptionExplainer: string;
}

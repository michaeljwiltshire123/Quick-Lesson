export type TeamColorKey = 'red' | 'blue' | 'emerald' | 'amber' | 'purple' | 'rose';

export interface TeamConfig {
  id: string;
  name: string;
  color: TeamColorKey;
  score: number;
  clueGiverPlayerId?: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  role: 'clue_giver' | 'guesser' | 'judge' | 'guessing_judge' | 'spectator';
  avatar?: string;
  score?: number;
}

export interface SecretWordCard {
  id: string;
  targetWord: string;
  studentBannedWords: string[];
  aiFallbackBannedWords: string[];
  activeBannedWords: string[];
  chunkIndex?: number;
  chunkTitle?: string;
  hint?: string;
  bloomsLevel?: 'Remember' | 'Understand' | 'Apply' | 'Analyse' | 'Evaluate';
  misconceptionRationale?: string;
  difficulty?: 'core' | 'stretch' | 'foundational';
}

export interface JudgeVoteState {
  isFoul: boolean;
  votesAgainst: number;
  totalJudges: number;
  timestamp: number;
  foulReason?: string;
}

export interface AdjudicationState {
  type: 'heard_the_word' | 'foul';
  triggeredByPlayerId: string;
  triggeredByName: string;
  votesFor: number;
  votesAgainst: number;
  totalJudges: number;
  frozenTimeLeft: number;
  frozenPoints: number;
  isActive: boolean;
}

export interface DontSayItRoomConfig {
  roomCode: string;
  lessonTitle: string;
  teamCount: number;
  teams: TeamConfig[];
  totalRounds: number;
  timeLimitSeconds: number;
  bannedWordsPerCard: number;
  allowAiFallback: boolean;
  isLive: boolean;
}

export interface DontSayItGameState {
  roomCode: string;
  lessonTitle: string;
  status: 'lobby' | 'in_game' | 'round_recap' | 'game_over';
  currentRound: number;
  totalRounds: number;
  currentTeamIndex: number;
  activeCardIndex: number;
  cards: SecretWordCard[];
  teams: TeamConfig[];
  players: Player[];
  config: DontSayItRoomConfig;
  timerSeconds: number;
  judgeVote?: JudgeVoteState;
  adjudication?: AdjudicationState;
}

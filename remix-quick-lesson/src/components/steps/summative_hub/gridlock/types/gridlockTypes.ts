export type TeamColor = 'red' | 'blue';
export type HexOwner = TeamColor | 'none';
export type TournamentFormat = 'best-of-3' | 'best-of-5' | 'best-of-7';
export type GamePhase = 'picking' | 'answering' | 'bounce' | 'scored';

export interface GridlockQuestion {
  id: string;
  letter: string;
  targetAnswer: string;
  prompt: string;
  backupPrompt?: string;
  acceptableAnswers: string[]; // up to 8 variants
  difficulty: 'easy' | 'medium' | 'hard';
  distinctionNote?: string; // gameshow teacher debrief / distinction tip
  bloomsLevel?: 'Remember' | 'Understand' | 'Apply' | 'Analyse' | 'Evaluate';
  chunkIndex?: number;
  chunkTitle?: string;
}

export interface HexTile {
  id: string;
  row: number; // 0 to 4
  col: number; // 0 to 4
  letter: string;
  owner: HexOwner;
  isGold: boolean;
  activeQuestion: GridlockQuestion;
  backupQuestions: GridlockQuestion[];
}

export interface Player {
  id: string;
  name: string;
  team: TeamColor;
  isBuzzed?: boolean;
  avatar?: string;
  score?: number;
}

export interface TournamentScore {
  redWins: number;
  blueWins: number;
  currentMatch: number;
  format: TournamentFormat;
}

export interface GridlockRoomConfig {
  roomCode: string;
  lessonTitle: string;
  tournamentFormat: TournamentFormat;
  goldHexCount: number;
  allowFuzzyMatching: boolean;
  isLive: boolean;
}

export interface GridlockGameState {
  roomCode: string;
  lessonTitle: string;
  status: 'lobby' | 'in_game' | 'round_over' | 'tournament_over';
  grid: HexTile[][];
  scores: TournamentScore;
  players: Player[];
  activeTileId: string | null;
  config: GridlockRoomConfig;
}

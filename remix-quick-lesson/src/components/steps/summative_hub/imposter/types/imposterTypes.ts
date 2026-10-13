export type ImposterRole = 'innocent' | 'imposter';

export type GhostBadge = 'spectator' | 'investigator' | 'sabotage_analyst' | 'ghost_writer';

export type ImposterAttackKey =
  | 'question_swap'
  | 'timed_panic'
  | 'vote_shadow'
  | 'echo_prompt';

export type ImposterQuestionType =
  | 'component_name_drop'
  | 'real_world_app'
  | 'analogy_link'
  | 'action_verb';

export interface ImposterQuestion {
  id: string;
  type: ImposterQuestionType;
  prompt: string;
  topicClue: string;
  forbiddenTerm?: string;
  contextHint?: string;
  chunkTitle?: string;
  correctAnswer?: string;
  imposterClue?: string;
}

export interface Player {
  id: string;
  name: string;
  role: ImposterRole;
  isAlive: boolean;
  score: number;
  completedTasks: number;
  badge?: GhostBadge;
  avatar?: string;
}

export interface ImposterAttack {
  id: string;
  type: 'lights_out' | 'comms_scramble' | 'oxygen_depletion' | 'speed_lock';
  name: string;
  durationSeconds: number;
  active: boolean;
  initiatedBy?: string;
}

export interface ImposterRoomConfig {
  imposterCount: 1 | 2 | 3;
  timerPreset: 30 | 60;
  offlinePrintable: boolean;
  roomCode: string;
  lessonTitle: string;
  estimatedPlayers?: number;
  roundsPerGame?: 2 | 3 | 4 | 5;
  targetGamesCount?: number;
}

export type ImposterGameStatus =
  | 'setup'
  | 'lobby'
  | 'playing'
  | 'discussion'
  | 'voting'
  | 'game_over';

export interface ImposterGameState {
  roomCode: string;
  status: ImposterGameStatus;
  config: ImposterRoomConfig;
  players: Player[];
  currentRound: number;
  activeAttacks: ImposterAttack[];
  createdAt: number;
  updatedAt: number;
}

export type QuestionFormat =
  | 'spot_the_lie'
  | 'order_steps'
  | 'target_tap'
  | 'speed_match'
  | 'odd_one_out'
  | 'binary_blitz'
  | 'reverse_instruction'
  | 'score_swap'
  | 'avatar_race'
  | 'draw_showdown'
  | 'wager_drop'
  | 'standard_mcq';

export type PotPatternId = 'static' | 'escalating' | 'jackpot_rush';

export interface TTSVoicePreset {
  voiceURI: string;
  name: string;
  lang: string;
  pitch: number;
  rate: number;
  volume: number;
  gender?: 'female' | 'male' | 'neutral';
}

export interface CompetitiveQuizConfig {
  roomCode: string;
  lessonTitle: string;
  mode: 'individual' | 'teams';
  teamCount: number;
  playerCountEstimate: number;
  totalRounds: number;
  speedLimitSeconds: number;
  potPatternId: PotPatternId;
  voicePreset: TTSVoicePreset;
  allowPowerUps: boolean;
  gyroStealingEnabled: boolean;
  selectedFormats: QuestionFormat[];
}

export interface QuestionCard {
  id: string;
  format: QuestionFormat;
  formatLabel: string;
  prompt: string;
  options?: string[];
  correctIndex?: number;
  correctOrder?: string[];
  targetZone?: { label: string; x: number; y: number };
  matchedPairs?: { left: string; right: string }[];
  binaryAnswer?: boolean;
  explanation: string;
  speedLimitSeconds: number;
  potValue: number;
  accumulatedPot?: number;
  patternId?: 'true_gold_honeycomb' | 'decoy_stripes' | 'decoy_waves' | 'decoy_crosshatch' | 'decoy_dots' | 'decoy_zigzag';
  conceptCovered: string;
  difficulty: 'starter' | 'core' | 'stretch';
}

export type PowerUpType = 'shield' | 'freeze_attack' | 'double_down' | 'peek_decoy' | 'time_warp';

export interface PowerUpItem {
  id: string;
  type: PowerUpType;
  name: string;
  description: string;
  durationSeconds: number;
  iconName: string;
}

export interface DecoyViolation {
  playerId: string;
  playerName: string;
  reason: string;
  penaltyPoints: number;
  timestamp: number;
}

export interface PlayerState {
  id: string;
  name: string;
  teamId?: string;
  score: number;
  streak: number;
  shields: number;
  activePowerUps: PowerUpItem[];
  phoneGyroOrientation: {
    beta: number;
    gamma: number;
    isStealingReady: boolean;
  };
  isEliminated: boolean;
  lastAnswerTimestamp?: number;
}

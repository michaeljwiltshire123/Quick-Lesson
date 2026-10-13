import { SabotageType } from '../typesEscape';

export type ActiveSabotageEffect = SabotageType;

export interface TeamProgress {
  id: string;
  name: string;
  colorHex: string;
  currentLockNumber: number; // 1 to 4; 5 means escaped
  solvedLockIds: string[];
  hasEscaped: boolean;
  escapedTimeSeconds?: number;
  activeHindrance?: {
    type: ActiveSabotageEffect;
    sourceTeamName: string;
    expiresAtSeconds: number;
  };
}

export interface SabotageEvent {
  id: string;
  timestamp: string;
  attackerTeamName: string;
  targetTeamName: string;
  effect: ActiveSabotageEffect;
  description: string;
}

export interface LiveEscapeRoomState {
  timeRemainingSeconds: number;
  isPaused: boolean;
  isGameOver: boolean;
  cluesRevealed: boolean;
  teams: TeamProgress[];
  activityFeed: SabotageEvent[];
}

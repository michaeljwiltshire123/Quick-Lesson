export type LifelineType = 'ask_player' | 'ask_room' | 'fifty_fifty' | 'safety_shield' | 'question_swap' | 'time_extension' | 'hint_card' | 'double_points';
export type LadderSkin = 'film_tower' | 'lab_rack' | 'temple_steps';

export interface SafetyNetConfig {
  rungIndex: number;
  pointsGuaranteed: number;
}

export interface LadderRungQuestion {
  id: string;
  rungNumber: number;
  pointValue: number;
  presenterIntro?: string;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
  explanation: string;
  timerSeconds: number;
  isSafetyNet?: boolean;
}

export interface LadderQuizConfig {
  title: string;
  totalRungs: number;
  skin: LadderSkin;
  activeLifelines: LifelineType[];
  maxStudentLifelines?: number;
  safetyNets: number[];
  rungs: LadderRungQuestion[];
}

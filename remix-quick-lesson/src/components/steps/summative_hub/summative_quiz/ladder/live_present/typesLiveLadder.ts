export interface ClimberProgress {
  id: string;
  name: string;
  avatar: string;
  currentRung: number;
  score: number;
  shieldActive: boolean;
  eliminated: boolean;
  status: 'climbing' | 'banked' | 'eliminated';
}

export interface QuestionSwapQueue {
  pending: boolean;
  sourceRung: number;
  newPrompt: string;
  newChoices: string[];
  newCorrectIndex: number;
}

export interface FallDiagnosticReport {
  timestamp: string;
  cohort: string;
  failedRung: number;
  misconceptionNotes: string;
  recommendedIntervention: string;
}

export interface LiveLadderState {
  currentRungIndex: number;
  timerSeconds: number;
  isPaused: boolean;
  climbers: ClimberProgress[];
  swapQueue: QuestionSwapQueue | null;
  diagnosticReport: FallDiagnosticReport | null;
}

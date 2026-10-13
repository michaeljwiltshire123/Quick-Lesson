export type QuizViewMode = 'edit' | 'live' | 'summary';
export type DurationPreset = '5m' | '10m' | '15m' | '20m' | 'custom';

export interface SummativeQuizQuestion {
  id: string;
  questionNumber: number;
  prompt: string;
  choices: string[];
  correctChoiceIndex: number;
  explanation: string;
  chunkIndex?: number;
  chunkTitle?: string;
  learningIntent?: string;
}

export interface ClassCohortResult {
  className: string;
  averageScorePercent: number;
  totalSubmissions: number;
  topMisconception: string;
  archivedAt: string;
}

export interface QuizSummaryReport {
  quizTitle: string;
  className: string;
  averageScore: number;
  submissionsCount: number;
  misconceptionHotspots: string[];
  supportAlerts: string[];
  rigorChecks: string;
}

export interface QuizSessionConfig {
  quizTitle: string;
  durationPreset: DurationPreset;
  questionCount: number;
  timeLimitMinutes: number;
  currentCohortTag: string;
  questions: SummativeQuizQuestion[];
  cohortHistory: ClassCohortResult[];
}

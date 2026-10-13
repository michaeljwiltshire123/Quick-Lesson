import { QuestionFormat } from '../types/competitiveQuizTypes';

export interface ConceptAccuracyRecord {
  topic: string;
  format: QuestionFormat;
  formatLabel: string;
  totalAttempts: number;
  correctCount: number;
  accuracyPercentage: number;
}

export interface FlaggedPupilRecord {
  pupilId: string;
  pupilName: string;
  accuracyPercentage: number;
  struggleConcept: string;
  suggestedAction: string;
}

export interface QuizDiagnosticReport {
  lessonTitle: string;
  classAverageAccuracy: number;
  totalPupils: number;
  totalQuestions: number;
  concepts: ConceptAccuracyRecord[];
  flaggedPupils: FlaggedPupilRecord[];
  recommendedFollowUpChunks: string[];
}

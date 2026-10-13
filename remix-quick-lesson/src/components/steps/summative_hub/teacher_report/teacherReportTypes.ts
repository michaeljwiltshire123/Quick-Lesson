export type TeacherReportTab = 'overview' | 'pupils' | 'send' | 'ofsted' | 'bespoke';

export interface PupilAuditRecord {
  id: string;
  name: string;
  scorePercentage: number;
  timeSeconds: number;
  unTimedAccuracy?: number;
  misconceptions: string[];
  interventionTag: 'Immediate Reteach' | 'Fluency Consolidation' | 'Secure Mastery';
  courseworkDefenseNote: string;
  sendFlag?: string;
  extraTimeJustified?: boolean;
}

export interface ClassPsychometrics {
  meanScore: number;
  medianScore: number;
  highestScore: number;
  lowestScore: number;
  completionRate: number;
  averageTimeSeconds: number;
  bellCurve: { range: string; count: number; percentage: number }[];
  mostMissedTopic: string;
  mostMissedRate: number;
}

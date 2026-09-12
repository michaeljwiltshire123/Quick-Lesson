/**
 * Core Wizard Step Navigation Types & Curriculum Module Schemes
 */

export type WizardStepKey = 'intro' | 'parameters' | 'chunks_workspace';

export interface ChunkAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'link' | 'video' | 'quiz';
  url?: string;
  fileBase64?: string;
  microThumbnail?: string;
  platform?: 'youtube' | 'google_drive' | 'kahoot' | 'google_forms' | 'h5p' | 'canva' | 'google_slides' | 'other';
  startTime?: string;
  endTime?: string;
  pauseCue?: string;
  cfuPrompt?: string;
  udlPathway?: 'visual' | 'auditory' | 'tactile' | 'all';
  sharingMode?: 'standard' | 'copy' | 'template';
  questSteps?: string[];
  qrDesign?: { fgColor?: string; bgColor?: string; dotShape?: 'rounded' | 'dots' | 'squares'; centerIcon?: string; customIconBase64?: string; enabled?: boolean };
}

export interface LessonChunk {
  id: string;
  type: 'warmup' | 'teaching' | 'closing';
  title: string;
  durationMinutes: number;
  learningIntent?: string;
  teacherScript?: string;
  classroomNotes?: string;
  attachments?: ChunkAttachment[];
  isDraft?: boolean;
  vocabulary?: string;
  vocabularyTags?: string;
  coreExplanation?: string;
  theoryBullets?: string;
  workedExample?: string;
  furtherReading?: string;
  researchTips?: string;
  stepByStep?: string;
  retrievalCues?: string;
  realWorldContext?: string;
  pitfalls?: string;
  plusOneScaffolds?: string;
  formativeTaskTitle?: string;
  formativeTaskDetails?: string;
  formativeTaskBadge?: string;
  formativeTaskGrouping?: string;
  metaphor?: string;
  metaphorBadge?: string;
  lociAttached?: boolean;
  lociRouteName?: string;
}

export interface WeeklyMilestone {
  weekNumber: number;
  phaseName: string;
  weeklyGoal: string;
  suggestedDailyTopics: string[];
}

export interface ModuleScheme {
  courseTitle: string;
  unitName: string;
  planningWeek: number;
  unitDurationWeeks: number;
  vocationalScenario: string;
  deliverables: string[];
  assessedCriteria: string[];
  hasBrief: boolean;
  weeklyMilestones?: WeeklyMilestone[];
}

export const DEFAULT_MODULE_SCHEME: ModuleScheme = {
  courseTitle: '',
  unitName: '',
  planningWeek: 1,
  unitDurationWeeks: 1,
  vocationalScenario: '',
  deliverables: [],
  assessedCriteria: [],
  hasBrief: false,
  weeklyMilestones: [],
};

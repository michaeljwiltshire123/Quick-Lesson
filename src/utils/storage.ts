import { WizardStepKey, ModuleScheme, LessonChunk } from '../types';

export const STORAGE_KEY = 'quick_lesson_planner_state_v1';
export { SAVED_BRIEFS_KEY, cacheSavedBrief } from './savedBriefStorage';
export interface SavedBriefRecord { id: string; name: string; title: string; subject: string; unitDurationWeeks: number; dateSaved: string; cleanContent?: string; parsed: any; }

export const EMPTY_MODULE_SCHEME: ModuleScheme = {
  courseTitle: '', unitName: '', planningWeek: 1, unitDurationWeeks: 1, vocationalScenario: '', deliverables: [], assessedCriteria: [], hasBrief: false, weeklyMilestones: [],
};

export interface AppStateData {
  currentStepKey: WizardStepKey; isWizardActive: boolean;
  moduleBriefFile: { name: string; content: string; fileBase64?: string; mimeType?: string } | null;
  rawNotes: string; videoLinks: string[]; draftFile: { name: string; content: string; fileBase64?: string; mimeType?: string } | null;
  themeNotes: string; lessonTitle: string; subject: string; gradeLevel: string;
  lessonDuration: number; learningObjectives: string[]; moduleScheme: ModuleScheme;
  chunks: LessonChunk[];
}

export const DEFAULT_APP_STATE: AppStateData = {
  currentStepKey: 'intro', isWizardActive: false, moduleBriefFile: null, rawNotes: '', videoLinks: [], draftFile: null,
  themeNotes: '', lessonTitle: '', subject: '', gradeLevel: 'Key Stage 3 (Years 7-9)', lessonDuration: 60, learningObjectives: [], moduleScheme: EMPTY_MODULE_SCHEME,
  chunks: [],
};

export const loadStoredState = (): AppStateData => {
  if (typeof window === 'undefined') return DEFAULT_APP_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APP_STATE;
    const p = JSON.parse(raw);
    return {
      ...DEFAULT_APP_STATE, ...p, moduleScheme: { ...EMPTY_MODULE_SCHEME, ...(p.moduleScheme || {}) },
      learningObjectives: Array.isArray(p.learningObjectives) ? p.learningObjectives : [],
      chunks: Array.isArray(p.chunks) ? p.chunks : [],
      lessonDuration: Math.max(1, Number(p.lessonDuration) || 60),
    };
  } catch { return DEFAULT_APP_STATE; }
};

export const saveStateToStorage = (state: AppStateData): void => {
  if (typeof window === 'undefined') return;
  try {
    const cleanedChunks = (state.chunks || []).map((chunk) => ({
      ...chunk,
      attachments: (chunk.attachments || []).map((att) => ({ ...att, fileBase64: undefined })),
    }));
    const cleanedState = {
      ...state,
      moduleBriefFile: state.moduleBriefFile ? { ...state.moduleBriefFile, fileBase64: undefined } : null,
      draftFile: state.draftFile ? { ...state.draftFile, fileBase64: undefined } : null,
      chunks: cleanedChunks,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedState));
  } catch {}
};

export const clearStoredState = (): void => { if (typeof window !== 'undefined') { try { window.localStorage.removeItem(STORAGE_KEY); } catch {} } };

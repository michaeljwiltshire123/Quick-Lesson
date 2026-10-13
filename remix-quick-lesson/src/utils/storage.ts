import { WizardStepKey, ModuleScheme, LessonChunk, SelectedSummativeTask } from '../types';

export const STORAGE_KEY = 'quick_lesson_planner_session_state_v1';
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
  summativeTask?: SelectedSummativeTask;
}

export const DEFAULT_APP_STATE: AppStateData = {
  currentStepKey: 'intro', isWizardActive: false, moduleBriefFile: null, rawNotes: '', videoLinks: [], draftFile: null,
  themeNotes: '', lessonTitle: '', subject: '', gradeLevel: '', lessonDuration: 60, learningObjectives: [], moduleScheme: EMPTY_MODULE_SCHEME,
  chunks: [],
};

export const normalizeStepKey = (key: any): WizardStepKey => {
  if (key === 'hook_vocab' || key === 'hook_vocabulary') return 'discussion_starters';
  return key || 'intro';
};

export const loadStoredState = (): AppStateData => {
  if (typeof window === 'undefined') return DEFAULT_APP_STATE;
  try {
    // Migration: clear any legacy heavy localStorage entries to free browser memory
    window.localStorage.removeItem('quick_lesson_planner_state_v1');
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APP_STATE;
    const p = JSON.parse(raw);
    return {
      ...DEFAULT_APP_STATE, ...p,
      currentStepKey: normalizeStepKey(p.currentStepKey),
      moduleScheme: { ...EMPTY_MODULE_SCHEME, ...(p.moduleScheme || {}) },
      learningObjectives: Array.isArray(p.learningObjectives) ? p.learningObjectives : [],
      chunks: Array.isArray(p.chunks) ? p.chunks : [],
      lessonDuration: Math.max(1, Number(p.lessonDuration) || 60),
    };
  } catch { return DEFAULT_APP_STATE; }
};

export const saveStateToStorage = (state: AppStateData): void => {
  if (typeof window === 'undefined') return;
  try {
    // Intelligent Compaction: Strip out raw heavy payloads, base64 files, and raw upload strings
    const compactedChunks = (state.chunks || []).map((chunk) => ({
      ...chunk,
      attachments: (chunk.attachments || []).map((att) => ({ ...att, fileBase64: undefined })),
    }));
    const cleanState = {
      ...state,
      currentStepKey: normalizeStepKey(state.currentStepKey),
      chunks: compactedChunks,
      draftFile: state.draftFile ? { name: state.draftFile.name, content: '' } : null,
      moduleBriefFile: state.moduleBriefFile ? { name: state.moduleBriefFile.name, content: '' } : null,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
  } catch {}
};

export const clearStoredState = (): void => {
  if (typeof window === 'undefined') return;
  try { window.sessionStorage.removeItem(STORAGE_KEY); } catch {}
};

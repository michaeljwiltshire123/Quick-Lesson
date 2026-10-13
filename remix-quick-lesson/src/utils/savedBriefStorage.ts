import { SavedBriefRecord } from './storage';

export const SAVED_BRIEFS_KEY = 'ai_lesson_engine_saved_briefs';

export const cacheSavedBrief = (name: string, data: any, rawContent?: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(SAVED_BRIEFS_KEY);
    const list: SavedBriefRecord[] = raw ? JSON.parse(raw) : [];
    const dateSaved = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const safeWeeks = Math.max(1, Number(data?.unitDurationWeeks) || 1);
    const entry: SavedBriefRecord = {
      id: `brief_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: name || 'Syllabus Brief',
      title: data?.unitName || data?.courseTitle || data?.assignmentTitle || name || 'Curriculum Syllabus',
      subject: data?.subject || 'General Subject', unitDurationWeeks: safeWeeks, dateSaved,
      cleanContent: typeof rawContent === 'string' ? rawContent.slice(0, 500) : '',
      parsed: { ...data, unitDurationWeeks: safeWeeks },
    };
    const updated = [entry, ...list.filter((x) => x.name !== name && x.title !== entry.title)].slice(0, 8);
    window.localStorage.setItem(SAVED_BRIEFS_KEY, JSON.stringify(updated));
  } catch (e) { console.warn('Failed to cache brief', e); }
};

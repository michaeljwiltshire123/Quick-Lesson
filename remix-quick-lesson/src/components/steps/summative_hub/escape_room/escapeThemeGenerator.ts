import { EscapeRoomConfig, ThemePreset, PuzzleLock } from './typesEscape';
import { LessonChunk, ModuleScheme } from '../../../../types';
import { getDefaultEscapeConfig } from './escapeDefaults';

export { getDefaultEscapeConfig };

export async function fetchAiEscapeRoom(
  theme: ThemePreset, lessonTitle: string, chunks: LessonChunk[], moduleScheme?: ModuleScheme, subject?: string, gradeLevel?: string,
): Promise<EscapeRoomConfig> {
  const fallback = getDefaultEscapeConfig(theme, lessonTitle);
  try {
    const res = await fetch('/api/generate-lesson-section', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'escape_room', lessonTitle, subject, gradeLevel, themePreset: theme, chunks }),
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    if (!data?.narrativeBrief || !Array.isArray(data?.locks) || data.locks.length < 4) return fallback;
    return {
      themePreset: theme,
      customThemeTitle: data.customThemeTitle || fallback.customThemeTitle,
      narrativeBrief: data.narrativeBrief,
      batchSubmission: false,
      antiCheat: { tabFocusDetection: true, cooldownSeconds20: true, jigsawDeviceLock: false },
      locks: data.locks.slice(0, 4).map((l: PuzzleLock, idx: number) => ({
        ...l, lockNumber: idx + 1,
        solutionCode: String(l.solutionCode || 'ALPHA').replace(/^[0-9]+$/, 'KEYWORD').toUpperCase(),
      })),
    };
  } catch { return fallback; }
}

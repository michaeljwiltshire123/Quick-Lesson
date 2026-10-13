import { AppStateData, cacheSavedBrief, EMPTY_MODULE_SCHEME } from './storage';

export async function requestParsedModuleBrief(
  name: string, content: string,
  onSuccess: (updatedState: Partial<AppStateData>) => void, fileBase64?: string, mimeType?: string
) {
  onSuccess({ moduleBriefFile: { name, content, fileBase64, mimeType } as any, subject: '', gradeLevel: '', moduleScheme: { ...EMPTY_MODULE_SCHEME, hasBrief: true } });
  try {
    const res = await fetch('/api/parse-module-brief', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: name, content, fileBase64, mimeType }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    const safeDuration = Math.max(1, Number(data.unitDurationWeeks) || 1);
    const rawGrade = (data.gradeLevel || data.grade_level || data.level || '').toString().trim();
    let detectedGrade = !rawGrade || /^(null|undefined|n\/a|unspecified|none)$/i.test(rawGrade) ? '' : rawGrade;
    onSuccess({
      lessonTitle: '',
      subject: data.subject?.trim() || '', gradeLevel: detectedGrade,
      moduleBriefFile: { name, content: data.rawText || content || '', mimeType } as any,
      moduleScheme: {
        hasBrief: true, courseTitle: data.courseTitle || '', unitName: data.unitName || '',
        vocationalScenario: data.vocationalScenario || '', planningWeek: safeDuration, unitDurationWeeks: safeDuration,
        deliverables: Array.isArray(data.deliverables) ? data.deliverables : [],
        assessedCriteria: Array.isArray(data.assessedCriteria) ? data.assessedCriteria : [],
        weeklyMilestones: Array.isArray(data.weeklyMilestones) ? data.weeklyMilestones : [],
      },
    });
    cacheSavedBrief(name, data, data.rawText || content);
    return true;
  } catch (err) {
    console.error('AI brief parse error:', err);
    return false;
  }
}

export async function requestReparseBrief(
  file: { name: string; content: string; fileBase64?: string; mimeType?: string }, currentCriteria: string[]
): Promise<string[]> {
  try {
    const res = await fetch('/api/reparse-brief-section', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, content: file.content, fileBase64: file.fileBase64, mimeType: file.mimeType, currentCriteria }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.assessedCriteria)) return data.assessedCriteria.filter((c: any) => typeof c === 'string' && c.trim().length > 0);
    }
  } catch (err) { console.error('Look Again reparse error:', err); }
  return [];
}

import { ModuleScheme } from '../../types';
import { ProgressionItem } from './progressionData';

const verbs = ['Explain', 'Compare', 'Apply', 'Analyse', 'Evaluate', 'Design', 'Justify', 'Review'];

export function buildBriefProgressions(
  title: string, subject: string, objectives: string[], scheme: ModuleScheme,
): ProgressionItem[] {
  const anchors = [...objectives, ...scheme.assessedCriteria, ...scheme.deliverables, scheme.unitName, title]
    .map((value) => value.trim()).filter(Boolean);
  const unique = [...new Set(anchors)];
  return unique.flatMap((anchor, index) => verbs.map((verb) => ({
    id: `${index}-${verb}-${anchor}`, label: `${verb} ${anchor}`,
    tooltip: `Focus derived from ${scheme.assessedCriteria.includes(anchor) ? 'unit criterion' : 'lesson or unit brief'}${subject ? ` for ${subject}` : ''}.`,
    category: scheme.assessedCriteria.includes(anchor) ? 'Unit criterion' : 'Lesson focus',
  }))).slice(0, 20);
}

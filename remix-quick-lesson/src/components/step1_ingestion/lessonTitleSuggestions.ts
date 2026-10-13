import { ModuleScheme } from '../../types';

export function suggestLessonTitles(scheme: ModuleScheme): string[] {
  const unit = scheme.unitName || scheme.courseTitle;
  const criteria = scheme.assessedCriteria.map((item) => `Apply ${item}`);
  const deliverables = scheme.deliverables.map((item) => `Create ${item}`);
  const candidates = [...criteria, ...deliverables].map((item) => item.trim()).filter(Boolean);
  const titles = candidates.map((item) => unit ? `${item} in ${unit}` : item);
  return [...new Set(titles)].slice(0, 5);
}

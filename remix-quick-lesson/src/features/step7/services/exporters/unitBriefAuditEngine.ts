import { ModuleScheme } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';
import { SAVED_BRIEFS_KEY } from '../../../../utils/savedBriefStorage';
import { SavedBriefRecord } from '../../../../utils/storage';

export interface BriefAuditResult { criterion: string; code: string; coveredBy: string[] }
export function savedBriefRecords(): SavedBriefRecord[] {
  if (typeof window === 'undefined') return [];
  try { const data: unknown = JSON.parse(localStorage.getItem(SAVED_BRIEFS_KEY) || '[]'); return Array.isArray(data) ? data as SavedBriefRecord[] : []; }
  catch (error) { console.error('Could not read saved unit brief criteria.', error); return []; }
}

export function auditUnitBrief(slides: SlideItem[], scheme: ModuleScheme, briefText: string, records = savedBriefRecords()) {
  const saved = records.find((record) => record.parsed?.unitName === scheme.unitName) || records[0];
  const parsed = saved?.parsed || {};
  const criteria = strings(parsed.assessedCriteria || parsed.assessmentCriteria)
    .concat(strings(scheme.assessedCriteria));
  const deliverables = strings(parsed.deliverables).concat(strings(scheme.deliverables));
  const descriptions = unique([...criteria, ...deliverables]);
  const allText = `${briefText} ${saved?.cleanContent || ''} ${parsed.rawText || ''}`;
  return unique(descriptions).map((criterion) => {
    const code = criterion.match(/\b(?:P|M|D)\d+\b/i)?.[0]?.toUpperCase() || '';
    const coveredBy = slides.filter((slide) => matches(criterion, slideText(slide))).map((slide) => slide.title);
    return { criterion, code, coveredBy };
  }).concat(uncoveredRequiredCodes(criteria, slides, allText));
}

function slideText(slide: SlideItem) {
  return `${slide.title} ${slide.subtitle || ''} ${slide.elements.map((element) => element.content).join(' ')} ${slide.speakerNotes.teacherScript}`;
}
function matches(criterion: string, content: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const target = normalize(criterion.replace(/\b(?:P|M|D)\d+\b/i, ''));
  if (!target) return false;
  const source = normalize(content);
  if (source.includes(target)) return true;
  const words = target.split(' ').filter((word) => word.length > 3 && !['with', 'from', 'that', 'this', 'students', 'understand'].includes(word));
  return words.length > 1 && words.filter((word) => source.includes(word)).length >= Math.ceil(words.length * 0.65);
}
function uncoveredRequiredCodes(criteria: string[], slides: SlideItem[], brief: string) {
  return ['P1', 'M1', 'D1'].filter((code) => new RegExp(`\\b${code}\\b`, 'i').test(brief) && !criteria.some((item) => new RegExp(`\\b${code}\\b`, 'i').test(item)))
    .map((code) => ({ criterion: code, code, coveredBy: slides.filter((slide) => matches(code, slideText(slide))).map((slide) => slide.title) }));
}
const strings = (values: unknown) => Array.isArray(values) ? values.filter((value): value is string => typeof value === 'string' && !!value.trim()) : [];
const unique = <T,>(items: T[]) => items.filter((item, index) => items.indexOf(item) === index);

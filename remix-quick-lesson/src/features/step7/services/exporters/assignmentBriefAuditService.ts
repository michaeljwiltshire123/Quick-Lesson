import { LessonChunk, ModuleScheme } from '../../../../types';
import { auditBrief } from './parentTeacherEmailDigest';

export function runAssignmentBriefAudit(chunks: LessonChunk[], scheme: ModuleScheme, briefText: string) {
  const criteria = [...scheme.assessedCriteria, ...scheme.deliverables];
  const exactEvidence = auditBrief(chunks, criteria, briefText);
  const codes = ['P1', 'M1', 'D1'].map((code) => ({
    criterion: code,
    matched: new RegExp(`\\b${code}\\b`, 'i').test(briefText) && exactEvidence.some((item) =>
      item.matched && new RegExp(`\\b${code}\\b`, 'i').test(item.criterion)),
  }));
  return [...exactEvidence, ...codes.filter((code) => !exactEvidence.some((item) => item.criterion === code.criterion))];
}

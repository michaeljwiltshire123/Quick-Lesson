import { LessonChunk } from '../../../../../../types';

export interface DiagnosticContext {
  realWorldApplications: string[];
  pitfallsAndTraps: string[];
  researchTips: string[];
  scaffolds: string[];
}

export function extractDiagnosticContext(chunks: LessonChunk[] = []): DiagnosticContext {
  const realWorldApplications: string[] = [];
  const pitfallsAndTraps: string[] = [];
  const researchTips: string[] = [];
  const scaffolds: string[] = [];

  chunks.forEach((chunk) => {
    if (chunk.realWorldContext?.trim()) {
      realWorldApplications.push(chunk.realWorldContext.trim());
    }
    if (chunk.pitfalls?.trim()) {
      pitfallsAndTraps.push(chunk.pitfalls.trim());
    }
    if (chunk.researchTips?.trim()) {
      researchTips.push(chunk.researchTips.trim());
    }
    if (chunk.plusOneScaffolds?.trim()) {
      scaffolds.push(chunk.plusOneScaffolds.trim());
    }
  });

  return {
    realWorldApplications,
    pitfallsAndTraps,
    researchTips,
    scaffolds,
  };
}

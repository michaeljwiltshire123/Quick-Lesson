import { LessonChunk } from '../../../../../types';
import { cleanTargetTerm } from './phraseSanitizer';

export function extractCandidatesFromLesson(
  lessonTitle: string,
  chunks: LessonChunk[] = []
): string[] {
  const candidates: string[] = [];

  const addCandidate = (raw: string | undefined) => {
    if (!raw) return;
    const cleaned = cleanTargetTerm(raw);
    if (cleaned && !candidates.includes(cleaned)) {
      candidates.push(cleaned);
    }
  };

  // 1. Lesson Title
  addCandidate(lessonTitle);

  // 2. Chunks Titles and Learning Intents
  chunks.forEach((chunk) => {
    addCandidate(chunk.title);
    addCandidate(chunk.learningIntent);

    // Extract bold terms or defined concepts e.g. **Term** or "Term:"
    if (chunk.coreExplanation) {
      const boldMatches = chunk.coreExplanation.match(/\*\*([^*]+)\*\*/g);
      if (boldMatches) {
        boldMatches.forEach((m: string) => addCandidate(m.replace(/\*\*/g, '')));
      }

      const colonMatches = chunk.coreExplanation.match(/(?:^|\n)([A-Z][a-zA-Z\s]{2,25}):/g);
      if (colonMatches) {
        colonMatches.forEach((m: string) => addCandidate(m.replace(/[\n:]/g, '')));
      }
    }

    if (Array.isArray(chunk.vocabulary)) {
      chunk.vocabulary.forEach((v: string) => addCandidate(v));
    }
  });

  return candidates;
}

export function synthesizeLessonVariants(
  baseTerms: string[],
  lessonTitle: string,
  targetCount: number
): string[] {
  const result = [...baseTerms];
  if (result.length >= targetCount) return result.slice(0, targetCount);

  // Derive connected concepts strictly from the lesson's existing terms
  const titleCleaned = cleanTargetTerm(lessonTitle) || 'Curriculum Concept';
  const roots = baseTerms.map((t) => t.split(' ')[0]).filter(Boolean);

  const modifiers = ['Technique', 'Structure', 'Analysis', 'Convention', 'Principle', 'Application'];
  for (const root of roots) {
    for (const mod of modifiers) {
      if (result.length >= targetCount) break;
      const compound = cleanTargetTerm(`${root} ${mod}`);
      if (compound && !result.includes(compound)) {
        result.push(compound);
      }
    }
  }

  // If still needing cards, anchor with lesson title
  if (result.length < targetCount) {
    for (const mod of modifiers) {
      if (result.length >= targetCount) break;
      const compound = cleanTargetTerm(`${titleCleaned} ${mod}`);
      if (compound && !result.includes(compound)) {
        result.push(compound);
      }
    }
  }

  return result.slice(0, targetCount);
}

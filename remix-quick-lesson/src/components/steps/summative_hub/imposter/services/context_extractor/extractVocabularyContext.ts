import { LessonChunk } from '../../../../../../types';

export interface VocabularyAnalogyContext {
  terms: string[];
  analogies: string[];
  retrievalCues: string[];
  primaryConcepts: string[];
}

export function extractVocabularyContext(chunks: LessonChunk[] = []): VocabularyAnalogyContext {
  const termSet = new Set<string>();
  const analogyList: string[] = [];
  const retrievalCueList: string[] = [];
  const primaryConceptSet = new Set<string>();

  chunks.forEach((chunk) => {
    if (chunk.title?.trim()) {
      primaryConceptSet.add(chunk.title.replace(/^lesson\s*\d*:\s*/i, '').trim());
    }

    if (chunk.vocabulary?.trim()) {
      chunk.vocabulary.split(/[,;\n]+/).forEach((term) => {
        const clean = term.trim();
        if (clean.length > 1) termSet.add(clean);
      });
    }

    if (chunk.vocabularyTags?.trim()) {
      chunk.vocabularyTags.split(/[,;\n]+/).forEach((tag) => {
        const clean = tag.trim();
        if (clean.length > 1) termSet.add(clean);
      });
    }

    if (chunk.metaphor?.trim()) analogyList.push(chunk.metaphor.trim());
    if (chunk.metaphorBadge?.trim()) analogyList.push(chunk.metaphorBadge.trim());
    if (chunk.retrievalCues?.trim()) retrievalCueList.push(chunk.retrievalCues.trim());
  });

  return {
    terms: Array.from(termSet),
    analogies: analogyList,
    retrievalCues: retrievalCueList,
    primaryConcepts: Array.from(primaryConceptSet),
  };
}

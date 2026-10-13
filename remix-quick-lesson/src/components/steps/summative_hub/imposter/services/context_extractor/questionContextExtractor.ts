import { LessonChunk } from '../../../../../../types';
import { ChunkPedagogyContext, extractChunkContext } from './extractChunkContext';
import { VocabularyAnalogyContext, extractVocabularyContext } from './extractVocabularyContext';
import { DiagnosticContext, extractDiagnosticContext } from './extractDiagnosticContext';

export interface LessonQuestionContext {
  lessonTitle: string;
  chunks: ChunkPedagogyContext[];
  vocabulary: VocabularyAnalogyContext;
  diagnostics: DiagnosticContext;
}

export function extractLessonQuestionContext(
  lessonTitle: string,
  chunks: LessonChunk[] = []
): LessonQuestionContext {
  const cleanTitle = (lessonTitle || 'Our Lesson Topic').replace(/^lesson\s*\d*:\s*/i, '').trim();

  return {
    lessonTitle: cleanTitle,
    chunks: extractChunkContext(chunks),
    vocabulary: extractVocabularyContext(chunks),
    diagnostics: extractDiagnosticContext(chunks),
  };
}

export function formatContextForPrompt(ctx: LessonQuestionContext): string {
  const chunkSummaries = ctx.chunks
    .map(
      (c, i) =>
        `Stage ${i + 1} (${c.title}): Intent: ${c.learningIntent || 'N/A'}\n` +
        `- Teacher Modeling ("I Do"): ${c.teacherModeling.join('; ') || 'None'}\n` +
        `- Student Active Tasks ("You Do"): ${c.studentTasks.join('; ') || 'None'}\n` +
        (c.mediaCfuPrompts.length ? `- CFU Notes: ${c.mediaCfuPrompts.join('; ')}\n` : '')
    )
    .join('\n');

  return [
    `LESSON TOPIC: ${ctx.lessonTitle}`,
    `CORE DOMAIN TERMS: ${ctx.vocabulary.terms.join(', ') || 'None listed'}`,
    `EXCLUDED/PRIMARY CONCEPTS: ${ctx.vocabulary.primaryConcepts.join(', ')}`,
    `ANALOGIES & RETRIEVAL CUES: ${[...ctx.vocabulary.analogies, ...ctx.vocabulary.retrievalCues].join('; ') || 'None'}`,
    `REAL-WORLD SCENARIOS: ${ctx.diagnostics.realWorldApplications.join('; ') || 'Everyday applications'}`,
    `COMMON PITFALLS & MISCONCEPTIONS: ${ctx.diagnostics.pitfallsAndTraps.join('; ') || 'None'}`,
    `\nLESSON STAGES & TASKS:\n${chunkSummaries || 'No specific stages provided.'}`,
  ].join('\n');
}

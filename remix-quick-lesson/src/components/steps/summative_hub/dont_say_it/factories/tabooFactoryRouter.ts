import { SecretWordCard } from '../types/dontSayItTypes';
import { generateGroundedTabooDeck, LessonChunkInput } from './chunkGroundedTabooFactory';

export const routeTabooDeckGeneration = async (
  lessonTitle: string,
  chunks: LessonChunkInput[] = [],
  totalNeeded = 6,
  onProgress?: (progressText: string, percentage: number) => void
): Promise<SecretWordCard[]> => {
  onProgress?.('Contacting AI Factory to ground taboo cards in lesson chunks...', 10);

  try {
    const response = await fetch('/api/generate-competitive-quiz-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonTitle, chunks, count: totalNeeded }),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data?.questions) && data.questions.length > 0) {
        onProgress?.('Extracting forbidden terms and misconception rationales...', 80);
        return data.questions.map((q: any, i: number) => ({
          id: q.id || `taboo-ai-${i}-${Date.now().toString(36)}`,
          targetWord: q.prompt ? q.prompt.replace(/\?/g, '').trim() : `Concept ${i + 1}`,
          studentBannedWords: Array.isArray(q.options) ? q.options.slice(0, 4) : ['Concept', 'Process', 'System', 'Rule'],
          aiFallbackBannedWords: Array.isArray(q.options) ? q.options.slice(0, 4) : ['Concept', 'Process', 'System', 'Rule'],
          activeBannedWords: Array.isArray(q.options) ? q.options.slice(0, 4) : ['Concept', 'Process', 'System', 'Rule'],
          chunkIndex: i % Math.max(1, chunks.length),
          chunkTitle: chunks[i % Math.max(1, chunks.length)]?.title || `Section ${i + 1}`,
          hint: q.explanation || `Core concept from ${lessonTitle}.`,
          bloomsLevel: i % 2 === 0 ? 'Understand' : 'Apply',
          misconceptionRationale: `Forbidden terms target key misconceptions in ${lessonTitle}.`,
          difficulty: 'core',
        }));
      }
    }
  } catch (err) {
    console.warn('AI Taboo Deck API fell back to local chunk grounded factory:', err);
  }

  return generateGroundedTabooDeck(lessonTitle, chunks, onProgress);
};

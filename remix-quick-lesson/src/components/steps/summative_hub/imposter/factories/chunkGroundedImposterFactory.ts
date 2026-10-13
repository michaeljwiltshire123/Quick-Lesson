import { ImposterQuestion } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import { buildImposterPrompt } from './imposterStylePromptEngine';

export async function fetchChunkGroundedImposterQuestions(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  desiredCount: number = 16
): Promise<ImposterQuestion[]> {
  try {
    const prompt = buildImposterPrompt(lessonTitle, chunks, desiredCount);
    const resp = await fetch('/api/generate-imposter-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!resp.ok) {
      throw new Error(`Failed to generate questions: ${resp.statusText}`);
    }

    const data = await resp.json();
    if (!data.success || !Array.isArray(data.questions)) {
      return [];
    }

    return data.questions.map((q: any, idx: number) => ({
      id: `ai_imposter_${Date.now()}_${idx}`,
      type: q.type || 'component_name_drop',
      prompt: q.prompt || `Explain key principles of ${lessonTitle}`,
      topicClue: q.topicClue || lessonTitle,
      forbiddenTerm: q.forbiddenTerm,
      contextHint: q.contextHint || q.imposterClue,
      imposterClue: q.imposterClue || 'Bluff by using context cues from peers',
      correctAnswer: q.correctAnswer || 'Accurate classroom terminology',
      chunkTitle: q.chunkTitle || chunks[idx % Math.max(1, chunks.length)]?.title || 'Core Topic',
    }));
  } catch (err) {
    console.warn('[Imposter AI Factory] Generation error:', err);
    return [];
  }
}

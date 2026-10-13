import { buildEscalatedPrompt } from './escalatedLadderFactory';
import { LadderRungQuestion } from '../typesLadder';
import { LessonChunk } from '../../../../../../types';

export interface RouterInput {
  lessonTitle: string;
  chunks: LessonChunk[];
  personaKey: string;
  gradeLevel: string;
  totalRungs: number;
}

export async function generateEscalatedQuestions(input: RouterInput): Promise<LadderRungQuestion[]> {
  const summary = input.chunks.map((c) => `[${c.title}: ${c.learningIntent}]`).join(' ');
  const prompt = buildEscalatedPrompt({
    lessonTitle: input.lessonTitle,
    chunksSummary: summary,
    personaKey: input.personaKey,
    gradeLevel: input.gradeLevel,
    totalRungs: input.totalRungs,
  });

  const models = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

  for (const model of models) {
    try {
      const res = await fetch('/api/generate-ladder-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data?.questions) && data.questions.length > 0) {
        return data.questions.map((q: any, idx: number) => ({
          id: `rung-${idx + 1}-${Date.now()}`,
          rungNumber: idx + 1,
          pointValue: (idx + 1) * 25000,
          presenterIntro: q.presenterIntro || `Welcome to Rung Stage ${idx + 1}! Let's build your score.`,
          prompt: q.prompt,
          choices: Array.isArray(q.choices) && q.choices.length === 4 ? q.choices : ['Option A', 'Option B', 'Option C', 'Option D'],
          correctChoiceIndex: typeof q.correctChoiceIndex === 'number' ? q.correctChoiceIndex : 0,
          explanation: q.explanation || 'Curriculum aligned explanation.',
          timerSeconds: idx + 1 <= 3 ? 10 : idx + 1 <= 7 ? 15 : 20,
          isSafetyNet: idx + 1 === 3 || idx + 1 === 7,
        }));
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Pure procedural fallback if API rate limits or errors
  return Array.from({ length: input.totalRungs }, (_, i) => ({
    id: `rung-fallback-${i + 1}-${Date.now()}`,
    rungNumber: i + 1,
    pointValue: (i + 1) * 25000,
    presenterIntro: `Welcome to Rung Stage ${i + 1}!`,
    prompt: `Demonstrate your application of ${input.lessonTitle} rules at step ${i + 1}.`,
    choices: ['Correct logical resolution', 'Misapplied rule variant A', 'Alternative definition B', 'Distractor option C'],
    correctChoiceIndex: 0,
    explanation: 'Aligned with lesson core structures.',
    timerSeconds: i + 1 <= 3 ? 10 : i + 1 <= 7 ? 15 : 20,
    isSafetyNet: i + 1 === 3 || i + 1 === 7,
  }));
}

import { buildLadderPrompt, PromptBuilderInput } from './ladderPromptBuilder';
import { LadderRungQuestion } from '../typesLadder';

export async function generateLadderQuestions(input: PromptBuilderInput): Promise<LadderRungQuestion[]> {
  const prompt = buildLadderPrompt(input);
  const total = input.totalRungs || 10;
  const models = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

  for (const model of models) {
    try {
      const res = await fetch('/api/generate-ladder-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, count: total }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data?.questions) && data.questions.length > 0) {
        return data.questions.map((q: any, idx: number) => ({
          id: `rung-${idx + 1}-${Date.now()}`,
          rungNumber: idx + 1,
          pointValue: (idx + 1) * 25000,
          presenterIntro: q.presenterIntro || `Rung ${idx + 1}! Let's test your knowledge.`,
          prompt: q.prompt || `What is the key rule of ${input.lessonTitle}?`,
          choices: Array.isArray(q.choices) && q.choices.length === 4 ? q.choices : ['Option A', 'Option B', 'Option C', 'Option D'],
          correctChoiceIndex: typeof q.correctChoiceIndex === 'number' ? q.correctChoiceIndex : 0,
          explanation: q.explanation || 'Grounded explanation.',
          timerSeconds: idx + 1 <= 4 ? 10 : idx + 1 <= 8 ? 15 : 20,
          isSafetyNet: idx + 1 === 3 || idx + 1 === 7,
        }));
      }
    } catch {
      // Cascade to next model in sequence
    }
  }

  return Array.from({ length: total }, (_, i) => ({
    id: `rung-fallback-${i + 1}-${Date.now()}`,
    rungNumber: i + 1,
    pointValue: (i + 1) * 25000,
    presenterIntro: `Rung ${i + 1}! Time for a challenge!`,
    prompt: `What is the primary rule when applying ${input.lessonTitle}?`,
    choices: ['Correct Concept Application', 'Incorrect Method A', 'Incorrect Method B', 'Misconception C'],
    correctChoiceIndex: 0,
    explanation: 'Grounded in lesson concept cards.',
    timerSeconds: i + 1 <= 4 ? 10 : i + 1 <= 8 ? 15 : 20,
    isSafetyNet: i + 1 === 3 || i + 1 === 7,
  }));
}

import { GridlockQuestion } from '../types/gridlockTypes';
import { buildGridlockPrompt, GridlockPromptInput } from './gridlockPromptBuilder';
import { DEFAULT_GRID_LETTERS } from './gridlockFallbackExtractor';
import { buildMultiRoundQuestionBank } from '../factories/multiRoundQuestionBank';

export { DEFAULT_GRID_LETTERS };
export { build5x5HexGridFromQuestions, shuffleArray } from '../board/hexGridBuilder';

export async function generateAiGridlockQuestions(
  input: GridlockPromptInput
): Promise<GridlockQuestion[]> {
  const prompt = buildGridlockPrompt(input);
  const models = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

  for (const model of models) {
    try {
      const res = await fetch('/api/generate-gridlock-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data?.questions) && data.questions.length >= 20) {
        const rawList: GridlockQuestion[] = data.questions.map((q: any, idx: number) => {
          const letter = (q.letter || DEFAULT_GRID_LETTERS[idx] || 'A').toUpperCase();
          const targetAnswer = (q.targetAnswer || `${letter} Keyword`).trim();
          const primaryPrompt = q.prompt || `What '${letter}' is key terminology in ${input.lessonTitle}?`;
          
          let variants: string[] = Array.isArray(q.acceptableAnswers) ? q.acceptableAnswers : [];
          if (!variants.includes(targetAnswer.toLowerCase())) variants.push(targetAnswer.toLowerCase());
          if (!variants.includes(targetAnswer)) variants.push(targetAnswer);
          
          const words = targetAnswer.trim().split(/\s+/);
          if (words.length > 1) {
            const acronym = words.map((w: string) => w[0]).join('').toLowerCase();
            if (acronym.length >= 2) variants.push(acronym);
            variants.push(targetAnswer.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());
          }
          if (variants.length < 3) variants.push(`${targetAnswer.toLowerCase()}s`, `${targetAnswer.toLowerCase()}ing`);
          
          return {
            id: `gq-${idx + 1}-${Date.now()}`,
            letter,
            prompt: primaryPrompt,
            backupPrompt: q.backupPrompt || `Focus on '${letter}' in ${input.lessonTitle}.`,
            targetAnswer,
            acceptableAnswers: Array.from(new Set(variants)).slice(0, 8),
            difficulty: q.difficulty || (idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard'),
            bloomsLevel: q.bloomsLevel || 'Understand',
            chunkTitle: input.chunks?.[idx % (input.chunks.length || 1)]?.title || input.lessonTitle,
            distinctionNote: `Focused on ${targetAnswer} in ${input.lessonTitle}.`,
          };
        });

        const multiRoundBank = buildMultiRoundQuestionBank(
          input.lessonTitle,
          input.chunks || [],
          input.format || 'best-of-7',
          rawList
        );
        return multiRoundBank.flat();
      }
    } catch {
      // Continue fallback
    }
  }

  return buildMultiRoundQuestionBank(
    input.lessonTitle,
    input.chunks || [],
    input.format || 'best-of-7'
  ).flat();
}

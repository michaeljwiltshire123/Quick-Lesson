import { Request, Response } from 'express';
import { executeGenAI, checkCircuitBreaker, recordCircuitError, resetCircuitBreaker } from './aiHandlers';

export async function handleGenerateCompetitiveQuizQuestions(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });

  try {
    const { lessonTitle, chunks = [], count = 8, targetChunkIndex, targetChunkTitle, targetChunkNotes, formatRecipe } = req.body || {};

    const isSingleChunk = typeof targetChunkIndex === 'number' && targetChunkTitle;
    const lessonContext = isSingleChunk
      ? `SPECIFIC LESSON TOPIC: ${targetChunkTitle}\nDETAILS: ${targetChunkNotes || ''}`
      : (chunks || []).map((c: any, i: number) => `Section ${i + 1}: ${c.title || ''} - ${c.notes || ''}`).join('\n');

    const prompt = `You are a Lead British Arena Quiz Designer building student-facing interactive questions for "${lessonTitle}".
Lesson Content Taught:
${lessonContext || lessonTitle}

${isSingleChunk ? `Generate exactly ${count || 2} questions specifically covering this topic.` : `Generate exactly ${count} questions distributed across all sections using a Balanced Hybrid Arena Split.`}

FORMATS TO USE (Select dynamically to create high-energy variety):
- 'binary_blitz': Fast True/False statement (binaryAnswer: boolean).
- 'avatar_race': Sprint question with 4 options for shape-shift tapping.
- 'spot_the_lie': 3 true facts, 1 believable falsehood (correctIndex is the lie).
- 'order_steps': 4 process steps to put in correct sequence (correctOrder: [1,2,3,4]).
- 'speed_match': 3 matching pairs (matchedPairs: [{left: string, right: string}]).
- 'odd_one_out': 3 related items, 1 outlier breaking the rule (correctIndex is outlier).
- 'reverse_instruction': A reflex question (e.g., "Which of these is NOT a reactant in respiration?").
- 'wager_drop': A high-stakes tricky concept question with 4 options.

STRICT STUDENT-FACING RULES:
1. DO NOT include "Chunk", "Section", "Objective", "Bloom", "Teacher Note", or any curriculum metadata in the prompt or options.
2. The prompt MUST strictly be pure, punchy question text under 15 words so pupils can read it in 2 seconds on mobile.
3. Distractors must be authentic, plausible misconceptions based on what was just taught.
4. British English spelling only (e.g. synthesise, organise, colour).

Return ONLY JSON:
{
  "questions": [
    {
      "id": "q1",
      "format": "spot_the_lie",
      "formatLabel": "Spot The Lie",
      "prompt": "Which of these statements about respiration is false?",
      "options": ["Releases ATP energy", "Occurs in mitochondria", "Produces oxygen gas", "Requires glucose"],
      "correctIndex": 2,
      "explanation": "Respiration consumes oxygen; it does not produce it.",
      "speedLimitSeconds": 10,
      "potValue": 150
    }
  ]
}`;

    const fallback = JSON.stringify({ questions: [] });
    const result = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    res.json(result);
  } catch (err: any) {
    recordCircuitError();
    res.status(500).json({ error: err.message || 'Competitive quiz generation failed' });
  }
}

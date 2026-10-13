import { Request, Response } from 'express';
import { executeGenAI, checkCircuitBreaker, recordCircuitError } from './aiHandlers';

export async function handleExtractDontSayItWords(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });

  try {
    const { lessonTitle, chunks = [], count = 8, bannedCount = 4 } = req.body;
    const chunkText = chunks
      .map((c: any, i: number) => `Chunk ${i + 1}: ${c.title || ''} | ${c.learningIntent || ''} | ${c.coreExplanation || ''}`)
      .join('\n');

    const prompt = `You are an elite UK Curriculum Designer creating a "Don't Say It!" (Taboo-style) classroom game.
Extract exactly ${Math.max(2, Math.min(20, count))} high-value curriculum concept terms strictly grounded in this lesson.

Lesson Title: ${lessonTitle || 'Lesson'}
Lesson Content:
${chunkText.slice(0, 4000)}

STRICT RULES:
1. TARGET WORDS MUST BE STRICTLY 1 TO 3 WORDS (e.g., "Warm Lighting", "Depth Of Field", "Protagonist", "Diegetic Sound").
2. FORBIDDEN: NEVER output student task instructions (e.g. "Students Sketch A", "In Pairs", "Draw A Diagram").
3. FORBIDDEN: NEVER output sentence fragments (e.g. "If A Character", "When The Light", "To Be Able To").
4. FORBIDDEN: NEVER output isolated bare adjectives. Pair adjectives with their subject noun (e.g., "Warm" -> "Warm Lighting" or "Warm Colours").
5. FORBIDDEN: Only use terms taught in or directly related to the concepts in this specific lesson.
6. For each target word, provide ${bannedCount} forbidden words that opponents must not say when giving clues.

Respond with ONLY raw JSON in this exact schema:
{
  "cards": [
    {
      "targetWord": "Warm Lighting",
      "bannedWords": ["Yellow", "Candle", "Golden", "Sunlight"],
      "hint": "Lighting technique to create comfort or intimacy"
    }
  ]
}`;

    const parsed = await executeGenAI(prompt, '{"cards":[]}');
    const cards = Array.isArray(parsed?.cards) ? parsed.cards : [];
    res.json({ success: true, cards });
  } catch (err: any) {
    recordCircuitError();
    res.status(500).json({ success: false, error: err.message || 'Word extraction failed' });
  }
}

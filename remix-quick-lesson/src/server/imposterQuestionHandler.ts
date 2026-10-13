import { Request, Response } from 'express';
import { executeGenAI, checkCircuitBreaker, recordCircuitError, resetCircuitBreaker } from './aiHandlers';

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function handleGenerateImposterQuestions(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) {
    return res.status(503).json({ success: false, error: 'Circuit breaker active.' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const fallbackJson = '{"questions":[]}';
    const parsed = await executeGenAI(prompt, fallbackJson);
    resetCircuitBreaker();

    const rawList = Array.isArray(parsed?.questions) ? parsed.questions : [];
    // Strict post-processing: enforce under-6-word answers and sanitize
    const sanitized = rawList
      .filter((q) => q && typeof q.prompt === 'string' && q.prompt.trim())
      .map((q) => {
        const rawAns = String(q.correctAnswer || '').trim();
        const words = rawAns.split(/\s+/).filter(Boolean);
        const cappedAns = words.length > 5 ? words.slice(0, 5).join(' ') : rawAns || 'Key Term';

        return {
          type: q.type || 'component_name_drop',
          prompt: q.prompt.trim(),
          topicClue: String(q.topicClue || '').trim(),
          imposterClue: String(q.imposterClue || '').trim(),
          correctAnswer: cappedAns,
          ghostDecoys: Array.isArray(q.ghostDecoys) ? q.ghostDecoys.slice(0, 3) : [],
          chunkTitle: String(q.chunkTitle || 'Core Learning').trim(),
        };
      });

    // Shuffle so styles don't appear in a predictable loop
    const shuffled = shuffleArray(sanitized);
    return res.json({ success: true, questions: shuffled });
  } catch (err: any) {
    recordCircuitError();
    return res.status(500).json({
      success: false,
      error: err.message || 'Imposter question generation failed',
    });
  }
}

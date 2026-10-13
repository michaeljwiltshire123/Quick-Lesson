import { Request, Response } from 'express';
import { getAI, recordCircuitError, resetCircuitBreaker, checkCircuitBreaker } from './aiHandlers';

export async function handleGenerateGridlockQuestions(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });

  try {
    const { prompt, model } = req.body;
    const selectedModel = model || 'gemini-3.6-flash';
    const resp = await getAI().models.generateContent({
      model: selectedModel,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const raw = (resp.text || '').trim().replace(/^```json\s*|^```\s*|\s*```$/gi, '');
    let parsed: any = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { questions: [] };
    }
    resetCircuitBreaker();
    res.json(parsed);
  } catch (err: any) {
    recordCircuitError();
    res.status(500).json({ error: err.message || 'GridLock question generation failed' });
  }
}

import { Request, Response } from 'express';
import { executeGenAI, checkCircuitBreaker } from './aiHandlers';
import { getTopicStarterFallbacks } from '../utils/topicStarterFallback';

function buildPrompt(lessonTitle: string, subject: string, chunkTitle: string, format?: string, lessonNotes?: string): string {
  const target = format ? `Format: ${format} (generate 6 items)` : 'Generate 6 items for each of the 7 formats';
  const notesContext = lessonNotes ? `\nContext & Syllabus Notes: ${lessonNotes}` : '';
  return `You are an elite veteran UK Head of Department. Generate diagnostic discussion starters for "${lessonTitle}" in ${subject}, topic: "${chunkTitle}".${notesContext}
${target}.

STRICT PRE/POST-CONDITION & NEGATIVE RULES:
1. NEGATIVE RULE - ZERO WORD-LOSS ON NAVIGATION: Prompts must be complete, pristine standalone texts. Do NOT output incomplete sentence fragments, placeholder ellipses, or truncated clauses that could be corrupted when edited by a teacher or synced across screen transitions.
2. NEGATIVE RULE - NO GENERIC FILLER: Forbid generic conversational pleasantries, meta-commentary, or ungrounded questions.
3. NEGATIVE RULE - PRESERVE EXACT FORMAT CONTRACT: Each object MUST strictly adhere to the designated schema without omitting keys.

FORMAT-SPECIFIC RULES (strictly under 75 words per prompt, punchy teenage register):
- true_false: Counter-intuitive misconceptions. Include "isTrue": true/false.
- forced_dichotomy: Sophie's Choice dilemmas where choosing one kills the other. No easy middle ground.
- paradox: Thought experiments or famous paradoxes (Ship of Theseus, Grandfather, etc.) mapped to this topic.
- would_you_rather: Asymmetric psychological traps: security vs self-worth.
- predict_disaster: Two-beat trap: a seemingly smart decision with a hidden time-bomb. Cut off right before disaster.
- finger_scale: MUST start with "On a scale of 1 (Anchor A) to 10 (Anchor B)", with explicit polar anchors in brackets.
- socratic_tension: Two opposing principled stances clashing directly (e.g. Purist vs Remixer).

Return ONLY a JSON array:
[{"formatType":"true_false"|"forced_dichotomy"|"paradox"|"would_you_rather"|"predict_disaster"|"finger_scale"|"socratic_tension","promptText":"...","misconceptionWarning":"...","teacherDeliveryLine":"...","isTrue":true}]`;
}

export async function handleGenerateDiscussionStarters(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });

  try {
    const { lessonTitle = 'Lesson', subject = 'General', chunkTitle = 'Concept', formatType, lessonNotes } = req.body;
    const allFallbacks = getTopicStarterFallbacks(chunkTitle, subject);
    const filteredFallback = formatType ? allFallbacks.filter((item) => item.formatType === formatType) : allFallbacks;

    const prompt = buildPrompt(lessonTitle, subject, chunkTitle, formatType, lessonNotes);
    const result = await executeGenAI(prompt, JSON.stringify(filteredFallback));
    
    if (hasSixPerFormat(result, formatType)) {
      return res.json(result);
    }

    function hasSixPerFormat(value: unknown, requested?: string): boolean {
      if (!Array.isArray(value)) return false;
      const formats = requested ? [requested] : ['true_false', 'forced_dichotomy', 'paradox', 'would_you_rather', 'predict_disaster', 'finger_scale', 'socratic_tension'];
      return formats.every((format) => value.filter((item) => item?.formatType === format && typeof item.promptText === 'string' && item.promptText.trim()).length >= 6);
    }
    return res.json(filteredFallback);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Generation failed' });
  }
}

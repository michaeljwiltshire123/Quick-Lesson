import { Request, Response } from 'express';
import { executeGenAI, resetCircuitBreaker } from './aiHandlers';

export async function handleEscapeRoom(req: Request, res: Response) {
  try {
    const { lessonTitle, subject, gradeLevel, themePreset, chunks } = req.body;
    const title = lessonTitle || 'Subject Mastery';
    const preset = themePreset || 'hollywood';
    const chunkTitles = Array.isArray(chunks) ? chunks.map((c: any) => c.title).filter(Boolean).slice(0, 4) : [];
    const conceptsStr = chunkTitles.length ? chunkTitles.join(', ') : title;

    const prompt = `Generate a 20-minute educational escape room challenge for "${title}" (${subject || 'General'}, ${gradeLevel || 'Secondary'}).
Theme preset: "${preset}". Concepts: ${conceptsStr}.
CRITICAL RULES:
1. STRICTLY FORBID math or numeric codes. Every solution MUST be non-numeric (words, colour sequences, icon names, or concept chains).
2. Never use the word "torpedo". Refer only to "Sabotage Shots" or "Hindrance Effects".
3. Provide 4 puzzle locks:
   - Lock 1 (word_cipher): Vocabulary/concept term code (e.g. "PROTAGONIST"). Sabotage reward: "fog".
   - Lock 2 (color_keycard): 3-4 colour sequence (e.g. "EMERALD-AMBER-SAPPHIRE"). Sabotage reward: "key_reset".
   - Lock 3 (icon_sequence): 3-4 icon badge sequence (e.g. "SHIELD-KEY-FLAME"). Sabotage reward: "freeze".
   - Lock 4 (concept_pathway): Sequence of 3-4 linked stages (e.g. "DISCOVER-DESIGN-DELIVER"). Sabotage reward: "glitch".

Return ONLY raw JSON in this format:
{
  "narrativeBrief": "2-sentence high-stakes narrative setting the scenario...",
  "customThemeTitle": "Scenario Title",
  "locks": [
    {
      "id": "lock-1",
      "lockNumber": 1,
      "title": "...",
      "cipherType": "word_cipher",
      "cluePrompt": "...",
      "solutionCode": "...",
      "sabotageReward": "fog"
    }
  ]
}`;

    const parsed = await executeGenAI(prompt, JSON.stringify({ narrativeBrief: '', locks: [] }));
    resetCircuitBreaker();
    return res.json(parsed);
  } catch {
    return res.json({ narrativeBrief: '', locks: [] });
  }
}

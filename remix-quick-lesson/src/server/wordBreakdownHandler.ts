import { Request, Response } from 'express';
import { checkCircuitBreaker, recordCircuitError, resetCircuitBreaker, executeGenAI } from './aiHandlers';
import { generateBananaPuzzleImage } from './bananaImageService';

export async function handleWordBreakdown(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { terms = [], conceptTitle = '', conceptScript = '', conceptNotes = '', subject = 'General' } = req.body;
    const termList = (Array.isArray(terms) ? terms : [String(terms)]).map((s: string) => String(s).trim()).filter(Boolean).slice(0, 10);
    if (!termList.length && !Boolean(conceptTitle || conceptScript || conceptNotes)) return res.json({ breakdowns: [] });

    const prompt = `Educational Linguist & Puzzle Designer:
Concept: "${conceptTitle || 'Lesson'}" (${subject})
Target Words: [${termList.join(', ')}]

FOR EACH WORD, generate:
1. phonetic: hyphenated phonetic pronunciation (e.g. "uh-NAF-er-uh", "STOR-ee-tel-ing", "tek-NEEKS")
2. morphemes: Greek/Latin root elements
3. phoneticRebus: 2 to 4 standard, common emojis that phonetically sound like the syllables of the word when spoken aloud. Join with " + ".
   - Example 1: "Anaphora" -> "🐜 + 🍎 + 4️⃣"
   - Example 2: "Storytelling" -> "🏬 + 👁️ + 🔔 + 💍"
   - Example 3: "Techniques" -> "💻 + 🦵 + 🗝️"
   - Example 4: "Narrative" -> "🥜 + 🐀 + 🤿"
4. phoneticHint: The matching words for each emoji (e.g. "Ant + Apple + Four", "Store + Eye + Tell + Ring", "Tech + Knee + Key", "Nut + Rat + Dive")
5. conceptualRebus: Idea equation with " = " (e.g. "📖 + 🗣️ = 🎭")
6. conceptualHint: Meaning explanation
7. visualPrompt: Absurd memory cartoon prompt (e.g. "An eagle wearing a blindfold while reading a blank map with a compass")
8. riddleClue: 2-4 line rhyming classroom riddle

RULES:
- Use standard, widely supported emojis only (animals, food, tools, household items, numbers).
- Do NOT use abstract signs (🚫, ⚠️, ❌) or teabags.
- Ensure the syllables match the real pronunciation of each word.

Return raw JSON:
{
  "breakdowns": [{
    "term": "Word",
    "phonetic": "...",
    "morphemes": [{"part": "...", "origin": "Greek/Latin", "meaning": "..."}],
    "phoneticRebus": "...",
    "phoneticHint": "...",
    "conceptualRebus": "...",
    "conceptualHint": "...",
    "visualPrompt": "...",
    "riddleClue": "..."
  }]
}`;
    const rawTerms = termList.length > 0 ? termList : ['Vocabulary'];
    const fallback = JSON.stringify({
      breakdowns: rawTerms.map((t: string) => ({
        term: t, phonetic: t.toLowerCase().split('').join('-'),
        morphemes: [{ part: t.slice(0, Math.ceil(t.length / 2)), origin: 'Greek', meaning: 'Root element' }],
        phoneticRebus: '🐜 + 🍎 + 4️⃣', phoneticHint: 'Ant + Apple + Four',
        conceptualRebus: '📖 + 💡 = 🎯', conceptualHint: 'Core curriculum concept',
        visualPrompt: `Absurd cartoon visual clue representing ${t}`,
        riddleClue: `Silent in structure yet potent in power,\nI dance through the details hour by hour.\nUnravel my secrets and speak out my name—\nWhat am I?`
      }))
    });
    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    const items = (Array.isArray(parsed?.breakdowns) ? parsed.breakdowns : []).map((b: any) => ({
      ...b,
      phoneticRebus: b.phoneticRebus || b.emojiRebus || '💡 + 🎯',
      emojiRebus: b.phoneticRebus || b.emojiRebus || '💡 + 🎯'
    }));
    res.json({ breakdowns: items });
  } catch (err: any) {
    recordCircuitError();
    res.status(500).json({ error: err.message });
  }
}

export async function handleNanoBananaPuzzle(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { term = '', rebus = '', clue = '' } = req.body || {};
    const imageUrl = await generateBananaPuzzleImage(term, rebus, clue);
    res.json({ imageUrl });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Image generation failed' });
  }
}

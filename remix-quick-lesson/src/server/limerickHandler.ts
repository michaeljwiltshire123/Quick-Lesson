import { Request, Response } from 'express';
import { checkCircuitBreaker, recordCircuitError, resetCircuitBreaker, executeGenAI } from './aiHandlers';

export async function handleGenerateLimerick(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { concept = 'Core Concept', takeawayGoal = 'Understand key principles', acronym = '', poetryStyle = 'limerick', subject = 'General', gradeLevel = 'General' } = req.body || {};

    const trimmedAcronym = acronym && typeof acronym === 'string' ? acronym.trim() : '';
    const prompt = `Pedagogical Poet & Curriculum Verse Designer:
Concept: "${concept}" (${subject}, Grade ${gradeLevel})
Takeaway Goal: "${takeawayGoal}"
${trimmedAcronym ? `Mnemonic Acronym: "${trimmedAcronym}"` : 'Mnemonic Acronym: None provided (Do not invent, reference, or output any acronym or the word none).'}
Poetry Style: "${poetryStyle}"

Generate EXACTLY 4 distinct, highly memorable, rhyming verse options encoding the takeaway goal${trimmedAcronym ? ` and incorporating acronym '${trimmedAcronym}'` : ''}. Do not mention acronyms or 'none' if none was provided.
Style rules:
- "limerick": Strict AABBA meter, witty and rhythmic.
- "couplet": 8-line rhyming pairs (AABB AABB).
- "ballad": 8-line narrative rhythm (ABAB CDCD).
- "rap": 8-line high-tempo syncopated flow.

Return raw JSON:
{
  "verses": [
    {
      "id": "lim-1",
      "title": "Title 1",
      "style": "${poetryStyle}",
      "verses": ["Line 1", "Line 2", ...],
      "mnemonic": "${acronym}",
      "takeawayGoal": "${takeawayGoal}",
      "selected": true
    }
  ]
}`;

    const fallback = JSON.stringify({
      verses: [
        {
          id: `lim-${Date.now()}-1`,
          title: `${concept} - Classic ${poetryStyle}`,
          style: poetryStyle,
          verses: [
            `There once was a topic so bright,`,
            `That shone on all learners a light.`,
            `With ${takeawayGoal},`,
            `It reaches the goal,`,
            `And makes every concept feel right!`
          ],
          mnemonic: acronym,
          takeawayGoal,
          selected: true
        },
        {
          id: `lim-${Date.now()}-2`,
          title: `${concept} - Rhythmic Flow`,
          style: poetryStyle,
          verses: [
            `Listen up students, take note of the rule,`,
            `The smartest approach in the classroom and school.`,
            `Focus on ${concept} right from the start,`,
            `And master the method with science and art!`
          ],
          mnemonic: acronym,
          takeawayGoal,
          selected: false
        },
        {
          id: `lim-${Date.now()}-3`,
          title: `${concept} - Step-by-Step`,
          style: poetryStyle,
          verses: [
            `First we examine the core of the test,`,
            `Testing each variable put to the quest.`,
            `Holding the formula steady and true,`,
            `Showing exactly what we have to do!`
          ],
          mnemonic: acronym,
          takeawayGoal,
          selected: false
        },
        {
          id: `lim-${Date.now()}-4`,
          title: `${concept} - Mastery Verse`,
          style: poetryStyle,
          verses: [
            `When solving equations or studying facts,`,
            `Remember the steps and the confident acts.`,
            `Success is guaranteed when we apply,`,
            `The principles guiding our reason and why!`
          ],
          mnemonic: acronym,
          takeawayGoal,
          selected: false
        }
      ]
    });

    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    const items = Array.isArray(parsed?.verses) ? parsed.verses : JSON.parse(fallback).verses;
    res.json({ verses: items });
  } catch (err: any) {
    recordCircuitError();
    res.status(500).json({ error: err.message || 'Generation failed' });
  }
}

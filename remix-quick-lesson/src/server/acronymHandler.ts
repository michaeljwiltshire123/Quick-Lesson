import { Request, Response } from 'express';
import { checkCircuitBreaker, recordCircuitError, resetCircuitBreaker, executeGenAI } from './aiHandlers';

export async function handleGenerateAcronym(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });

  try {
    const { concept = 'Topic', workflow = '', contextScript = '', subject = 'General', gradeLevel = 'General' } = req.body || {};

    const prompt = `Pedagogical Mnemonic & Acronym Designer (UK Curriculum Standards):
Concept: "${concept}" (${subject}, Grade: ${gradeLevel})
Classroom Workflow/System: "${workflow || concept}"
Teacher Script / Context: "${contextScript.slice(0, 1500)}"

Task: Generate EXACTLY 4 distinct, real-word, highly memorable educational acronyms for this workflow.
CRITICAL RULES:
1. Every acronym MUST be a real, common, easily pronounceable English word (e.g., FOCUS, CRAFT, SPARK, BUILD, CLEAR, CLIMB, PRISM, SMART, REACH). NEVER generate unpronounceable consonant strings.
2. Word length: 4 to 6 letters.
3. Each letter must map to a concrete curriculum step or cognitive cue in British English.
Return raw JSON:
{
  "acronyms": [
    {
      "id": "acronym-1",
      "word": "FOCUS",
      "meaning": "Foundation, Observation, Clarification, Understanding, Synthesis",
      "breakdown": [
        { "letter": "F", "term": "Foundation", "explanation": "Establish core principles" },
        { "letter": "O", term: "Observation", "explanation": "Examine variables" },
        { "letter": "C", term: "Clarification", "explanation": "Refine definitions" },
        { "letter": "U", term: "Understanding", "explanation": "Apply methods" },
        { "letter": "S", term: "Synthesis", "explanation": "Consolidate learning" }
      ],
      "rationale": "High-impact investigative cycle for lesson recall."
    }
  ]
}`;

    const fallback = JSON.stringify({
      acronyms: [
        {
          id: `acronym-${Date.now()}-1`, word: 'FOCUS',
          meaning: `Foundation, Observation, Clarification, Understanding, Synthesis for ${concept}`,
          breakdown: [
            { letter: 'F', term: 'Foundation', explanation: `Establish core ground principles of ${concept}` },
            { letter: 'O', term: 'Observation', explanation: `Carefully examine initial patterns and data` },
            { letter: 'C', term: 'Clarification', explanation: `Refine terminology and resolve ambiguities` },
            { letter: 'U', term: 'Understanding', explanation: `Demonstrate mastery through practical application` },
            { letter: 'S', term: 'Synthesis', explanation: `Summarise takeaways and consolidate insight` },
          ],
          rationale: `Direct structured workflow to master ${workflow || concept}.`, selected: true,
        },
        {
          id: `acronym-${Date.now()}-2`, word: 'CRAFT',
          meaning: `Context, Research, Analysis, Formulation, Testing for ${concept}`,
          breakdown: [
            { letter: 'C', term: 'Context', explanation: `Identify the scenario and practical framing` },
            { letter: 'R', term: 'Research', explanation: `Gather relevant evidence and curriculum facts` },
            { letter: 'A', term: 'Analysis', explanation: `Deconstruct mechanisms and key relationships` },
            { letter: 'F', term: 'Formulation', explanation: `Construct hypotheses or initial solutions` },
            { letter: 'T', term: 'Testing', explanation: `Validate outcomes against success criteria` },
          ],
          rationale: `Encourages investigative rigour and disciplined execution.`, selected: false,
        },
      ]
    });

    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    const items = Array.isArray(parsed?.acronyms) && parsed.acronyms.length > 0 ? parsed.acronyms : JSON.parse(fallback).acronyms;
    res.json({ acronyms: items });
  } catch (err: any) {
    recordCircuitError();
    res.status(500).json({ error: err.message || 'Acronym generation failed' });
  }
}

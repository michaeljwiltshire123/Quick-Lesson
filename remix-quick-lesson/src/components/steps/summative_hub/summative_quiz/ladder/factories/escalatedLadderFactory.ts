import { getPersonaInstruction } from './questionPersonaEngine';

export interface EscalationConfig {
  lessonTitle: string;
  chunksSummary: string;
  personaKey: string;
  gradeLevel: string;
  totalRungs: number;
}

export function buildEscalatedPrompt(cfg: EscalationConfig): string {
  const personaInstruction = getPersonaInstruction(cfg.personaKey, cfg.gradeLevel);

  return `You are an elite educational game show designer for UK schools. Generate exactly ${cfg.totalRungs} quiz questions structured as a progressive knowledge ladder from basic recall up to rigorous evaluation of "${cfg.lessonTitle}".

Core lesson context: ${cfg.chunksSummary}

${personaInstruction}

CRITICAL ESCALATION ARCHITECTURE FOR THE ${cfg.totalRungs} RUNGS:
- Rungs 1 to 3 (Introductory recall): Focus on fundamental terms, core definitions, and quick identification. Simple, low cognitive reading age.
- Rungs 4 to 7 (Application): Situational "what-if" contexts requiring procedural knowledge and application of rules.
- Rungs 8 to 10 (Evaluation & Spot-the-Mistake): Advanced meta-cognitive debugging questions. Present a faulty code, bad formula, or common student misconception in the prompt, and ask the student to evaluate and spot the exact mistake. High academic rigor.

RESPONSE FORMAT:
You MUST return a JSON object with a single root key "questions". No introductory text, no conversational padding, no markdown backticks.
Schema:
{
  "questions": [
    {
      "prompt": "The question question prompt text",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "correctChoiceIndex": 0,
      "explanation": "High quality grounded explanation to show why choice index is correct",
      "presenterIntro": "Encouraging UK teacher-friendly game show host introduction line"
    }
  ]
}

Ensure exactly 4 choices per question. Do not skip any rungs.`;
}

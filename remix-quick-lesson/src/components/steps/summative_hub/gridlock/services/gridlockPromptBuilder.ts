import { LessonChunk, ModuleScheme } from '../../../../../types';
import { TournamentFormat } from '../types/gridlockTypes';

export interface GridlockPromptInput {
  lessonTitle: string;
  chunks?: LessonChunk[];
  moduleScheme?: ModuleScheme;
  letters?: string[];
  format?: TournamentFormat;
}

export function buildGridlockPrompt(input: GridlockPromptInput): string {
  const chunksText = (input.chunks || [])
    .map(
      (c, i) =>
        `Lesson Part ${i + 1} [${c.title || ''}]:\n- Focus: ${c.learningIntent || ''}\n- Concepts: ${c.coreExplanation || ''}\n- Script: ${c.teacherScript || ''}`
    )
    .join('\n\n');

  return `You are a TV Gameshow Host creating questions for "GridLock" (a Blockbusters-style classroom hexagon showdown for secondary school teenagers).

LESSON TOPIC: "${input.lessonTitle}"
CURRICULUM CONTENT:
${chunksText || input.lessonTitle}

MANDATORY RULES FOR QUESTIONS & ANSWERS:
1. THE "CORRIDOR TEST" (SUBJECT KEYWORDS ONLY):
   - Every single-word answer MUST be an exam-board subject term (e.g. "Script", "Keyframe", "Tweening", "Contrast", "Montage", "Juxtaposition", "Diegetic").
   - STRICTLY FORBIDDEN: Generic everyday words ("how", "what", "skill", "feeling", "detail", "knowledge", "remember", "finalising", "effort", "everything", "zone", "task", "motion", "direction", "choice", "creativity").

2. ANCHOR PHRASE SCAFFOLDING FOR MULTI-WORD CONCEPTS:
   - For 2- or 3-word subject phrases (e.g. "Rule of Thirds", "Kuleshov Effect", "Point of View", "Establishing Shot", "High Angle", "Diegetic Sound"):
     Target ONE specific letter/word and give the rest as an anchor clue!
     Examples:
     * "What T completes the visual framing rule: Rule of T...?" (Answer: "Thirds")
     * "What E completes the editing principle: Kuleshov E...?" (Answer: "Effect")
     * "What V in 'Point of V...' describes looking through a character's eyes?" (Answer: "View")
     * "What S completes the camera term: Establishing S...?" (Answer: "Shot")
     * "What H completes the scriptwriting term: Scene H...?" (Answer: "Heading")

3. ZERO TAUTOLOGY (NEVER WRITE THE ANSWER IN THE QUESTION):
   - Never say "What K is the key part...", "What R is rectangular...", or "What E is everything...".

4. OUTPUT EXACTLY 25 HIGH-QUALITY QUESTIONS (1 for each hex tile):
   - Base the tile letters directly on the target answers of your extracted curriculum concepts.

Output ONLY valid JSON:
{
  "questions": [
    {
      "letter": "T",
      "targetAnswer": "Thirds",
      "acceptableAnswers": ["thirds", "rule of thirds", "the rule of thirds"],
      "prompt": "What T completes the visual composition guideline: Rule of T...?",
      "backupPrompt": "What T is the 3x3 grid framing rule: Rule of T...?",
      "difficulty": "medium",
      "distinctionNote": "Core visual composition principle."
    }
  ]
}`;
}


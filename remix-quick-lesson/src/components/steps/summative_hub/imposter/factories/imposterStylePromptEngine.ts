import { LessonChunk } from '../../../../../types';

export function buildImposterPrompt(
  lessonTitle: string,
  chunks: LessonChunk[],
  desiredQuestionCount: number = 16
): string {
  // Filter out warm-up, hook, starter, equipment, and administrative classroom boilerplate
  const filteredChunks = chunks.filter((c) => {
    const t = (c.title || '').toLowerCase();
    const intent = (c.learningIntent || '').toLowerCase();
    return !/warm\s*up|starter|hook|do\s*now|equipment|register|logistics|exercise\s*books/i.test(t + ' ' + intent);
  });
  const effectiveChunks = filteredChunks.length > 0 ? filteredChunks : chunks;

  const chunksSummary = effectiveChunks
    .map((c, i) => {
      const intent = c.learningIntent || '';
      const core = c.coreExplanation || c.theoryBullets || '';
      const task = c.formativeTaskDetails || c.formativeTaskTitle || '';
      return `Milestone ${i + 1} [${c.title}]: Core: ${core}. Intent: ${intent}. Tasks: ${task}`;
    })
    .join('\n');

  const count = Math.max(12, Math.min(30, desiredQuestionCount));

  return `Persona: You are a sharp, witty UK secondary school teacher and game show host. You write questions directly for teenagers: punchy, engaging, and clear—never boring or corporate.

Quiz: "Classroom Imposter". Innocent pupils answer a precise curriculum question with a short 1-to-5 word answer. The hidden imposter gets only a subtle thematic clue to bluff.

Topic: "${lessonTitle}"
Core Curriculum Content:
${chunksSummary}

Create ${count} unique questions across 4 styles:
- "component_name_drop": Direct naming of key terms, components, or organs.
- "real_world_app": Practical everyday scenarios and consequences.
- "analogy_link": Mechanics mapped to everyday analogies.
- "action_verb": Spotting active processes, steps, or biological/physical reactions.

MANDATORY RULES:
1. Short Answers: Every "correctAnswer" MUST be strictly between 1 and 5 words (never an essay).
2. Diagnostic Questions: Fast-reading direct questions under 120 characters ending with "?". No open essay prompts.
3. Imposter Clues: Balanced thematic orientation that allows plausible bluffing without leaking the exact answer.
4. Plausible Ghost Traps: Supply 2 "ghostDecoys" (alternative misleading questions) for eliminated pupil decoys.
5. Language: British English spelling (e.g. analyse, organise, specialise). Never mention GCSE or exam boards.
6. Pure JSON: Return ONLY valid JSON with zero conversational preamble or notes.

JSON Schema:
{
  "questions": [
    {
      "type": "component_name_drop",
      "prompt": "Which organelle generates ATP during aerobic respiration?",
      "topicClue": "Cellular Respiration",
      "imposterClue": "Focus on powerhouse structures in living cells",
      "correctAnswer": "Mitochondria",
      "ghostDecoys": [
        "Which cellular structure synthesises digestive enzymes?",
        "Name the membrane barrier controlling cell entry."
      ],
      "chunkTitle": "Core Learning"
    }
  ]
}`;
}

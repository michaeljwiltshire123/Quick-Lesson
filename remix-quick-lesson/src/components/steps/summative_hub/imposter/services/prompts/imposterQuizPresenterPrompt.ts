import { LessonQuestionContext, formatContextForPrompt } from '../context_extractor';
import { QUIZ_HOST_PERSONA_RULES } from './presenterPersonaRules';

export interface PromptGenerationOptions {
  count?: number;
  targetedTypes?: Array<'component_name_drop' | 'real_world_app' | 'analogy_link' | 'action_verb'>;
}

export function buildImposterQuizPresenterPrompt(
  context: LessonQuestionContext,
  options: PromptGenerationOptions = {}
): string {
  const count = options.count || 4;
  const contextBlock = formatContextForPrompt(context);

  return `
${QUIZ_HOST_PERSONA_RULES}

=========================
LESSON CONTEXT INGESTION:
=========================
${contextBlock}

=========================
GENERATION SPECIFICATIONS:
=========================
1. Generate an array of exactly ${count} question objects.
2. Evenly distribute across the 4 question types:
   - 'component_name_drop' (Include forbiddenTerm)
   - 'real_world_app' (Include contextHint)
   - 'analogy_link' (Include contextHint)
   - 'action_verb' (Include contextHint)
3. Ground every question strictly in the provided teacher modeling scripts, active student tasks, vocabulary, or real-world applications.
4. Output STRICT JSON format with NO markdown wrapping, NO backticks, and NO conversational filler.

OUTPUT JSON SCHEMA:
[
  {
    "id": "q_1",
    "type": "component_name_drop" | "real_world_app" | "analogy_link" | "action_verb",
    "prompt": "Direct, punchy question string without preamble",
    "topicClue": "Vague topic clue visible to the imposter (e.g. 'Screenwriting Structure')",
    "forbiddenTerm": "Excluded primary term (for component_name_drop only)",
    "contextHint": "Short 2-4 word hint (for other types)"
  }
]
`.trim();
}

import { ImposterQuestion } from '../../types/imposterTypes';
import { LessonQuestionContext } from '../context_extractor';

function cleanSubject(text: string, fallback: string): string {
  if (!text || !text.trim()) return fallback;
  return text.replace(/^lesson\s*\d*:\s*/i, '').replace(/^stage\s*\d*:\s*/i, '').trim();
}

export function buildComponentNameDropBatch(ctx: LessonQuestionContext): ImposterQuestion[] {
  const terms = ctx.vocabulary.terms.filter((t) => t && t.length > 2);
  const pool: ImposterQuestion[] = [];
  const lessonSubject = cleanSubject(ctx.lessonTitle, 'this unit');

  for (let i = 0; i < 10; i++) {
    const chunk = ctx.chunks[i % Math.max(1, ctx.chunks.length)];
    const stageName = cleanSubject(chunk?.title || '', lessonSubject);
    const excludedTerm = terms[i % Math.max(1, terms.length)] || 'the main heading';

    pool.push({
      id: `q_drop_${i + 1}`,
      type: 'component_name_drop',
      prompt: `In ${stageName}, name a key part, tool, or term other than ${excludedTerm}.`,
      topicClue: lessonSubject,
      forbiddenTerm: excludedTerm,
      contextHint: `${stageName} elements`,
    });
  }
  return pool;
}

export function buildRealWorldAppBatch(ctx: LessonQuestionContext): ImposterQuestion[] {
  const scenarios = ctx.diagnostics.realWorldApplications;
  const pool: ImposterQuestion[] = [];
  const lessonSubject = cleanSubject(ctx.lessonTitle, 'this system');

  for (let i = 0; i < 10; i++) {
    const chunk = ctx.chunks[i % Math.max(1, ctx.chunks.length)];
    const specificStage = cleanSubject(chunk?.title || '', lessonSubject);
    const scenarioHint = scenarios[i % Math.max(1, scenarios.length)] || `Practical use of ${specificStage}`;

    pool.push({
      id: `q_real_${i + 1}`,
      type: 'real_world_app',
      prompt: `Name one real-world job, device, or situation that relies on ${specificStage}.`,
      topicClue: lessonSubject,
      contextHint: scenarioHint,
    });
  }
  return pool;
}

export function buildAnalogyLinkBatch(ctx: LessonQuestionContext): ImposterQuestion[] {
  const analogies = ctx.vocabulary.analogies;
  const pool: ImposterQuestion[] = [];
  const lessonSubject = cleanSubject(ctx.lessonTitle, 'this concept');

  for (let i = 0; i < 10; i++) {
    const chunk = ctx.chunks[i % Math.max(1, ctx.chunks.length)];
    const specificStage = cleanSubject(chunk?.title || '', lessonSubject);
    const analogyHint = analogies[i % Math.max(1, analogies.length)] || `Functions in ${specificStage}`;

    pool.push({
      id: `q_analog_${i + 1}`,
      type: 'analogy_link',
      prompt: `In one word, what role does ${specificStage} play in ${lessonSubject}?`,
      topicClue: lessonSubject,
      contextHint: analogyHint,
    });
  }
  return pool;
}

export function buildActionVerbBatch(ctx: LessonQuestionContext): ImposterQuestion[] {
  const pool: ImposterQuestion[] = [];
  const lessonSubject = cleanSubject(ctx.lessonTitle, 'this task');

  for (let i = 0; i < 10; i++) {
    const chunk = ctx.chunks[i % Math.max(1, ctx.chunks.length)];
    const specificStage = cleanSubject(chunk?.title || '', lessonSubject);

    pool.push({
      id: `q_verb_${i + 1}`,
      type: 'action_verb',
      prompt: `Name one action verb someone does while working on ${specificStage}.`,
      topicClue: lessonSubject,
      contextHint: chunk?.studentTasks[0] || `${specificStage} activity`,
    });
  }
  return pool;
}

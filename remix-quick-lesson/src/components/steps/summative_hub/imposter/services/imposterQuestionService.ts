import { ImposterQuestion, ImposterQuestionType } from '../types/imposterTypes';
import { LessonChunk } from '../../../../../types';
import { getOrGeneratePool } from './generator/imposterQuestionStorage';

export const QUESTION_TYPE_LABELS: Record<ImposterQuestionType, string> = {
  component_name_drop: 'Name Drop',
  real_world_app: 'Application',
  analogy_link: 'Analogy Link',
  action_verb: 'Action Verb',
};

export function createDefaultCustomQuestion(lessonTitle: string): ImposterQuestion {
  return {
    id: `imposter_custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    type: 'component_name_drop',
    prompt: `In this lesson, identify a key term or component of ${lessonTitle || 'the topic'}.`,
    topicClue: lessonTitle || 'Classroom Subject',
    forbiddenTerm: 'the title',
    contextHint: 'Focus on primary concepts covered in class',
    imposterClue: 'Bluff by describing the general context without naming specific items',
    correctAnswer: 'Key Concept',
    chunkTitle: 'Core Learning',
  };
}

export function reRollSingleQuestion(
  target: ImposterQuestion,
  lessonTitle: string,
  chunks: LessonChunk[] = []
): ImposterQuestion {
  const poolResult = getOrGeneratePool(lessonTitle, chunks);
  const candidates = poolResult.questions.filter(
    (q) => q.type === target.type && q.prompt !== target.prompt
  );
  const pick = candidates[Math.floor(Math.random() * candidates.length)] ||
    poolResult.questions[Math.floor(Math.random() * poolResult.questions.length)];

  if (pick) {
    return {
      ...pick,
      id: target.id,
      chunkTitle: target.chunkTitle || chunks[0]?.title || 'Core Stage',
      imposterClue: pick.contextHint
        ? `Hint: Think about ${pick.contextHint}`
        : 'Bluff by using context cues from peer responses',
    };
  }

  return {
    ...target,
    prompt: `Explain how ${lessonTitle || 'this topic'} is applied in practical classroom scenarios.`,
    imposterClue: 'Bluff by describing everyday practical observations.',
  };
}

export function getInitialImposterDeck(
  lessonTitle: string,
  chunks: LessonChunk[] = [],
  desiredDeckSize: number = 12
): ImposterQuestion[] {
  const poolResult = getOrGeneratePool(lessonTitle, chunks);
  const size = Math.max(8, desiredDeckSize);
  const initial = poolResult.questions.slice(0, size).map((q, idx) => {
    const chunk = chunks[idx % Math.max(1, chunks.length)];
    return {
      ...q,
      chunkTitle: chunk?.title || `Stage ${idx + 1}`,
      imposterClue: q.contextHint
        ? `Hint: Connect your answer to ${q.contextHint}`
        : 'Observe others and give a plausible general response',
      correctAnswer: q.forbiddenTerm ? `Avoid "${q.forbiddenTerm}"` : 'Accurate lesson terminology',
    };
  });
  return initial.length > 0 ? initial : [createDefaultCustomQuestion(lessonTitle)];
}

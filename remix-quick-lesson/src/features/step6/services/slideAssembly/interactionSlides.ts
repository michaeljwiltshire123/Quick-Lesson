import { LessonChunk } from '../../../../types';
import { SlideItem } from '../../types/slideTypes';
import { cleanText, createContentSlide, notesForChunk } from './slideAssemblyHelpers';
import { starterTitle } from './studentTitles';

export function createTaskSlides(chunk: LessonChunk): SlideItem[] {
  const task = [chunk.formativeTaskTitle, chunk.formativeTaskDetails, chunk.formativeTaskGrouping]
    .map(cleanText).filter(Boolean).join('\n\n');
  if (!task) return [];
  const question = createContentSlide(chunk, `slide-task-${chunk.id}`, chunk.formativeTaskTitle || chunk.title, task, 'custom');
  const explanation = cleanText(chunk.workedExample || chunk.coreExplanation || chunk.theoryBullets);
  if (!explanation) return [question];
  const answer = createContentSlide(chunk, `slide-answer-${chunk.id}`, 'Worked Example', explanation, 'custom');
  return [question, answer];
}

function selectedStarters(chunk: LessonChunk): any[] {
  const discussion = Array.isArray(chunk.discussionStarters) ? chunk.discussionStarters : [];
  if (discussion.length) return discussion;
  return (Array.isArray(chunk.starterPool) ? chunk.starterPool : []).filter((card) => card?.isAttached);
}

export function createDiscussionSlides(chunk: LessonChunk): SlideItem[] {
  return selectedStarters(chunk).flatMap((card, index) => {
    const prompt = cleanText(card?.promptText);
    if (!prompt) return [];
    const key = card.id || index;
    const question = createContentSlide(
      chunk, `slide-question-${chunk.id}-${key}`, starterTitle(card.formatType, prompt), prompt, 'custom',
    );
    const explanation = cleanText(card.misconceptionWarning);
    const verdict = typeof card.isTrue === 'boolean' ? `Statement is ${card.isTrue ? 'true' : 'false'}.` : '';
    const answerText = [verdict, explanation].filter(Boolean).join('\n\n');
    if (!answerText) return [question];
    const answer = createContentSlide(chunk, `slide-debrief-${chunk.id}-${key}`, 'Think It Through', answerText, 'custom');
    answer.speakerNotes = { ...notesForChunk(chunk), teacherScript: card.teacherDeliveryLine || chunk.teacherScript || '' };
    return [question, answer];
  });
}

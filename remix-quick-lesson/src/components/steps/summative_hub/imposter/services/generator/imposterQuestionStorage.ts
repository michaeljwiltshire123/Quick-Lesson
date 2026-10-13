import { ImposterQuestion } from '../../types/imposterTypes';
import { LessonChunk } from '../../../../../../types';
import { generateFullImposterPool, PreGeneratedPoolResult } from './imposterQuestionPoolGenerator';

const POOL_STORAGE_KEY = 'imposter_question_pool_v2';
const ROUND_INDEX_KEY = 'imposter_round_index';

export function savePreGeneratedPool(result: PreGeneratedPoolResult): void {
  try {
    sessionStorage.setItem(POOL_STORAGE_KEY, JSON.stringify(result));
    sessionStorage.setItem(ROUND_INDEX_KEY, '0');
  } catch (err) {
    console.warn('Could not persist imposter question pool to sessionStorage:', err);
  }
}

export function loadPreGeneratedPool(): PreGeneratedPoolResult | null {
  try {
    const raw = sessionStorage.getItem(POOL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PreGeneratedPoolResult;
  } catch {
    return null;
  }
}

export function clearPreGeneratedPool(): void {
  try {
    sessionStorage.removeItem(POOL_STORAGE_KEY);
    sessionStorage.removeItem('imposter_question_pool');
    sessionStorage.removeItem(ROUND_INDEX_KEY);
  } catch {}
}

export function getOrGeneratePool(
  lessonTitle: string,
  chunks: LessonChunk[] = []
): PreGeneratedPoolResult {
  const existing = loadPreGeneratedPool();
  if (
    existing &&
    existing.questions?.length === 40 &&
    existing.lessonTitle === (lessonTitle || '').replace(/^lesson\s*\d*:\s*/i, '').trim()
  ) {
    return existing;
  }
  const generated = generateFullImposterPool(lessonTitle, chunks);
  savePreGeneratedPool(generated);
  return generated;
}

export function getPoolQuestionForRound(
  roundIndex: number,
  lessonTitle: string,
  chunks: LessonChunk[] = []
): ImposterQuestion {
  const poolResult = getOrGeneratePool(lessonTitle, chunks);
  const questions = poolResult.questions;
  const safeIndex = Math.max(0, roundIndex) % Math.max(1, questions.length);
  return questions[safeIndex] || questions[0];
}

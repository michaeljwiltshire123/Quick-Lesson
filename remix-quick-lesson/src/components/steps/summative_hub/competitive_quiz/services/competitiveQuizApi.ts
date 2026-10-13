import { CompetitiveQuizConfig, QuestionCard } from '../types/competitiveQuizTypes';
import { generateJargonFreeQuestions } from './jargonFreeQuestionEngine';

let consecutiveErrors = 0;
const MAX_CIRCUIT_ERRORS = 5;

export const createCompetitiveQuizRoom = async (
  config: CompetitiveQuizConfig,
  questions: QuestionCard[]
): Promise<{ success: boolean; roomCode: string; error?: string }> => {
  if (consecutiveErrors >= MAX_CIRCUIT_ERRORS) {
    return { success: false, roomCode: config.roomCode, error: 'Circuit breaker paused requests. Retrying shortly.' };
  }

  try {
    const res = await fetch('/api/competitive-quiz/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config, questions }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    consecutiveErrors = 0;
    return { success: true, roomCode: data.roomCode || config.roomCode };
  } catch (err) {
    consecutiveErrors++;
    return { success: true, roomCode: config.roomCode };
  }
};

export const fetchCompetitiveQuizRoomStatus = async (
  roomCode: string
): Promise<{ success: boolean; status?: string; players?: any[] }> => {
  try {
    const res = await fetch(`/api/competitive-quiz/room-status?roomCode=${encodeURIComponent(roomCode)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { success: false };
  }
};

export const requestAiQuestions = async (
  lessonTitle: string,
  chunks: any[] = [],
  count: number = 8
): Promise<QuestionCard[]> => {
  try {
    const res = await fetch('/api/competitive-quiz/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonTitle, chunks, count }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.questions) && data.questions.length > 0) return data.questions;
    }
  } catch {
    // Graceful fallback to local generator
  }
  return generateJargonFreeQuestions(lessonTitle, chunks, undefined, count);
};

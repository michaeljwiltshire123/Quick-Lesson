import { DontSayItRoomConfig, DontSayItGameState, SecretWordCard } from '../types/dontSayItTypes';
import { LessonChunk } from '../../../../../types';

export async function createDontSayItRoom(
  config: DontSayItRoomConfig,
  cards: SecretWordCard[]
): Promise<{ success: boolean; gameState?: DontSayItGameState; error?: string }> {
  try {
    const res = await fetch('/api/dont-say-it/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config, cards }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, gameState: data.gameState };
    }
  } catch {
    // Graceful offline fallback
  }

  const fallbackState: DontSayItGameState = {
    roomCode: config.roomCode,
    lessonTitle: config.lessonTitle,
    status: 'lobby',
    currentRound: 1,
    totalRounds: config.totalRounds,
    currentTeamIndex: 0,
    activeCardIndex: 0,
    cards,
    teams: config.teams,
    players: [],
    config,
    timerSeconds: config.timeLimitSeconds,
  };

  return { success: true, gameState: fallbackState };
}

export async function fetchDontSayItRoomStatus(
  roomCode: string
): Promise<{ success: boolean; gameState?: DontSayItGameState }> {
  try {
    const res = await fetch(`/api/dont-say-it/room-status?roomCode=${encodeURIComponent(roomCode)}`);
    if (res.ok) {
      const data = await res.json();
      return { success: true, gameState: data.gameState };
    }
  } catch {}
  return { success: false };
}

export async function extractCurriculumWordsFromLesson(
  lessonTitle: string,
  chunks: LessonChunk[],
  count = 8,
  bannedCount = 4
): Promise<Array<{ targetWord: string; bannedWords: string[]; hint?: string }>> {
  try {
    const res = await fetch('/api/dont-say-it/extract-words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonTitle, chunks, count, bannedCount }),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.cards) && data.cards.length > 0) {
        return data.cards;
      }
    }
  } catch {}
  return [];
}

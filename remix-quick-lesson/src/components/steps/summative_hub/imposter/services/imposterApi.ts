import { ImposterGameState, ImposterRoomConfig } from '../types/imposterTypes';

export function createFallbackGameState(config: ImposterRoomConfig): ImposterGameState {
  const safeTimer = Math.max(30, config.timerPreset || 30);
  return {
    roomCode: config.roomCode,
    status: 'lobby',
    config: { ...config, timerPreset: safeTimer as 30 | 60 },
    players: [],
    currentRound: 1,
    activeAttacks: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export async function createImposterRoom(config: ImposterRoomConfig): Promise<ImposterGameState> {
  try {
    const response = await fetch('/api/imposter/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    return (await response.json()) as ImposterGameState;
  } catch (err) {
    console.warn('[ImposterAPI] Falling back to local game state', err);
    return createFallbackGameState(config);
  }
}

export async function getImposterRoomStatus(roomCode: string): Promise<ImposterGameState | null> {
  try {
    const response = await fetch(`/api/imposter/room-status?roomCode=${encodeURIComponent(roomCode)}`);
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    return (await response.json()) as ImposterGameState;
  } catch (err) {
    console.warn('[ImposterAPI] Failed to fetch room status', err);
    return null;
  }
}

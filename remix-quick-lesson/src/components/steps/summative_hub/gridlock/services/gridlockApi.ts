import { GridlockGameState, GridlockRoomConfig } from '../types/gridlockTypes';

const API_BASE = '/api/gridlock';

export async function createGridlockRoom(
  config: Partial<GridlockRoomConfig>
): Promise<{ success: boolean; room: GridlockGameState }> {
  try {
    const res = await fetch(`${API_BASE}/create-room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Gridlock API offline fallback:', err);
    // Offline local fallback state
    return {
      success: true,
      room: {
        roomCode: config.roomCode || 'GRID',
        lessonTitle: config.lessonTitle || 'Lesson Game',
        status: 'lobby',
        grid: [],
        scores: { redWins: 0, blueWins: 0, currentMatch: 1, format: config.tournamentFormat || 'best-of-3' },
        players: [],
        activeTileId: null,
        config: {
          roomCode: config.roomCode || 'GRID',
          lessonTitle: config.lessonTitle || 'Lesson Game',
          tournamentFormat: config.tournamentFormat || 'best-of-3',
          goldHexCount: config.goldHexCount ?? 2,
          allowFuzzyMatching: true,
          isLive: true,
        },
      },
    };
  }
}

export async function fetchGridlockRoomStatus(
  roomCode: string
): Promise<{ success: boolean; room: GridlockGameState | null }> {
  try {
    const res = await fetch(`${API_BASE}/room-status?roomCode=${encodeURIComponent(roomCode)}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch Gridlock room status:', err);
    return { success: false, room: null };
  }
}

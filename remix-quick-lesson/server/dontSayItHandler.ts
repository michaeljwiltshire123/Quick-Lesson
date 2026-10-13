import { Router, Request, Response } from 'express';

export const dontSayItRouter = Router();

interface RoomData {
  roomCode: string;
  lessonTitle: string;
  status: 'lobby' | 'in_game' | 'round_recap' | 'game_over';
  createdAt: number;
  config: any;
  cards: any[];
  gameState: any;
}

const activeRooms: Map<string, RoomData> = new Map();

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

dontSayItRouter.post('/api/dont-say-it/create-room', (req: Request, res: Response) => {
  const { config, cards } = req.body || {};
  const roomCode = (config?.roomCode && String(config.roomCode).toUpperCase()) || generateCode();

  const gameState = {
    roomCode,
    lessonTitle: config?.lessonTitle || 'UK Curriculum Showdown',
    status: 'lobby',
    currentRound: 1,
    totalRounds: config?.totalRounds || 3,
    currentTeamIndex: 0,
    activeCardIndex: 0,
    cards: cards || [],
    teams: config?.teams || [],
    players: [],
    config: config || {},
    timerSeconds: config?.timeLimitSeconds || 60,
  };

  const newRoom: RoomData = {
    roomCode,
    lessonTitle: config?.lessonTitle || 'UK Curriculum Showdown',
    status: 'lobby',
    createdAt: Date.now(),
    config,
    cards: cards || [],
    gameState,
  };

  activeRooms.set(roomCode, newRoom);
  return res.json({ success: true, roomCode, gameState });
});

dontSayItRouter.get('/api/dont-say-it/room-status', (req: Request, res: Response) => {
  const roomCode = String(req.query.roomCode || '').toUpperCase();
  const room = activeRooms.get(roomCode);
  if (!room) {
    return res.status(404).json({ success: false, message: 'Room not found' });
  }
  return res.json({ success: true, gameState: room.gameState });
});

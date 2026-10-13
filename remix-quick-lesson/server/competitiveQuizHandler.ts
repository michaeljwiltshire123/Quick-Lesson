import { Router, Request, Response } from 'express';

export const competitiveQuizRouter = Router();

interface RoomData {
  roomCode: string;
  lessonTitle: string;
  status: 'lobby' | 'in_game' | 'round_recap' | 'game_over';
  createdAt: number;
  config: any;
  questions: any[];
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

competitiveQuizRouter.post('/api/competitive-quiz/create-room', (req: Request, res: Response) => {
  const { config, questions } = req.body || {};
  const roomCode = (config?.roomCode && String(config.roomCode).toUpperCase()) || generateCode();

  const gameState = {
    roomCode,
    lessonTitle: config?.lessonTitle || 'Arena Showdown',
    status: 'lobby',
    currentRound: 1,
    totalRounds: config?.totalRounds || 8,
    activeQuestionIndex: 0,
    questions: questions || [],
    players: [],
    config: config || {},
    timerSeconds: config?.speedLimitSeconds || 10,
  };

  const newRoom: RoomData = {
    roomCode,
    lessonTitle: config?.lessonTitle || 'Arena Showdown',
    status: 'lobby',
    createdAt: Date.now(),
    config,
    questions: questions || [],
    gameState,
  };

  activeRooms.set(roomCode, newRoom);
  return res.json({ success: true, roomCode, gameState });
});

competitiveQuizRouter.get('/api/competitive-quiz/room-status', (req: Request, res: Response) => {
  const roomCode = String(req.query.roomCode || '').toUpperCase();
  const room = activeRooms.get(roomCode);
  if (!room) {
    return res.status(404).json({ success: false, error: 'Arena room not found' });
  }
  return res.json({
    success: true,
    roomCode: room.roomCode,
    status: room.status,
    players: room.gameState?.players || [],
    currentRound: room.gameState?.currentRound || 1,
  });
});

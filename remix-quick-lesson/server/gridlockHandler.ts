import { Router, Request, Response } from 'express';

export const gridlockRouter = Router();

interface RoomData {
  roomCode: string;
  lessonTitle: string;
  status: 'lobby' | 'in_game' | 'round_over' | 'tournament_over';
  createdAt: number;
  config: any;
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

gridlockRouter.post('/api/gridlock/create-room', (req: Request, res: Response) => {
  const { lessonTitle, tournamentFormat, goldHexCount, roomCode: requestedCode } = req.body || {};
  const roomCode = (requestedCode && String(requestedCode).toUpperCase()) || generateCode();

  const newRoom: RoomData = {
    roomCode,
    lessonTitle: lessonTitle || 'Curriculum Match',
    status: 'lobby',
    createdAt: Date.now(),
    config: {
      roomCode,
      lessonTitle: lessonTitle || 'Curriculum Match',
      tournamentFormat: tournamentFormat || 'best-of-3',
      goldHexCount: goldHexCount ?? 2,
      allowFuzzyMatching: true,
      isLive: true,
    },
  };

  activeRooms.set(roomCode, newRoom);
  res.json({ success: true, room: newRoom });
});

gridlockRouter.get('/api/gridlock/room-status', (req: Request, res: Response) => {
  const roomCode = String(req.query.roomCode || '').toUpperCase();
  const room = activeRooms.get(roomCode);
  if (!room) {
    return res.status(404).json({ success: false, message: 'Room not found' });
  }
  return res.json({ success: true, room });
});

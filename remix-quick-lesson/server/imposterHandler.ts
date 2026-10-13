import { Router, Request, Response } from 'express';

export interface ServerImposterConfig {
  imposterCount: 1 | 2 | 3;
  timerPreset: 30 | 60;
  offlinePrintable: boolean;
  roomCode: string;
  lessonTitle: string;
}

export interface ServerImposterState {
  roomCode: string;
  status: string;
  config: ServerImposterConfig;
  players: Array<{ id: string; name: string; role: 'innocent' | 'imposter'; isAlive: boolean; score: number; completedTasks: number }>;
  currentRound: number;
  activeAttacks: Array<{ id: string; type: string; name: string; durationSeconds: number; active: boolean }>;
  createdAt: number;
  updatedAt: number;
}

const activeRooms = new Map<string, ServerImposterState>();

export const imposterRouter = Router();

imposterRouter.post('/api/imposter/create-room', (req: Request, res: Response) => {
  try {
    const { imposterCount = 1, timerPreset = 30, offlinePrintable = false, roomCode, lessonTitle = 'Classroom Inquiry' } = req.body || {};
    
    if (!roomCode || typeof roomCode !== 'string') {
      return res.status(400).json({ error: 'Valid 4-letter room code is required' });
    }

    const safeTimer = Math.max(30, Number(timerPreset) || 30) as 30 | 60;
    const safeImposterCount = Math.min(3, Math.max(1, Number(imposterCount) || 1)) as 1 | 2 | 3;

    const newRoom: ServerImposterState = {
      roomCode: roomCode.toUpperCase(),
      status: 'lobby',
      config: {
        imposterCount: safeImposterCount,
        timerPreset: safeTimer,
        offlinePrintable: Boolean(offlinePrintable),
        roomCode: roomCode.toUpperCase(),
        lessonTitle: String(lessonTitle).trim(),
      },
      players: [],
      currentRound: 1,
      activeAttacks: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    activeRooms.set(newRoom.roomCode, newRoom);
    return res.status(200).json(newRoom);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create imposter room' });
  }
});

imposterRouter.get('/api/imposter/room-status', (req: Request, res: Response) => {
  try {
    const roomCode = String(req.query.roomCode || '').toUpperCase();
    if (!roomCode) {
      return res.status(400).json({ error: 'Room code required' });
    }

    const room = activeRooms.get(roomCode);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve room status' });
  }
});

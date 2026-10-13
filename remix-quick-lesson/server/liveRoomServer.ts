import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

interface Room { token: string; deck: unknown[]; index: number; questions: { id: number; text: string; category?: string }[]; clients: Set<WebSocket>; laser?: { x: number; y: number }; caption?: string; timerEndsAt?: number }
const rooms = new Map<string, Room>();

export function attachLiveRooms(server: Server) {
  const sockets = new WebSocketServer({ server, path: '/live', maxPayload: 8 * 1024 * 1024 });
  sockets.on('connection', (socket) => {
    let room: Room | undefined;
    let role = '';
    socket.on('message', (raw) => {
      let message: any;
      try { message = JSON.parse(raw.toString()); } catch { socket.close(1003, 'Invalid message'); return; }
      if (message.type === 'join') {
        const id = String(message.room || '').slice(0, 32);
        role = message.role;
        if ((role === 'teacher' || (role === 'projector' && message.token)) && id && !rooms.has(id)) {
          rooms.set(id, { token: String(message.token || ''), deck: [], index: 0, questions: [], clients: new Set() });
        }
        room = rooms.get(id);
        if (!room || !['student', 'teacher', 'remote', 'projector'].includes(role) || (role !== 'student' && room.token !== message.token)) {
          socket.send(JSON.stringify({ type: 'error', message: 'Room or teacher token is invalid.' })); socket.close(); return;
        }
        room.clients.add(socket);
        socket.send(JSON.stringify({ type: 'state', deck: room.deck, index: room.index, questions: room.questions }));
        return;
      }
      if (!room) return;
      if (message.type === 'state' && role === 'teacher') {
        room.deck = Array.isArray(message.deck) ? message.deck.slice(0, 250) : room.deck;
        room.index = Math.max(0, Math.min(room.deck.length - 1, Number(message.index) || 0));
      } else if (message.type === 'control' && role === 'remote') {
        room.index = Math.max(0, Math.min(room.deck.length - 1, room.index + (message.direction < 0 ? -1 : 1)));
      } else if (message.type === 'question' && role === 'student') addResponse(room, String(message.text || '').slice(0, 500));
      else if (message.type === 'response' && role === 'student') addResponse(room, String(message.text || '').slice(0, 500), String(message.category || 'Feedback').slice(0, 80));
      else if (role === 'teacher' && message.type === 'removeQuestion') room.questions = room.questions.filter((q) => q.id !== Number(message.id));
      else if (role === 'teacher' && message.type === 'caption') room.caption = String(message.text || '').slice(0, 500);
      else if (role === 'remote' && message.type === 'laser') room.laser = { x: clamp(message.x), y: clamp(message.y) };
      else if (role === 'remote' && message.type === 'timer') room.timerEndsAt = Date.now() + Math.max(0, Math.min(3600, Number(message.seconds) || 0)) * 1000;
      else return;
      room.clients.forEach((client) => client.readyState === WebSocket.OPEN && client.send(JSON.stringify({ type: 'state', deck: room!.deck, index: room!.index, questions: room!.questions, caption: room!.caption, laser: room!.laser, timerEndsAt: room!.timerEndsAt })));
    });
    socket.on('close', () => room?.clients.delete(socket));
  });
  return sockets;
}

function addResponse(room: Room, text: string, category?: string) {
  if (!text.trim()) return;
  room.questions.push({ id: Date.now() + room.questions.length, text, category });
  if (room.questions.length > 200) room.questions.shift();
}

function clamp(value: unknown) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

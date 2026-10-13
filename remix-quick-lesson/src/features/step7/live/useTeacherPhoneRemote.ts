import { useCallback, useEffect, useRef, useState } from 'react';
import { SlideItem } from '../../step6/types/slideTypes';

export type LiveRole = 'teacher' | 'remote' | 'student' | 'projector';
export interface LiveRoomState {
  deck?: SlideItem[];
  index?: number;
  questions?: { id: number; text: string; category?: string }[];
  caption?: string;
  laser?: { x: number; y: number };
  message?: string;
  timerEndsAt?: number;
}
export function useTeacherPhoneRemote(room: string, token: string, role: LiveRole, enabled: boolean, deck: SlideItem[]) {
  const socket = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [lastState, setLastState] = useState<LiveRoomState | null>(null);

  useEffect(() => {
    if (!enabled || !room) return;
    const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/live`);
    socket.current = ws;
    ws.onopen = () => {
      setConnected(true);
      setConnectionError('');
      ws.send(JSON.stringify({ type: 'join', room, token, role }));
      if (role === 'teacher') ws.send(JSON.stringify({ type: 'state', deck, index: 0 }));
    };
    ws.onmessage = (event) => {
      try { setLastState(JSON.parse(event.data) as LiveRoomState); }
      catch (error) { console.error('Live lesson received an invalid message.', error); }
    };
    ws.onclose = () => setConnected(false);
    ws.onerror = () => { setConnected(false); setConnectionError('Live connection failed. Check the network and try again.'); };
    return () => { ws.close(); socket.current = null; };
  }, [room, token, role, enabled, deck]);

  const send = useCallback((value: object) => {
    if (socket.current?.readyState === WebSocket.OPEN) socket.current.send(JSON.stringify(value));
  }, []);
  return { connected, connectionError: lastState?.message || connectionError, lastState, send };
}

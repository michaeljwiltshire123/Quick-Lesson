import React, { useEffect, useState } from 'react';
import { SlideItem } from '../../step6/types/slideTypes';
import { LiveRoomState } from './useTeacherPhoneRemote';
import { GyroscopeLaserWand } from './GyroscopeLaserWand';

interface Props { slides: SlideItem[]; state?: LiveRoomState | null; send: (data: object) => void; connected: boolean }
export const TeacherPhoneRemotePanel: React.FC<Props> = ({ slides, state, send, connected }) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const slide = state?.deck?.[state.index];
  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [running, seconds]);
  return <main className="min-h-screen space-y-4 bg-[#F8F6F0] p-5 text-[#2D2A26]">
    <header><h1 className="text-xl font-bold">Teacher Remote</h1><p>{connected ? 'Connected to lesson' : 'Connecting…'}</p></header>
    <h2 className="text-lg">{slide?.title || 'Waiting for teacher presentation'}</h2>
    <p className="whitespace-pre-wrap">{slide?.speakerNotes?.teacherScript}</p>
    <p className="text-xs">Slide {(state?.index ?? 0) + 1} of {state?.deck?.length || slides.length}</p>
    <div className="flex gap-3"><button onClick={() => send({ type: 'control', direction: -1 })} className="rounded bg-[#2D2A26] p-3 text-white">Previous</button><button onClick={() => send({ type: 'control', direction: 1 })} className="rounded bg-[#B85C38] p-3 text-white">Next</button></div>
    <section className="flex items-center gap-2"><span>Timer {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</span>
      {[1, 3, 5].map((minutes) => <button key={minutes} onClick={() => { setSeconds(minutes * 60); setRunning(true); send({ type: 'timer', seconds: minutes * 60 }); }}>{minutes} min</button>)}
      <button onClick={() => { setRunning(false); send({ type: 'timer', seconds: 0 }); }}>Pause</button>
      <button onClick={() => { setRunning(false); setSeconds(0); send({ type: 'timer', seconds: 0 }); }}>Reset</button></section>
    {state?.message && <p role="alert" className="text-sm text-red-300">{state.message}</p>}
    <GyroscopeLaserWand onPoint={(x, y) => send({ type: 'laser', x, y })} />
  </main>;
};

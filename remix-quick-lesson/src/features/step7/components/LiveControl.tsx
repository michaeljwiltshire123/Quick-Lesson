import React, { useEffect, useState } from 'react';
import { SlideItem } from '../../step6/types/slideTypes';
import { TeacherAudioRecorder } from '../live/audio/teacherAudioRecorder';
import { LiveTranslationService } from '../live/LiveTranslationService';
import { AudienceQADock } from '../live/AudienceQADock';
import { isExitTicketSlide } from '../live/exitTicket/exitTicketQREngine';
import { DualQRLaunchHub } from './hub/DualQRLaunchHub';

interface Props {
  title: string; active: boolean; connected: boolean; connectionError: string; qrError: string; qr: string; surveyQr: string; studentUrl: string; remoteQr: string; remoteUrl: string; room: string; token: string; slides: SlideItem[];
  questions: { id: number; text: string; category?: string }[]; send: (data: object) => void; index: number;
  setIndex: (index: number) => void; onStart: () => void; onStop: () => void; onRemove: (id: number) => void;
  recorder: TeacherAudioRecorder; onCaption: (text: string) => void;
}
export const LiveControl: React.FC<Props> = (props) => {
  const [error, setError] = useState('');
  const [recording, setRecording] = useState(false);
  const { title, active, connected, connectionError, qrError, qr, surveyQr, studentUrl, remoteQr, remoteUrl, room, token, slides, questions, send, index, setIndex, onStart, onStop, onRemove, recorder, onCaption } = props;
  const base = `${location.origin}/?room=${room}`;
  const open = (query: string) => {
    const popup = window.open(`${base}&${query}`, '_blank');
    if (popup) popup.opener = null;
    return popup;
  };
  const startPresentation = () => {
    const projector = open(`liveRole=projector&token=${token}`);
    if (!projector) setError('Allow pop-up windows to open the presentation display.');
    onStart();
  };
  const toggleAudio = async () => {
    try {
      if (recorder.isRecording) recorder.stop();
      else await recorder.start(title, index, slides[index]?.title || title);
      setRecording(recorder.isRecording);
      setError('');
    }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not start teacher audio recording.'); }
  };
  useEffect(() => { recorder.markSlide(index, slides[index]?.title || ''); }, [index, recorder, slides]);
  useEffect(() => {
    if (active && isExitTicketSlide(slides[index]?.title, slides[index]?.archetype)) {
      recorder.stop(); setRecording(false);
    }
  }, [active, index, recorder, slides]);
  return <section className="mt-6 rounded-2xl border border-[#2D2A26]/15 bg-white p-5 text-[#2D2A26]">
    <h2 className="text-xl font-bold">Live presentation</h2>
    <p className="mt-1 text-sm text-[#2D2A26]/70">The presentation opens in its own display. Student responses, questions and teacher-only audio controls stay here.</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {!active ? <button onClick={startPresentation} disabled={!slides.length} className="rounded-lg bg-[#B85C38] px-4 py-3 font-bold text-white disabled:opacity-40">Start live presentation</button>
        : <button onClick={onStop} className="rounded-lg bg-[#2D2A26] px-4 py-3 text-white">End lesson</button>}
      <button onClick={() => open(`liveRole=remote&token=${token}`)} disabled={!active} className="rounded-lg border border-[#2D2A26]/20 px-4 py-3 disabled:opacity-40">Open teacher remote</button>
      <button onClick={() => open(`liveRole=projector&token=${token}`)} disabled={!active} className="rounded-lg border border-[#2D2A26]/20 px-4 py-3 disabled:opacity-40">Open projector</button>
    </div>
    <p className="mt-2 text-xs text-[#2D2A26]/70">{active ? connected ? `Connected · ${title}` : 'Connecting to lesson…' : 'Microphone and live connections are off.'}</p>
    {connectionError && <p role="alert" className="mt-2 text-sm text-red-700">{connectionError}</p>}
    {active && <div className="mt-4 grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2"><DualQRLaunchHub teacherQr={remoteQr} teacherUrl={remoteUrl} studentQr={qr} studentUrl={studentUrl} error={qrError} />
        {surveyQr && <p className="mt-2 text-xs text-stone-600">The final summative slide also displays an exit-ticket QR code.</p>}</div>
      <div className="space-y-3 rounded-xl border border-[#2D2A26]/10 bg-[#F8F6F0] p-4"><h3 className="font-bold">Teacher tools</h3>
        <div className="flex gap-2"><button onClick={() => { const next = Math.max(0, index - 1); setIndex(next); send({ type: 'state', deck: slides, index: next }); }}>Previous slide</button>
          <button onClick={() => { const next = Math.min(slides.length - 1, index + 1); setIndex(next); send({ type: 'state', deck: slides, index: next }); }}>Next slide</button></div>
        <button onClick={() => void toggleAudio()} className="rounded border px-3 py-2">{recording ? 'Stop teacher recording' : 'Record teacher audio'}</button>
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <LiveTranslationService onCaption={onCaption} />
      </div>
    </div>}
    {active && <div className="mt-4"><AudienceQADock questions={questions} onDismiss={onRemove} /></div>}
  </section>;
};

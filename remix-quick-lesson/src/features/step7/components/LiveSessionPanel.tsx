import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { SlideItem } from '../../step6/types/slideTypes';
import { useTeacherPhoneRemote } from '../live/useTeacherPhoneRemote';
import { TeacherAudioRecorder } from '../live/audio/teacherAudioRecorder';
import { AudioDownloadWidget } from '../live/audio/AudioDownloadWidget';
import { createExitTicketQr } from '../live/exitTicket/exitTicketQREngine';
import { ExitTicketResultsPanel } from '../live/exitTicket/ExitTicketResultsPanel';
import { ExitTicketResponse, loadExitTicketResponses, saveExitTicketResponses } from '../live/exitTicket/exitTicketStorage';
import { LiveProjectorStage } from '../live/LiveProjectorStage';
import { TeacherPhoneRemotePanel } from '../live/TeacherPhoneRemotePanel';
import { StudentView } from '../live/StudentView';
import { ExitTicketReviewPanel } from '../live/ExitTicketReviewPanel';
import { LiveControl } from './LiveControl';

interface Props { slides: SlideItem[]; title: string }
export const LiveSessionPanel: React.FC<Props> = ({ slides, title }) => {
  const query = new URLSearchParams(location.search);
  const role = query.get('liveRole');
  const roomParam = query.get('room') || '';
  const tokenParam = query.get('token') || '';
  const room = useMemo(() => roomParam || crypto.randomUUID(), [roomParam]);
  const token = useMemo(() => tokenParam || crypto.randomUUID(), [tokenParam]);
  const [live, setLive] = useState(false);
  const [qr, setQr] = useState('');
  const [surveyQr, setSurveyQr] = useState('');
  const [surveyUrl, setSurveyUrl] = useState('');
  const [remoteQr, setRemoteQr] = useState('');
  const [remoteUrl, setRemoteUrl] = useState('');
  const [qrError, setQrError] = useState('');
  const [studentUrl, setStudentUrl] = useState('');
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState<ExitTicketResponse[]>(() => loadExitTicketResponses(room));
  const [point, setPoint] = useState<{ x: number; y: number }>();
  const active = role ? true : live;
  const actualRole = role === 'student' ? 'student' : role === 'remote' ? 'remote' : role === 'projector' ? 'projector' : 'teacher';
  const { connected, connectionError, lastState, send } = useTeacherPhoneRemote(room, token, actualRole, active, slides);
  const recorder = useMemo(() => new TeacherAudioRecorder(room), [room]);

  useEffect(() => {
    if (actualRole !== 'teacher' || !live || !connected) return;
    send({ type: 'state', deck: slides, index });
  }, [actualRole, connected, index, live, send, slides]);
  useEffect(() => {
    if (lastState?.questions) {
      setQuestions(lastState.questions);
      try { saveExitTicketResponses(room, lastState.questions); }
      catch (error) { console.error('Could not save exit-ticket responses for this lesson.', error); }
    }
    if (typeof lastState?.index === 'number' && lastState.index !== index) setIndex(lastState.index);
    setPoint(lastState?.laser);
  }, [index, lastState]);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const response = await fetch('/api/live-address');
      if (!response.ok) throw new Error('Could not find a network address for student devices.');
      const data = await response.json() as { origin?: string };
      if (!data.origin) throw new Error('No local network address is available.');
      const student = new URL('/?', data.origin);
      student.searchParams.set('liveRole', 'student'); student.searchParams.set('room', room);
      const remote = new URL('/?', data.origin);
      remote.searchParams.set('liveRole', 'remote'); remote.searchParams.set('room', room); remote.searchParams.set('token', token);
      const [image, survey, remoteImage] = await Promise.all([
        QRCode.toDataURL(student.toString()), createExitTicketQr(student.toString()), QRCode.toDataURL(remote.toString()),
      ]);
      if (!cancelled) {
        setStudentUrl(student.toString()); setQr(image); setSurveyQr(survey.image); setSurveyUrl(survey.url);
        setRemoteUrl(remote.toString()); setRemoteQr(remoteImage); setQrError('');
      }
    })().catch((error) => {
      console.error('Could not create student join QR code.', error);
      if (!cancelled) setQrError('Could not create a phone-ready QR code. Open this lesson using the computer’s network address.');
    });
    return () => { cancelled = true; };
  }, [room, token]);
  const remove = (id: number) => send({ type: 'removeQuestion', id });
  if (role === 'remote') return <TeacherPhoneRemotePanel slides={slides} state={lastState} send={send} connected={connected} />;
  if (role === 'student') {
    const deck = (lastState?.deck || []) as SlideItem[];
    return <StudentView slide={deck[lastState?.index || 0]} caption={lastState?.caption} send={send} connectionError={connectionError}
      exitTicketMode={query.get('exitTicket') === '1'} />;
  }
  if (role === 'projector') {
    const deck = lastState?.deck || slides;
    return <LiveProjectorStage slide={deck[index]} index={index} count={deck.length} point={point} timerEndsAt={lastState?.timerEndsAt}
      exitTicketQr={surveyQr} exitTicketUrl={surveyUrl}
      onPrev={() => send({ type: 'control', direction: -1 })} onNext={() => send({ type: 'control', direction: 1 })} />;
  }
  return <><LiveControl title={title} active={live} connected={connected} connectionError={connectionError} qrError={qrError} qr={qr} studentUrl={studentUrl} remoteQr={remoteQr} remoteUrl={remoteUrl} room={room} token={token} slides={slides}
    surveyQr={surveyQr}
    questions={questions} send={send} index={index} setIndex={setIndex} onStart={() => { setLive(true); setIndex(0); }}
    onStop={() => { setLive(false); recorder.stop(); }} onRemove={remove} recorder={recorder} onCaption={(text) => send({ type: 'caption', text })} />
    <AudioDownloadWidget sessionId={room} lessonTitle={title} />
    {!live && <ExitTicketResultsPanel responses={questions} onDismiss={remove} lessonTitle={title} sessionId={room} />}
  </>;
};

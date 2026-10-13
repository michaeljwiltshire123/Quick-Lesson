import React, { useEffect, useState } from 'react';
import { SlideItem } from '../../step6/types/slideTypes';
import { isExitTicketSlide } from './exitTicket/exitTicketQREngine';

export const LiveProjectorStage: React.FC<{ slide?: SlideItem; index: number; count: number; point?: { x: number; y: number }; timerEndsAt?: number; exitTicketQr?: string; exitTicketUrl?: string; onPrev: () => void; onNext: () => void }> =
  ({ slide, index, count, point, timerEndsAt, exitTicketQr, exitTicketUrl, onPrev, onNext }) => {
  const [now, setNow] = useState(Date.now());
  const seconds = timerEndsAt ? Math.max(0, Math.ceil((timerEndsAt - now) / 1000)) : 0;
  useEffect(() => {
    if (!timerEndsAt || seconds <= 0) return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [seconds, timerEndsAt]);
  useEffect(() => {
    if (seconds !== 10) return;
    try {
      const audio = new AudioContext();
      const beep = audio.createOscillator();
      beep.connect(audio.destination); beep.frequency.value = 880; beep.start(); beep.stop(audio.currentTime + 0.15);
      beep.onended = () => void audio.close();
    } catch (error) { console.warn('Countdown warning sound is unavailable.', error); }
  }, [seconds]);
  return (
    <main className="fixed inset-0 z-50 flex flex-col bg-[#F8F6F0] p-4 text-[#2D2A26]">
      {timerEndsAt && <p className="text-right text-2xl font-bold" aria-live="polite">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</p>}
      <div className="relative flex-1 overflow-hidden rounded-2xl p-8" style={{ background: slide?.theme?.backgroundColor || 'white', color: slide?.theme?.textColor || '#222' }}>
        <h1 className="text-4xl font-bold">{slide?.title}</h1>
        {slide?.elements.map((element) => element.type === 'image'
          ? <img key={element.id} src={element.content} alt={element.caption || ''} className="max-h-[65vh] max-w-full object-contain" />
          : element.type === 'video' ? <ProjectorVideo key={element.id} url={element.content} title={element.caption || slide.title} />
          : <p key={element.id} className="mt-5 whitespace-pre-wrap text-2xl">{element.content}</p>)}
        {slide && index === count - 1 && isExitTicketSlide(slide.title, slide.archetype) && exitTicketQr &&
          <a href={exitTicketUrl} className="absolute bottom-4 right-4 rounded-xl bg-white p-2 text-center shadow-lg" target="_blank" rel="noreferrer">
            <img src={exitTicketQr} alt="Scan to complete this lesson's exit ticket" className="h-28 w-28" />
            <span className="block text-xs font-bold">Scan to share feedback</span>
          </a>}
        {point && <span style={{ left: `${point.x}%`, top: `${point.y}%` }} className="absolute h-5 w-5 rounded-full bg-red-500 shadow-[0_0_18px_8px_rgba(239,68,68,.7)]" />}
      </div>
      <footer className="flex justify-between py-3"><button onClick={onPrev}>Previous</button><span>{index + 1} / {count}</span><button onClick={onNext}>Next</button></footer>
    </main>
  );
};

const ProjectorVideo: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/)?.[1];
  return id ? <iframe title={title} src={`https://www.youtube-nocookie.com/embed/${id}`} className="max-h-[65vh] aspect-video w-full" allowFullScreen />
    : <video controls src={url} className="max-h-[65vh] max-w-full" />;
};

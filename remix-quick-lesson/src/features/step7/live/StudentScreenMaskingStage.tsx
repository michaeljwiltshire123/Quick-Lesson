import React, { useState } from 'react';
import { SlideItem } from '../../step6/types/slideTypes';

interface Props { slide?: SlideItem; onSubmit: (text: string, category: string) => void; onAsk: (text: string) => void; caption?: string; lowBandwidth: boolean; onBandwidthChange: () => void; exitTicketMode?: boolean }
export const StudentScreenMaskingStage: React.FC<Props> = ({ slide, onSubmit, onAsk, caption, lowBandwidth, onBandwidthChange, exitTicketMode }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  if (!slide) return <main className="p-8 text-center">Waiting for the teacher to start the lesson…</main>;
  const submit = (category: string) => {
    if (!text.trim()) { setError('Enter a response first.'); return; }
    if (category === 'Confidence (1–5)' && !/^[1-5]$/.test(text.trim())) { setError('Enter a confidence rating from 1 to 5.'); return; }
    onSubmit(text, category); setText(''); setError('');
  };
  return (
    <main className="min-h-screen bg-[#F8F6F0] p-5 text-[#2D2A26]">
      <article className="mx-auto max-w-xl rounded-2xl border border-[#2D2A26]/10 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase text-[#9A4B2A]">{exitTicketMode ? 'Lesson exit ticket' : `Your lesson · ${slide.title}`}</p>
        {exitTicketMode && <p className="mt-2 text-sm text-stone-600">Share what you learned and what still needs explaining. Do not include your name.</p>}
        {!exitTicketMode && <button onClick={onBandwidthChange} className="mt-2 text-xs underline">{lowBandwidth ? 'Use full media view' : 'Use low-bandwidth text view'}</button>}
        {!exitTicketMode && slide.elements.map((el) => {
          if (el.type === 'image') return lowBandwidth ? null : <img key={el.id} src={el.content} alt={el.caption || ''} className="my-4 max-h-64 w-full object-contain" />;
          if (el.type === 'video') return lowBandwidth
            ? <p key={el.id}>{el.caption || 'Video resource'} (hidden in low-bandwidth mode)</p>
            : <MediaEmbed key={el.id} url={el.content} caption={el.caption} />;
          return <p key={el.id} className="my-4 whitespace-pre-wrap text-lg">{el.content}</p>;
        })}
        {caption && <p className="rounded bg-[#FBF2EA] p-3 text-sm">{caption}</p>}
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={exitTicketMode ? 'Write your response' : 'Your answer or anonymous question'}
          className="mt-4 w-full rounded-xl border p-3" />
        {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => submit('Key Concept')} className="rounded-lg bg-[#B85C38] px-3 py-2 text-white">Key concept</button>
          <button onClick={() => submit('Muddiest Point')} className="rounded-lg bg-[#B85C38] px-3 py-2 text-white">Muddiest point</button>
          <button onClick={() => submit('Confidence (1–5)')} className="rounded-lg bg-[#B85C38] px-3 py-2 text-white">Confidence (1–5)</button>
          <button onClick={() => submit('Anonymous Feedback')} className="rounded-lg bg-[#B85C38] px-3 py-2 text-white">Anonymous feedback</button>
          {!exitTicketMode && <button onClick={() => { if (text.trim()) { onAsk(text); setText(''); setError(''); } else setError('Enter a question first.'); }} className="rounded-lg border px-3 py-2">Ask anonymously</button>}
        </div>
      </article>
    </main>
  );
};

const MediaEmbed: React.FC<{ url: string; caption?: string }> = ({ url, caption }) => {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/)?.[1];
  return videoId ? <iframe title={caption || 'Lesson video'} src={`https://www.youtube-nocookie.com/embed/${videoId}`}
    className="my-4 aspect-video w-full" allowFullScreen /> : <video controls src={url} className="my-4 max-h-64 w-full" />;
};

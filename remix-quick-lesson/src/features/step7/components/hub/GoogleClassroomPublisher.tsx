import React, { useState } from 'react';
import { LessonChunk } from '../../../../types';
import { SlideItem } from '../../../step6/types/slideTypes';
import { copyText } from '../../services/exporters/clipboardCopy';
import { createClassroomPost } from '../../services/exporters/classroomPostService';

interface Props { title: string; chunks: LessonChunk[]; slides: SlideItem[] }
function draft(title: string, chunks: LessonChunk[], slides: SlideItem[]) {
  const post = createClassroomPost(title, chunks);
  const objectives = chunks.map((chunk) => chunk.learningIntent).filter(Boolean);
  const links = [...chunks.flatMap((chunk) => chunk.attachments?.map((item) => item.url) || []),
    ...slides.flatMap((slide) => slide.elements.flatMap((element) => [element.meta?.linkUrl, element.type === 'video' ? element.content : '']))]
    .filter((url): url is string => typeof url === 'string' && /^https?:\/\//i.test(url));
  return { title: post.title, body: [post.body, objectives.length ? `\nLesson objectives:\n${objectives.map((item) => `• ${item}`).join('\n')}` : '',
    links.length ? `\nLesson resources:\n${[...new Set(links)].map((url) => `• ${url}`).join('\n')}` : ''].join('') };
}
export const GoogleClassroomPublisher: React.FC<Props> = ({ title, chunks, slides }) => {
  const [message, setMessage] = useState('');
  const [fallback, setFallback] = useState('');
  const publishDraft = async () => {
    const post = draft(title, chunks, slides);
    const text = `${post.title}\n\n${post.body}`;
    if (await copyText(text)) { setMessage('Announcement draft copied. Paste it into your Google Classroom class.'); setFallback(''); }
    else { setMessage('Clipboard unavailable. Select the draft below to copy it.'); setFallback(text); }
  };
  return <section className="rounded-xl border border-amber-200 bg-white p-4">
    <h3 className="font-bold">Google Classroom announcement</h3>
    <p className="mt-1 text-sm text-stone-600">Copy the lesson summary, objectives and resource links into a Classroom post.</p>
    <button onClick={() => void publishDraft()} disabled={!chunks.length} className="mt-3 rounded-lg bg-amber-800 px-4 py-2 font-semibold text-white disabled:opacity-40">Copy announcement draft</button>
    {message && <p role="status" className="mt-2 text-sm">{message}</p>}
    {fallback && <textarea readOnly value={fallback} onFocus={(event) => event.currentTarget.select()} className="mt-2 min-h-32 w-full rounded-lg border p-2 text-sm" />}
  </section>;
};

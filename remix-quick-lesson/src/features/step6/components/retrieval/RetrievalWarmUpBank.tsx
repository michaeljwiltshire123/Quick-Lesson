import React, { useMemo, useState } from 'react';
import { SlideElement } from '../../types/slideTypes';
import { extractRetrievalPrompts, loadRetrievalPrompts } from './retrievalBankStore';

interface Props { lessonTitle: string; slides: import('../../types/slideTypes').SlideItem[]; onInsert: (element: SlideElement) => void; onOpenWarmup: () => void }
export const RetrievalWarmUpBank: React.FC<Props> = ({ lessonTitle, slides, onInsert, onOpenWarmup }) => {
  const [selected, setSelected] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const questions = useMemo(() => {
    const current = extractRetrievalPrompts(lessonTitle, slides);
    return [...current, ...loadRetrievalPrompts().filter((item) => !current.some((entry) => entry.id === item.id))]
      .slice(0, 80);
  }, [lessonTitle, slides]);
  const insert = (text: string, source: string) => {
    if (!text.trim()) return;
    onInsert({ id: `retrieval-${crypto.randomUUID()}`, type: 'text', x: 8, y: 72, width: 84, height: 18,
      content: text.trim(), fillColor: '#FFF7E6', borderColor: '#D97706', borderWidth: 2,
      textStyle: { bold: true, fontSize: 22 }, meta: { retrievalSource: source } });
  };
  return <section className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
    <h3 className="font-bold text-amber-950">Retrieval warm-up bank</h3>
    <button onClick={onOpenWarmup} className="mt-2 w-full rounded-lg bg-sky-900 px-3 py-2 text-left text-sm font-semibold text-white">Open hidden Warm-up slide editor</button>
    <p className="mt-1 text-xs text-amber-900/75">Choose a saved question and add it to the active slide.</p>
    {!questions.length ? <p className="mt-2 text-sm text-amber-950/70">Questions from this and previous lessons will appear here as you create them.</p> :
      <><select aria-label="Saved retrieval question" value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-lg border border-amber-200 bg-white p-2 text-sm">
        <option value="">Select a question…</option>{questions.map((item) => <option key={item.id} value={item.id}>{item.prompt.slice(0, 100)} · {item.lesson}</option>)}
      </select><button disabled={!selected} onClick={() => { const item = questions.find((entry) => entry.id === selected); if (item) insert(item.prompt, item.lesson); }} className="mt-2 rounded-lg bg-amber-800 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40">Add selected to active slide</button></>}
    <textarea value={customPrompt} onChange={(event) => setCustomPrompt(event.target.value)} rows={2} placeholder="Write a recap question for next lesson…" className="mt-3 w-full rounded-lg border border-amber-200 bg-white p-2 text-sm" />
    <button disabled={!customPrompt.trim()} onClick={() => { insert(customPrompt, lessonTitle); setCustomPrompt(''); }} className="mt-1 rounded-lg border border-amber-700 px-3 py-2 text-sm font-semibold text-amber-950 disabled:opacity-40">Add your question to active slide</button>
  </section>;
};

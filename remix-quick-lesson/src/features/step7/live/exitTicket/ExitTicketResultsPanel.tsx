import React from 'react';
import { downloadFile, safeFilename } from '../../services/exporters/downloadFile';
import { ExitTicketResponse } from './exitTicketStorage';

interface Props {
  responses: ExitTicketResponse[];
  onDismiss: (id: number) => void;
  lessonTitle: string;
  sessionId: string;
}
const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;

export const ExitTicketResultsPanel: React.FC<Props> = ({ responses, onDismiss, lessonTitle, sessionId }) => {
  const download = () => {
    const rows = [['Category', 'Response'], ...responses.map((item) => [item.category || 'Feedback', item.text])];
    const csv = rows.map((row) => row.map(quote).join(',')).join('\r\n');
    downloadFile(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'text/csv', `${safeFilename(lessonTitle)}-exit-ticket.csv`);
  };
  return <section className="rounded-2xl border bg-white p-4">
    <header className="flex flex-wrap items-center justify-between gap-2">
      <div><h2 className="font-bold">Exit-ticket responses</h2>
        <p className="text-xs text-stone-500">{lessonTitle} · session {sessionId.slice(0, 8)} · {responses.length} responses</p></div>
      <button onClick={download} disabled={!responses.length} className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40">Download CSV</button>
    </header>
    <div className="mt-3 grid gap-2 md:grid-cols-2">{['Key Concept', 'Muddiest Point', 'Confidence (1–5)', 'Anonymous Feedback'].map((label) =>
      <p key={label} className="rounded-lg bg-[#F8F6F0] p-2 text-sm"><b>{label}:</b> {responses.filter((r) => r.category === label).length}</p>)}</div>
    <ul className="mt-3 max-h-72 space-y-2 overflow-auto">{responses.map((response) =>
      <li key={response.id} className="flex items-start justify-between gap-3 rounded-lg border p-3 text-sm">
        <span><b>{response.category || 'Question'}:</b> {response.text}</span>
        <button aria-label="Remove response" onClick={() => onDismiss(response.id)} className="text-[#9A4B2A]">Remove</button>
      </li>)}</ul>
  </section>;
};

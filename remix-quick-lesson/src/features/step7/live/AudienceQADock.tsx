import React from 'react';

interface Question { id: number; text: string; category?: string }
export const AudienceQADock: React.FC<{ questions: Question[]; onDismiss: (id: number) => void }> = ({ questions, onDismiss }) => (
  <section className="rounded-2xl border bg-white p-4">
    <h3 className="font-bold">Anonymous questions & responses ({questions.length})</h3>
    {!questions.length && <p className="mt-2 text-sm text-stone-500">Questions and exit-ticket responses appear here.</p>}
    {questions.map((item) => <div key={item.id} className="mt-2 flex justify-between gap-2 border-t py-2 text-sm">
      <p><b>{item.category || 'Question'}:</b> {item.text}</p>
      <button onClick={() => onDismiss(item.id)} className="text-amber-800">Done</button>
    </div>)}
  </section>
);

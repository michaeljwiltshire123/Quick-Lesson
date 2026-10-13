import React from 'react';
import { AudienceQADock } from './AudienceQADock';

export interface ExitResponse { id: number; category?: string; text: string }
export const ExitTicketReviewPanel: React.FC<{ responses: ExitResponse[]; onDismiss: (id: number) => void }> = ({ responses, onDismiss }) => (
  <section className="rounded-2xl border bg-white p-4">
    <h2 className="font-bold">Post-lesson response review</h2>
    {['Key Concept', 'Muddiest Point', 'Confidence (1–5)', 'Anonymous Feedback'].map((label) => (
      <p key={label} className="mt-2 text-sm"><b>{label}:</b> {responses.filter((r) => r.category === label).length} responses</p>
    ))}
    <AudienceQADock questions={responses} onDismiss={onDismiss} />
  </section>
);

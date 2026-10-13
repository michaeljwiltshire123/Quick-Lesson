import React from 'react';
import { SpeakerNotesData } from '../../types/slideTypes';
import { Clock, BookOpenText } from 'lucide-react';
import { GlossaryField } from './GlossaryField';

interface SpeakerNotesPanelProps {
  notes: SpeakerNotesData;
  onUpdateNotes: (patch: Partial<SpeakerNotesData>) => void;
}

export const SpeakerNotesPanel: React.FC<SpeakerNotesPanelProps> = ({ notes, onUpdateNotes }) => (
  <section aria-label="Student academic notes" className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
    <div className="flex justify-between items-center gap-3">
      <h2 className="flex items-center gap-2 text-sm font-bold text-stone-900">
        <BookOpenText className="w-4 h-4 text-amber-700" /> Student Academic Notes
      </h2>
      <label className="flex items-center gap-2 text-xs text-stone-600">
        <Clock className="w-3.5 h-3.5" /> Slide time
        <input type="number" min={1} value={notes.timingMinutes || 5}
          onChange={(e) => onUpdateNotes({ timingMinutes: Math.max(1, Number(e.target.value) || 1) })}
          className="w-14 border border-stone-300 rounded px-2 py-1" />
        min
      </label>
    </div>
    <div className="grid md:grid-cols-2 gap-3">
      <GlossaryField glossary={notes.glossary || []} onChange={(glossary) => onUpdateNotes({ glossary })} />
      <NotesField label="Study suggestions" value={(notes.studySuggestions || []).join('\n')}
        onChange={(v) => onUpdateNotes({ studySuggestions: v.split('\n') })} />
      <NotesField label="Recommended reading / authors" value={(notes.furtherReading || []).join('\n')}
        onChange={(v) => onUpdateNotes({ furtherReading: v.split('\n') })} />
      <NotesField label="Step-by-step instructions" value={notes.stepInstructions || ''}
        onChange={(v) => onUpdateNotes({ stepInstructions: v })} />
      <NotesField label="Retrieval cues" value={notes.retrievalCues || ''}
        onChange={(v) => onUpdateNotes({ retrievalCues: v })} />
      <NotesField label="Common misconceptions / pitfalls" value={notes.misconceptionsWarning || ''}
        onChange={(v) => onUpdateNotes({ misconceptionsWarning: v })} />
    </div>
  </section>
);

const NotesField: React.FC<{ label: string; value: string; onChange: (value: string) => void }> =
  ({ label, value, onChange }) => (
    <label className="text-xs font-semibold text-stone-700">{label}
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-50 p-2 font-normal" />
    </label>
  );

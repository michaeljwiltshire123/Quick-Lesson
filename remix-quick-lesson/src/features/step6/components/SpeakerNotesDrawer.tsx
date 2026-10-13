import React, { useState } from 'react';
import { SpeakerNotesData } from '../types/slideTypes';
import { MessageSquareText, Clock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface SpeakerNotesDrawerProps {
  notes: SpeakerNotesData;
  onUpdateNotes: (patch: Partial<SpeakerNotesData>) => void;
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  notes,
  onUpdateNotes,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-stone-800 font-bold text-sm cursor-pointer hover:text-amber-800"
        >
          <MessageSquareText className="w-4 h-4 text-amber-700" />
          <span>Teacher Delivery Script & Pedagogical Notes</span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-stone-500" />
          <span>Allocated:</span>
          <input
            type="number"
            min={1}
            value={notes.timingMinutes}
            onChange={(e) => onUpdateNotes({ timingMinutes: Math.max(1, parseInt(e.target.value) || 1) })}
            className="w-12 bg-white border border-stone-300 rounded px-1.5 py-0.5 text-center font-bold text-stone-800"
          />
          <span>mins</span>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">
              Teacher Script (Spoken in class)
            </label>
            <textarea
              rows={3}
              value={notes.teacherScript}
              onChange={(e) => onUpdateNotes({ teacherScript: e.target.value })}
              placeholder="What to say when presenting this slide..."
              className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:bg-white focus:border-amber-600 focus:outline-none transition-all"
            />
          </div>

          {notes.pedagogicalTips.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-900">Pedagogical Checklist:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-amber-950">
                  {notes.pedagogicalTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

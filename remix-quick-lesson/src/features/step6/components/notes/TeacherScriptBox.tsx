import React from 'react';
import { SpeakerNotesData } from '../../types/slideTypes';
import { MessageSquareText, HelpCircle, ListOrdered } from 'lucide-react';
import { ZeroTechFallbackBox } from './ZeroTechFallbackBox';
import { AudioNarrationButton } from './AudioNarrationButton';

interface TeacherScriptBoxProps {
  notes: SpeakerNotesData;
  onUpdate: (patch: Partial<SpeakerNotesData>) => void;
}

export const TeacherScriptBox: React.FC<TeacherScriptBoxProps> = ({ notes, onUpdate }) => {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>"Dupe-the-Class" Hook & Provocation</span>
        </div>
        <input
          type="text"
          value={notes.dupeLine || ''}
          onChange={(e) => onUpdate({ dupeLine: e.target.value })}
          placeholder="e.g., 'Is it true that heavier objects always fall faster? Raise your hands...'"
          className="w-full text-xs font-medium text-amber-950 bg-white border border-amber-200 rounded-lg p-2.5 focus:border-amber-600 focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
            <MessageSquareText className="w-4 h-4 text-amber-700" />
            <span>Spoken Classroom Script</span>
          </label>
          <AudioNarrationButton scriptText={notes.teacherScript || ''} />
        </div>
        <textarea
          rows={3}
          value={notes.teacherScript || ''}
          onChange={(e) => onUpdate({ teacherScript: e.target.value })}
          placeholder="What to say to pupils during this phase of the lesson..."
          className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:bg-white focus:border-amber-600 focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
          <ListOrdered className="w-4 h-4 text-amber-700" />
          <span>Step-by-Step Delivery Cues</span>
        </label>
        <textarea
          rows={2}
          value={notes.stepInstructions || ''}
          onChange={(e) => onUpdate({ stepInstructions: e.target.value })}
          placeholder="1. Display slide. 2. Give 60s Think-Pair-Share. 3. Cold-call 2 pupils."
          className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:bg-white focus:border-amber-600 focus:outline-none transition-all font-mono"
        />
      </div>

      <ZeroTechFallbackBox
        fallbackPlan={notes.zeroTechPlan}
        onUpdateFallbackPlan={(zeroTechPlan) => onUpdate({ zeroTechPlan })}
      />
    </div>
  );
};

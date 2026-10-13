import React from 'react';
import { SpeakerNotesData } from '../../types/slideTypes';
import { AlertCircle, Brain, Sparkles, Plus, Trash2 } from 'lucide-react';

interface MisconceptionRetrievalCuesProps {
  notes: SpeakerNotesData;
  onUpdate: (patch: Partial<SpeakerNotesData>) => void;
}

export const MisconceptionRetrievalCues: React.FC<MisconceptionRetrievalCuesProps> = ({ notes, onUpdate }) => {
  const tips = notes.pedagogicalTips || [];

  const handleAddTip = () => onUpdate({ pedagogicalTips: [...tips, ''] });
  const handleEditTip = (idx: number, val: string) =>
    onUpdate({ pedagogicalTips: tips.map((t, i) => (i === idx ? val : t)) });
  const handleRemoveTip = (idx: number) =>
    onUpdate({ pedagogicalTips: tips.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-4">
      {/* Misconception Warning Alert */}
      <div className="bg-red-50/60 border border-red-200/70 rounded-xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
          <span>Common Student Misconception to Target</span>
        </div>
        <input
          type="text"
          value={notes.misconceptionsWarning || ''}
          onChange={(e) => onUpdate({ misconceptionsWarning: e.target.value })}
          placeholder="e.g. Pupils often confuse speed with velocity because direction is ignored..."
          className="w-full text-xs font-medium text-red-950 bg-white border border-red-200 rounded-lg p-2.5 focus:border-red-600 focus:outline-none transition-colors"
        />
      </div>

      {/* Retrieval Practice Cues */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
          <Brain className="w-4 h-4 text-amber-700" />
          <span>Retrieval & Revision Memory Cues</span>
        </label>
        <textarea
          rows={2}
          value={notes.retrievalCues || ''}
          onChange={(e) => onUpdate({ retrievalCues: e.target.value })}
          placeholder="Key recall questions for spaced retrieval (e.g., 'What formula links force and acceleration?')..."
          className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:bg-white focus:border-amber-600 focus:outline-none transition-all"
        />
      </div>

      {/* Pedagogical Tips Checklist */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Pedagogical Delivery Tips</span>
          </label>
          <button
            type="button"
            onClick={handleAddTip}
            className="text-xs text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Tip
          </button>
        </div>

        <div className="space-y-1.5">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={tip}
                onChange={(e) => handleEditTip(i, e.target.value)}
                placeholder="Teaching tip..."
                className="flex-1 text-xs bg-white border border-stone-200 rounded-lg p-2 text-stone-700 focus:outline-none focus:border-amber-600"
              />
              <button
                type="button"
                onClick={() => handleRemoveTip(i)}
                className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { LadderRungQuestion } from './typesLadder';
import { ShieldAlert, Trash2 } from 'lucide-react';

interface Props {
  rung: LadderRungQuestion;
  index: number;
  totalRungs: number;
  onChange: (updated: LadderRungQuestion) => void;
  onDelete: () => void;
}

export const LadderRungEditorCard: React.FC<Props> = ({ rung, index, totalRungs, onChange, onDelete }) => {
  const isTop = index === totalRungs - 1;
  return (
    <div className={`bg-white border rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 transition-all ${rung.isSafetyNet ? 'border-amber-500 bg-amber-50/20' : 'border-[#2D2A26]/15'}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#2D2A26] text-white rounded-xl text-xs font-bold font-mono">Rung {rung.rungNumber}/{totalRungs}</span>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-xl text-xs font-extrabold font-mono">{rung.pointValue.toLocaleString()} pts</span>
          {rung.isSafetyNet && (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" /> Safety Net
            </span>
          )}
          {isTop && <span className="px-2.5 py-1 bg-amber-500 text-white rounded-xl text-xs font-bold">Summit Prize 🏆</span>}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onChange({ ...rung, isSafetyNet: !rung.isSafetyNet })}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${rung.isSafetyNet ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-[#F8F6F0] text-[#2D2A26] border-[#2D2A26]/15 hover:bg-white'}`}>
            {rung.isSafetyNet ? 'Safety Net Active' : 'Set Safety Net'}
          </button>
          <button type="button" onClick={onDelete} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-[#2D2A26] mb-1">Prompt</label>
        <textarea rows={2} value={rung.prompt} onChange={(e) => onChange({ ...rung, prompt: e.target.value })}
          className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl p-2.5 text-xs text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {rung.choices.map((choice, cIdx) => (
          <div key={cIdx} className="flex items-center gap-2">
            <input type="radio" name={`correct-${rung.id}`} checked={rung.correctChoiceIndex === cIdx} onChange={() => onChange({ ...rung, correctChoiceIndex: cIdx })} className="accent-amber-500 cursor-pointer" />
            <input type="text" value={choice} onChange={(e) => {
              const newChoices = [...rung.choices];
              newChoices[cIdx] = e.target.value;
              onChange({ ...rung, choices: newChoices });
            }} className={`flex-1 bg-[#F8F6F0] border rounded-xl px-3 py-1.5 text-xs text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-amber-500 ${rung.correctChoiceIndex === cIdx ? 'border-emerald-600 bg-emerald-50/40 font-bold' : 'border-[#2D2A26]/15'}`} />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-bold text-[#2D2A26] mb-1">Feedback Explanation</label>
        <input type="text" value={rung.explanation} onChange={(e) => onChange({ ...rung, explanation: e.target.value })}
          className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl px-3 py-1.5 text-xs text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>
    </div>
  );
};

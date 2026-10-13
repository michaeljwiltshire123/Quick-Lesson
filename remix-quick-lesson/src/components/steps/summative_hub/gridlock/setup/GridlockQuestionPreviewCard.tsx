import React from 'react';
import { GridlockQuestion } from '../types/gridlockTypes';
import { MessageSquare, Lightbulb, Edit3 } from 'lucide-react';
import { GridlockVoiceReader } from '../helpers/GridlockVoiceReader';

interface Props {
  active: GridlockQuestion;
  index: number;
  isEditing: boolean;
  onToggleEditing: () => void;
  onUpdateQuestion?: (index: number, updated: GridlockQuestion) => void;
}

export const GridlockQuestionPreviewCard: React.FC<Props> = ({
  active,
  index,
  isEditing,
  onToggleEditing,
  onUpdateQuestion,
}) => {
  return (
    <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#2D2A26]/10 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 font-black font-mono text-xl flex items-center justify-center shadow-xs">
            {active.letter}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Hexagon #{index + 1}</span>
            <div className="text-xs font-bold text-[#2D2A26]">
              Target Word: <span className="font-black text-emerald-700 font-mono text-sm">{active.targetAnswer}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
            {active.bloomsLevel || active.difficulty || 'medium'}
          </span>
          <GridlockVoiceReader textToRead={active.prompt} size="sm" />
          <button type="button" onClick={onToggleEditing} className="p-1.5 text-xs text-gray-500 hover:text-[#2D2A26] rounded-lg hover:bg-black/5 cursor-pointer">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-xs font-medium text-[#2D2A26] bg-white p-3.5 rounded-xl border border-[#2D2A26]/10 shadow-xs">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-amber-700 mb-1">
          <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Host Clue</span>
        </div>
        {isEditing ? (
          <textarea value={active.prompt} onChange={(e) => onUpdateQuestion?.(index, { ...active, prompt: e.target.value })} className="w-full text-xs p-2 border rounded-lg" rows={2} />
        ) : (
          <p className="text-[#2D2A26] font-medium leading-relaxed">{active.prompt}</p>
        )}
      </div>

      {active.backupPrompt && (
        <div className="text-[11px] text-gray-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-amber-900 block text-[10px] uppercase">Backup Clue:</span>
              {active.backupPrompt}
            </div>
          </div>
          <GridlockVoiceReader textToRead={active.backupPrompt} label="Read Backup" size="sm" />
        </div>
      )}

      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
          Accepted Spellings & Phrasings ({active.acceptableAnswers?.length || 0}/8):
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {(active.acceptableAnswers || []).map((ans, i) => (
            <span key={`ans-${i}`} className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 font-mono text-[10px] font-medium">
              {ans}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

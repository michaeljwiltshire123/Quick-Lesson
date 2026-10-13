import React from 'react';
import { Eye, ShieldAlert, FileSpreadsheet, QrCode, CheckCircle2, Sparkles } from 'lucide-react';
import { PERSONA_STYLES } from './factories/questionPersonaEngine';

interface Props {
  title: string;
  isAttached: boolean;
  isGenerating: boolean;
  personaKey: string;
  setPersonaKey: (key: string) => void;
  onPreview: () => void;
  onInspector: () => void;
  onExport: () => void;
  onAttach: () => void;
  onGenerate: () => void;
}

export const LadderQuizHeaderCard: React.FC<Props> = ({
  title,
  isAttached,
  isGenerating,
  personaKey,
  setPersonaKey,
  onPreview,
  onInspector,
  onExport,
  onAttach,
  onGenerate,
}) => {
  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 text-[#2D2A26]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Escalation Ladder Studio</span>
          <h3 className="text-base font-black text-[#2D2A26] mt-1">{title}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={onPreview} className="flex items-center gap-1.5 px-3 py-2 bg-[#2D2A26] hover:bg-black text-amber-300 rounded-xl text-xs font-bold cursor-pointer transition-all">
            <Eye className="w-3.5 h-3.5" /><span>Preview</span>
          </button>
          <button type="button" onClick={onInspector} className="flex items-center gap-1.5 px-3 py-2 bg-[#2D2A26]/10 hover:bg-[#2D2A26]/20 text-[#2D2A26] rounded-xl text-xs font-bold cursor-pointer transition-all">
            <ShieldAlert className="w-3.5 h-3.5" /><span>Rigor</span>
          </button>
          <button type="button" onClick={onExport} className="flex items-center gap-1.5 px-3 py-2 bg-[#2D2A26]/10 hover:bg-[#2D2A26]/20 text-[#2D2A26] rounded-xl text-xs font-bold cursor-pointer transition-all">
            <FileSpreadsheet className="w-3.5 h-3.5" /><span>Export</span>
          </button>
          <button type="button" onClick={onAttach} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${isAttached ? 'bg-emerald-600 text-white' : 'bg-[#2D2A26] text-white'}`}>
            {isAttached ? <CheckCircle2 className="w-3.5 h-3.5" /> : <QrCode className="w-3.5 h-3.5 text-[#F59E0B]" />}
            <span>{isAttached ? 'Attached' : 'Attach'}</span>
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-[#2D2A26]/10 text-xs">
        <label className="block font-bold text-gray-700 mb-1">Rung Question Persona:</label>
        <select value={personaKey} onChange={(e) => setPersonaKey(e.target.value)} className="w-full p-2 border border-[#2D2A26]/15 rounded-xl bg-[#F8F6F0]">
          {Object.entries(PERSONA_STYLES).map(([key, item]) => <option key={key} value={key}>{item.name}</option>)}
        </select>
      </div>

      <button type="button" onClick={onGenerate} disabled={isGenerating}
        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
        <Sparkles className="w-4 h-4" /><span>{isGenerating ? 'Synthesising Escalation Rungs...' : 'Synthesise AI Escalation Rungs ✨'}</span>
      </button>
    </div>
  );
};

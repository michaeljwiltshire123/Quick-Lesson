import React, { useState } from 'react';
import { GridlockQuestion } from '../types/gridlockTypes';
import { GridlockCognitiveDepthCard } from './GridlockCognitiveDepthCard';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  questions: GridlockQuestion[];
  lessonTitle: string;
  onClose: () => void;
  onLaunchTournament: () => void;
}

export const GridlockPreFlightInspectorModal: React.FC<Props> = ({
  isOpen,
  questions,
  lessonTitle,
  onClose,
  onLaunchTournament,
}) => {
  if (!isOpen) return null;
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const safeList = questions || [];
  const filtered = filterLevel === 'all'
    ? safeList
    : safeList.filter((q) => (q?.bloomsLevel || 'Understand').toLowerCase() === filterLevel.toLowerCase());

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-3xl border border-[#2D2A26]/20 p-5 sm:p-6 shadow-2xl space-y-4 text-[#2D2A26] max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide">Pre-Flight Pedagogical Audit</h3>
              <p className="text-[11px] text-gray-500">5x5 Hexagon Board Quality Check • {lessonTitle || 'Lesson'}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="shrink-0">
          <GridlockCognitiveDepthCard questions={safeList} />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <div className="flex items-center justify-between text-xs pb-1">
            <span className="font-bold text-[10px] uppercase text-gray-500">25 Hex Clues Ready for Match</span>
            <div className="flex gap-1 text-[10px] font-bold">
              {['all', 'Remember', 'Understand', 'Apply', 'Analyse'].map((lvl) => (
                <button key={lvl} type="button" onClick={() => setFilterLevel(lvl)} className={`px-2 py-0.5 rounded-md cursor-pointer ${filterLevel === lvl ? 'bg-[#2D2A26] text-white' : 'bg-white border text-gray-600'}`}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {filtered.map((q, idx) => (
              <div key={q?.id || idx} className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Hex '{q?.letter || 'A'}'
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {q?.bloomsLevel || 'Understand'}
                  </span>
                </div>
                <div className="font-black text-[#2D2A26] truncate">{q?.targetAnswer}</div>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-tight">{q?.prompt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#2D2A26]/10 shrink-0">
          <span className="text-xs text-gray-500 font-medium">Ready to broadcast to student devices.</span>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="py-2 px-3 border border-[#2D2A26]/20 rounded-xl text-xs font-bold hover:bg-black/5 cursor-pointer">Back to Setup</button>
            <button type="button" onClick={onLaunchTournament} className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md">
              <CheckCircle className="w-4 h-4" /> <span>Launch Match Arena</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

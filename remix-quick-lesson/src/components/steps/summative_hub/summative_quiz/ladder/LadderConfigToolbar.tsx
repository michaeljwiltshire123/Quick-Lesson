import React from 'react';
import { LadderSkin, LifelineType } from './typesLadder';
import { Sliders, Award, Layers, ShieldCheck, Clock } from 'lucide-react';

interface Props {
  totalRungs: number; onChangeRungs: (r: number) => void;
  skin: LadderSkin; onChangeSkin: (s: LadderSkin) => void;
  activeLifelines: LifelineType[]; onChangeLifelines: (l: LifelineType[]) => void;
  maxStudentLifelines?: number; onChangeMaxStudentLifelines?: (n: number) => void;
  globalTimer: number; onChangeGlobalTimer: (t: number) => void;
}

const LIFELINE_OPTIONS: { key: LifelineType; label: string; desc: string }[] = [
  { key: 'fifty_fifty', label: '50:50 Split', desc: 'Removes 2 incorrect choices' },
  { key: 'ask_room', label: 'Ask Classroom', desc: 'Shows student vote distribution' },
  { key: 'safety_shield', label: 'Safety Shield', desc: 'Protects points on error' },
  { key: 'ask_player', label: 'Expert Peer', desc: 'Consult nominated classmate' },
  { key: 'question_swap', label: 'Concept Swap', desc: 'Replace rung question' },
];

export const LadderConfigToolbar: React.FC<Props> = ({
  totalRungs, onChangeRungs, skin, onChangeSkin, activeLifelines, onChangeLifelines, maxStudentLifelines = 3, onChangeMaxStudentLifelines, globalTimer, onChangeGlobalTimer,
}) => {
  const toggleLifeline = (lt: LifelineType) => {
    if (activeLifelines.includes(lt)) {
      if (activeLifelines.length <= 1) return;
      onChangeLifelines(activeLifelines.filter(l => l !== lt));
    } else {
      if (activeLifelines.length >= 5) return;
      onChangeLifelines([...activeLifelines, lt]);
    }
  };

  return (
    <div className="bg-white border border-[#2D2A26]/15 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 font-sans text-[#2D2A26]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2"><Sliders className="w-4 h-4 text-[#D97706]" /><h4 className="text-xs font-bold uppercase">Escalation Parameters</h4></div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-bold"><Layers className="w-3.5 h-3.5 text-[#D97706]" /> Rungs:
            <select value={totalRungs} onChange={(e) => onChangeRungs(Number(e.target.value))} className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl px-2 py-1 text-xs font-bold cursor-pointer font-mono">
              {Array.from({ length: 21 }, (_, i) => i + 5).map(n => <option key={n} value={n}>{n} Rungs</option>)}
            </select>
          </label>
          <label className="flex items-center gap-1.5 text-xs font-bold"><Award className="w-3.5 h-3.5 text-[#D97706]" /> Skin:
            <select value={skin} onChange={(e) => onChangeSkin(e.target.value as LadderSkin)} className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl px-2 py-1 text-xs font-bold cursor-pointer font-sans">
              <option value="film_tower">🎬 Film Tower</option>
              <option value="lab_rack">🔬 Lab Rack</option>
              <option value="temple_steps">🏛️ Temple Steps</option>
            </select>
          </label>
        </div>
      </div>
      <div className="border-t border-[#2D2A26]/10 pt-3 space-y-3">
        <div className="flex items-center justify-between mb-1"><span className="text-xs font-bold flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Lifeline Pool ({activeLifelines.length}/5 max):</span></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {LIFELINE_OPTIONS.map((opt) => {
            const isSelected = activeLifelines.includes(opt.key);
            return (
              <button key={opt.key} type="button" onClick={() => toggleLifeline(opt.key)} className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${isSelected ? 'bg-amber-50 border-amber-500 shadow-xs' : 'bg-[#F8F6F0] border-[#2D2A26]/10 hover:bg-white'}`}>
                <div className="text-xs font-bold">{opt.label}</div>
                <div className="text-[10px] text-[#2D2A26]/70 leading-tight mt-0.5">{opt.desc}</div>
              </button>
            );
          })}
        </div>
        <div className="pt-2 border-t border-[#2D2A26]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
          <span>Student Lifelines Allowed:</span>
          <select value={maxStudentLifelines} onChange={(e) => onChangeMaxStudentLifelines?.(Number(e.target.value))} className="bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-xl px-2.5 py-1 text-xs font-bold cursor-pointer font-mono">
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Lifelines</option>)}
          </select>
        </div>
        <div className="pt-2 border-t border-[#2D2A26]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#D97706]" /> Active Stage Question Timer:</span>
          <div className="flex items-center gap-3">
            <input type="range" min={20} max={60} step={1} value={globalTimer} onChange={(e) => onChangeGlobalTimer(Number(e.target.value))} className="w-36 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
            <span className="font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">{globalTimer} seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

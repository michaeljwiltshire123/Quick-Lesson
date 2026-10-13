import React from 'react';
import { KeyRound, Lock, Clock, ShieldAlert, Award, HelpCircle } from 'lucide-react';

export const EscapeRoomCipherDeepDive: React.FC = () => {
  const locks = [
    { name: 'Lock 1: Directional Compass Cipher', type: 'Directional', solveRate: 88, avgTime: '3.2 min', hintsUsed: 1, bottleneck: 'Minimal' },
    { name: 'Lock 2: Spectral Color Palette Lock', type: 'Color Palette', solveRate: 74, avgTime: '5.1 min', hintsUsed: 2, bottleneck: 'Moderate' },
    { name: 'Lock 3: Lexical Substitution Cipher', type: 'Word/Alphabet', solveRate: 46, avgTime: '8.4 min', hintsUsed: 5, bottleneck: 'Critical Bottleneck' },
    { name: 'Lock 4: Master Combination Vault', type: '4-Symbol Combo', solveRate: 62, avgTime: '6.0 min', hintsUsed: 3, bottleneck: 'Moderate' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-amber-600" />
            Lock-by-Lock Cipher Decryption &amp; Escape Velocity Audit
          </h4>
          <p className="text-[11px] text-gray-500">Isolating cipher problem-solving bottlenecks and hint dependency</p>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
          Escape Psychometrics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Overall Escape Rate</span>
          <span className="text-xl font-black text-emerald-600 font-mono">68% Escaped</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Under 25-min timer limit</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Avg Escape Velocity</span>
          <span className="text-xl font-black text-indigo-600 font-mono">18m 42s</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Includes hint penalties</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-rose-200 bg-rose-50/30 shadow-2xs">
          <span className="text-[10px] font-bold text-rose-700 uppercase block">Primary Bottleneck</span>
          <span className="text-sm font-black text-rose-950 truncate block mt-0.5">Lock 3: Lexical Cipher</span>
          <span className="text-[10px] text-rose-600 font-bold block mt-0.5">54% Team Failure Rate</span>
        </div>
      </div>

      <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
        <span className="text-xs font-black uppercase text-[#2D2A26] block">Puzzle Lock Performance Breakdown</span>
        <div className="space-y-1.5">
          {locks.map((l, idx) => (
            <div key={idx} className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#2D2A26] block">{l.name}</span>
                <span className="text-[10px] text-gray-500 font-mono">{l.type} • Avg Time: {l.avgTime}</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-[10px] font-mono text-gray-500">{l.hintsUsed} Hints Used</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  l.solveRate >= 75 ? 'bg-emerald-100 text-emerald-800' :
                  l.solveRate >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {l.solveRate}% Solved
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

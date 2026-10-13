import React from 'react';
import { Network, Zap, AlertCircle, RefreshCw } from 'lucide-react';

export const GridlockHexNetworkDeepDive: React.FC = () => {
  const contestedNodes = [
    { letter: 'A', term: 'Active Transport', steals: 4, latency: '1.8s', errorRate: 58 },
    { letter: 'M', term: 'Mitochondria', steals: 1, latency: '1.2s', errorRate: 14 },
    { letter: 'O', term: 'Osmosis', steals: 3, latency: '2.4s', errorRate: 45 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <Network className="w-4 h-4 text-amber-600" />
            Cross-Unit Lexical Retrieval &amp; Hexagon Hotspots
          </h4>
          <p className="text-[11px] text-gray-500">Analysing connection path bottlenecks and rapid-recall vocabulary friction</p>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
          Spatial Retrieval
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Board Completion Path</span>
          <span className="text-xl font-black text-[#2D2A26] font-mono">19 of 25 Hexes</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">76% Board Coverage</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">Mean Buzzer Latency</span>
          <span className="text-xl font-black text-indigo-600 font-mono">2.4 seconds</span>
          <span className="text-[10px] text-gray-500 block mt-0.5">Rapid lexical retrieval</span>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase block">First-Buzz Accuracy</span>
          <span className="text-xl font-black text-amber-600 font-mono">71% Conversion</span>
          <span className="text-[10px] text-rose-600 font-bold block mt-0.5">29% Premature Buzzes</span>
        </div>
      </div>

      <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#2D2A26]/15 space-y-2.5">
        <span className="text-xs font-black uppercase text-[#2D2A26] block">Contested Chokepoint Nodes (Multiple False Buzzes)</span>
        <div className="space-y-1.5">
          {contestedNodes.map((n) => (
            <div key={n.letter} className="p-2.5 bg-white rounded-xl border border-[#2D2A26]/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  {n.letter}
                </span>
                <span className="font-bold text-[#2D2A26]">{n.term}</span>
              </div>
              <div className="flex items-center gap-3 text-right text-[11px] font-mono">
                <span className="text-gray-500">{n.latency} buzz speed</span>
                <span className="text-rose-600 font-bold">{n.steals} steals / penalties</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

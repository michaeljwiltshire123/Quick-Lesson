import React from 'react';
import { Layers, TrendingUp, AlertTriangle } from 'lucide-react';

export const LadderCeilingDeepDive: React.FC = () => {
  const tiers = [
    { rung: 'Rung 1-2: Core Recall', bloom: 'Knowledge', passRate: 94, dropCount: 2, status: 'Mastered' },
    { rung: 'Rung 3-4: Applied Scenarios', bloom: 'Application', passRate: 78, dropCount: 6, status: 'Secure' },
    { rung: 'Rung 5-6: System Analysis', bloom: 'Analysis', passRate: 52, dropCount: 11, status: 'Ceiling Reached' },
    { rung: 'Rung 7-8: Evaluation & Critique', bloom: 'Evaluation', passRate: 31, dropCount: 8, status: 'High Challenge' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black uppercase text-[#2D2A26] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-600" />
            Ladder Ceiling Analysis (Blooms Cognitive Hierarchy)
          </h4>
          <p className="text-[11px] text-gray-500">Isolating the precise cognitive rung where pupil understanding fractures</p>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
          Perseverance Metrics
        </span>
      </div>

      <div className="space-y-2">
        {tiers.map((t, idx) => (
          <div key={idx} className="p-3 bg-white rounded-2xl border border-[#2D2A26]/15 flex items-center justify-between text-xs shadow-2xs">
            <div className="space-y-0.5">
              <span className="font-black text-[#2D2A26] block">{t.rung}</span>
              <span className="text-[10px] text-gray-500">Cognitive Tier: <span className="font-bold text-indigo-700">{t.bloom}</span></span>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold">Class Success</span>
                <span className="font-mono font-black text-sm text-[#2D2A26]">{t.passRate}%</span>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                t.status === 'Mastered' ? 'bg-emerald-100 text-emerald-800' :
                t.status === 'Secure' ? 'bg-indigo-100 text-indigo-800' :
                t.status === 'Ceiling Reached' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {t.dropCount} Fell at this rung
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1">
        <span className="font-bold block uppercase text-[10px] text-amber-900">Ceiling Insight for Tomorrow:</span>
        <p className="text-[11px] leading-relaxed">
          The median pupil ceiling is at <span className="font-bold">Rung 5 (System Analysis)</span>. Pupils successfully recall parts, but struggle when asked to predict the consequence of removing a component. Model multi-step causal chains in your next demonstration.
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { Crown, Shield } from 'lucide-react';

const POINTS = [
  { level: 10, pts: '1,000,000', isSafety: false, isTop: true },
  { level: 7, pts: '125,000', isSafety: true },
  { level: 5, pts: '32,000', isSafety: false },
  { level: 3, pts: '8,000', isSafety: true },
  { level: 1, pts: '1,000', isSafety: false },
];

export const LadderPointsTowerCard: React.FC = () => {
  return (
    <div className="bg-[#12110F] border border-white/10 rounded-xl p-2.5 space-y-1 font-sans">
      <span className="text-[8px] font-black tracking-wider uppercase text-gray-500 block">Tower Milestones</span>
      <div className="space-y-1">
        {POINTS.map((p) => (
          <div
            key={p.level}
            className={`flex items-center justify-between px-2.5 py-1 rounded text-[9px] border transition-all ${
              p.isTop
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-extrabold'
                : p.isSafety
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-extrabold'
                : 'bg-white/5 border-white/5 text-gray-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400 font-bold">Stage {p.level}</span>
              {p.isTop ? <Crown className="w-2.5 h-2.5 text-amber-400" /> : p.isSafety ? <Shield className="w-2.5 h-2.5 text-emerald-400" /> : null}
            </div>
            <span className={p.isTop ? 'text-amber-400 font-mono font-black' : p.isSafety ? 'text-emerald-400 font-mono font-black' : 'text-gray-300 font-mono'}>
              {p.pts} pts {p.isSafety ? '(Guaranteed)' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

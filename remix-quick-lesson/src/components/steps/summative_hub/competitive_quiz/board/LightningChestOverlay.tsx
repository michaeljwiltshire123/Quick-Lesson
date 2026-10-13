import React from 'react';
import { Zap, Shield, Sparkles, Gift } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onDismiss?: () => void;
}

const CHESTS = [
  { id: 'c1', label: 'Alpha Chest', reward: 'Defensive Aegis', icon: Shield, color: 'from-cyan-500 to-blue-600' },
  { id: 'c2', label: 'Volt Chest', reward: '+300 Pot Surge', icon: Zap, color: 'from-amber-400 to-yellow-600' },
  { id: 'c3', label: 'Shadow Chest', reward: 'Steal Multiplier', icon: Sparkles, color: 'from-purple-500 to-pink-600' },
];

export const LightningChestOverlay: React.FC<Props> = ({ isOpen, onDismiss }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center text-white border-2 border-amber-400 animate-in fade-in duration-300">
      {/* Fierce Lightning Heading */}
      <div className="text-center space-y-1 mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-amber-400/40 animate-pulse">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Lightning Speed Drop</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
          Mystery Chests Deployed to Pupil Phones!
        </h3>
        <p className="text-xs text-gray-300">
          Top 3 speed-qualifying players can tap one chest on their device right now.
        </p>
      </div>

      {/* 3 Glowing Chests */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-xl">
        {CHESTS.map(({ id, label, reward, icon: Icon, color }, idx) => (
          <div
            key={id}
            className="group relative flex flex-col items-center p-4 bg-slate-900/90 rounded-2xl border-2 border-amber-400/50 hover:border-amber-400 shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div className="absolute -top-3 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
              {idx + 1}
            </div>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg mb-3 animate-pulse`}>
              <Gift className="w-8 h-8" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">{label}</span>
            <span className="text-[10px] text-gray-400 text-center mt-1">{reward}</span>
          </div>
        ))}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer border border-white/10"
        >
          Dismiss Lightning Drop
        </button>
      )}
    </div>
  );
};

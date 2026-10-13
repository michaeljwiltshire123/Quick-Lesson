import React, { useMemo } from 'react';
import { Ghost, Sparkles, Award, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean; onClose: () => void; ghostPlayerName: string; eliminatedPlayerName: string;
  questionSnippet?: string; activeNonImposterCount: number;
}

export const GhostWriterFanfare: React.FC<Props> = ({
  isOpen, onClose, ghostPlayerName, eliminatedPlayerName, questionSnippet, activeNonImposterCount,
}) => {
  const qualifies = activeNonImposterCount > 2;
  
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      delay: `${i * 0.12}s`,
      left: `${15 + i * 6}%`,
      scale: 0.5 + Math.random() * 0.8,
      duration: `${1.8 + Math.random() * 1.5}s`,
    }));
  }, []);

  if (!isOpen || !qualifies) return null;

  return (
    <div id="imposter-ghost-fanfare-modal" className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-md overflow-hidden">
      <style>{`
        @keyframes haloPulse { 0%, 100% { transform: scale(0.92); opacity: 0.35; } 50% { transform: scale(1.15); opacity: 0.6; } }
        @keyframes floatAccolade { 0% { transform: translateY(60px) scale(0.5); opacity: 0; } 30% { opacity: 0.95; } 80% { opacity: 0.95; } 100% { transform: translateY(-70px) scale(1.2); opacity: 0; } }
      `}</style>
      
      {/* Cinematic pulsating halo overlay */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial-gradient from-purple-500/20 via-transparent to-transparent pointer-events-none" style={{ animation: 'haloPulse 5s infinite ease-in-out' }} />

      {/* Floating Celebratory Fanfare Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute text-purple-400 opacity-0 flex flex-col items-center gap-1"
            style={{
              left: p.left,
              bottom: '20px',
              animation: `floatAccolade ${p.duration} ease-in-out ${p.delay} infinite`,
              transform: `scale(${p.scale})`,
            }}
          >
            <Ghost className="w-5 h-5 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border-2 border-purple-400 max-w-md w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-inner relative animate-bounce">
          <Ghost className="w-8 h-8" />
          <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Special Award
          </span>
          <h2 className="text-xl font-black text-[#2D2A26]">Ghost Writing Master!</h2>
          <p className="text-xs text-[#2D2A26]/70 max-w-sm mx-auto">
            Well done to <strong className="text-purple-800 font-bold">{ghostPlayerName}</strong> whose clever question helped the team spot the imposter!
          </p>
        </div>

        <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 text-left space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
            <Award className="w-4 h-4 text-purple-600 animate-pulse" />
            Spotlight Question
          </div>
          <p className="text-xs text-purple-950 italic">
            "{questionSnippet || 'A clever clue penned by our Ghost Helper'}"
          </p>
          <p className="text-[11px] text-purple-700 font-medium">
            Helped everyone work out {eliminatedPlayerName}'s identity.
          </p>
        </div>

        <div className="pt-1">
          <button
            id="btn-dismiss-ghost-fanfare"
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-[1.02] duration-200"
          >
            <span>Continue Game</span> <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

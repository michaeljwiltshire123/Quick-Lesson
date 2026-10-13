import React from 'react';

export interface FloatingEmoji {
  id: string;
  emoji: string;
  xPercent: number;
  authorName?: string;
}

interface Props {
  reactions: FloatingEmoji[];
}

export const FloatingReactionsOverlay: React.FC<Props> = ({ reactions }) => {
  if (reactions.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes floatUpAnimation {
          0% { transform: translateY(0) scale(0.8); opacity: 0.9; }
          50% { opacity: 1; transform: translateY(-120px) scale(1.1); }
          100% { transform: translateY(-260px) scale(0.9); opacity: 0; }
        }
        .reaction-float-item {
          animation: floatUpAnimation 3s ease-out forwards;
        }
      `}</style>

      {/* Floating Side Rail Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {reactions.map((r) => {
          const safeX = r.xPercent < 50 ? Math.min(24, Math.max(4, r.xPercent)) : Math.max(76, Math.min(96, r.xPercent));

          return (
            <div
              key={r.id}
              style={{ left: `${safeX}%` }}
              className="absolute bottom-10 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-10 reaction-float-item"
            >
              <span className="text-3xl drop-shadow-lg select-none">{r.emoji}</span>
              {r.authorName && (
                <span className="text-[9px] font-black text-white bg-slate-900/90 border border-white/20 px-2 py-0.5 rounded-full mt-0.5 truncate max-w-[90px] shadow-md">
                  {r.authorName}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Reaction Ticker Strip */}
      <div className="absolute bottom-2 left-4 right-4 z-20 pointer-events-none flex items-center justify-center gap-2 overflow-hidden">
        <div className="bg-slate-900/80 backdrop-blur-xs border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
          <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">Live Audience Reactions:</span>
          <div className="flex items-center gap-2">
            {reactions.slice(-5).map((r) => (
              <span key={r.id} className="text-lg animate-pulse">{r.emoji}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

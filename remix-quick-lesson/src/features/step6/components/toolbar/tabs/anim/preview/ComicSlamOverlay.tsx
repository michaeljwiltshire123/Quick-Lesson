import React, { useMemo } from 'react';

export const ComicSlamOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  // Generate 12 radial halftone dots spraying outward
  const dots = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * 140;
      const ty = Math.sin(rad) * 140;
      return { id: i, tx, ty, size: `${8 + Math.random() * 12}px` };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes comicKapow {
          0% { transform: scale(3.5) rotate(-15deg); opacity: 0; filter: blur(4px); }
          25% { transform: scale(1) rotate(6deg); opacity: 1; filter: blur(0); }
          30% { transform: scale(1.08) rotate(-4deg); }
          40% { transform: scale(1) rotate(0deg); }
          80% { opacity: 1; transform: scale(1.05); }
          100% { transform: scale(0.1) rotate(45deg); opacity: 0; }
        }
        @keyframes comicShake {
          25% { transform: translate(0, 0); }
          27% { transform: translate(-8px, 6px); }
          29% { transform: translate(8px, -6px); }
          31% { transform: translate(-6px, -4px); }
          33% { transform: translate(6px, 4px); }
          35% { transform: translate(0, 0); }
        }
        @keyframes halftoneSpray {
          0%, 25% { transform: translate(0, 0) scale(0); opacity: 0; }
          26% { opacity: 0.95; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.5); opacity: 0; }
        }
        @keyframes comicContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `comicShake ${d + 0.15}s ease-out forwards, comicContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Halftone dots spray */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
          {dots.map((dot) => (
            <div
              key={dot.id}
              style={{
                '--tx': `${dot.tx}px`,
                '--ty': `${dot.ty}px`,
                width: dot.size,
                height: dot.size,
                animation: `halftoneSpray ${d * 0.8}s cubic-bezier(0.1, 0.8, 0.2, 1) forwards`,
              } as React.CSSProperties}
              className="absolute rounded-full bg-yellow-400 border border-stone-900 shadow-md"
            />
          ))}
        </div>

        {/* Slammed Speech Bubble */}
        <div
          style={{
            animation: `comicKapow ${d}s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
            background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 100%)',
          }}
          className="relative px-8 py-4 rounded-3xl border-4 border-stone-900 shadow-[8px_8px_0px_#1c1917] z-25 flex items-center justify-center rotate-6"
        >
          {/* Jagged star spike outline */}
          <div className="absolute -inset-4 border-4 border-stone-900 bg-red-500 -z-10 rounded-full" style={{ clipPath: 'polygon(50% 0%, 65% 15%, 95% 10%, 85% 45%, 100% 65%, 75% 80%, 70% 100%, 45% 85%, 20% 95%, 25% 65%, 0% 50%, 25% 30%, 15% 5%, 45% 20%)' }} />
          
          <span className="text-stone-950 font-black text-2xl tracking-widest uppercase drop-shadow-[0_2px_0px_#ffffff] animate-bounce">
            💥 KAPOW! 💥
          </span>
        </div>
      </div>
    </div>
  );
};

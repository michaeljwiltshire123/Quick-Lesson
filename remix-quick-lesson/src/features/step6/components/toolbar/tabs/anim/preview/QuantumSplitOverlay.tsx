import React, { useMemo } from 'react';

export const QuantumSplitOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  // Generate 16 atomic quantum particle cells dispersing outward
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      const rad = (angle * Math.PI) / 180;
      const dist = 80 + Math.random() * 120;
      return {
        id: i,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        size: `${4 + Math.random() * 8}px`,
        delay: `${Math.random() * 0.3}s`,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes universeSwap_1 {
          0%, 100% { opacity: 0.95; transform: scale(1) skewX(0); }
          15% { opacity: 0.15; transform: scale(1.02) skewX(8deg); }
          30% { opacity: 0.85; transform: scale(0.98) skewX(-8deg); }
          45% { opacity: 0.25; }
          60% { opacity: 0.75; }
          80% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes universeSwap_2 {
          0%, 100% { opacity: 0.05; transform: scale(1.02) skewX(-5deg); }
          15% { opacity: 0.85; transform: scale(0.98) skewX(-12deg); }
          30% { opacity: 0.15; transform: scale(1.02) skewX(12deg); }
          45% { opacity: 0.75; }
          60% { opacity: 0.25; }
          80% { opacity: 1; transform: scale(1); }
        }
        @keyframes atomicDisperse {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          30% { opacity: 0.95; }
          100% { transform: translate(calc(var(--dx) * 1.5), calc(var(--dy) * 1.5)) scale(0.1); opacity: 0; }
        }
        @keyframes quantumContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0"
        style={{ animation: `quantumContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Reality 1 - Slide 1 (rapidly flickering out) */}
        <div
          style={{ animation: `universeSwap_1 ${d}s ease-in-out forwards` }}
          className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between border bg-amber-100 text-stone-900 border-stone-300"
        >
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-amber-950">Active Dimension (Reality A)</span>
            <h4 className="text-sm font-black text-stone-900">Quantum Parallel Slide 1</h4>
          </div>
          <div className="text-[8px] text-stone-500 font-mono">Superposition wave collapse...</div>
        </div>

        {/* Reality 2 - Slide 2 (rapidly flickering in) */}
        <div
          style={{ animation: `universeSwap_2 ${d}s ease-in-out forwards` }}
          className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between border bg-[#FAF9F5] text-stone-900 border-stone-300 z-10"
        >
          <div className="space-y-0.5">
            <span className="text-[9px] font-extrabold text-indigo-700 uppercase tracking-widest">Dimension B (Reality B)</span>
            <h3 className="text-base font-black leading-tight text-stone-900">Quantum Superposition</h3>
            <p className="text-[11px] text-stone-600 italic leading-tight">Ghosted reality swapping & atomic cloud dispersion</p>
          </div>
          <div className="text-[8px] text-stone-400 font-mono">Parallel dimension locked.</div>
        </div>

        {/* Atomic Particle Dispersion Clouds */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gradient-to-tr from-indigo-400 to-cyan-300 shadow-[0_0_8px_#818cf8]"
              style={{
                width: p.size,
                height: p.size,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animation: `atomicDisperse ${d * 0.6}s ease-out ${d * 0.3}s forwards`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

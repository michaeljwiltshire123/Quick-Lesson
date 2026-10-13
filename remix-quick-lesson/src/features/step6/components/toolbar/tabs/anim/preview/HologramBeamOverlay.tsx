import React, { useMemo } from 'react';

export const HologramBeamOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  // Generate 16 upward-soaring holographic grid particles
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${10 + (i * 80) / 16 + Math.random() * 5}%`,
      delay: `${Math.random() * 0.3}s`,
      size: `${3 + (i % 3) * 3}px`,
      dur: `${0.8 + Math.random() * 0.5}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes hologramJitter {
          0%, 100% { transform: skew(0deg) scale(1); filter: contrast(100%); }
          10% { transform: skew(2deg) scale(1.02) translateX(3px); filter: contrast(120%); }
          12% { transform: skew(-2deg) scale(0.98) translateX(-3px); }
          25% { text-shadow: -2px 0 1px #06b6d4, 2px 0 1px #ec4899; }
          30% { transform: skew(4deg) scaleY(1.05); }
          32% { transform: skew(-3deg) scaleY(0.95); }
          50% { text-shadow: -4px 0 2px #06b6d4, 4px 0 2px #ec4899; opacity: 0.9; }
          75% { opacity: 0.4; transform: scaleY(0.5) translateY(-50px); }
          100% { opacity: 0; transform: scaleY(0.01) translateY(-150px); filter: blur(8px); }
        }
        @keyframes hologramBeamUp {
          0% { transform: scaleX(0.1) scaleY(0); opacity: 0; }
          15% { transform: scaleX(1) scaleY(1.2); opacity: 0.95; }
          50% { transform: scaleX(1.4) scaleY(1); opacity: 0.8; }
          100% { transform: scaleX(0.05) scaleY(1.5); opacity: 0; }
        }
        @keyframes particleSoar {
          0% { transform: translateY(200px) scale(0.5); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translateY(-250px) scale(1.3); opacity: 0; }
        }
        @keyframes hologramContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 bg-stone-950/20"
        style={{ animation: `hologramContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Slide 1 - undergoes horizontal scanline jitter & chromatic aberration splitting */}
        <div
          className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between border bg-[#0f172a] text-cyan-300 border-cyan-800/40 z-10"
          style={{
            animation: `hologramJitter ${d}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, rgba(6, 182, 212, 0.08) 2px, rgba(6, 182, 212, 0.08) 4px)',
          }}
        >
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-cyan-400 animate-pulse">
              Hologram Transmission (Slide 1)
            </span>
            <h4 className="text-sm font-black text-cyan-100 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">Digitizing Curriculum Frame...</h4>
          </div>
          <div className="flex items-center justify-between text-[9px] opacity-75 font-mono text-cyan-400">
            <span>Beam Frequency 48.2 GHz</span>
            <span className="animate-pulse">Dematerialising...</span>
          </div>
        </div>

        {/* Upward-Soaring Holographic Grid Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute bg-cyan-400 shadow-[0_0_6px_#06b6d4]"
              style={{
                left: p.left,
                bottom: '10%',
                width: p.size,
                height: p.size,
                borderRadius: p.id % 2 === 0 ? '0%' : '9999px',
                animation: `particleSoar ${p.dur} ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}
        </div>

        {/* Soaring Column of Holographic Grid Laser Beam light column */}
        <div
          style={{ animation: `hologramBeamUp ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
          className="absolute inset-x-[20%] h-full bg-gradient-to-t from-transparent via-cyan-500/20 to-transparent border-x border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] pointer-events-none z-15"
        />
      </div>
    </div>
  );
};

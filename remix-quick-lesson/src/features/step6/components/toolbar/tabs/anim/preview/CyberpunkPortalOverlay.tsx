import React, { useMemo } from 'react';

export const CyberpunkPortalOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  // Generate 12 high-velocity electric arc particles
  const arcs = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12 + Math.random() * 20;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * 160;
      const ty = Math.sin(rad) * 160;
      const rot = Math.random() * 360;
      return { id: i, tx, ty, rot, delay: `${Math.random() * 0.2}s` };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes plasmaVortex {
          0% { transform: scale(0.1) rotate(0deg); opacity: 0; filter: hue-rotate(0deg) blur(4px); }
          15% { opacity: 1; filter: blur(0); }
          50% { transform: scale(1.15) rotate(180deg); filter: hue-rotate(90deg); }
          80% { opacity: 0.95; }
          100% { transform: scale(2.8) rotate(360deg); opacity: 0; filter: blur(12px) hue-rotate(180deg); }
        }
        @keyframes electricArc {
          0% { transform: translate(0, 0) scale(0.2) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.4) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes portalOverlayContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `portalOverlayContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Swirling CSS distortion and spiral warp mock */}
        <div 
          className="absolute inset-0 bg-stone-950/25 pointer-events-none z-10"
          style={{
            backdropFilter: 'blur(2px) contrast(150%)',
            WebkitBackdropFilter: 'blur(2px) contrast(150%)',
          }}
        />

        {/* High-Energy Swirling Plasma Vortex Ring */}
        <div
          style={{
            animation: `plasmaVortex ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            background: 'conic-gradient(from 0deg, #ec4899, #8b5cf6, #3b82f6, #06b6d4, #10b981, #f59e0b, #ec4899)',
            boxShadow: '0 0 50px rgba(139, 92, 246, 0.7), inset 0 0 30px rgba(236, 72, 153, 0.5)',
          }}
          className="w-48 h-48 rounded-full border-4 border-rose-100 flex items-center justify-center p-1.5 mix-blend-screen opacity-0"
        >
          {/* Inner core twist */}
          <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center border border-indigo-400">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-rose-500 animate-spin" />
          </div>
        </div>

        {/* High-Velocity Electric Arc Particles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {arcs.map((arc) => (
            <div
              key={arc.id}
              style={{
                '--tx': `${arc.tx}px`,
                '--ty': `${arc.ty}px`,
                '--rot': `${arc.rot}deg`,
                animation: `electricArc ${d * 0.75}s cubic-bezier(0.1, 0.8, 0.2, 1) ${arc.delay} forwards`,
              } as React.CSSProperties}
              className="absolute w-6 h-2 rounded-full bg-gradient-to-r from-rose-400 to-cyan-400 shadow-[0_0_10px_#ec4899]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

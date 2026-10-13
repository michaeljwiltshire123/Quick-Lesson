import React from 'react';

export const LaserBeamOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      <style>{`
        @keyframes laserSweep {
          0% { top: -5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes gridReveal {
          0% { clip-path: inset(0 0 100% 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes phosphorFlicker {
          0%, 100% { opacity: 0.18; }
          23% { opacity: 0.12; }
          48% { opacity: 0.28; }
          72% { opacity: 0.15; }
          91% { opacity: 0.22; }
        }
        @keyframes crtBeamContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      {/* CRT Curved Glass Outer Simulation */}
      <div 
        style={{ animation: `crtBeamContainer ${d + 0.15}s ease-out forwards` }}
        className="absolute inset-0 bg-stone-950/20 shadow-[inset_0_0_80px_rgba(0,255,100,0.15)] rounded-xl"
      >
        {/* CRT Curved Glass reflection glow & vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-20" />
        
        {/* Retro Phosphor Green Grid Backdrop */}
        <div 
          style={{
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            animation: `gridReveal ${d}s cubic-bezier(0.1, 0.85, 0.25, 1) forwards, phosphorFlicker 0.15s infinite alternate`,
          }}
          className="absolute inset-0 bg-stone-950/10"
        />

        {/* Phosphor green scanner line horizontal sweeps */}
        <div 
          style={{
            backgroundImage: 'repeating-linear-gradient(rgba(34,197,94,0.1) 0px, rgba(34,197,94,0.1) 2px, transparent 2px, transparent 4px)',
            animation: 'phosphorFlicker 0.12s infinite',
          }}
          className="absolute inset-0 opacity-40 z-10"
        />

        {/* High production neon-cyan laser sweep line */}
        <div
          style={{ animation: `laserSweep ${d}s cubic-bezier(0.1, 0.85, 0.25, 1) forwards` }}
          className="absolute left-0 right-0 h-6 flex flex-col justify-center z-30"
        >
          {/* Neon cyan glow */}
          <div className="w-full h-4 bg-gradient-to-r from-cyan-500 via-sky-300 to-cyan-500 shadow-[0_0_32px_12px_#06b6d4,0_0_64px_24px_#0ea5e9]" />
          {/* Intense white central core */}
          <div className="w-full h-1.5 bg-white shadow-[0_0_16px_6px_#ffffff] -mt-2.5" />
        </div>
      </div>
    </div>
  );
};

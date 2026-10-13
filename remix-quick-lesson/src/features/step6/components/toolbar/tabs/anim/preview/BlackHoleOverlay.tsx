import React from 'react';

export const BlackHoleOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes blackHoleSink {
          0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px) contrast(100%); }
          50% { transform: scale(0.4) rotate(-90deg); filter: blur(4px) contrast(140%); }
          90% { transform: scale(0.02) rotate(-270deg); opacity: 0.15; filter: blur(8px) contrast(200%); }
          100% { transform: scale(0) rotate(-360deg); opacity: 0; }
        }
        @keyframes accretionDisk {
          0% { transform: rotate(0deg) scale(0.2); opacity: 0; }
          20% { opacity: 0.95; }
          80% { opacity: 0.95; }
          100% { transform: rotate(720deg) scale(1.6); opacity: 0; }
        }
        @keyframes einsteinRing {
          0%, 100% { border-width: 1px; transform: scale(0.6); opacity: 0; }
          30% { border-width: 4px; transform: scale(0.9); opacity: 0.8; }
          60% { border-width: 2px; transform: scale(1.15); opacity: 0.4; }
        }
        @keyframes holeContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `holeContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Accretion Disk Ring (spinning around event horizon) */}
        <div
          style={{
            animation: `accretionDisk ${d}s linear forwards`,
            background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.45), #ec4899, rgba(239, 68, 68, 0.45), transparent 75%)',
          }}
          className="absolute w-56 h-56 rounded-full mix-blend-screen pointer-events-none z-20"
        />

        {/* Gravitational Einstein Ring border warp */}
        <div
          style={{ animation: `einsteinRing ${d}s ease-in-out forwards` }}
          className="absolute w-60 h-60 rounded-full border-dashed border-indigo-400/80 shadow-[0_0_40px_rgba(99,102,241,0.3)] z-15 pointer-events-none"
        />

        {/* Event Horizon Central Singularity */}
        <div className="absolute w-12 h-12 bg-black rounded-full shadow-[0_0_20px_10px_rgba(0,0,0,1),0_0_35px_#a855f7] z-25 flex items-center justify-center border border-stone-900 animate-pulse" />

        {/* Slide 1 - warped and sucked into center */}
        <div
          style={{
            animation: `blackHoleSink ${d}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.4)',
          }}
          className="absolute inset-4 rounded-xl p-4 flex flex-col justify-between border bg-stone-900 border-stone-800 text-stone-300"
        >
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-purple-400">Gravitational Lens (Slide 1)</span>
            <h4 className="text-sm font-black text-white">Event Horizon Ingestion...</h4>
          </div>
          <div className="flex items-center justify-between text-[9px] opacity-70 font-mono text-purple-400">
            <span>Singularity Coordinate: (50%, 50%)</span>
            <span>Collapsing Slide...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export const SpiralSpinOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes spiralSpinPrev {
          0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); }
          50% { transform: scale(0.5) rotate(900deg); opacity: 0.6; filter: blur(5px); }
          100% { transform: scale(0) rotate(1800deg); opacity: 0; filter: blur(14px); }
        }
        @keyframes spinStreak {
          0% { transform: rotate(0deg) scale(0.8); opacity: 0; }
          30% { opacity: 0.8; }
          70% { opacity: 0.8; }
          100% { transform: rotate(1080deg) scale(1.6); opacity: 0; }
        }
        @keyframes spinContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `spinContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Kinetic Energy blur smear lines */}
        <div
          style={{
            animation: `spinStreak ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            background: 'conic-gradient(from 0deg, transparent, rgba(16, 185, 129, 0.15), transparent 45%, rgba(6, 182, 212, 0.15), transparent 75%)',
          }}
          className="absolute w-[160%] h-[160%] rounded-full mix-blend-screen pointer-events-none z-20"
        />

        {/* Slide 1 - spinning with depth-of-field blur */}
        <div
          style={{
            animation: `spiralSpinPrev ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1)',
          }}
          className="absolute inset-4 rounded-xl p-4 flex flex-col justify-between border bg-amber-100 text-stone-900 border-stone-300"
        >
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-amber-950">Active Slide (Spinning Out...)</span>
            <h4 className="text-sm font-black text-stone-900">Spiral 3D Spin (5x)</h4>
          </div>
          <div className="flex items-center justify-between text-[9px] opacity-70 font-mono text-stone-700">
            <span>5x Complete Z-Rotation</span>
            <span>Spinning Deck...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

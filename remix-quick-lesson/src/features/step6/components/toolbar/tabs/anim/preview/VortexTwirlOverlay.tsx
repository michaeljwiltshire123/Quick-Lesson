import React from 'react';

export const VortexTwirlOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes vortexTwirl {
          0% { transform: scale(1) rotate(0deg); filter: blur(0px) contrast(100%); }
          50% { transform: scale(0.4) rotate(180deg); filter: blur(4px) contrast(150%); }
          100% { transform: scale(0) rotate(360deg); filter: blur(12px) contrast(200%); opacity: 0; }
        }
        @keyframes zoomBlurStreaks {
          0% { transform: rotate(0deg) scale(0.5); opacity: 0; }
          20% { opacity: 0.85; }
          80% { opacity: 0.85; }
          100% { transform: rotate(-360deg) scale(2); opacity: 0; }
        }
        @keyframes vortexOverlayContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `vortexOverlayContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Dynamic Zoom-Blur centrifugal streaks overlay */}
        <div
          style={{
            animation: `zoomBlurStreaks ${d}s linear forwards`,
            background: 'conic-gradient(from 0deg, transparent, rgba(56, 189, 248, 0.15), transparent 45%, rgba(139, 92, 246, 0.15), transparent 75%)',
          }}
          className="absolute w-[180%] h-[180%] rounded-full mix-blend-screen pointer-events-none z-20"
        />

        {/* Twirling Slide Replica Container */}
        <div
          style={{
            animation: `vortexTwirl ${d}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3)',
          }}
          className="absolute inset-0 bg-stone-950 flex flex-col justify-between p-4 border border-stone-800 rounded-xl"
        >
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-cyan-400">Centrifugal Vortex (Slide 1)</span>
            <h4 className="text-sm font-black text-white">Twirling Lesson Canvas...</h4>
          </div>
          <div className="flex items-center justify-between text-[9px] opacity-70 font-mono text-stone-400">
            <span>Vortex Center X: 50% Y: 50%</span>
            <span>Spinning Deck...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

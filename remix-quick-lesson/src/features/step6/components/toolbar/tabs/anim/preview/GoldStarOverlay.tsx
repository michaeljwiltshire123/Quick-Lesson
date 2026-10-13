import React from 'react';

interface GoldStarOverlayProps {
  speed: number;
}

export const GoldStarOverlay: React.FC<GoldStarOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.6, speed * 1.4);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl flex items-center justify-center">
      <style>{`
        @keyframes stampGoldStar {
          0% { transform: scale(3.5) rotate(-15deg); opacity: 0; filter: blur(4px); }
          30% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0px); }
          45% { transform: scale(1.08); }
          80% { opacity: 1; transform: scale(1); }
          100% { transform: scale(0.6); opacity: 0; }
        }
        @keyframes shockwaveRing {
          0%, 30% { width: 0; height: 0; opacity: 0; }
          32% { opacity: 0.9; }
          100% { width: 260px; height: 260px; opacity: 0; }
        }
      `}</style>

      {/* Gold Star Stamp Graphic without dummy slides */}
      <div
        className="w-24 h-24 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] z-20 flex items-center justify-center"
        style={{ animation: `stampGoldStar ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      {/* Shockwave expanding ring */}
      <div
        className="absolute rounded-full border-2 border-amber-400 z-10"
        style={{ animation: `shockwaveRing ${duration}s ease-out forwards` }}
      />
    </div>
  );
};

import React from 'react';

interface ChalkboardEraserOverlayProps {
  speed: number;
}

export const ChalkboardEraserOverlay: React.FC<ChalkboardEraserOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.5, speed * 1.2);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes feltWipeBar {
          0% { left: -15%; opacity: 0; }
          20% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 115%; opacity: 0; }
        }
        @keyframes chalkDustCloud {
          0% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 0.45; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1.6); }
        }
      `}</style>

      {/* Sweeping Felt Eraser Bar without dummy slides */}
      <div
        className="absolute inset-y-0 w-16 bg-amber-900 border-x-4 border-amber-950 shadow-2xl z-20 flex flex-col justify-between py-4"
        style={{ animation: `feltWipeBar ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      >
        <div className="w-full h-full bg-stone-300/80 border-y-2 border-stone-400" />
      </div>

      {/* Drifting chalk dust cloud */}
      <div
        className="absolute inset-0 bg-radial from-white/30 to-transparent pointer-events-none z-10"
        style={{ animation: `chalkDustCloud ${duration}s ease-out forwards` }}
      />
    </div>
  );
};

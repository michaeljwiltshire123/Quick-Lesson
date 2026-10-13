import React from 'react';

interface RollerScreenOverlayProps {
  speed: number;
}

export const RollerScreenOverlay: React.FC<RollerScreenOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.5, speed * 1.3);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes vinylRetract {
          0% { transform: translateY(0); opacity: 1; }
          45% { transform: translateY(-95%); opacity: 0.95; }
          60% { transform: translateY(-75%); opacity: 0.9; }
          100% { transform: translateY(-105%); opacity: 0; }
        }
      `}</style>

      {/* Retracting vinyl projection screen texture on top of real slide */}
      <div
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-stone-200 to-stone-300 border-b-8 border-stone-800 shadow-2xl z-20 flex items-end justify-center pb-2"
        style={{ animation: `vinylRetract ${duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards` }}
      >
        <div className="w-8 h-3 rounded-b-md bg-stone-700 border-x border-b border-stone-500 shadow-inner" />
      </div>
    </div>
  );
};

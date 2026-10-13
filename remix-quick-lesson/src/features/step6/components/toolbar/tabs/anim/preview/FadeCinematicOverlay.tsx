import React from 'react';

interface FadeCinematicOverlayProps {
  speed: number;
}

export const FadeCinematicOverlay: React.FC<FadeCinematicOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.4, speed);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes fadeCinematicSoft {
          0% { filter: blur(10px); opacity: 0; transform: scale(1.02); }
          50% { filter: blur(4px); opacity: 0.8; }
          100% { filter: blur(0px); opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Pure visual chromatic focus glow over the current slide */}
      <div
        className="absolute inset-0 bg-stone-900/10 mix-blend-overlay"
        style={{ animation: `fadeCinematicSoft ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

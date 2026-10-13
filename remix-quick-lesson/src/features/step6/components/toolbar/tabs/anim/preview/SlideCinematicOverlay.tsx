import React from 'react';

interface SlideCinematicOverlayProps {
  effectId: string;
  speed: number;
}

export const SlideCinematicOverlay: React.FC<SlideCinematicOverlayProps> = ({ effectId, speed }) => {
  const duration = Math.max(0.4, speed);
  const isHorizontal = effectId === 'slide_right' || effectId === 'slide_left';

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes slideMotionTrail {
          0% { opacity: 0.6; filter: blur(6px); }
          100% { opacity: 0; filter: blur(0px); }
        }
      `}</style>
      <div
        className={`absolute inset-0 bg-stone-900/10 pointer-events-none ${
          isHorizontal ? 'origin-left' : 'origin-top'
        }`}
        style={{ animation: `slideMotionTrail ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

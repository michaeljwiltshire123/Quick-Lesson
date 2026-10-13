import React from 'react';

export const MorphMagicOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes morphLeft {
          0% { transform: translateX(-80px) scale(1); opacity: 0.9; }
          40% { transform: translateX(-15px) scale(1.15); }
          60% { transform: translateX(15px) scale(1.15); }
          100% { transform: translateX(80px) scale(1); opacity: 0; }
        }
        @keyframes morphRight {
          0% { transform: translateX(80px) scale(1); opacity: 0.9; }
          40% { transform: translateX(15px) scale(1.15); }
          60% { transform: translateX(-15px) scale(1.15); }
          100% { transform: translateX(-80px) scale(1); opacity: 0; }
        }
        @keyframes morphContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="mercury-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          filter: 'url(#mercury-goo)',
          animation: `morphContainer ${d + 0.15}s ease-out forwards`,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Swirling mercury droplets merging */}
        <div
          style={{ animation: `morphLeft ${d}s cubic-bezier(0.4, 0, 0.2, 1) forwards` }}
          className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-stone-400 via-stone-300 to-stone-500 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        />
        <div
          style={{ animation: `morphRight ${d}s cubic-bezier(0.4, 0, 0.2, 1) forwards` }}
          className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-stone-400 via-stone-300 to-stone-500 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        />
      </div>
    </div>
  );
};

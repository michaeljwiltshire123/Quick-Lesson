import React, { useMemo } from 'react';
import { generateConfettiParticles } from './confettiPhysics';

interface ConfettiBurstOverlayProps {
  speed?: number;
}

export const ConfettiBurstOverlay: React.FC<ConfettiBurstOverlayProps> = ({ speed = 0.6 }) => {
  const duration = Math.max(1.8, speed * 2.5);
  
  // Scale particle count to 520 for a massive high-density storm of actual confetti ribbons and stars
  const particles = useMemo(() => generateConfettiParticles(520), []);

  return (
    <div
      style={{ animation: `confettiRootFade ${duration + 0.3}s ease-out forwards` }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none perspective-1000"
    >
      <style>{`
        @keyframes confettiRootFade { 0%, 88% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes cannonBlast { 0% { transform: scale(0.2); opacity: 1; } 30% { transform: scale(2.8); opacity: 0.95; } 100% { transform: scale(4.5); opacity: 0; } }
        @keyframes shockwaveRing { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(3.2); opacity: 0; } }
        @keyframes confettiExplodeAndFall {
          0% { transform: translate3d(0,0,0) scale(0.2) rotateX(0deg) rotateY(0deg) rotateZ(0deg); opacity: 0; }
          10% { opacity: 1; transform: translate3d(calc(var(--tx)*0.3), calc(var(--ty-p)*0.65), 40px) scale(1.3); }
          35% { opacity: 1; transform: translate3d(calc(var(--tx)*0.8), var(--ty-p), 60px) rotateX(calc(var(--rx)*0.4)) rotateY(calc(var(--ry)*0.4)) rotateZ(var(--rz)) scale(1.1); }
          72% { opacity: 0.95; transform: translate3d(calc(var(--tx) + var(--sw)), calc(var(--ty-p) + var(--fl)*0.55), 20px) rotateX(calc(var(--rx)*0.85)) rotateY(calc(var(--ry)*0.85)) rotateZ(calc(var(--rz)*1.5)) scale(0.95); }
          100% { opacity: 0; transform: translate3d(calc(var(--tx)*1.12 - var(--sw)), calc(var(--ty-p) + var(--fl)), 0px) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(calc(var(--rz)*2)) scale(0.3); }
        }
        @keyframes foilTumble { 0% { filter: brightness(1.2); } 50% { filter: brightness(0.8); } 100% { filter: brightness(1.2); } }
      `}</style>

      {/* Left Cannon Shockwave & Flash */}
      <div className="absolute left-8 bottom-4 flex items-center justify-center pointer-events-none">
        <div style={{ animation: 'cannonBlast 0.55s ease-out forwards' }} className="w-14 h-14 rounded-full bg-amber-300 shadow-[0_0_50px_#f59e0b]" />
        <div style={{ animation: 'shockwaveRing 0.6s ease-out forwards' }} className="absolute w-20 h-20 rounded-full border-2 border-amber-200" />
        <div className="w-5 h-10 rounded-sm bg-gradient-to-t from-stone-900 via-amber-700 to-amber-400 border border-amber-200 shadow-xl -rotate-45" />
      </div>

      {/* Right Cannon Shockwave & Flash */}
      <div className="absolute right-8 bottom-4 flex items-center justify-center pointer-events-none">
        <div style={{ animation: 'cannonBlast 0.55s ease-out forwards' }} className="w-14 h-14 rounded-full bg-amber-300 shadow-[0_0_50px_#f59e0b]" />
        <div style={{ animation: 'shockwaveRing 0.6s ease-out forwards' }} className="absolute w-20 h-20 rounded-full border-2 border-amber-200" />
        <div className="w-5 h-10 rounded-sm bg-gradient-to-t from-stone-900 via-amber-700 to-amber-400 border border-amber-200 shadow-xl rotate-45" />
      </div>

      {/* Center Mortar Flash */}
      <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex items-center justify-center pointer-events-none">
        <div style={{ animation: 'cannonBlast 0.45s ease-out forwards' }} className="w-12 h-12 rounded-full bg-yellow-200 shadow-[0_0_40px_#eab308]" />
      </div>

      {/* 520 High-Density 3D Confetti Particles */}
      {particles.map((p) => {
        const originClass = p.source === 'left' ? 'left-10 bottom-6' : p.source === 'right' ? 'right-10 bottom-6' : 'left-1/2 bottom-5 -translate-x-1/2';
        return (
          <div
            key={p.id}
            style={{
              '--tx': `${p.tx}px`,
              '--ty-p': `${p.tyPeak}px`,
              '--fl': `${p.fall}px`,
              '--sw': `${p.sway}px`,
              '--rx': `${p.rotX}deg`,
              '--ry': `${p.rotY}deg`,
              '--rz': `${p.rotZ}deg`,
              animation: `confettiExplodeAndFall ${p.duration}s cubic-bezier(0.12, 0.85, 0.28, 1) ${p.delay}s forwards`,
            } as React.CSSProperties}
            className={`absolute ${originClass} pointer-events-none`}
          >
            <div
              style={{
                width: `${p.sizeW}px`,
                height: `${p.sizeH}px`,
                backgroundColor: p.color,
                borderRadius: p.shape === 'disc' ? '9999px' : p.shape === 'star' ? '50% 0 50% 0' : p.shape === 'diamond' ? '2px' : '1px',
                transform: p.shape === 'diamond' ? 'rotate(45deg)' : undefined,
                boxShadow: `0 0 8px ${p.color}aa`,
                animation: `foilTumble ${0.6 + (p.id % 5) * 0.15}s linear infinite`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

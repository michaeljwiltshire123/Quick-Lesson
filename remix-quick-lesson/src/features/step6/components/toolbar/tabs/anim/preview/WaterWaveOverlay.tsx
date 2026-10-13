import React, { useMemo } from 'react';

interface WaterWaveOverlayProps {
  speed?: number;
}

export const WaterWaveOverlay: React.FC<WaterWaveOverlayProps> = ({ speed = 0.6 }) => {
  const duration = Math.max(1.5, speed * 2.2);

  // Generate 12 persistent bubbles for consistent rendering
  const bubbles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${15 + i * 6.5}%`,
      bottom: `${10 + (i % 3) * 15}%`,
      size: `${6 + (i % 4) * 4}px`,
      delay: `${i * 0.12}s`,
      drift: `${(i % 2 === 0 ? 25 : -25) + (i % 3) * 10}px`,
    }));
  }, []);

  // Generate 4 expanding ripple rings
  const ripples = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: `${25 + i * 18}%`,
      top: `${30 + (i % 2 === 0 ? 15 : 35)}%`,
      delay: `${i * 0.25}s`,
      scale: 1.2 + (i % 3) * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      <style>{`
        @keyframes waveSurgeDeep {
          0% { transform: translateX(-105%) scaleY(0.95); }
          35% { transform: translateX(-40%) scaleY(1.08) skewY(1deg); }
          70% { transform: translateX(20%) scaleY(0.95) skewY(-1deg); }
          100% { transform: translateX(105%) scaleY(1); }
        }
        @keyframes waveSurgeMid {
          0% { transform: translateX(-105%) translateY(4%) scaleY(0.9); }
          40% { transform: translateX(-30%) translateY(-2%) scaleY(1.05) skewY(-1deg); }
          75% { transform: translateX(30%) translateY(2%) scaleY(0.95) skewY(1deg); }
          100% { transform: translateX(105%) translateY(0%) scaleY(1); }
        }
        @keyframes waveSurgeLight {
          0% { transform: translateX(-105%) translateY(8%) scaleY(0.85); }
          45% { transform: translateX(-20%) translateY(-4%) scaleY(1.02) skewY(2deg); }
          80% { transform: translateX(40%) translateY(4%) scaleY(0.92) skewY(-2deg); }
          100% { transform: translateX(105%) translateY(0%) scaleY(1); }
        }
        @keyframes bubbleRise {
          0% { transform: translateY(120%) translateX(0) scale(0.7); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.8; }
          100% { transform: translateY(-300px) translateX(var(--drift)) scale(1.1); opacity: 0; }
        }
        @keyframes rippleFade {
          0% { transform: scale(0.1); opacity: 0; }
          20% { opacity: 0.55; }
          100% { transform: scale(var(--scale)); opacity: 0; }
        }
        @keyframes shimmerGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.45; }
        }
      `}</style>

      {/* Layer 1: Deep Ocean Teal Wave Base */}
      <div
        style={{ animation: `waveSurgeDeep ${duration}s cubic-bezier(0.25, 0.45, 0.45, 0.95) forwards` }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-[125%] h-full fill-cyan-700/85">
          <path d="M0,0 Q360,250 720,150 T1440,220 L1440,900 L0,900 Z" />
        </svg>
      </div>

      {/* Layer 2: Radiant Turquoise Wave Crest */}
      <div
        style={{ animation: `waveSurgeMid ${duration}s cubic-bezier(0.2, 0.5, 0.4, 0.95) forwards` }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-[125%] h-full fill-sky-400/75">
          <path d="M0,0 Q400,120 800,220 T1440,110 L1440,900 L0,900 Z" />
        </svg>
      </div>

      {/* Layer 3: Foam, Shimmer & Seafoam Light Wave */}
      <div
        style={{ animation: `waveSurgeLight ${duration}s cubic-bezier(0.15, 0.55, 0.35, 0.95) forwards` }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-[125%] h-full fill-sky-100/90 filter drop-shadow-[0_-4px_12px_rgba(255,255,255,0.7)]">
          <path d="M0,0 Q320,180 720,80 T1440,160 L1440,900 L0,900 Z" />
        </svg>
        <div className="absolute top-0 left-0 w-full h-1 bg-white/70 blur-[1px] animate-[shimmerGlow_2s_infinite]" />
      </div>

      {/* Dynamic Water Bubbles Floating & Rising */}
      <div className="absolute inset-0 z-40">
        {bubbles.map((b) => (
          <div
            key={b.id}
            style={{
              left: b.left,
              bottom: b.bottom,
              width: b.size,
              height: b.size,
              animation: `bubbleRise ${duration * 0.95}s ease-out ${b.delay} forwards`,
              '--drift': b.drift,
            } as React.CSSProperties}
            className="absolute rounded-full border border-sky-200/50 bg-gradient-to-tr from-sky-300/30 via-white/45 to-transparent backdrop-blur-[0.5px] shadow-[inset_0_1px_3px_rgba(255,255,255,0.6),0_1px_4px_rgba(14,116,144,0.15)]"
          />
        ))}
      </div>

      {/* Expanding Ripple Rings */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {ripples.map((r) => (
          <div
            key={r.id}
            style={{
              left: r.left,
              top: r.top,
              animation: `rippleFade ${duration * 0.85}s cubic-bezier(0.1, 0.8, 0.3, 1) ${r.delay} forwards`,
              '--scale': r.scale,
            } as React.CSSProperties}
            className="absolute w-24 h-10 -ml-12 -mt-5 rounded-full border-2 border-sky-300/40 shadow-[0_0_20px_rgba(56,189,248,0.2),inset_0_0_15px_rgba(255,255,255,0.4)]"
          />
        ))}
      </div>
    </div>
  );
};

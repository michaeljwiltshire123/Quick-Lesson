import React, { useMemo } from 'react';

export const VolcanicAshOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.8, speed * 2.5);

  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: 42 + Math.random() * 16,
      scale: 0.3 + Math.random() * 0.9,
      delay: Math.random() * 0.3,
      tx: (Math.random() - 0.5) * 360,
      ty: -180 - Math.random() * 180,
      rot: Math.random() * 360,
      size: 8 + Math.random() * 16,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      <style>{`
        @keyframes lavaJet {
          0% { transform: translateY(100%) scaleX(0.2); opacity: 1; filter: brightness(2); }
          15% { transform: translateY(-10%) scaleX(1.4); opacity: 1; filter: brightness(1.5); }
          30% { transform: translateY(-40%) scaleX(2.5) scaleY(1.5); opacity: 0.9; }
          60% { transform: translateY(-70%) scale(4); opacity: 0.4; filter: blur(10px); }
          100% { transform: translateY(-100%) scale(5); opacity: 0; filter: blur(25px); }
        }
        @keyframes ashBillowCenter {
          0% { transform: translate(-50%, 80%) scale(0.1); opacity: 0; filter: blur(10px); }
          12% { transform: translate(-50%, 40%) scale(0.6); opacity: 0.95; }
          40% { transform: translate(-50%, -10%) scale(1.8); opacity: 1; filter: blur(2px); }
          65% { transform: translate(-50%, -50%) scale(3.5); opacity: 1; filter: none; }
          85% { transform: translate(-50%, -50%) scale(4); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4.5); opacity: 0; filter: blur(35px); }
        }
        @keyframes ashBillowSide {
          0% { transform: translate(var(--sx), 80%) scale(0.1); opacity: 0; }
          15% { transform: translate(var(--sx), 30%) scale(0.5); opacity: 0.95; }
          45% { transform: translate(var(--mx), -15%) scale(1.8); opacity: 1; }
          70% { transform: translate(var(--dx), -45%) scale(3.2); opacity: 1; }
          85% { transform: translate(var(--dx), -45%) scale(3.5); opacity: 1; }
          100% { transform: translate(var(--dx), -45%) scale(4); opacity: 0; filter: blur(35px); }
        }
        @keyframes sparkFly {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          50% { transform: translate(calc(var(--tx) * 0.6), calc(var(--ty) * 0.6)) scale(1.3) rotate(180deg); opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes groundShockwave {
          0% { transform: scaleX(0.1) scaleY(0.2); opacity: 1; filter: brightness(2) blur(2px); }
          30% { transform: scaleX(2.2) scaleY(1); opacity: 0.8; }
          100% { transform: scaleX(4) scaleY(1.8); opacity: 0; filter: blur(15px); }
        }
      `}</style>

      {/* Fiery Ground Eruption Shockwave */}
      <div 
        style={{ animation: `groundShockwave ${d * 0.4}s cubic-bezier(0.1, 0.8, 0.2, 1) forwards` }}
        className="absolute bottom-0 left-[15%] right-[15%] h-12 bg-gradient-to-t from-red-600 via-amber-500 to-yellow-300 rounded-full blur-sm"
      />

      {/* Primary Lava Jet Eruption Column */}
      <div 
        style={{ animation: `lavaJet ${d * 0.6}s cubic-bezier(0.15, 0.85, 0.3, 1) forwards` }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[60%] bg-gradient-to-t from-red-700 via-orange-500 to-amber-300 origin-bottom rounded-t-full shadow-[0_0_60px_rgba(249,115,22,0.6)]"
      />

      {/* Overlapping Billowing Ash Mushroom Clouds */}
      <div className="absolute inset-0 z-20">
        {/* Left Ash Billow */}
        <div 
          style={{ 
            animation: `ashBillowSide ${d}s cubic-bezier(0.1, 0.7, 0.3, 1) forwards`,
            '--sx': '-30%', '--mx': '-60%', '--dx': '-80%'
          } as React.CSSProperties}
          className="absolute bottom-0 left-1/2 w-48 h-48 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border border-gray-600/10 rounded-full shadow-[inset_0_-20px_40px_rgba(234,88,12,0.35),0_10px_30px_rgba(0,0,0,0.5)]"
        />

        {/* Right Ash Billow */}
        <div 
          style={{ 
            animation: `ashBillowSide ${d}s cubic-bezier(0.1, 0.7, 0.3, 1) forwards`,
            '--sx': '10%', '--mx': '40%', '--dx': '60%'
          } as React.CSSProperties}
          className="absolute bottom-0 left-1/2 w-48 h-48 bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900 border border-gray-600/10 rounded-full shadow-[inset_0_-20px_40px_rgba(234,88,12,0.35),0_10px_30px_rgba(0,0,0,0.5)]"
        />

        {/* Main Growing Mushroom Cap */}
        <div 
          style={{ animation: `ashBillowCenter ${d}s cubic-bezier(0.12, 0.75, 0.25, 1) forwards` }}
          className="absolute bottom-0 left-1/2 w-60 h-60 bg-gradient-to-b from-gray-600 via-gray-800 to-black border border-gray-700/10 rounded-full shadow-[inset_0_-30px_50px_rgba(249,115,22,0.4),0_20px_40px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Burning Magma Embers & Airborne Ash Particles */}
      <div className="absolute inset-0 z-25">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              left: `${p.left}%`,
              bottom: '10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `sparkFly ${d * 0.8}s cubic-bezier(0.1, 0.8, 0.3, 1) ${p.delay}s forwards`,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
            } as React.CSSProperties}
            className={`absolute rounded-full border border-white/5 shadow-lg ${
              p.id % 3 === 0 
                ? 'bg-gradient-to-tr from-yellow-300 to-amber-500 shadow-amber-500/40' 
                : p.id % 3 === 1
                ? 'bg-gradient-to-tr from-orange-500 to-red-600 shadow-red-500/40'
                : 'bg-gradient-to-tr from-gray-500 via-gray-600 to-gray-700 shadow-black/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

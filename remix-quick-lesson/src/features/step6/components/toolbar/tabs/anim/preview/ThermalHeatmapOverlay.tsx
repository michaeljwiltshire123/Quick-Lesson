import React, { useMemo } from 'react';

export const ThermalHeatmapOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.8, speed * 2.4);

  // Generate 12 thermographic thermal bubbles/nodes that boil outwards
  const nodes = useMemo(() => {
    const colors = [
      'bg-amber-300 shadow-amber-400/80',
      'bg-red-500 shadow-red-600/80',
      'bg-indigo-950 shadow-indigo-900/60',
      'bg-orange-500 shadow-orange-600/80',
    ];
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${15 + (i * 65) / 12 + Math.random() * 8}%`,
      top: `${20 + (i % 3) * 25 + Math.random() * 10}%`,
      delay: `${i * 0.08}s`,
      scale: 1 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      <style>{`
        @keyframes thermalMeltdown {
          0% { transform: scale(0.6); opacity: 0; filter: blur(20px) contrast(150%); }
          20% { opacity: 0.95; filter: blur(8px) contrast(200%); }
          60% { transform: scale(var(--scale)) translate(20px, -20px); opacity: 1; filter: blur(12px); }
          100% { transform: scale(4.5) translate(40px, -40px); opacity: 0; filter: blur(40px); }
        }
        @keyframes liquidHeatWash {
          0% { opacity: 0; filter: saturate(1.2); }
          25% { opacity: 0.75; filter: saturate(2) contrast(150%) brightness(1.2); }
          50% { opacity: 0.95; filter: saturate(3.5) contrast(250%) brightness(1.6); }
          100% { opacity: 0; filter: none; }
        }
        @keyframes thermalShockwave {
          0% { transform: scale(0.1); opacity: 0; }
          30% { transform: scale(0.1); opacity: 0.9; }
          100% { transform: scale(3.5); opacity: 0; filter: blur(30px); }
        }
      `}</style>

      {/* Thermographic Color-Shift Liquid Heat Wash */}
      <div
        style={{ animation: `liquidHeatWash ${d}s ease-in-out forwards` }}
        className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-red-600 to-amber-300 mix-blend-color-burn"
      />

      {/* High-Contrast Boiled Thermal Bubbles Grid */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              left: node.left,
              top: node.top,
              '--scale': node.scale,
              animation: `thermalMeltdown ${d}s cubic-bezier(0.25, 1, 0.5, 1) ${node.delay} forwards`,
            } as React.CSSProperties}
            className={`absolute w-14 h-14 rounded-full filter blur-[4px] border border-white/10 shadow-2xl ${node.color}`}
          />
        ))}
      </div>

      {/* Radiant Thermal Core Explosion wave */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          style={{ animation: `thermalShockwave ${d}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
          className="w-44 h-44 rounded-full border-[10px] border-amber-300 shadow-[0_0_90px_35px_#f59e0b,0_0_150px_60px_#ef4444,inset_0_0_50px_#ffffff] bg-red-600/25"
        />
      </div>

      {/* HUD Warning banner */}
      <div
        style={{ animation: `liquidHeatWash ${d}s ease-out forwards` }}
        className="absolute top-3 left-4 font-mono text-[8px] font-black text-amber-300 flex items-center gap-1.5 drop-shadow-[0_0_4px_#ef4444]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
        <span>THERMO-WAVE OVERHEAT DETECTED</span>
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';

interface IngestionReactorLoaderProps {
  message?: string;
  subMessage?: string;
}

export const IngestionReactorLoader: React.FC<IngestionReactorLoaderProps> = ({
  message = 'Deconstructing document structure...',
  subMessage = 'Atomic reactor parsing active...',
}) => {
  const sparks = useMemo(() => {
    const chars = ['{', '}', '[', ']', '1', '0', 'L', 'S', 'P', 'X', 'Y', 'C', 'Δ', 'Ω', '◆', '✦'];
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      char: chars[i % chars.length],
      left: `${5 + (i * 90) / 24 + (Math.random() - 0.5) * 3}%`,
      delay: `${i * 0.09}s`,
      duration: `${1.1 + Math.random() * 1.3}s`,
      fontSize: `${Math.random() * 6 + 10}px`,
      blur: Math.random() > 0.65 ? 'blur(1px)' : 'none',
      opacity: 0.35 + Math.random() * 0.55,
    }));
  }, []);

  return (
    <div className="absolute inset-0 bg-stone-950/95 pointer-events-none flex flex-col items-center justify-center overflow-hidden z-20">
      <style>{`
        @keyframes laserSweep { 0% { top: 0%; opacity: 0.2; } 50% { opacity: 0.8; } 100% { top: 100%; opacity: 0.2; } }
        @keyframes sparkUp { 0% { transform: translateY(120%) scale(0.6); opacity: 0; } 25% { opacity: 0.9; } 75% { opacity: 0.9; } 100% { transform: translateY(-120%) scale(1.15); opacity: 0; } }
        @keyframes phosphor { 0%, 100% { opacity: 0.95; } 50% { opacity: 0.85; } }
        .radial-crt { background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.85) 100%); }
      `}</style>
      <div className="absolute inset-0 radial-crt pointer-events-none" />
      <div className="absolute left-0 right-0 h-1 bg-[#F59E0B] shadow-[0_0_20px_#F59E0B] z-10" style={{ animation: 'laserSweep 3s infinite linear' }} />
      <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_#10B981] z-10" style={{ animation: 'laserSweep 1.8s infinite linear' }} />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 z-0">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="absolute font-mono font-bold text-[#F59E0B] drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]"
            style={{
              left: s.left,
              fontSize: s.fontSize,
              filter: s.blur,
              opacity: s.opacity,
              animation: `sparkUp ${s.duration} ease-in-out ${s.delay} infinite`,
              bottom: '-20px',
            }}
          >
            {s.char}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 text-center px-6 relative z-10" style={{ animation: 'phosphor 4s infinite ease-in-out' }}>
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 rounded-full border-2 border-dashed border-[#F59E0B]/30 animate-spin" style={{ animationDuration: '6s' }} />
          <div className="absolute w-10 h-10 rounded-full border border-dashed border-emerald-500/40 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          <div className="w-16 h-16 rounded-full bg-stone-900 border border-[#F59E0B]/20 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span className="text-[#F59E0B] font-mono text-lg">⚛</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold text-[#F8F6F0] tracking-wide uppercase drop-shadow-[0_0_3px_rgba(255,255,255,0.15)]">
            {message}
          </h4>
          <p className="text-xs text-emerald-400 font-mono mt-1 tracking-wider uppercase">
            {subMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

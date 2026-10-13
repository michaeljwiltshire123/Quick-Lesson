import React from 'react';

export const SolarEclipseOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes eclipseMoon {
          0% { transform: translateX(-120%) scale(1.1); }
          50% { transform: translateX(0%) scale(1.1); }
          100% { transform: translateX(120%) scale(1.1); }
        }
        @keyframes solarCorona {
          0%, 100% { opacity: 0; transform: scale(0.9); }
          45% { opacity: 0.8; transform: scale(1.08); }
          50% { opacity: 1; transform: scale(1.12); filter: brightness(1.5); }
          55% { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes diamondGlint {
          0%, 48% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.4) rotate(45deg); }
          52% { opacity: 1; transform: scale(1.8) rotate(90deg); filter: brightness(2); }
          54% { opacity: 0.3; transform: scale(1.2) rotate(135deg); }
          56%, 100% { opacity: 0; transform: scale(0) rotate(180deg); }
        }
        @keyframes eclipseAmbient {
          0%, 100% { background-color: rgba(0,0,0,0); }
          45%, 55% { background-color: rgba(12, 10, 9, 0.85); }
        }
        @keyframes eclipseOverlayContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>

      <div
        style={{ animation: `eclipseAmbient ${d}s ease-in-out forwards, eclipseOverlayContainer ${d + 0.15}s ease-out forwards` }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Glowing Sun Corona */}
        <div
          style={{
            animation: `solarCorona ${d}s ease-in-out forwards`,
            background: 'radial-gradient(circle, #fef08a 20%, #f97316 55%, transparent 70%)',
            boxShadow: '0 0 60px #f59e0b, 0 0 100px #ea580c, inset 0 0 20px #ffffff',
          }}
          className="absolute w-36 h-36 rounded-full mix-blend-screen pointer-events-none"
        />

        {/* Moving Dark Moon Sphere */}
        <div
          style={{
            animation: `eclipseMoon ${d}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            background: 'radial-gradient(circle, #1c1917 60%, #0c0a09 100%)',
            boxShadow: '0 0 30px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.05)',
          }}
          className="absolute w-32 h-32 rounded-full border border-stone-800 pointer-events-none"
        />

        {/* Blinding Diamond Ring Lens Flare */}
        <div
          style={{
            animation: `diamondGlint ${d}s ease-in-out forwards`,
            left: 'calc(50% + 54px)',
            top: 'calc(50% - 54px)',
          }}
          className="absolute w-12 h-12 rounded-full bg-white shadow-[0_0_40px_15px_#ffffff,0_0_80px_25px_#ca8a04] pointer-events-none z-20"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-white/80 blur-[1px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-48 bg-white/80 blur-[1px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

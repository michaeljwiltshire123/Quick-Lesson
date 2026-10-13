import React from 'react';

export const PaperCrumbleOverlay: React.FC<{ speed?: number }> = ({ speed = 0.6 }) => {
  const d = Math.max(1.5, speed * 2.2);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      <style>{`
        @keyframes paperCrumble {
          0% { transform: scale(1) rotate(0deg); opacity: 1; filter: contrast(100%); }
          30% { transform: scale(0.65) rotate(5deg); clip-path: polygon(10% 10%, 90% 5%, 85% 95%, 15% 90%); }
          50% { transform: scale(0.35) rotate(-10deg) translateY(0); clip-path: polygon(30% 25%, 70% 30%, 65% 75%, 35% 70%); opacity: 0.95; }
          75% { transform: scale(0.2) rotate(15deg) translateY(240px); opacity: 0.9; }
          85% { transform: scale(0.22) rotate(5deg) translateY(180px); }
          100% { transform: scale(0.18) rotate(20deg) translateY(320px); opacity: 0; }
        }
        @keyframes shadowCollapse {
          0% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(0.1); }
        }
        @keyframes crumbleContainer { 0%, 90% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: `crumbleContainer ${d + 0.15}s ease-out forwards` }}
      >
        {/* Shadow layer underneath */}
        <div
          style={{ animation: `shadowCollapse ${d * 0.5}s ease-out forwards` }}
          className="absolute w-72 h-44 bg-black/35 rounded-full blur-xl pointer-events-none"
        />

        {/* Crumpling Slide 1 Frame */}
        <div
          style={{
            animation: `paperCrumble ${d}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            background: 'linear-gradient(135deg, #fef08a 0%, #ca8a04 100%)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15), 10px 10px 30px rgba(0,0,0,0.2)',
          }}
          className="absolute inset-4 rounded-xl p-4 flex flex-col justify-between border border-amber-950/20 text-stone-900"
        >
          {/* Crease line simulators */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(0,0,0,0.06)_50%,transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(-30deg,transparent_45%,rgba(0,0,0,0.05)_50%,transparent_55%)] pointer-events-none" />
          
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-amber-950">Active Slide (Crumbling...)</span>
            <h4 className="text-sm font-black text-stone-900">Discarded Draft Concepts</h4>
          </div>
          <div className="flex items-center justify-between text-[9px] opacity-70 font-mono text-stone-700">
            <span>Stage 3 Curriculum Plan</span>
            <span>Rolling up...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

interface TimelineMergeOverlayProps {
  fxType: 'none' | 'split' | 'merge';
}

export const TimelineMergeOverlay: React.FC<TimelineMergeOverlayProps> = ({ fxType }) => {
  if (fxType === 'none') return null;

  return (
    <div className="absolute inset-0 bg-stone-900/15 z-40 rounded-xl overflow-hidden flex items-center justify-center pointer-events-none select-none backdrop-blur-[2px]">
      <style>{`
        @keyframes organicSplit { 0% { transform: scale(1); opacity: 1; } 40% { transform: scaleY(1.15) scaleX(0.85); filter: blur(2px); } 100% { transform: scale(0); opacity: 0; filter: blur(8px); } }
        @keyframes shockwaveRipple { 0% { transform: scale(0.1); opacity: 0.9; border-width: 6px; } 100% { transform: scale(2.8); opacity: 0; border-width: 1px; filter: blur(4px); } }
        @keyframes mercuryL { 0% { transform: translateX(-140px) scale(0.7); } 40% { transform: translateX(-18px) scale(1.15); } 100% { transform: translateX(0) scale(1.35); opacity: 0; } }
        @keyframes mercuryR { 0% { transform: translateX(140px) scale(0.7); } 40% { transform: translateX(18px) scale(1.15); } 100% { transform: translateX(0) scale(1.35); opacity: 0; } }
        @keyframes mercurySqueeze { 0%, 100% { border-radius: 50%; } 50% { border-radius: 42% 58% 47% 53% / 45% 48% 52% 55%; } }
        @keyframes dustPuff { 0% { transform: scale(0.1); opacity: 0; } 30% { opacity: 0.85; } 100% { transform: scale(2.4); opacity: 0; filter: blur(10px); } }
      `}</style>

      {fxType === 'split' ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-56 h-36 bg-amber-50 border border-amber-300 p-4 rounded-xl shadow-lg flex items-center justify-center text-xs font-bold text-amber-950 animate-[organicSplit_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            Splitting Lesson Step...
          </div>
          <div className="absolute w-28 h-28 rounded-full border-2 border-amber-500 bg-transparent animate-[shockwaveRipple_0.8s_ease-out_forwards]" />
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="absolute w-0 h-0">
            <filter id="cinematicMercuryMerge">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12" />
            </filter>
          </svg>
          <div style={{ filter: 'url(#cinematicMercuryMerge)' }} className="absolute inset-0 flex items-center justify-center">
            <div 
              className="absolute w-20 h-20 bg-amber-600/90 shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.3),0_0_15px_rgba(217,119,6,0.5)]"
              style={{ animation: 'mercuryL 0.9s cubic-bezier(0.16,1,0.3,1) forwards, mercurySqueeze 0.4s infinite' }}
            />
            <div 
              className="absolute w-20 h-20 bg-amber-600/90 shadow-[inset_3px_-3px_10px_rgba(0,0,0,0.3),0_0_15px_rgba(217,119,6,0.5)]"
              style={{ animation: 'mercuryR 0.9s cubic-bezier(0.16,1,0.3,1) forwards, mercurySqueeze 0.4s infinite' }}
            />
          </div>
          <div className="absolute w-24 h-24 rounded-full bg-[#E2E8F0]/30 animate-[dustPuff_0.8s_ease-out_0.42s_forwards]" />
        </div>
      )}
    </div>
  );
};

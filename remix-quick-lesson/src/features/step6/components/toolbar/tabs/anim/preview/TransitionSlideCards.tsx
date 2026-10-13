import React, { useState, useEffect } from 'react';
import { TransitionItem } from '../../../../../constants/transitionsCatalog';
import { TransitionVisualOverlay } from './TransitionVisualOverlay';

interface TransitionSlideCardsProps {
  selectedTransition: TransitionItem;
  activeTab: 'entry' | 'exit';
  animKey: number;
  combinedAnimStyle: React.CSSProperties;
  speed?: number;
}

export const TransitionSlideCards: React.FC<TransitionSlideCardsProps> = ({
  selectedTransition, activeTab, animKey, combinedAnimStyle, speed = 0.6,
}) => {
  const [isDelaying, setIsDelaying] = useState(true);

  // 0.5s (500ms) pause on Slide 1 so user can see it before transition preview plays
  useEffect(() => {
    setIsDelaying(true);
    const timer = setTimeout(() => {
      setIsDelaying(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [animKey, selectedTransition.id, activeTab]);

  return (
    <div className="relative w-full aspect-video bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 p-2 shadow-inner">
      {/* Base Layer: Slide 1 (visible during the 0.5s pause and underneath) */}
      <div className="absolute inset-2 rounded-xl p-4 flex flex-col justify-between border shadow-sm bg-amber-100 text-stone-900 border-stone-300">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-wide text-amber-950">
            Slide 1 (Previous Page) {isDelaying && '• Resting (0.5s)...'}
          </span>
          <h4 className="text-sm font-black text-stone-900">Lesson Overview: Cell Theory</h4>
        </div>
        <div className="flex items-center justify-between text-[9px] opacity-70 font-mono text-stone-700">
          <span>Curriculum Stage 3 • Unit 2</span>
          {isDelaying && <span className="text-amber-800 font-bold animate-pulse">Preparing Transition...</span>}
        </div>
      </div>

      {/* Transition Layer: Slide 2 (Appears after 0.5s with definite resolved inset-2 bounds) */}
      {!isDelaying && (
        <div
          key={animKey}
          style={combinedAnimStyle}
          className="absolute inset-2 rounded-xl p-4 flex flex-col justify-between border z-10 shadow-2xl overflow-hidden bg-[#FAF9F5] text-stone-900 border-stone-300"
        >
          <div className="space-y-0.5 relative z-10">
            <span className="text-[9px] font-extrabold text-amber-800 uppercase tracking-widest">
              Slide 2 ({activeTab === 'entry' ? 'Entering' : 'Exiting'})
            </span>
            <h3 className="text-base font-black leading-tight text-stone-900">{selectedTransition.name}</h3>
            <p className="text-[11px] text-stone-600 italic leading-tight">{selectedTransition.description}</p>
          </div>

          <div className="flex items-center justify-between text-[9px] text-stone-500 font-mono relative z-10">
            <span>Active Transition Preview</span>
            <span className="font-bold text-amber-800">Live 60fps Keyframe</span>
          </div>
        </div>
      )}

      {/* Synchronized Visual FX Overlay (Laser Beam, Gold Star, KAPOW, Matrix Rain) */}
      {!isDelaying && (
        <div key={`fx-${animKey}`} className="absolute inset-2 pointer-events-none z-30 overflow-hidden rounded-xl">
          <TransitionVisualOverlay
            effectId={selectedTransition.id}
            speed={speed}
            activeTab={activeTab}
          />
        </div>
      )}
    </div>
  );
};

import React from 'react';

export const NoveltyTransitionsKeyframes: React.FC = () => {
  return (
    <style>{`
      @keyframes morphMagicIn {
        0% { transform: scale(0.85) translateY(20px); filter: blur(8px); opacity: 0; }
        60% { transform: scale(1.02) translateY(-2px); filter: blur(1px); opacity: 0.9; }
        100% { transform: scale(1) translateY(0); filter: blur(0); opacity: 1; }
      }
      @keyframes crumblePaperIn {
        0% { transform: scale(0.2) rotate(-45deg); opacity: 0; border-radius: 50%; filter: contrast(200%); }
        60% { transform: scale(0.9) rotate(10deg); opacity: 0.9; border-radius: 20%; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; border-radius: 0; }
      }
      @keyframes ripHalfIn {
        0% { transform: scale(0.96); opacity: 0.8; }
        40% { transform: scale(0.98); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes honeycombIn {
        0% { transform: scale(0.96); opacity: 0.7; filter: brightness(1.15); }
        50% { transform: scale(0.99); opacity: 0.95; }
        100% { transform: scale(1); opacity: 1; filter: none; }
      }
      @keyframes vortexTwirlIn {
        0% { transform: scale(0.1) rotate(-1080deg); opacity: 0; filter: blur(10px); }
        80% { transform: scale(1.02) rotate(15deg); filter: blur(1px); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); }
      }
      @keyframes windowBlindsIn {
        0% { transform: scale(0.97); opacity: 0.7; filter: brightness(1.2); }
        60% { transform: scale(0.995); opacity: 0.95; filter: brightness(1.05); }
        100% { transform: scale(1); opacity: 1; filter: none; }
      }
      @keyframes horizontalBlindsIn {
        0% { transform: scale(0.97); opacity: 0.7; filter: brightness(1.2); }
        60% { transform: scale(0.995); opacity: 0.95; filter: brightness(1.05); }
        100% { transform: scale(1); opacity: 1; filter: none; }
      }
      @keyframes gridTileFlipIn {
        0% { transform: scale(0.97); opacity: 0.7; filter: brightness(1.15); }
        60% { transform: scale(0.995); opacity: 0.95; filter: brightness(1.05); }
        100% { transform: scale(1); opacity: 1; filter: none; }
      }
      @keyframes confettiBurstIn {
        0% { transform: scale(0.96); opacity: 0.7; filter: brightness(1.15); }
        60% { transform: scale(1.01); opacity: 0.98; filter: brightness(1.04); }
        100% { transform: scale(1); opacity: 1; filter: none; }
      }
      @keyframes waterWaveIn {
        0% { clip-path: ellipse(10% 50% at 0% 50%); opacity: 0; filter: blur(4px); }
        60% { clip-path: ellipse(70% 80% at 50% 50%); opacity: 0.9; }
        100% { clip-path: ellipse(150% 150% at 50% 50%); opacity: 1; filter: none; }
      }
      @keyframes cellMitosisIn {
        0% { transform: scale(0.3, 0.8) rotate(-15deg); opacity: 0; }
        50% { transform: scale(1.1, 0.9) rotate(5deg); opacity: 0.8; }
        100% { transform: scale(1, 1) rotate(0deg); opacity: 1; }
      }
      @keyframes volcanicAshIn {
        0% { transform: scale(1.05); opacity: 0; filter: blur(15px) brightness(0.2); }
        65% { transform: scale(1.03); opacity: 0; filter: blur(10px) brightness(0.4); }
        80% { transform: scale(1.01); opacity: 0.8; filter: blur(5px) brightness(0.85); }
        100% { transform: scale(1); opacity: 1; filter: none; }
      }
      @keyframes solarEclipseIn {
        0% { filter: brightness(0.1) drop-shadow(0 0 25px #f59e0b); opacity: 0; transform: scale(0.9); }
        60% { filter: brightness(0.7) drop-shadow(0 0 40px #fbbf24); opacity: 0.9; }
        100% { filter: none; opacity: 1; transform: scale(1); }
      }
      @keyframes spiralSpinIn {
        0% { transform: perspective(1000px) rotateZ(-1800deg) scale(0.1); opacity: 0; }
        70% { transform: perspective(1000px) rotateZ(-90deg) scale(0.95); opacity: 0.9; }
        100% { transform: perspective(1000px) rotateZ(0deg) scale(1); opacity: 1; }
      }
      @keyframes goldStarAnim {
        0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
        40% { transform: translate(-50%, -50%) scale(1.3) rotate(15deg); opacity: 1; }
        65% { transform: translate(-50%, -50%) scale(1.1) rotate(-5deg); opacity: 1; }
        85% { transform: translate(-50%, -50%) scale(1.2) translateY(-30px); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(0.1) translateY(100px); opacity: 0; }
      }
      @keyframes comicKapowAnim {
        0% { transform: translate(-50%, -50%) scale(0.1) rotate(-30deg); opacity: 0; }
        35% { transform: translate(-50%, -50%) scale(1.35) rotate(5deg); opacity: 1; }
        60% { transform: translate(-50%, -50%) scale(1.2) rotate(-5deg); opacity: 1; }
        80% { transform: translate(-50%, -50%) scale(0.8) rotate(20deg); opacity: 0.7; filter: blur(2px); }
        100% { transform: translate(-50%, -50%) scale(0) rotate(45deg); opacity: 0; filter: blur(8px); }
      }
    `}</style>
  );
};

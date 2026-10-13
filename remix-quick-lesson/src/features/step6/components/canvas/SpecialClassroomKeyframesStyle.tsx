import React from 'react';

export const SpecialClassroomKeyframesStyle: React.FC = () => {
  return (
    <style>{`
      @keyframes chalkboardEraserIn {
        0% { clip-path: inset(0 100% 0 0); filter: blur(4px) contrast(150%); }
        50% { filter: blur(2px); }
        100% { clip-path: inset(0 0 0 0); filter: blur(0) contrast(100%); }
      }
      @keyframes rollerScreenIn {
        0% { transform: translateY(-100%) scaleY(0.5); opacity: 0; }
        70% { transform: translateY(5%) scaleY(1.05); }
        100% { transform: translateY(0) scaleY(1); opacity: 1; }
      }
      @keyframes stickyNoteIn {
        0% { transform: translate(-30px, -30px) rotate(-15deg) scale(0.7); opacity: 0; }
        100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
      }
      @keyframes doorPushIn {
        0% { transform: perspective(1000px) rotateY(-80deg); opacity: 0; }
        100% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
      }
      @keyframes goldStarIn {
        0% { transform: scale(3) rotate(-45deg); opacity: 0; }
        60% { transform: scale(0.9) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes textbookFlipIn {
        0% { transform-origin: left center; transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
        100% { transform-origin: left center; transform: perspective(1200px) rotateY(0deg); opacity: 1; }
      }
      @keyframes zipperSplitIn {
        0% { clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%); opacity: 0; }
        100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
      }
      @keyframes laserScanlineIn {
        0% { clip-path: inset(0 0 100% 0); }
        100% { clip-path: inset(0 0 0 0); }
      }
      @keyframes laserBeamTravel {
        0% { top: -2%; opacity: 0; }
        5% { top: 0%; opacity: 1; }
        92% { top: 97%; opacity: 1; }
        100% { top: 100%; opacity: 0; }
      }
      @keyframes matrixRainIn {
        0% { opacity: 0; filter: hue-rotate(90deg) contrast(200%); transform: translateY(-20px); }
        50% { opacity: 0.8; filter: hue-rotate(45deg); }
        100% { opacity: 1; filter: none; transform: translateY(0); }
      }
      @keyframes hologramBeamIn {
        0% { opacity: 0; transform: scaleY(0.1) skewX(20deg); filter: blur(8px) brightness(2); }
        50% { opacity: 0.9; transform: scaleY(1.1) skewX(-5deg); filter: blur(2px) brightness(1.5); }
        100% { opacity: 1; transform: scale(1) skewX(0); filter: none; }
      }
      @keyframes pixelateIn {
        0% { opacity: 0; transform: scale(0.8); filter: blur(16px); }
        100% { opacity: 1; transform: scale(1); filter: blur(0); }
      }
      @keyframes cyberpunkPortalIn {
        0% { transform: scale(0.1) rotate(180deg); opacity: 0; filter: drop-shadow(0 0 20px #f43f5e); }
        100% { transform: scale(1) rotate(0deg); opacity: 1; filter: none; }
      }
      @keyframes heatmapMeltIn {
        0% { opacity: 0; filter: contrast(180%) saturate(3) hue-rotate(120deg) brightness(1.2); }
        45% { opacity: 0.3; filter: contrast(220%) saturate(4) brightness(1.8); }
        60% { opacity: 0.85; filter: contrast(140%) brightness(1.3); }
        85% { opacity: 0.98; filter: contrast(110%); }
        100% { opacity: 1; filter: none; }
      }
      @keyframes quantumSplitIn {
        0% { transform: translateX(-40px) scale(0.9); opacity: 0; filter: blur(6px); }
        50% { transform: translateX(20px); opacity: 0.7; }
        100% { transform: translateX(0) scale(1); opacity: 1; filter: none; }
      }
      @keyframes vhsRewindIn {
        0% { opacity: 0; transform: skewX(-15deg); filter: contrast(200%) brightness(1.5); }
        50% { opacity: 0.8; transform: skewX(10deg); }
        100% { opacity: 1; transform: skewX(0); filter: none; }
      }
      @keyframes blackHoleIn {
        0% { transform: scale(0) rotate(-540deg); opacity: 0; }
        70% { transform: scale(1.1) rotate(45deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes comicSlamIn {
        0% { transform: scale(3) rotate(-20deg); opacity: 0; }
        70% { transform: scale(0.9) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
    `}</style>
  );
};

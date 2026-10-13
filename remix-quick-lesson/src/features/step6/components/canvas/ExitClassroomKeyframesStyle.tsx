import React from 'react';

export const ExitClassroomKeyframesStyle: React.FC = () => {
  return (
    <style>{`
      @keyframes chalkboardEraserOut {
        0% { clip-path: inset(0 0 0 0); filter: none; }
        100% { clip-path: inset(0 0 0 100%); filter: blur(4px) contrast(150%); opacity: 0; }
      }
      @keyframes rollerScreenOut {
        0% { transform: translateY(0) scaleY(1); opacity: 1; }
        100% { transform: translateY(-100%) scaleY(0.4); opacity: 0; }
      }
      @keyframes stickyNoteOut {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(50px, 80px) rotate(25deg) scale(0.6); opacity: 0; }
      }
      @keyframes doorPushOut {
        0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
        100% { transform: perspective(1000px) rotateY(90deg); opacity: 0; }
      }
      @keyframes goldStarOut {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        100% { transform: scale(0) rotate(180deg); opacity: 0; }
      }
      @keyframes textbookFlipOut {
        0% { transform-origin: left center; transform: perspective(1200px) rotateY(0deg); opacity: 1; }
        100% { transform-origin: left center; transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
      }
      @keyframes zipperSplitOut {
        0% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }
        100% { clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%); opacity: 0; }
      }
      @keyframes laserScanlineOut {
        0% { clip-path: inset(0 0 0 0); filter: drop-shadow(0 0 10px #38bdf8); }
        100% { clip-path: inset(100% 0 0 0); opacity: 0; }
      }
      @keyframes matrixRainOut {
        0% { opacity: 1; filter: none; }
        50% { opacity: 0.8; filter: hue-rotate(90deg) contrast(200%); }
        100% { opacity: 0; transform: translateY(40px); }
      }
      @keyframes hologramBeamOut {
        0% { opacity: 1; transform: scale(1); filter: none; }
        100% { opacity: 0; transform: scaleY(0.05) skewX(30deg); filter: brightness(3); }
      }
      @keyframes pixelateOut {
        0% { opacity: 1; filter: blur(0); }
        100% { opacity: 0; transform: scale(0.7); filter: blur(20px); }
      }
      @keyframes cyberpunkPortalOut {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        100% { transform: scale(0.05) rotate(-180deg); opacity: 0; filter: drop-shadow(0 0 25px #f43f5e); }
      }
      @keyframes heatmapMeltOut {
        0% { opacity: 1; filter: none; }
        100% { opacity: 0; filter: invert(1) hue-rotate(180deg) saturate(3); transform: scale(1.05); }
      }
      @keyframes quantumSplitOut {
        0% { transform: translateX(0); opacity: 1; }
        50% { transform: translateX(-30px); opacity: 0.5; filter: blur(8px); }
        100% { transform: translateX(50px); opacity: 0; }
      }
      @keyframes vhsRewindOut {
        0% { opacity: 1; filter: none; }
        100% { opacity: 0; transform: skewX(25deg); filter: contrast(300%) brightness(2); }
      }
      @keyframes blackHoleOut {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        100% { transform: scale(0) rotate(720deg); opacity: 0; }
      }
      @keyframes comicSlamOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0.1) rotate(45deg); opacity: 0; }
      }
      @keyframes origamiDragonIn {
        0% { transform: perspective(800px) rotateX(90deg) scale(0.5); opacity: 0; }
        50% { transform: perspective(800px) rotateY(45deg) scale(0.8); opacity: 0.8; }
        100% { transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1); opacity: 1; }
      }
      @keyframes origamiDragonOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: perspective(800px) rotateX(90deg) rotateY(-45deg) scale(0.2); opacity: 0; }
      }
      @keyframes dnaHelixIn {
        0% { transform: perspective(600px) rotateY(-180deg) scale(0.6); opacity: 0; }
        100% { transform: perspective(600px) rotateY(0deg) scale(1); opacity: 1; }
      }
      @keyframes dnaHelixOut {
        0% { transform: perspective(600px) rotateY(0deg) scale(1); opacity: 1; }
        100% { transform: perspective(600px) rotateY(180deg) scale(0.4); opacity: 0; }
      }
    `}</style>
  );
};

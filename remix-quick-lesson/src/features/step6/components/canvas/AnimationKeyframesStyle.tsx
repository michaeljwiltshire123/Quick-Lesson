import React from 'react';

export const AnimationKeyframesStyle: React.FC = () => {
  return (
    <style>{`
      @keyframes slideRightIn {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideLeftIn {
        0% { transform: translateX(-100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideDownIn {
        0% { transform: translateY(-100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideUpIn {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes zoomIn {
        0% { transform: scale(0.85); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes flipIn {
        0% { transform: perspective(800px) rotateY(90deg); opacity: 0; }
        100% { transform: perspective(800px) rotateY(0deg); opacity: 1; }
      }
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes wipeIn {
        0% { clip-path: inset(0 100% 0 0); opacity: 0.5; }
        100% { clip-path: inset(0 0 0 0); opacity: 1; }
      }
      @keyframes dissolveIn {
        0% { opacity: 0; filter: blur(10px) contrast(150%); transform: scale(0.95); }
        100% { opacity: 1; filter: blur(0) contrast(100%); transform: scale(1); }
      }
      @keyframes slideLeftOut {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
      }
      @keyframes slideRightOut {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
      @keyframes zoomOut {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0.85); opacity: 0; }
      }
      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}</style>
  );
};

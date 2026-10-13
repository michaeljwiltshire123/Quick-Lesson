import React from 'react';

export type BackgroundPatternId =
  | 'true_gold_honeycomb'
  | 'decoy_stripes'
  | 'decoy_waves'
  | 'decoy_crosshatch'
  | 'decoy_dots'
  | 'decoy_zigzag';

interface Props {
  patternId: BackgroundPatternId;
}

export const SecretPatternRenderer: React.FC<Props> = ({ patternId }) => {
  const getPatternStyles = () => {
    switch (patternId) {
      case 'true_gold_honeycomb':
        return {
          wrapper: 'bg-gradient-to-br from-amber-950/80 via-yellow-950/50 to-slate-950',
          overlay: 'bg-[radial-gradient(#f59e0b_2px,transparent_2px)] [background-size:20px_20px] opacity-60',
          glow: 'shadow-[inset_0_0_80px_rgba(245,158,11,0.25)]',
        };
      case 'decoy_stripes':
        return {
          wrapper: 'bg-gradient-to-br from-red-950/80 via-rose-950/50 to-slate-950',
          overlay: 'bg-[repeating-linear-gradient(45deg,#ef4444_0,#ef4444_3px,transparent_0,transparent_16px)] opacity-40',
          glow: 'shadow-[inset_0_0_80px_rgba(239,68,68,0.25)]',
        };
      case 'decoy_waves':
        return {
          wrapper: 'bg-gradient-to-br from-cyan-950/80 via-teal-950/50 to-slate-950',
          overlay: 'bg-[radial-gradient(circle_at_center,#06b6d4_2px,transparent_2px)] [background-size:24px_24px] opacity-45',
          glow: 'shadow-[inset_0_0_80px_rgba(6,182,212,0.25)]',
        };
      case 'decoy_crosshatch':
        return {
          wrapper: 'bg-gradient-to-br from-purple-950/80 via-indigo-950/50 to-slate-950',
          overlay: 'bg-[linear-gradient(to_right,#a855f7_1.5px,transparent_1.5px),linear-gradient(to_bottom,#a855f7_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-40',
          glow: 'shadow-[inset_0_0_80px_rgba(168,85,247,0.25)]',
        };
      case 'decoy_dots':
        return {
          wrapper: 'bg-gradient-to-br from-pink-950/80 via-fuchsia-950/50 to-slate-950',
          overlay: 'bg-[radial-gradient(#ec4899_2.5px,transparent_2.5px)] [background-size:32px_32px] opacity-45',
          glow: 'shadow-[inset_0_0_80px_rgba(236,72,153,0.25)]',
        };
      case 'decoy_zigzag':
      default:
        return {
          wrapper: 'bg-gradient-to-br from-blue-950/80 via-sky-950/50 to-slate-950',
          overlay: 'bg-[repeating-linear-gradient(-45deg,#3b82f6_0,#3b82f6_3px,transparent_0,transparent_18px)] opacity-40',
          glow: 'shadow-[inset_0_0_80px_rgba(59,130,246,0.25)]',
        };
    }
  };

  const { wrapper, overlay, glow } = getPatternStyles();

  return (
    <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${wrapper} ${glow}`}>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
};

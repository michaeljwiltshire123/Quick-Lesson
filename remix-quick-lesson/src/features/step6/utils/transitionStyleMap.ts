import React from 'react';
import { ENTRY_MAP, EXIT_MAP } from './transitionKeyframeMaps';

export function getSpecificTransitionStyle(
  effectId: string,
  type: 'entry' | 'exit',
  durationSeconds: number = 0.6
): React.CSSProperties {
  if (!effectId || effectId === 'none') return {};

  const keyframe = type === 'exit'
    ? (EXIT_MAP[effectId] || 'fadeOut')
    : (ENTRY_MAP[effectId] || 'fadeIn');

  const isLaser = effectId === 'laser_scanline';
  const actualDuration = effectId === 'heatmap_meltdown'
    ? Math.max(2.0, durationSeconds * 2.8)
    : (isLaser || effectId === 'rip_half') ? Math.max(1.3, durationSeconds * 1.8) : durationSeconds;
  const easing = isLaser ? 'cubic-bezier(0.2, 0.8, 0.25, 1)' : 'cubic-bezier(0.16, 1, 0.3, 1)';

  return { animation: `${keyframe} ${actualDuration}s ${easing} forwards` };
}

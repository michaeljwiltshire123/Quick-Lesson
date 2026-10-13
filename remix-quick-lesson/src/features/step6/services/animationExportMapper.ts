export interface ExportFallbackMapping {
  nativeType: string;
  label: string;
  description: string;
}

const FALLBACK_MAP: Record<string, ExportFallbackMapping> = {
  // 3D & Web Canvas
  '3d_zoom': { nativeType: 'fade_in', label: 'Smooth Fade In', description: 'Maps to PowerPoint Fade In.' },
  '3d_flip': { nativeType: 'fly_in_right', label: 'Fly In Right', description: 'Maps to PowerPoint Fly In.' },
  'flowing_path': { nativeType: 'shake', label: 'Shake Emphasis', description: 'Maps to PowerPoint Path Shake.' },
  'magic_morph': { nativeType: 'morph_fade', label: 'Morph Transition', description: 'Maps to PowerPoint Morph.' },
  'physics_bounce': { nativeType: 'bounce', label: 'Native Bounce', description: 'Maps to PowerPoint Bounce.' },
  'pulse': { nativeType: 'pulse_emphasis', label: 'Pulse Emphasis', description: 'Maps to PowerPoint Pulse.' },
  'spin': { nativeType: 'spin_emphasis', label: 'Spin Emphasis', description: 'Maps to PowerPoint Spin.' },
  'grow_shrink': { nativeType: 'grow_emphasis', label: 'Grow / Shrink', description: 'Maps to PowerPoint Grow.' },
  'staggered_group': { nativeType: 'sequence_fade', label: 'Sequential Fade', description: 'Maps to PowerPoint Fade.' },
  // Exit Animations
  'fade_out': { nativeType: 'fade_out', label: 'Fade Out (Exit)', description: 'Native PowerPoint Fade Out.' },
  'fly_out_right': { nativeType: 'fly_out_right', label: 'Fly Out Right', description: 'Native PowerPoint Fly Out.' },
  'shrink_disappear': { nativeType: 'shrink_exit', label: 'Shrink & Disappear', description: 'Native PowerPoint Shrink Exit.' },
  'drop_fall_out': { nativeType: 'fly_out_bottom', label: 'Drop & Fall Out', description: 'Native PowerPoint Fly Out Bottom.' },
  // Novelty Fun Effects
  'roll_in_out': { nativeType: 'wheel_spin', label: 'Wheel Spin / Fly In', description: 'Maps to PowerPoint Spin & Fly In.' },
  'disco_strobe': { nativeType: 'flash_pulse', label: 'Flash Pulse Emphasis', description: 'Maps to PowerPoint Flash Pulse.' },
  'lightning_strike': { nativeType: 'appear', label: 'Appear On Click', description: 'Maps to PowerPoint Instant Appear.' },
  'smoke_bomb': { nativeType: 'zoom_fade', label: 'Zoom & Expand Fade', description: 'Maps to PowerPoint Zoom Fade.' },
  'spotlight_reveal': { nativeType: 'center_zoom', label: 'Center Zoom Fade', description: 'Maps to PowerPoint Center Zoom.' },
  'glitch_hologram': { nativeType: 'wipe_in', label: 'Wipe In / Out', description: 'Maps to PowerPoint Wipe.' },
  'chalkboard_wipe': { nativeType: 'wipe_left_right', label: 'Wipe Left to Right', description: 'Maps to PowerPoint Wipe.' },
};

export function getExportFallbackLabel(effectId: string): string {
  if (!effectId || effectId === 'none') return 'Native Static';
  return FALLBACK_MAP[effectId]?.label || 'Smooth Fade In';
}

export function mapWebEffectToNativeExport(effectId: string): ExportFallbackMapping {
  if (!effectId || effectId === 'none') {
    return { nativeType: 'static', label: 'Native Static', description: 'No export animation applied.' };
  }
  return FALLBACK_MAP[effectId] || {
    nativeType: 'fade_in', label: 'Smooth Fade In', description: 'Web effect auto-mapped to native PowerPoint Fade In.',
  };
}

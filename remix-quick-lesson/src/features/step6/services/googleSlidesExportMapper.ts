export interface GoogleSlidesExportInfo {
  googleSlidesType: string;
  label: string;
  notes: string;
}

const GOOGLE_SLIDES_MAP: Record<string, GoogleSlidesExportInfo> = {
  fade_in: { googleSlidesType: 'FADE_IN', label: 'Fade In', notes: 'Supported natively in Google Slides.' },
  appear_on_click: { googleSlidesType: 'APPEAR', label: 'Appear', notes: 'Supported natively in Google Slides.' },
  slide_in_left: { googleSlidesType: 'FLY_FROM_LEFT', label: 'Fly In From Left', notes: 'Supported natively in Google Slides.' },
  slide_in_right: { googleSlidesType: 'FLY_FROM_RIGHT', label: 'Fly In From Right', notes: 'Supported natively in Google Slides.' },
  slide_in_top: { googleSlidesType: 'FLY_FROM_TOP', label: 'Fly In From Top', notes: 'Supported natively in Google Slides.' },
  slide_in_bottom: { googleSlidesType: 'FLY_FROM_BOTTOM', label: 'Fly In From Bottom', notes: 'Supported natively in Google Slides.' },
  zoom_in: { googleSlidesType: 'ZOOM_IN', label: 'Zoom In', notes: 'Supported natively in Google Slides.' },
  bounce: { googleSlidesType: 'ZOOM_IN', label: 'Zoom In (Bounce Fallback)', notes: 'Google Slides lacks physics bounce; converts cleanly to Zoom In.' },
  pulse: { googleSlidesType: 'FADE_IN', label: 'Fade In Step', notes: 'Google Slides lacks in-place pulse; triggers on-click state.' },
  spin: { googleSlidesType: 'FADE_IN', label: 'Fade In Step', notes: 'Google Slides lacks 360 spin; converts to reveal step.' },
  fade_out: { googleSlidesType: 'FADE_OUT', label: 'Fade Out', notes: 'Supported natively in Google Slides.' },
  fly_out_right: { googleSlidesType: 'FLY_TO_RIGHT', label: 'Fly Out To Right', notes: 'Supported natively in Google Slides.' },
  shrink_disappear: { googleSlidesType: 'ZOOM_OUT', label: 'Zoom Out', notes: 'Supported natively in Google Slides.' },
};

export function getGoogleSlidesExportLabel(effectId: string): string {
  if (!effectId || effectId === 'none') return 'Native Static';
  return GOOGLE_SLIDES_MAP[effectId]?.label || 'Fade In';
}

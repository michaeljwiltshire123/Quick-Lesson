import { ChunkAttachment } from '../../../types';
import { SharingMode } from './components/GoogleSharingModeToggle';

export const adjustGoogleUrl = (rawUrl: string, mode: SharingMode): string => {
  if (!rawUrl || !/docs\.google\.com\/(document|presentation|spreadsheets)\/d\/[a-zA-Z0-9_-]+/i.test(rawUrl)) return rawUrl;
  const base = rawUrl.replace(/\/(edit|copy|template\/preview)(\?.*)?$/i, '');
  return mode === 'copy' ? `${base}/copy` : mode === 'template' ? `${base}/template/preview` : `${base}/edit`;
};

export const detectPlatform = (u: string): ChunkAttachment['platform'] => {
  const l = u.toLowerCase();
  if (l.includes('canva.com')) return 'canva';
  if (l.includes('slides.google.com') || l.includes('docs.google.com/presentation')) return 'google_slides';
  if (l.includes('youtube.com') || l.includes('youtu.be')) return 'youtube';
  if (l.includes('kahoot.it') || l.includes('create.kahoot.it')) return 'kahoot';
  if (l.includes('forms.gle') || l.includes('docs.google.com/forms')) return 'google_forms';
  if (l.includes('h5p.org') || l.includes('h5p.com')) return 'h5p';
  return 'other';
};

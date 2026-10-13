import { SlideElement } from '../../../../../types/slideTypes';

export function getElementRoleBadge(el: SlideElement): string {
  if (el.type === 'image') return 'Image';
  if (el.type === 'video') return 'Video';
  if (el.type === 'shape') return 'Shape';
  const clean = (el.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (el.y <= 25 && el.height <= 30) return 'Title';
  if (el.y <= 45 && el.height <= 25) return 'Subtitle';
  if (clean.startsWith('•') || clean.startsWith('-')) return 'Bullet';
  if (clean.includes('?')) return 'Question';
  return 'Text';
}

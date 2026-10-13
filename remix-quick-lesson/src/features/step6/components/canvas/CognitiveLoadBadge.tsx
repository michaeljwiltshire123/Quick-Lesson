import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface CognitiveLoadBadgeProps {
  elements: SlideElement[];
}

export const CognitiveLoadBadge: React.FC<CognitiveLoadBadgeProps> = ({ elements }) => {
  const textElements = elements.filter((e) => e.type === 'text');
  const mediaElements = elements.filter((e) => e.type === 'image' || e.type === 'video');

  const totalWords = textElements.reduce((acc, el) => {
    return acc + (el.content ? el.content.trim().split(/\s+/).length : 0);
  }, 0);

  const totalBullets = textElements.reduce((acc, el) => {
    return acc + (el.content ? (el.content.match(/[•\-\*]/g) || []).length : 0);
  }, 0);

  const isOverloaded = totalBullets > 6 || totalWords > 100 || mediaElements.length > 2;

  if (!isOverloaded) {
    return (
      <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>Cognitive Load: Optimal for Pupils ({totalWords} words, {mediaElements.length} media)</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300">
      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
      <span>
        Cognitive Load Warning: {totalBullets > 6 ? '>6 bullets' : totalWords > 100 ? `${totalWords} words (>100)` : `${mediaElements.length} media items (>2)`}. Consider splitting onto another slide.
      </span>
    </div>
  );
};

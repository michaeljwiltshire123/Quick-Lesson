import React from 'react';
import { SlideItem } from '../../../types/slideTypes';
import { getConceptBeginningSlides } from '../../../utils/slideNavigationUtils';

interface AimsOutcomesLayerProps {
  slides: SlideItem[];
  onJumpToSlide: (index: number) => void;
}

export const AimsOutcomesLayer: React.FC<AimsOutcomesLayerProps> = ({ slides, onJumpToSlide }) => {
  const aims = slides.find((slide) => slide.archetype === 'aims_outcomes');
  const raw = aims?.elements.find((element) => element.id === 'el-aims-body')?.content || '';
  const outcomes = raw.split('\n').map((line) => line.replace(/^[•\d.\-\s]+/, '').trim()).filter(Boolean);
  const concepts = getConceptBeginningSlides(slides);

  return (
    <section className="my-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xs font-black uppercase tracking-wide text-stone-800">Learning outcomes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-700">
            {outcomes.map((outcome, index) => <li key={`${index}-${outcome}`}>{outcome}</li>)}
          </ul>
        </div>
        <nav aria-label="Lesson concepts">
          <h2 className="text-xs font-black uppercase tracking-wide text-stone-800">Lesson concepts</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {concepts.map(({ slide, index }) => (
              <button key={slide.id} type="button" onClick={() => onJumpToSlide(index)}
                className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-left text-xs hover:border-amber-500">
                {slide.title}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};

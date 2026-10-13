import React from 'react';
import { SlideItem } from '../../types/slideTypes';
import { getConceptBeginningSlides } from '../../utils/slideNavigationUtils';
import { BookOpen, ArrowRight, Compass, Target, CheckCircle } from 'lucide-react';

interface TableOfContentsAimsProps {
  slides: SlideItem[];
  onJumpToSlide: (index: number) => void;
}

export const TableOfContentsAims: React.FC<TableOfContentsAimsProps> = ({
  slides, onJumpToSlide,
}) => {
  const concepts = getConceptBeginningSlides(slides);
  const aimsSlide = slides.find((s) => s.archetype === 'aims_outcomes' || s.id === 'slide-aims-outcomes');
  const aimsBodyElement = aimsSlide?.elements.find((e) => e.id.includes('aims-body') || e.content?.includes('•') || e.content?.includes('1.'));
  const rawOutcomes = aimsBodyElement?.content || '• Master foundational concepts & key terminology\n• Apply practical examples and structured reasoning\n• Demonstrate independent understanding & inquiry';
  const outcomeItems = rawOutcomes.split('\n').map((l) => l.replace(/^[•\d\.\-\s]+/, '').trim()).filter(Boolean);

  return (
    <div className="w-full my-3 grid grid-cols-1 lg:grid-cols-12 gap-3 select-none">
      {/* Learning Outcomes Column */}
      <div className="lg:col-span-5 p-4 bg-white border border-stone-200/90 rounded-2xl shadow-sm flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-2 pb-2.5 border-b border-stone-100">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">
                Session Learning Outcomes
              </h3>
              <p className="text-[10px] text-stone-500 font-medium">Core intentions for today's lesson</p>
            </div>
          </div>
          <ul className="space-y-2 pt-2.5">
            {outcomeItems.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-stone-800">
                <span className="w-5 h-5 rounded-full bg-emerald-100/80 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-stone-400 pt-2 border-t border-stone-100">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Curriculum aligned for structured pupil progression.</span>
        </div>
      </div>

      {/* Interactive Table of Contents Column */}
      <div className="lg:col-span-7 p-4 bg-white border border-amber-200 rounded-2xl shadow-sm flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-950">
                Interactive Table of Contents
              </h3>
              <p className="text-[10px] text-amber-800/80 font-medium">Click any concept to jump directly</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200">
            {concepts.length} Concepts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
          {concepts.map((concept) => (
            <button
              key={concept.slide.id}
              type="button"
              onClick={(e) => { e.stopPropagation(); onJumpToSlide(concept.index); }}
              className="p-2.5 text-left bg-stone-50/80 hover:bg-amber-50/80 border border-stone-200/80 hover:border-amber-400 rounded-xl flex items-center justify-between group transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              title={`Jump to ${concept.title}`}
            >
              <div className="space-y-0.5 min-w-0 pr-2">
                <div className="flex items-center gap-1 text-[9px] font-extrabold uppercase text-amber-800 tracking-wide">
                  <BookOpen className="w-3 h-3 text-amber-700" />
                  <span>Concept {concept.conceptNumber}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-500">Slide {concept.index + 1}</span>
                </div>
                <p className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-amber-950">
                  {concept.title}
                </p>
              </div>
              <div className="w-6 h-6 rounded-lg bg-white border border-stone-200 group-hover:border-amber-300 flex items-center justify-center shrink-0 text-stone-400 group-hover:text-amber-800 transition-colors shadow-2xs">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


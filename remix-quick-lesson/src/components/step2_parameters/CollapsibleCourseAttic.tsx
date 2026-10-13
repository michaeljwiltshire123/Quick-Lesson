import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, PlusCircle } from 'lucide-react';
import { ModuleScheme } from '../../types';
import { AtticDrawerContent } from './AtticDrawerContent';

interface CollapsibleCourseAtticProps {
  moduleScheme: ModuleScheme;
  onUpdateUnitDurationWeeks: (unitDurationWeeks: number) => void;
  onUpdateScenario: (scenario: string) => void;
  onAddDeliverable: (item: string) => void; onRemoveDeliverable: (index: number) => void;
  onAddCriterion: (code: string) => void; onRemoveCriterion: (index: number) => void;
  onAddAssignmentBrief: () => void; onLookAgain: () => void;
}

export const CollapsibleCourseAttic: React.FC<CollapsibleCourseAtticProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { moduleScheme } = props;

  const headerTitle = moduleScheme.hasBrief ? (moduleScheme.courseTitle || 'Course Syllabus') : 'Course Syllabus Attic';
  const unitSubtitle = moduleScheme.hasBrief && moduleScheme.unitName
    ? `• ${moduleScheme.unitName}` : (!moduleScheme.hasBrief ? '• No Syllabus Uploaded (Optional)' : '');

  const handleUnitDurationWeeksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseInt(e.target.value, 10);
    let unitDurationWeeks = 1;
    if (isNaN(rawVal) || rawVal < 1) {
      unitDurationWeeks = 1;
    } else if (rawVal > 52) {
      unitDurationWeeks = 52;
    } else if (rawVal >= 1 && rawVal <= 52) {
      unitDurationWeeks = rawVal;
    }
    props.onUpdateUnitDurationWeeks(unitDurationWeeks);
  };

  return (
    <section id="tour-course-brief-section" className="w-full bg-[#F8F6F0] border border-[#2D2A26]/15 rounded-2xl p-4 sm:p-5 text-[#2D2A26] shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2D2A26] text-[#F59E0B] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#2D2A26]">{headerTitle}</h3>
              {unitSubtitle && <span className="text-xs text-[#F59E0B] font-semibold">{unitSubtitle}</span>}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#2D2A26]/70">
              <label htmlFor="unit-duration-weeks-input" className="text-[11px] uppercase tracking-wider text-[#2D2A26]/60">Total Unit Weeks:</label>
              <input
                id="unit-duration-weeks-input" type="number" min={1} max={52}
                value={moduleScheme.unitDurationWeeks || 1} onChange={handleUnitDurationWeeksChange}
                className="w-16 bg-white text-[#2D2A26] text-xs font-bold rounded-lg px-2 py-0.5 border border-[#2D2A26]/20 focus:outline-none focus:border-[#F59E0B]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {!moduleScheme.hasBrief && (
            <button
              type="button" onClick={props.onAddAssignmentBrief}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#2D2A26] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Assignment Brief</span>
            </button>
          )}
          <button
            id="tour-reveal-brief-btn"
            type="button" onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-[#2D2A26] text-xs font-semibold border border-[#2D2A26]/15 transition-colors cursor-pointer"
          >
            <span>{isOpen ? 'Hide Brief' : 'Reveal Brief'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <AtticDrawerContent
          moduleScheme={moduleScheme} onUpdateScenario={props.onUpdateScenario}
          onAddDeliverable={props.onAddDeliverable} onRemoveDeliverable={props.onRemoveDeliverable}
          onAddCriterion={props.onAddCriterion} onRemoveCriterion={props.onRemoveCriterion}
          onLookAgain={props.onLookAgain}
        />
      )}
    </section>
  );
};

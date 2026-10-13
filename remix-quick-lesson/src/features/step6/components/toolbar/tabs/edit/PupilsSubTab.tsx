import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { User } from 'lucide-react';
import { PupilPraiseBadges } from './PupilPraiseBadges';

interface PupilsSubTabProps {
  selectedElement?: SlideElement;
  onUpdateElement: (patch: Partial<SlideElement>) => void;
  onInsertElement: (newElement: SlideElement) => void;
}

export const PupilsSubTab: React.FC<PupilsSubTabProps> = ({
  selectedElement, onUpdateElement, onInsertElement,
}) => {
  const insertStudentNameTag = () => {
    if (selectedElement && selectedElement.type === 'text') {
      onUpdateElement({ content: `${selectedElement.content} {student_name}` });
    } else {
      onInsertElement({
        id: `el-tag-${Date.now()}`,
        type: 'text',
        x: 25,
        y: 40,
        width: 50,
        height: 20,
        content: 'Well done, {student_name}! Excellent effort today.',
        textStyle: { bold: true, align: 'center', color: '#92400E' },
      });
    }
  };

  return (
    <div className="space-y-2 text-xs text-stone-700 animate-in fade-in pt-1.5">
      <div className="space-y-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl">
        <div className="font-bold text-stone-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-amber-700" />Pupil Personalisation</span>
        </div>
        <p className="text-[10px] text-stone-500">Inject personalised student names dynamically.</p>
        <button
          type="button"
          onClick={insertStudentNameTag}
          className="w-full py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold rounded-lg cursor-pointer text-center text-xs transition-colors shadow-2xs"
        >
          + Insert {'{student_name}'} Tag
        </button>
      </div>

      <PupilPraiseBadges onInsertElement={onInsertElement} />
    </div>
  );
};

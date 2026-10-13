import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { StampsAndFortuneCookie } from '../../../joy/StampsAndFortuneCookie';
import { TeacherStampsAndPupilTags } from '../../../joy/TeacherStampsAndPupilTags';
import { Sparkles } from 'lucide-react';

interface JoyDockSoundAndStampsProps {
  onInsertElement: (element: SlideElement) => void;
}

export const JoyDockSoundAndStamps: React.FC<JoyDockSoundAndStampsProps> = ({
  onInsertElement,
}) => {
  return (
    <div className="p-2 bg-stone-50 border border-stone-200 rounded-xl space-y-1.5">
      <div className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        <span>Stamps & Fortune Motivator</span>
      </div>
      <StampsAndFortuneCookie onInsertStamp={onInsertElement} />
      <TeacherStampsAndPupilTags onInsertElement={onInsertElement} />
    </div>
  );
};

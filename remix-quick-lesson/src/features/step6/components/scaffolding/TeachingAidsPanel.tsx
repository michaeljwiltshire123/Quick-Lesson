import React from 'react';
import { SlideElement } from '../../types/slideTypes';
import { FillInBlanksControl } from './FillInBlanksControl';
import { ReadingLevelDifferentiator } from './ReadingLevelDifferentiator';
import { AutoBoldVocabulary } from './AutoBoldVocabulary';
import { GraduationCap } from 'lucide-react';

interface TeachingAidsPanelProps {
  selectedElement?: SlideElement;
  onUpdateContent: (newContent: string) => void;
}

export const TeachingAidsPanel: React.FC<TeachingAidsPanelProps> = ({
  selectedElement, onUpdateContent,
}) => {
  return (
    <div className="space-y-3 p-1">
      <div className="flex items-center justify-between pb-1 border-b border-stone-200">
        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-800">
          <GraduationCap className="w-4 h-4 text-amber-800" />
          <span>Teaching Scaffolding Aids</span>
        </div>
        <span className="text-[10px] text-stone-500 font-medium">Classroom Tools</span>
      </div>

      <FillInBlanksControl
        selectedElement={selectedElement}
        onUpdateContent={onUpdateContent}
      />

      <ReadingLevelDifferentiator
        selectedElement={selectedElement}
        onUpdateContent={onUpdateContent}
      />

      <AutoBoldVocabulary
        selectedElement={selectedElement}
        onUpdateContent={onUpdateContent}
      />
    </div>
  );
};

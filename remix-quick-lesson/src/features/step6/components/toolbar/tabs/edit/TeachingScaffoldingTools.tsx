import React from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { FillInBlanksControl } from '../../../scaffolding/FillInBlanksControl';
import { ReadingLevelDifferentiator } from '../../../scaffolding/ReadingLevelDifferentiator';
import { AutoBoldVocabulary } from '../../../scaffolding/AutoBoldVocabulary';

interface TeachingScaffoldingToolsProps {
  selectedElement?: SlideElement;
  onUpdateContent: (content: string) => void;
}

export const TeachingScaffoldingTools: React.FC<TeachingScaffoldingToolsProps> = ({
  selectedElement, onUpdateContent,
}) => {
  return (
    <div className="space-y-2.5">
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

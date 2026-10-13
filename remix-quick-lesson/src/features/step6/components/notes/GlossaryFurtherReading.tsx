import React from 'react';
import { SpeakerNotesData } from '../../types/slideTypes';
import { GlossarySection } from './GlossarySection';
import { FurtherReadingSection } from './FurtherReadingSection';
import { EalTranslationHelper } from './EalTranslationHelper';

interface GlossaryFurtherReadingProps {
  notes: SpeakerNotesData;
  onUpdate: (patch: Partial<SpeakerNotesData>) => void;
}

export const GlossaryFurtherReading: React.FC<GlossaryFurtherReadingProps> = ({ notes, onUpdate }) => {
  const terms = (notes.glossary || []).map((g) => g.term);

  return (
    <div className="space-y-4">
      <GlossarySection
        glossary={notes.glossary || []}
        onUpdate={(glossary) => onUpdate({ glossary })}
      />
      <EalTranslationHelper terms={terms} />
      <FurtherReadingSection
        reading={notes.furtherReading || []}
        onUpdate={(furtherReading) => onUpdate({ furtherReading })}
      />
    </div>
  );
};

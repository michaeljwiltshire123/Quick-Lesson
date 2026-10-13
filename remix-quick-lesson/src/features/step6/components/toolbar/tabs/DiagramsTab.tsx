import React, { useState } from 'react';
import { SlideElement } from '../../../types/slideTypes';
import { DiagramTemplateCard } from './diagrams/DiagramTemplateCard';
import { DiagramOptions } from './diagrams/diagramFactory';
import { DIAGRAM_TEMPLATES } from './diagrams/templates';

interface DiagramsTabProps {
  onInsertElements: (elements: SlideElement[]) => void;
}

export const DiagramsTab: React.FC<DiagramsTabProps> = ({ onInsertElements }) => {
  const [settings, setSettings] = useState<Record<string, DiagramOptions>>({});
  return (
    <div className="space-y-2 text-xs text-stone-700">
      <p className="text-[11px] text-stone-500">Choose a diagram, adjust its parts and colour, then add it. Edit labels and resize pieces on the canvas.</p>
      <div className="space-y-2">
        {DIAGRAM_TEMPLATES.map((template) => {
          const options = settings[template.title] || template.defaults;
          return <DiagramTemplateCard
            key={template.title}
            template={template}
            options={options}
            onChange={(next) => setSettings((current) => ({ ...current, [template.title]: next }))}
            onAdd={() => onInsertElements(template.create(options))}
          />;
        })}
      </div>
      <p className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-[10px] leading-relaxed text-amber-950">
        Word Cloud is marked Live Lesson only. Audience submissions are not connected to the slide presenter yet; its words are editable placeholders.
      </p>
    </div>
  );
};

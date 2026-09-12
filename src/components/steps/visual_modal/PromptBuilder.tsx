import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PromptDropdowns, PromptSelections } from './PromptDropdowns';
import { PromptPreviewLaunchers } from './PromptPreviewLaunchers';
import { PROMPT_OPTIONS } from './presetData';

interface PromptBuilderProps {
  slideTitle?: string;
  themeNotes?: string;
}

export const PromptBuilder: React.FC<PromptBuilderProps> = ({ slideTitle = 'Lesson Concept', themeNotes }) => {
  const [selections, setSelections] = useState<PromptSelections>({
    subject: PROMPT_OPTIONS.subjects[0],
    style: PROMPT_OPTIONS.styles[0],
    action: PROMPT_OPTIONS.actions[0],
    lighting: PROMPT_OPTIONS.lighting[0],
    mood: PROMPT_OPTIONS.moods[0],
    palette: PROMPT_OPTIONS.palettes[0],
    composition: PROMPT_OPTIONS.compositions[0],
    technical: PROMPT_OPTIONS.technical[0],
    exaggeration: 3,
    negatives: ['blurry, deformed, watermarks'],
    themeAware: true,
  });

  const exaggerationLabel = ['Minimal', 'Slight Accentuation', 'Expressive', 'High Stylisation', 'Absurd & Surreal'][selections.exaggeration - 1];

  let promptText = `${selections.style} illustration of ${slideTitle}: ${selections.subject}, ${selections.action}. `;
  promptText += `Lighting: ${selections.lighting}. Mood: ${selections.mood}. Palette: ${selections.palette}. `;
  promptText += `Composition: ${selections.composition}. Technical: ${selections.technical}. `;
  promptText += `Exaggeration level ${selections.exaggeration}/5 (${exaggerationLabel}). `;

  if (selections.themeAware && themeNotes && themeNotes.trim()) {
    promptText += `Contextual Curriculum Theme: ${themeNotes.trim()}. `;
  }

  if (selections.negatives.length > 0) {
    promptText += `Negative constraints: --no ${selections.negatives.join(', ')}.`;
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-[#2D2A26]/10 space-y-3.5">
      <div className="flex items-center gap-2 font-bold text-base text-[#2D2A26]">
        <Sparkles className="w-5 h-5 text-[#D97706]" />
        <span>Client-Side AI Prompt Builder</span>
      </div>

      <PromptDropdowns selections={selections} onChange={setSelections} />
      <PromptPreviewLaunchers promptText={promptText} />
    </div>
  );
};

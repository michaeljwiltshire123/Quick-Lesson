import React from 'react';
import { Sparkles } from 'lucide-react';

export interface ThemeStepCardProps {
  themeNotes: string;
  onThemeNotesChange: (theme: string) => void;
  onNextStep: () => void;
}

const THEME_CHIPS = [
  'World Book Day',
  'Pride',
  'Earth Day',
  'British Science Week',
  'Black History Month',
  'Mental Health Week',
];

export const ThemeStepCard: React.FC<ThemeStepCardProps> = ({
  themeNotes,
  onThemeNotesChange,
  onNextStep,
}) => {
  const handleChipClick = (chip: string) => {
    if (!themeNotes.trim()) {
      onThemeNotesChange(chip);
    } else if (!themeNotes.includes(chip)) {
      onThemeNotesChange(`${themeNotes}, ${chip}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-[#2D2A26]">
          Is there any special theme consideration?
        </h2>
        <p className="text-xs text-[#2D2A26]/70">
          Optionally align your lesson with national curriculum events, school assemblies, or cultural awareness weeks.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D2A26]/80">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Quick Suggestions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {THEME_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="px-2.5 py-1.5 bg-[#F8F6F0] hover:bg-[#F59E0B]/20 border border-[#2D2A26]/15 hover:border-[#F59E0B] rounded-lg text-xs text-[#2D2A26] font-medium transition-colors cursor-pointer"
            >
              + {chip}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={themeNotes}
        onChange={(e) => onThemeNotesChange(e.target.value)}
        placeholder="E.g., Integrate Earth Day sustainability context or British Science Week practical investigation..."
        className="w-full h-24 p-3 bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl text-xs text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:border-[#F59E0B] resize-none"
      />

      <div className="pt-1 flex items-center justify-end">
        <button
          type="button"
          onClick={onNextStep}
          className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

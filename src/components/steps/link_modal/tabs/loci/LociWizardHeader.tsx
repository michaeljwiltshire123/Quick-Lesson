import React from 'react';
import { Compass } from 'lucide-react';
import { LociWizardStep } from './types';

interface Props {
  step: LociWizardStep;
}

const STEPS: { id: LociWizardStep; label: string }[] = [
  { id: 'words', label: '1. Keywords & Route' },
  { id: 'mapper', label: '2. Route & Imagery' },
  { id: 'script', label: '3. Walkthrough & Cards' },
];

export const LociWizardHeader: React.FC<Props> = ({ step }) => (
  <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-1.5">
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-[#D97706]/15 rounded-lg text-[#D97706]"><Compass className="w-4 h-4" /></div>
      <span className="text-xs font-black text-[#2D2A26] uppercase tracking-wide">Method of Loci Palace Generator</span>
    </div>
    <div className="flex items-center gap-1 text-[11px] font-bold">
      {STEPS.map((s) => (
        <span
          key={s.id}
          className={`px-2 py-0.5 rounded-md transition-colors ${
            step === s.id ? 'bg-[#D97706] text-white shadow-2xs' : 'text-[#2D2A26]/50'
          }`}
        >
          {s.label}
        </span>
      ))}
    </div>
  </div>
);

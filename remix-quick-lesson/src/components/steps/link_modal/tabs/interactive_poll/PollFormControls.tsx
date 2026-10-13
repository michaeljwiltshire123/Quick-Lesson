import React from 'react';
import { PollFormState } from './types';
import { PollOptionsEditor } from './PollOptionsEditor';
import { PollTogglesBar } from './PollTogglesBar';

interface Props {
  formState: PollFormState;
  onChange: (patch: Partial<PollFormState>) => void;
}

export const PollFormControls: React.FC<Props> = ({ formState, onChange }) => {
  return (
    <div className="space-y-3 bg-white border border-[#2D2A26]/10 rounded-xl p-3.5 shadow-2xs">
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70 mb-1">
          Teacher Question / Inquiry Prompt
        </label>
        <textarea
          rows={2}
          value={formState.question}
          onChange={(e) => onChange({ question: e.target.value })}
          placeholder="e.g. Which operational principle prevents system degradation in this scenario?"
          className="w-full text-xs bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl p-2.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
        />
      </div>

      <PollOptionsEditor
        pollType={formState.pollType}
        options={formState.options}
        onChangeOptions={(options) => onChange({ options })}
      />

      <PollTogglesBar formState={formState} onChange={onChange} />

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D2A26]/70 mb-1">
          Misconception Explainer (Classroom Feedback)
        </label>
        <textarea
          rows={2}
          value={formState.misconceptionExplainer}
          onChange={(e) => onChange({ misconceptionExplainer: e.target.value })}
          placeholder="Teacher guidance revealed after voting to address common pupil pitfalls..."
          className="w-full text-xs bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl p-2.5 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30"
        />
      </div>
    </div>
  );
};

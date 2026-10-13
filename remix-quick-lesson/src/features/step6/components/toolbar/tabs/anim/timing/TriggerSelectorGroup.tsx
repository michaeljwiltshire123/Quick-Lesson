import React from 'react';

interface TriggerSelectorGroupProps {
  value?: string;
  onChange: (trigger: string) => void;
}

export const TriggerSelectorGroup: React.FC<TriggerSelectorGroupProps> = ({ value = 'onClick', onChange }) => (
  <label className="block space-y-1 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
    <span>Trigger</span>
    <select value={value} onChange={(event) => onChange(event.currentTarget.value)}
      className="w-full text-[11px] normal-case p-1.5 rounded-lg bg-white border border-amber-300 focus:ring-1 focus:ring-amber-500 cursor-pointer">
      <option value="onClick">On Click</option>
      <option value="withPrevious">With Previous</option>
      <option value="afterPrevious">After Previous</option>
    </select>
  </label>
);
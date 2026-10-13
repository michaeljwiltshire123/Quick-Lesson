import React from 'react';

interface DurationInputGuardProps {
  value: unknown;
  onChange: (duration: number) => void;
  label?: string;
}

export function normalizeDuration(value: unknown): number {
  const duration = Math.max(0.1, Number(value) || 0.5);
  return Number.isFinite(duration) ? duration : 0.5;
}

export function normalizeDelay(value: unknown): number {
  const delay = Number(value);
  return Number.isFinite(delay) ? Math.max(0, delay) : 0;
}

export const DurationInputGuard: React.FC<DurationInputGuardProps> = ({ value, onChange, label = 'Duration' }) => {
  const duration = normalizeDuration(value);
  return (
    <label className="block space-y-1 text-[10px] font-bold text-stone-600">
      <span className="flex justify-between"><span>{label}</span><span className="font-mono">{duration.toFixed(1)}s</span></span>
      <input type="range" min="0.1" max="10" step="0.1" value={duration}
        onChange={(event) => onChange(normalizeDuration(event.currentTarget.value))}
        className="w-full accent-amber-600" />
    </label>
  );
};

export default DurationInputGuard;
import React from 'react';
import { Check, SlidersHorizontal } from 'lucide-react';
import { DiagramOptions } from './diagramFactory';
import { DiagramTemplate } from './templates';

interface Props {
  template: DiagramTemplate;
  options: DiagramOptions;
  onChange: (options: DiagramOptions) => void;
  onAdd: () => void;
}

export const DiagramTemplateCard: React.FC<Props> = ({ template, options, onChange, onAdd }) => {
  const Icon = template.icon;
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-3 shadow-2xs">
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[11px] font-bold text-stone-800">{template.title}</h3>
            {template.liveOnly && <span className="rounded bg-amber-100 px-1 py-0.5 text-[8px] font-bold text-amber-900">LIVE LESSON</span>}
          </div>
          <p className="mt-0.5 text-[9px] leading-tight text-stone-500">{template.description}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-stone-400">
          <SlidersHorizontal className="h-3 w-3" aria-hidden="true" /> Customize
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2">
        {template.controls.map((control) => (
          <label key={control.key} className="min-w-0 text-[9px] font-semibold text-stone-600">
            <span className="mb-1 block">{control.label}</span>
            <select
              aria-label={`${template.title}: ${control.label}`}
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-1.5 py-1.5 text-[10px] text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
              value={options[control.key] || template.defaults[control.key]}
              onChange={(event) => onChange({ ...options, [control.key]: event.target.value })}
            >
              {control.options.map((choice) => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
            </select>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-700 px-2 py-2 text-[10px] font-bold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        <Check className="h-3.5 w-3.5" aria-hidden="true" /> Add to slide
      </button>
    </section>
  );
};

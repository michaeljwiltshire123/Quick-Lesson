import React, { useEffect, useState } from 'react';
import { GlossaryItem } from '../../types/slideTypes';

interface GlossaryFieldProps {
  glossary: GlossaryItem[];
  onChange: (glossary: GlossaryItem[]) => void;
}

export const GlossaryField: React.FC<GlossaryFieldProps> = ({ glossary, onChange }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(glossary.map((item) => `${item.term}: ${item.definition}`).join('\n'));
  }, [glossary]);

  const commit = () => onChange(value.split('\n').filter(Boolean).flatMap((line) => {
    const [term, ...definition] = line.split(':');
    return term?.trim() && definition.length
      ? [{ term: term.trim(), definition: definition.join(':').trim() }]
      : [];
  }));

  return (
    <label className="text-xs font-semibold text-stone-700">Glossary of key terms (term: definition)
      <textarea rows={3} value={value} onChange={(e) => setValue(e.target.value)} onBlur={commit}
        className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-50 p-2 font-normal" />
    </label>
  );
};

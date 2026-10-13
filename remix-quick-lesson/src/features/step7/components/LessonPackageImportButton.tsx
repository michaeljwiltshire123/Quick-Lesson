import React, { useRef, useState } from 'react';
import { LessonPackage } from '../services/exporters/lessonPackageTypes';

interface Props { onImport: (pack: LessonPackage) => void }
export const LessonPackageImportButton: React.FC<Props> = ({ onImport }) => {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const chooseFile = async (file?: File) => {
    if (!file) return;
    try {
      const { readLessonPackage } = await import('../services/exporters/lessonPackageImporter');
      onImport(await readLessonPackage(file)); setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not read this lesson file.');
    }
  };
  return <div className="mt-3">
    <input ref={input} type="file" accept=".lesson,application/json" className="hidden" onChange={(event) => void chooseFile(event.target.files?.[0])} />
    <button type="button" className="rounded-xl border border-dashed border-amber-700 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950" onClick={() => input.current?.click()}>
      Open a Quick Lesson (.lesson) file
    </button>
    {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
  </div>;
};

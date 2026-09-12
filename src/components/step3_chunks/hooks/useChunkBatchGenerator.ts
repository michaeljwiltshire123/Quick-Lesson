import { useEffect, useRef } from 'react';
import { LessonChunk, ModuleScheme } from '../../../types';

interface UseChunkBatchGeneratorProps {
  chunks: LessonChunk[];
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  themeNotes?: string;
  moduleScheme?: ModuleScheme;
  onUpdateSingleChunk: (updated: LessonChunk) => void;
}

export function useChunkBatchGenerator({
  chunks, lessonTitle, subject, gradeLevel, themeNotes, moduleScheme, onUpdateSingleChunk,
}: UseChunkBatchGeneratorProps) {
  const generatingIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const unpopulated = chunks.filter(
      (c) => c.type === 'teaching' && !c.teacherScript && !c.classroomNotes && !generatingIdsRef.current.has(c.id)
    );
    if (unpopulated.length === 0) return;

    unpopulated.forEach((chunk) => {
      generatingIdsRef.current.add(chunk.id);
      const courseTitle = moduleScheme?.courseTitle || moduleScheme?.unitName || '';

      fetch('/api/generate-lesson-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'core_explanation',
          chunkTitle: chunk.title,
          lessonTitle,
          courseTitle,
          subject,
          gradeLevel,
          themeNotes,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.coreExplanation) {
            const fmt = (v: any) => Array.isArray(v) ? v.map((x) => (typeof x === 'string' && !x.startsWith('•') ? `• ${x}` : x)).join('\n') : (v || '');
            const stitchedNotes = `### How to Use\n${fmt(data.howToUse)}\n\n### Why to Use\n${fmt(data.whyToUse)}`;
            onUpdateSingleChunk({
              ...chunk,
              teacherScript: data.coreExplanation,
              classroomNotes: stitchedNotes,
              learningIntent: data.example || data.workedExample || chunk.learningIntent,
              isDraft: false,
            });
          }
        })
        .catch((err) => console.warn('Chunk batch generation warning:', chunk.id, err))
        .finally(() => generatingIdsRef.current.delete(chunk.id));
    });
  }, [chunks, lessonTitle, subject, gradeLevel, themeNotes, moduleScheme, onUpdateSingleChunk]);
}

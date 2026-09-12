import { LessonChunk } from '../../../types';

export const splitChunk = (chunks: LessonChunk[], targetId: string): LessonChunk[] => {
  const index = chunks.findIndex((c) => c.id === targetId);
  if (index === -1) return chunks;
  const target = chunks[index];
  if (target.type !== 'teaching') return chunks;

  const part1: LessonChunk = { ...target, title: `${target.title} (Part 1)` };
  const part2: LessonChunk = {
    ...target,
    id: `chunk-${Date.now()}-split`,
    title: `${target.title.replace(/ \(Part 1\)$/, '')} (Part 2)`,
    teacherScript: '',
    classroomNotes: '',
  };

  const updated = [...chunks];
  updated.splice(index, 1, part1, part2);
  return updated;
};

export const mergeChunks = (chunks: LessonChunk[], targetId: string): LessonChunk[] => {
  const index = chunks.findIndex((c) => c.id === targetId);
  if (index === -1 || index >= chunks.length - 1) return chunks;
  const current = chunks[index];
  const next = chunks[index + 1];
  if (current.type !== 'teaching' || next.type !== 'teaching') return chunks;

  const merged: LessonChunk = {
    ...current,
    title: `${current.title} & ${next.title}`,
    teacherScript: [current.teacherScript, next.teacherScript].filter(Boolean).join('\n\n'),
    classroomNotes: [current.classroomNotes, next.classroomNotes].filter(Boolean).join('\n\n'),
  };

  const updated = [...chunks];
  updated.splice(index, 2, merged);
  return updated;
};

export const insertChunkAt = (chunks: LessonChunk[], targetId: string): LessonChunk[] => {
  const index = chunks.findIndex((c) => c.id === targetId);
  const newChunk: LessonChunk = {
    id: `chunk-${Date.now()}-new`,
    type: 'teaching',
    title: 'New Teaching Step',
    durationMinutes: 10,
    teacherScript: '',
    classroomNotes: '',
    attachments: [],
  };

  if (index === -1) {
    const closingIdx = chunks.findIndex((c) => c.type === 'closing');
    if (closingIdx !== -1) {
      const updated = [...chunks];
      updated.splice(closingIdx, 0, newChunk);
      return updated;
    }
    return [...chunks, newChunk];
  }

  const updated = [...chunks];
  updated.splice(index + 1, 0, newChunk);
  return updated;
};

export const deleteChunk = (chunks: LessonChunk[], targetId: string): LessonChunk[] => {
  const teachingList = chunks.filter((c) => c.type === 'teaching');
  const target = chunks.find((c) => c.id === targetId);
  if (target?.type === 'teaching' && teachingList.length <= 1) return chunks;
  return chunks.filter((c) => c.id !== targetId);
};

export const moveChunkUp = (chunks: LessonChunk[], targetId: string): LessonChunk[] => {
  const warmup = chunks.find((c) => c.type === 'warmup');
  const closing = chunks.find((c) => c.type === 'closing');
  const teaching = chunks.filter((c) => c.type === 'teaching');
  const idx = teaching.findIndex((c) => c.id === targetId);
  if (idx <= 0) return chunks;
  const updated = [...teaching];
  const temp = updated[idx];
  updated[idx] = updated[idx - 1];
  updated[idx - 1] = temp;
  return [...(warmup ? [warmup] : []), ...updated, ...(closing ? [closing] : [])];
};

export const moveChunkDown = (chunks: LessonChunk[], targetId: string): LessonChunk[] => {
  const warmup = chunks.find((c) => c.type === 'warmup');
  const closing = chunks.find((c) => c.type === 'closing');
  const teaching = chunks.filter((c) => c.type === 'teaching');
  const idx = teaching.findIndex((c) => c.id === targetId);
  if (idx === -1 || idx >= teaching.length - 1) return chunks;
  const updated = [...teaching];
  const temp = updated[idx];
  updated[idx] = updated[idx + 1];
  updated[idx + 1] = temp;
  return [...(warmup ? [warmup] : []), ...updated, ...(closing ? [closing] : [])];
};

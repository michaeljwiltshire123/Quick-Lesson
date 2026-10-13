import { getAccessToken } from './googleAuth';
import { LessonChunk, ModuleScheme } from '../../types';

export const exportLessonToGoogleDocs = async (
  title: string,
  subject: string,
  gradeLevel: string,
  chunks: LessonChunk[],
  moduleScheme: ModuleScheme
): Promise<{ documentId: string; url: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const docTitle = `Lesson Plan: ${title.trim() || 'Curriculum Lesson'}`;
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: docTitle }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Doc.');
  }

  const docData = await createRes.json();
  const documentId = docData.documentId;

  // Build lesson plan text in British English
  let bodyText = `LESSON PLAN: ${title.toUpperCase()}\n`;
  bodyText += `Subject: ${subject || 'General'} | Key Stage: ${gradeLevel || 'Secondary'}\n`;
  if (moduleScheme.courseTitle) {
    bodyText += `Course / Programme: ${moduleScheme.courseTitle}\n`;
  }
  if (moduleScheme.vocationalScenario) {
    bodyText += `Vocational Context: ${moduleScheme.vocationalScenario}\n`;
  }
  bodyText += `\n------------------------------------------------------------\n`;
  bodyText += `LESSON PROGRESSION & TEACHING CHUNKS\n`;
  bodyText += `------------------------------------------------------------\n\n`;

  chunks.forEach((chunk, index) => {
    bodyText += `Chunk ${index + 1}: ${chunk.title} (${Math.max(1, chunk.durationMinutes)} mins) [${chunk.type.toUpperCase()}]\n`;
    if (chunk.learningIntent) bodyText += `• Learning Intent: ${chunk.learningIntent}\n`;
    if (chunk.coreExplanation) bodyText += `• Core Explanation: ${chunk.coreExplanation}\n`;
    if (chunk.formativeTaskTitle) {
      bodyText += `• Student Task: ${chunk.formativeTaskTitle} - ${chunk.formativeTaskDetails || ''}\n`;
    }
    if (chunk.workedExample) bodyText += `• Model Example / Demonstration: ${chunk.workedExample}\n`;
    bodyText += `\n`;
  });

  await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: bodyText,
          },
        },
      ],
    }),
  });

  return {
    documentId,
    url: `https://docs.google.com/document/d/${documentId}/edit`,
  };
};

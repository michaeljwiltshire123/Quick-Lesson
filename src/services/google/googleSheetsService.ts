import { getAccessToken } from './googleAuth';
import { LessonChunk, ModuleScheme } from '../../types';

export const exportProgressionToGoogleSheets = async (
  lessonTitle: string,
  chunks: LessonChunk[],
  moduleScheme: ModuleScheme
): Promise<{ spreadsheetId: string; url: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const title = `${lessonTitle || 'Lesson'} - Progression Rubric`;
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: { title },
      sheets: [{ properties: { title: 'Lesson Plan Rubric' } }],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Spreadsheet.');
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const sheetName = sheetData.sheets?.[0]?.properties?.title || 'Lesson Plan Rubric';

  const rows: string[][] = [
    ['Step', 'Title', 'Type', 'Duration (mins)', 'Learning Intent', 'Student Task', 'Assessment Criteria'],
  ];

  chunks.forEach((c, idx) => {
    rows.push([
      `Chunk ${idx + 1}`,
      c.title,
      c.type,
      String(Math.max(1, c.durationMinutes)),
      c.learningIntent || '',
      c.formativeTaskTitle || '',
      moduleScheme.assessedCriteria?.[idx] || '',
    ]);
  });

  const range = `${encodeURIComponent(sheetName)}!A1`;
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ range: `${sheetName}!A1`, majorDimension: 'ROWS', values: rows }),
  });

  return {
    spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
};

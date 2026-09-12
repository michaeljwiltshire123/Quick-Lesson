import { Router, Request, Response } from 'express';
import { findOrCreateQuickLessonFolder, DriveClientLike } from './googleDriveHelper';

export const exportRouter = Router();

const createDriveClient = (token: string): DriveClientLike => ({
  files: {
    list: async ({ q, fields }) => {
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}${fields ? `&fields=${encodeURIComponent(fields)}` : ''}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      return { data: await res.json() };
    },
    create: async ({ requestBody }) => {
      const res = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      return { data: await res.json() };
    },
    update: async ({ fileId, addParents }) => {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?addParents=${addParents}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data: await res.json() };
    },
  },
});

const createFormWithQuestions = async (token: string, title: string, questions: any[]) => {
  const formTitle = `Quick Lesson Quiz: ${title || 'Formative Check'}`;
  const res = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ info: { title: formTitle, documentTitle: formTitle } }),
  });
  if (!res.ok) throw new Error('Failed to create Google Form');
  const { formId } = await res.json();

  if (Array.isArray(questions) && questions.length > 0) {
    const requests = questions.map((q, idx) => ({
      createItem: {
        item: {
          title: q.question,
          description: q.explanation ? `Feedback: ${q.explanation}` : undefined,
          questionItem: {
            question: {
              required: true,
              choiceQuestion: {
                type: 'RADIO',
                options: (q.options || ['True', 'False']).map((opt: string) => ({ value: opt })),
              },
            },
          },
        },
        location: { index: idx },
      },
    }));
    await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    });
  }
  return { formId, formUrl: `https://docs.google.com/forms/d/${formId}/edit` };
};

exportRouter.post('/api/export-to-google-drive', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.body.token;
    if (!token) return res.status(401).json({ error: 'Missing active OAuth credentials.' });

    const { lessonTitle, questions } = req.body;
    const driveClient = createDriveClient(token);
    const folderId = await findOrCreateQuickLessonFolder(driveClient);
    const { formId, formUrl } = await createFormWithQuestions(token, lessonTitle, questions);

    if (driveClient.files.update) {
      await driveClient.files.update({ fileId: formId, addParents: folderId });
    }
    res.json({ success: true, formId, formUrl, folderId });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to export Form to Google Drive.' });
  }
});

import { getAccessToken } from './googleAuth';
import { LessonChunk } from '../../types';

export const createGoogleFormQuiz = async (
  lessonTitle: string,
  chunks: LessonChunk[]
): Promise<{ formId: string; responderUri: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const formTitle = `Quick Lesson Quiz: ${lessonTitle.trim() || 'Formative Check'}`;
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ info: { title: formTitle, documentTitle: formTitle } }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Form.');
  }

  const formData = await createRes.json();
  const formId = formData.formId;

  // Extract questions from chunks
  const questions: string[] = [];
  chunks.forEach((c) => {
    if (c.classroomNotes?.includes('?')) {
      questions.push(c.classroomNotes.trim());
    } else if (c.learningIntent) {
      questions.push(`How does understanding "${c.title}" meet the goal: ${c.learningIntent}?`);
    } else {
      questions.push(`Summarise the main concept from: ${c.title}`);
    }
  });

  if (questions.length > 0) {
    const requests = questions.slice(0, 5).map((q, idx) => ({
      createItem: {
        item: {
          title: `Question ${idx + 1}: ${q}`,
          questionItem: {
            question: {
              required: true,
              textQuestion: { paragraph: true },
            },
          },
        },
        location: { index: idx },
      },
    }));

    await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });
  }

  return {
    formId,
    responderUri: formData.responderUri || `https://docs.google.com/forms/d/${formId}/edit`,
  };
};

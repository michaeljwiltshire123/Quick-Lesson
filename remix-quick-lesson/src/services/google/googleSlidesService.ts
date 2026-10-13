import { getAccessToken } from './googleAuth';
import { LessonChunk } from '../../types';

export const exportLessonToGoogleSlides = async (
  title: string,
  subject: string,
  chunks: LessonChunk[]
): Promise<{ presentationId: string; url: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const deckTitle = `${title.trim() || 'Lesson Slides'} - Classroom Deck`;
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: deckTitle }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Slides presentation.');
  }

  const data = await createRes.json();
  const presentationId = data.presentationId;

  // Add slides for each teaching chunk
  if (chunks.length > 0) {
    const requests = chunks.map((chunk, idx) => ({
      createSlide: {
        insertionIndex: idx + 1,
        slideLayoutReference: { predefinedLayout: 'TITLE_AND_BODY' },
      },
    }));

    await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });
  }

  return {
    presentationId,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
};

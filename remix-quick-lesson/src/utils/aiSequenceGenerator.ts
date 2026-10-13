export const getPedagogicalFallbackSequence = (lessonTitle: string): string[] => {
  const topic = lessonTitle.trim() || 'Core Topic';
  return [
    `Foundational principles and key terminology of ${topic}`,
    `Core theoretical concepts and standard mechanisms in ${topic}`,
    `Methodological application and real-world domain analysis of ${topic}`,
    `Synthesis, evaluation, and edge-case implications of ${topic}`,
  ];
};

export async function requestLessonSequence(
  lessonTitle: string,
  subject: string,
  gradeLevel: string,
  rawNotes: string,
): Promise<string[]> {
  try {
    const res = await fetch('/api/generate-lesson-sequence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonTitle: lessonTitle || 'Lesson Overview',
        subject: subject || 'General',
        gradeLevel: gradeLevel || 'Key Stage 3',
        rawNotes: rawNotes || '',
      }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      const rawSteps = data?.steps || data?.data?.steps;
      if (Array.isArray(rawSteps) && rawSteps.length > 0) {
        return rawSteps.filter((s: any) => typeof s === 'string' && s.trim().length > 0);
      }
    }
  } catch (e) {
    console.warn('Sequence generation note (using pedagogical fallback):', e);
  }
  return getPedagogicalFallbackSequence(lessonTitle);
}

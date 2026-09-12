import { getAccessToken } from './googleAuth';
import { ClassroomCourse } from '../../types/workspace';
import { LessonChunk } from '../../types';

export const listTeacherCourses = async (): Promise<ClassroomCourse[]> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const res = await fetch('https://classroom.googleapis.com/v1/courses?teacherId=me&courseStates=ACTIVE', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to fetch Google Classroom courses.');
  }

  const data = await res.json();
  return (data.courses || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    section: c.section,
    descriptionHeading: c.descriptionHeading,
    courseState: c.courseState,
  }));
};

export const createClassroomCourseWork = async (
  courseId: string,
  lessonTitle: string,
  chunks: LessonChunk[],
  asDraft = true
): Promise<{ id: string; alternateLink?: string }> => {
  const token = getAccessToken();
  if (!token) throw new Error('Not authenticated with Google.');

  const chunkTasks = chunks
    .filter((c) => c.formativeTaskTitle || c.title)
    .map((c, i) => `${i + 1}. ${c.title}: ${c.formativeTaskTitle || 'Complete active learning task'}`)
    .join('\n');

  const description = `UK Curriculum Lesson: ${lessonTitle}\n\nClassroom Tasks:\n${chunkTasks}\n\nPrepared with Quick Lesson Planner.`;

  const payload = {
    title: lessonTitle.trim() || 'Lesson Assignment',
    description,
    state: asDraft ? 'DRAFT' : 'PUBLISHED',
    workType: 'ASSIGNMENT',
    maxPoints: 100,
    submissionModificationMode: 'MODIFIABLE_UNTIL_TURNED_IN',
  };

  const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to post assignment to Google Classroom.');
  }

  return await res.json();
};

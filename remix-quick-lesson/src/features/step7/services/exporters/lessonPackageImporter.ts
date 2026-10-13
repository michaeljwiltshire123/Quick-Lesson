import { LessonPackage } from './lessonPackageTypes';

export async function readLessonPackage(file: File): Promise<LessonPackage> {
  const data: unknown = JSON.parse(await file.text());
  if (!data || typeof data !== 'object') throw new Error('The selected file is not a lesson package.');
  const pack = data as Partial<LessonPackage>;
  const lesson = pack.lesson;
  if (pack.format !== 'quick-lesson' || pack.version !== 1 || !lesson ||
      typeof lesson.title !== 'string' || typeof lesson.subject !== 'string' ||
      !Array.isArray(lesson.chunks) || !Array.isArray(lesson.slides) ||
      !Array.isArray(lesson.learningObjectives) || !lesson.scheme) {
    throw new Error('This .lesson file is invalid or uses an unsupported version.');
  }
  return pack as LessonPackage;
}

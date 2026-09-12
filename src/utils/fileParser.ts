export interface ParsedFileInfo {
  title: string;
  subject?: string;
  gradeLevel?: string;
}

export const detectCurriculumHeuristics = () => ({ title: '' });

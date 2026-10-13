export interface GoogleUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  courseState?: string;
}

export interface WorkspaceExportResult {
  service: 'docs' | 'slides' | 'sheets' | 'forms' | 'classroom' | 'drive' | 'gmail';
  success: boolean;
  title: string;
  url?: string;
  message: string;
}

export interface PickerSelectedDoc {
  id: string;
  name: string;
  mimeType: string;
  url?: string;
  description?: string;
}

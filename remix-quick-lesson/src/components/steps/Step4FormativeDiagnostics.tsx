import React from 'react';
import { LessonChunk, ModuleScheme, SelectedSummativeTask } from '../../types';
import { Step4SummativeContainer } from './summative_hub';

export interface Step4FormativeDiagnosticsProps {
  chunks: LessonChunk[];
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  moduleScheme?: ModuleScheme;
  onBackToStep3: () => void;
  onContinueToStep5?: () => void;
  onTaskSelected?: (task: SelectedSummativeTask) => void;
}

export const Step4FormativeDiagnostics: React.FC<Step4FormativeDiagnosticsProps> = (props) => {
  return <Step4SummativeContainer {...props} />;
};

export default Step4FormativeDiagnostics;

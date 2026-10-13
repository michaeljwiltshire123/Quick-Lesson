import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LessonChunk, ModuleScheme, SelectedSummativeTask } from '../../../types';
import { SummativeTabKey, SummativeTaskChoice } from './typesSummative';
import { SummativeHubTabBar } from './SummativeHubTabBar';
import { Step4SummativeHeader } from './Step4SummativeHeader';
import { PerformanceTaskGridContainer } from './PerformanceTaskGridContainer';
import { EscapeRoomBuilderContainer } from './escape_room/EscapeRoomBuilderContainer';
import { SummativeQuizBuilderContainer } from './summative_quiz';
import { Step4SummativeFooter } from './Step4SummativeFooter';
import { generateDefaultTasks, fetchSummativeTasks } from './summativeTaskGenerator';
import { downloadTaskHandout } from './summativeExportHelpers';
import { Step3Stepper } from '../../step3_chunks/Step3Stepper';
import { Step4ToStep5Navigation } from '../../../features/step4/components/Step4ToStep5Navigation';

interface Props {
  chunks: LessonChunk[];
  lessonTitle?: string;
  subject?: string;
  gradeLevel?: string;
  moduleScheme?: ModuleScheme;
  onBackToStep3: () => void;
  onContinueToStep5?: () => void;
  onTaskSelected?: (task: SelectedSummativeTask) => void;
}

export const Step4SummativeContainer: React.FC<Props> = ({
  chunks, lessonTitle = '', subject = '', gradeLevel = '', moduleScheme, onBackToStep3, onContinueToStep5, onTaskSelected,
}) => {
  const [activeTab, setActiveTab] = useState<SummativeTabKey>('performance_tasks');
  const [tasks, setTasks] = useState<SummativeTaskChoice[]>(() => generateDefaultTasks(lessonTitle, chunks, moduleScheme));
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(tasks[0]?.id || null);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const loadTasks = async () => {
    setIsLoading(true);
    const loaded = await fetchSummativeTasks(lessonTitle, chunks, moduleScheme, subject, gradeLevel);
    setTasks(loaded);
    if (loaded[0]) { setSelectedTaskId(loaded[0].id); onTaskSelected?.(loaded[0]); }
    setIsLoading(false);
  };

  useEffect(() => { loadTasks(); }, []);

  const handleExportHandout = (task: SummativeTaskChoice) => {
    downloadTaskHandout(task, lessonTitle);
    setNotice(`Handout downloaded for: ${task.title}`);
    setTimeout(() => setNotice(null), 4000);
  };

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);
  const selectTask = (id: string) => {
    setSelectedTaskId(id);
    const task = tasks.find((item) => item.id === id);
    if (task) onTaskSelected?.(task);
  };
  const fmtLabel = activeTab === 'escape_room' ? 'Escape Room' : activeTab === 'summative_quiz' ? 'Summative Quiz' : selectedTask?.formatLabel;
  const note = (msg: string) => { setNotice(msg); setTimeout(() => setNotice(null), 4000); };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6" id="step4-summative-hub">
      <Step3Stepper currentStep={4} />
      <Step4SummativeHeader lessonTitle={lessonTitle} moduleScheme={moduleScheme} selectedFormatLabel={fmtLabel} />
      <SummativeHubTabBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {notice && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      {activeTab === 'performance_tasks' && (
        <PerformanceTaskGridContainer tasks={tasks} selectedTaskId={selectedTaskId} isLoading={isLoading}
          onSelectTask={selectTask} onRefreshTasks={loadTasks} onExportHandout={handleExportHandout}
          onExportClassroom={(t) => note(`Posted "${t.title}" to Google Classroom stream.`)} />
      )}

      {activeTab === 'escape_room' && (
        <EscapeRoomBuilderContainer lessonTitle={lessonTitle} chunks={chunks} moduleScheme={moduleScheme} subject={subject} gradeLevel={gradeLevel} onNotice={note} />
      )}

      {activeTab === 'summative_quiz' && (
        <SummativeQuizBuilderContainer lessonTitle={lessonTitle} chunks={chunks} gradeLevel={gradeLevel} moduleScheme={moduleScheme} onNotice={note} />
      )}

      {onContinueToStep5 && (
        <Step4ToStep5Navigation onContinueToStep5={onContinueToStep5} />
      )}

      <Step4SummativeFooter onBackToStep3={onBackToStep3} />
    </div>
  );
};

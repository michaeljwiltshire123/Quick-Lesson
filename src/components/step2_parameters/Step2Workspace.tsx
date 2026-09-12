import React from 'react';
import { Loader2 } from 'lucide-react';
import { ModuleScheme } from '../../types';
import { CircularStepper } from './CircularStepper';
import { CollapsibleCourseAttic } from './CollapsibleCourseAttic';
import { DailyLessonForm } from './DailyLessonForm';
import { AideMemoire } from './AideMemoire';
import { LearningProgression } from './LearningProgression';
import { ProgressionSuggestions } from './ProgressionSuggestions';
import { WorkspaceFooter } from './WorkspaceFooter';
import { SpotlightTour } from './SpotlightTour';

interface Step2WorkspaceProps {
  isAnalyzingBrief?: boolean; isAmberPulse?: boolean; isGeneratingSequence?: boolean;
  isTourOpen?: boolean; onCloseTour?: () => void;
  subject: string; onSubjectChange: (val: string) => void;
  gradeLevel: string; onGradeLevelChange: (val: string) => void;
  lessonTitle: string; onLessonTitleChange: (val: string) => void;
  lessonDuration: number; onLessonDurationChange: (val: number) => void;
  rawNotes: string; onRawNotesChange: (val: string) => void;
  videoLinks: string[]; onAddVideoLink: (link: string) => void; onRemoveVideoLink: (idx: number) => void;
  draftFileName?: string; onRemoveDraftFile: () => void;
  moduleBriefFileName?: string; onRemoveModuleBriefFile: () => void;
  learningObjectives: string[];
  onUpdateObjective: (index: number, val: string) => void; onAddObjective: (val?: string) => void;
  onRemoveObjective: (index: number) => void; onClearObjectives: () => void;
  onGenerateSequence: () => Promise<void>; moduleScheme: ModuleScheme;
  onUpdateUnitDurationWeeks: (w: number) => void; onUpdateScenario: (s: string) => void;
  onAddDeliverable: (d: string) => void; onRemoveDeliverable: (i: number) => void;
  onAddCriterion: (c: string) => void; onRemoveCriterion: (i: number) => void;
  onAddAssignmentBrief: () => void; onLookAgain: () => void;
  onBack: () => void; onContinue: () => void;
}

export const Step2Workspace: React.FC<Step2WorkspaceProps> = (props) => (
  <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
    {props.isAnalyzingBrief && (
      <div className="w-full bg-amber-500/10 border border-amber-500/20 text-[#2D2A26] rounded-xl p-3.5 flex items-center gap-2 text-xs font-semibold animate-pulse">
        <Loader2 className="w-4 h-4 text-[#F59E0B] animate-spin shrink-0" />
        <span>Analyzing syllabus in the background... Your parameter workspace will auto-fill shortly! ✨</span>
      </div>
    )}
    <CircularStepper />
    <CollapsibleCourseAttic
      moduleScheme={props.moduleScheme} onUpdateUnitDurationWeeks={props.onUpdateUnitDurationWeeks} onUpdateScenario={props.onUpdateScenario}
      onAddDeliverable={props.onAddDeliverable} onRemoveDeliverable={props.onRemoveDeliverable} onAddCriterion={props.onAddCriterion} onRemoveCriterion={props.onRemoveCriterion}
      onAddAssignmentBrief={props.onAddAssignmentBrief} onLookAgain={props.onLookAgain}
    />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      <div className="lg:col-span-8 flex"><DailyLessonForm subject={props.subject} onSubjectChange={props.onSubjectChange} gradeLevel={props.gradeLevel} onGradeLevelChange={props.onGradeLevelChange} lessonTitle={props.lessonTitle} onLessonTitleChange={props.onLessonTitleChange} lessonDuration={props.lessonDuration} onLessonDurationChange={props.onLessonDurationChange} isAmberPulse={props.isAmberPulse} /></div>
      <div className="lg:col-span-4 flex"><AideMemoire rawNotes={props.rawNotes} onRawNotesChange={props.onRawNotesChange} videoLinks={props.videoLinks} onAddVideoLink={props.onAddVideoLink} onRemoveVideoLink={props.onRemoveVideoLink} draftFileName={props.draftFileName} onRemoveDraftFile={props.onRemoveDraftFile} moduleBriefFileName={props.moduleBriefFileName} onRemoveModuleBriefFile={props.onRemoveModuleBriefFile} /></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      <div className="lg:col-span-8 flex"><LearningProgression learningObjectives={props.learningObjectives} onUpdateObjective={props.onUpdateObjective} onAddObjective={props.onAddObjective} onRemoveObjective={props.onRemoveObjective} onClearObjectives={props.onClearObjectives} onGenerateSequence={props.onGenerateSequence} isGeneratingSequence={props.isGeneratingSequence} /></div>
      <div className="lg:col-span-4 flex"><ProgressionSuggestions onSelectSuggestion={(sug) => props.onAddObjective(sug)} selectedLabels={props.learningObjectives} lessonTitle={props.lessonTitle} subject={props.subject} gradeLevel={props.gradeLevel} /></div>
    </div>
    <WorkspaceFooter onBack={props.onBack} onContinue={props.onContinue} />
    <SpotlightTour isOpen={!!props.isTourOpen} onClose={props.onCloseTour || (() => {})} />
  </div>
);

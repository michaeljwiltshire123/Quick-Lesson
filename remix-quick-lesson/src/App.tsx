import { clearStoredState, DEFAULT_APP_STATE } from './utils/storage';
import { WizardLayout } from './components/layout/WizardLayout';
import { Step1Container } from './components/step1_ingestion';
import { Step2Workspace } from './components/step2_parameters';
import { Step3Workspace, reconcileMilestonesToChunks } from './components/step3_chunks';
import { Step5Container } from './features/step5/components/Step5Container';
import { Step6Container } from './features/step6';
import { Step4FormativeDiagnostics } from './components/steps/Step4FormativeDiagnostics';
import { useAppLessonLogic } from './utils/useAppLessonLogic';
import { Step7Workspace } from './features/step7/components/Step7Workspace';
import { saveSlideDeckToSession } from './features/step6/services/slideSyncService';

export default function App() {
  const {
    state, setState, update, updateModule, libraryMessage, setLibraryMessage,
    isAmberPulse, isTourOpen, setIsTourOpen, isGeneratingSequence, isAnalyzingBrief,
    wizardInitialStep, setWizardInitialStep, handleParsedDoc, handleLoadSavedBrief,
    handleGenerateSequence, handleLookAgain,
  } = useAppLessonLogic();

  return (
    <WizardLayout
      onRestartLesson={() => { clearStoredState(); setState(DEFAULT_APP_STATE); }}
      onWalkthrough={state.currentStepKey === 'parameters' ? () => setIsTourOpen(true) : undefined}
      lessonTitle={state.lessonTitle} subject={state.subject} gradeLevel={state.gradeLevel}
      chunks={state.chunks} moduleScheme={state.moduleScheme}
      onFilePicked={(doc) => handleParsedDoc(doc.name, doc.description || doc.name)}
      isFullWidth={state.currentStepKey === 'slide_editor' || state.currentStepKey === 'chunks_workspace'}
    >
      {state.currentStepKey === 'intro' ? (
        <Step1Container
          state={state} wizardInitialStep={wizardInitialStep} libraryMessage={libraryMessage} onSetLibraryMessage={setLibraryMessage}
          onStartWizard={() => { setWizardInitialStep(1); update('isWizardActive', true); }} onBackToOnboarding={() => update('isWizardActive', false)}
          onCompleteWizard={() => update('currentStepKey', 'parameters')} onFileParsed={handleParsedDoc} onLoadSavedBrief={handleLoadSavedBrief}
          onUploadModuleBrief={(f) => f ? handleParsedDoc(f.name, f.content, (f as any).fileBase64, (f as any).mimeType) : update('moduleBriefFile', null)}
          onRawNotesChange={(v) => update('rawNotes', v)} onAddVideoLink={(l) => update('videoLinks', [...state.videoLinks, l])} onRemoveVideoLink={(i) => update('videoLinks', state.videoLinks.filter((_, idx) => idx !== i))}
          onUploadDraftFile={(f) => update('draftFile', f)} onThemeNotesChange={(v) => update('themeNotes', v)} onLessonTitleChange={(v) => update('lessonTitle', v)}
        />
      ) : state.currentStepKey === 'parameters' ? (
        <Step2Workspace
          isAnalyzingBrief={isAnalyzingBrief} isTourOpen={isTourOpen} onCloseTour={() => setIsTourOpen(false)} subject={state.subject} onSubjectChange={(v) => update('subject', v)}
          gradeLevel={state.gradeLevel} onGradeLevelChange={(v) => update('gradeLevel', v)} lessonTitle={state.lessonTitle} onLessonTitleChange={(v) => update('lessonTitle', v)}
          lessonDuration={state.lessonDuration} onLessonDurationChange={(v) => update('lessonDuration', Math.max(1, v))} rawNotes={state.rawNotes} onRawNotesChange={(v) => update('rawNotes', v)}
          videoLinks={state.videoLinks} onAddVideoLink={(l) => update('videoLinks', [...state.videoLinks, l])} onRemoveVideoLink={(i) => update('videoLinks', state.videoLinks.filter((_, idx) => idx !== i))}
          draftFileName={state.draftFile?.name} onRemoveDraftFile={() => update('draftFile', null)} moduleBriefFileName={state.moduleBriefFile?.name} onRemoveModuleBriefFile={() => update('moduleBriefFile', null)}
          learningObjectives={state.learningObjectives} onUpdateObjective={(idx, val) => update('learningObjectives', state.learningObjectives.map((it, i) => i === idx ? val : it))} onAddObjective={(val) => update('learningObjectives', [...state.learningObjectives, val || 'New Progression Step'])}
          onRemoveObjective={(idx) => update('learningObjectives', state.learningObjectives.filter((_, i) => i !== idx))} onClearObjectives={() => update('learningObjectives', [])}
          onGenerateSequence={handleGenerateSequence} isGeneratingSequence={isGeneratingSequence} moduleScheme={state.moduleScheme} onUpdateUnitDurationWeeks={(w) => updateModule('unitDurationWeeks', w)} onUpdateScenario={(s) => updateModule('vocationalScenario', s)}
          onAddDeliverable={(d) => updateModule('deliverables', [...state.moduleScheme.deliverables, d])} onRemoveDeliverable={(i) => updateModule('deliverables', state.moduleScheme.deliverables.filter((_, idx) => idx !== i))} onAddCriterion={(c) => updateModule('assessedCriteria', [...state.moduleScheme.assessedCriteria, c])} onRemoveCriterion={(i) => updateModule('assessedCriteria', state.moduleScheme.assessedCriteria.filter((_, idx) => idx !== i))}
          onAddAssignmentBrief={() => { update('currentStepKey', 'intro'); setWizardInitialStep(1); update('isWizardActive', true); }} onLookAgain={handleLookAgain} onBack={() => { update('currentStepKey', 'intro'); update('isWizardActive', false); }} onContinue={() => { setState((prev) => ({ ...prev, currentStepKey: 'chunks_workspace', chunks: reconcileMilestonesToChunks(prev.learningObjectives, prev.chunks) })); }} isAmberPulse={isAmberPulse}
        />
      ) : state.currentStepKey === 'chunks_workspace' ? (
        <Step3Workspace
          onBack={() => update('currentStepKey', 'parameters')}
          onContinueToSummative={() => update('currentStepKey', 'summative_hub')}
          lessonTitle={state.lessonTitle} chunks={state.chunks} onUpdateChunks={(c) => update('chunks', c)}
          subject={state.subject} gradeLevel={state.gradeLevel} themeNotes={state.themeNotes} moduleScheme={state.moduleScheme}
        />
      ) : state.currentStepKey === 'summative_hub' ? (
        <Step4FormativeDiagnostics
          chunks={state.chunks} lessonTitle={state.lessonTitle} subject={state.subject}
          gradeLevel={state.gradeLevel} moduleScheme={state.moduleScheme}
          onTaskSelected={(task) => update('summativeTask', task)}
          onBackToStep3={() => update('currentStepKey', 'chunks_workspace')}
          onContinueToStep5={() => update('currentStepKey', 'discussion_starters')}
        />
      ) : state.currentStepKey === 'discussion_starters' ? (
        <Step5Container
          lessonTitle={state.lessonTitle}
          subject={state.subject}
          chunks={state.chunks}
          onUpdateChunks={(c) => update('chunks', c)}
          onBack={() => update('currentStepKey', 'summative_hub')}
          onContinue={() => update('currentStepKey', 'slide_editor')}
        />
      ) : state.currentStepKey === 'slide_editor' ? (
        <Step6Container
          lessonTitle={state.lessonTitle}
          subject={state.subject}
          chunks={state.chunks}
          learningObjectives={state.learningObjectives}
          onUpdateChunks={(c) => update('chunks', c)}
          onBack={() => update('currentStepKey', 'discussion_starters')}
          onContinue={() => update('currentStepKey', 'retrieval_launchpad')}
        />
      ) : state.currentStepKey === 'retrieval_launchpad' || new URLSearchParams(window.location.search).has('liveRole') ? (
        <Step7Workspace title={state.lessonTitle} subject={state.subject} chunks={state.chunks} scheme={state.moduleScheme} summativeTask={state.summativeTask}
          gradeLevel={state.gradeLevel} lessonDuration={state.lessonDuration} rawNotes={state.rawNotes} themeNotes={state.themeNotes} videoLinks={state.videoLinks}
          learningObjectives={state.learningObjectives} onImportLesson={(pack) => {
            const lesson = pack.lesson;
            saveSlideDeckToSession(lesson.title, lesson.slides);
            setState((prev) => ({ ...prev, lessonTitle: lesson.title, subject: lesson.subject, moduleScheme: lesson.scheme,
              gradeLevel: lesson.gradeLevel || '', lessonDuration: lesson.lessonDuration || prev.lessonDuration,
              rawNotes: lesson.rawNotes || '', themeNotes: lesson.themeNotes || '', videoLinks: lesson.videoLinks || [],
              chunks: lesson.chunks, learningObjectives: lesson.learningObjectives, summativeTask: lesson.summativeTask, currentStepKey: 'slide_editor' }));
          }}
          brief={state.moduleBriefFile?.content || ''} onBack={() => update('currentStepKey', 'slide_editor')} />
      ) : null}
    </WizardLayout>
  );
}

# Quick Lesson - Wizard Steps & File Registries

## Step 1: Ingestion & Syllabus Parsing (`src/components/step1_ingestion/`)
- `Step1Container.tsx`: Coordinates syllabus dropzone, quick-select cards, and question cards.
- `OnboardingBanner.tsx` & `SavedBriefCard.tsx`: Saved syllabuses grid & quick-select cards.
- `ModuleBriefUploader.tsx`, `ModuleBriefDropArea.tsx`, `UniversalUploadDropzone.tsx`: Drag-and-drop syllabus ingestion.
- Question Cards: `SyllabusQuestionCard.tsx`, `NotesStepCard.tsx`, `ThemeStepCard.tsx`, `TopicTitleStepCard.tsx`.

## Step 2: Parameters Workspace (`src/components/step2_parameters/`)
- `Step2Workspace.tsx`: Parent Parameters workspace coordinating lesson parameters and sequence canvas.
- `CollapsibleCourseAttic.tsx` & `AtticDrawerContent.tsx`: Folded-by-default syllabus drawer with "Reveal Brief" toggle.
- `DailyLessonForm.tsx` & `AideMemoire.tsx`: Active lesson input fields and pinned media sidebar.
- `LearningProgression.tsx` & `LearningProgressionStepRow.tsx`: Interactive milestone sequence canvas.
- `ProgressionSuggestions.tsx` & `ProgressionSuggestionItem.tsx`: On-demand AI subtopic pill suggestions.
- `SpotlightTour.tsx`, `SpotlightTourCard.tsx`, `useSpotlightBounds.ts`: GPU-accelerated interactive guided tour.

## Step 3: Chunks Workspace (`src/components/step3_chunks/`)
- `Step3Workspace.tsx`: Storyboard workspace parent coordinating timeline board and step cards.
- `ChunksTimeline.tsx`: Chronological timeline board with step selection and reordering.
- `TeachingChunkCard.tsx`: Teaching step projector card with auto-trigger lock and monospace board work.
- `TheoryBulletsEditor.tsx`: Side-by-side How/Why to Use pedagogy textareas.
- `MetaphorCompareCard.tsx` & `MetaphorPopupModal.tsx`: Metaphor & Analogy bridge generator card and modal.
- `ClassroomActionSlate.tsx`, `FormativeActivitiesModal.tsx`, `CheckQuestionModal.tsx`: Action slate & formative task modals.
- `InteractiveToolbelt.tsx`: Media resource toolbelt with visual/video resource modals.

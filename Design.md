# Quick Lesson - Architectural Design Documentation

This directory contains the modularized system design records for Quick Lesson, organized strictly by technical domain:

- **[System Architecture & Storage Shield](./design/ARCHITECTURE.md)**
  Overview of the UK Curriculum lesson planner, color palette (`#F8F6F0` / `#2D2A26`), and double-guard storage compaction rules.

- **[Wizard Steps & File Registries](./design/WIZARD_STEPS.md)**
  Detailed step workflows and component registries for Step 1 Ingestion, Step 2 Parameters, and Step 3 Chunks Workspace.

- **[AI Pipelines & Prompt System](./design/AI_PIPELINES.md)**
  Active Gemini models, server proxy endpoints (`/api/*`), prompt definitions, and contextual parameter weighting rules.

## Visual Attachment & Prompt Generator Registry
- `src/lib/imageCompressor.ts`: Canvas compressor utility for 80x80 JPEG microThumbnails (<5KB).
- `src/components/steps/AddVisualResourceModal.tsx`: Lightweight modal shell hosting a 2-Tab navigation bar ("Quick Search & Upload" vs "AI Prompt Lab") and active thumbnail strip (<90 lines).
- `src/components/steps/visual_modal/tabs/IngestAndSearchTab.tsx`: Tab 1 combining drag-and-drop file ingestion and style preset search (<20 lines).
- `src/components/steps/visual_modal/tabs/PromptLabTab.tsx`: Tab 2 housing the file upload zone and zero-cost client-side prompt builder (<20 lines).
- `src/components/steps/visual_modal/presetData.ts`: 8 style presets definitions and prompt builder dropdown options.
- `src/components/steps/visual_modal/UploadZone.tsx`: Drag & drop, file upload, and clipboard paste (Ctrl+V) handler with instant microThumbnail generation.
- `src/components/steps/visual_modal/StylePresetGrid.tsx`: 8 style preset selector cards and quick web search triggers for images and animated GIFs.
- `src/components/steps/visual_modal/PromptDropdowns.tsx`: Interactive prompt parameters (Subject, Style, Action, Lighting, Mood, Palette, Composition, Technical, 5-stage slider, Theme toggle, Negative prompts, Randomizer).
- `src/components/steps/visual_modal/PromptPreviewLaunchers.tsx`: Read-only prompt preview box with Copy Prompt and generator launcher links.
- `src/components/steps/visual_modal/PromptBuilder.tsx`: Zero-cost client-side prompt builder module.
- `src/components/steps/visual_modal/VisualModalTabBar.tsx`: Tactile segmented pill tab navigation rail with clear click affordances, active pill indicators, and hover feedback.
- `src/components/steps/toolbelt/AttachmentGallery.tsx`: Visual preview gallery displaying attached classroom diagrams with thumbnails and remove actions directly beneath the toolbelt buttons.

## Video Resource & AI Scene Generator Registry
- `src/components/steps/video_modal/presetData.ts`: 6 pop-culture categories, 8 video archetypes, AI video platform launcher configurations, and fallback data.
- `src/components/steps/video_modal/ghostCapture.ts`: Offscreen canvas ghost player generating <5KB JPEG microThumbnails at 1.0s.
- `src/components/steps/video_modal/VideoDropArea.tsx`: Drag & drop or click-to-upload area with instant offscreen ghost-thumbnail generation.
- `src/components/steps/video_modal/VideoUrlAndTitleInputs.tsx`: Video title and stream URL inputs with automatic title metadata fetching on blur.
- `src/components/steps/video_modal/VideoUploadZone.tsx`: Integrated video resource section containing dropzone, title & URL inputs, and "Attach Video" trigger.
- `src/components/steps/video_modal/tabs/QuickSearchAndDetailsTab.tsx`: Tab featuring top upload zone, Search Video archetype pills, and AI Suggested Videos generator.
- `src/components/steps/video_modal/tabs/VideoAiLabTabContainer.tsx`: Tab featuring top upload zone and the client-side AI Video Lab prompt compiler.
- `src/components/steps/video_modal/tabs/VideoSearchTab.tsx`: 8 video archetype selector pills and smart educational query builder with YouTube launcher (< 3 minute duration filter).
- `src/components/steps/video_modal/tabs/PopCultureRecommendationsTab.tsx`: 6 pop-culture category filters with 2x4 responsive results grid, `/api/generate-media-scenes` integration, and fallback engine.
- `src/components/steps/video_modal/PopCultureSceneCard.tsx`: Individual pop-culture recommendation card with inline YouTube player, mqdefault thumbnail, tone badges, pause cue, `whyItWorks` rationale, and apply button.
- `src/components/steps/video_modal/tabs/AiVideoLabTab.tsx`: Client-side prompt compiler with cinematography styles, camera motions, and absurdity slider.
- `src/components/steps/video_modal/AiVideoPlatformLaunchers.tsx`: AI video generator launcher cards with explicit free-tier notes (100% free, 3/day, 6/day, etc.) and direct web links.
- `src/components/steps/video_modal/VideoModalTabBar.tsx`: 2-tab segmented navigation rail matching VisualModalTabBar with active tab badges and tactile buttons.
- `src/components/steps/AddVideoResourceModal.tsx`: Top-level modal container matching the exact layout, dimensions, header, attached strip, and footer of AddVisualResourceModal.

## Link & Turnkey Payload Studio Registry
- `src/components/steps/AddQuizResourceModal.tsx`: Main modal shell with 3-tab navigation rail ("Link Setup & Scannable QR", "Concept Breakdown Tools", and "Turnkey AI Payloads"), attached items tray, and "Done" dismissal.
- `src/components/steps/link_modal/tabs/ConceptBreakdownModalTab.tsx`: Concept Breakdown & Pedagogical Bridges tab housing the Metaphor Bridge card for the active milestone.
- `src/components/steps/link_modal/LinkDetailsForm.tsx`: Link URL, Title, Scannable QR choice, and What/Why prompt form with auto-metadata title fetching and Google sharing conversion.
- `src/components/steps/link_modal/designer_qr/types.ts`: TypeScript configurations for Designer QR palette swatches, dot shapes, custom icon base64, and emoji overlays.
- `src/components/steps/link_modal/designer_qr/qrCanvasRenderer.ts`: Zero-storage HTML5 Canvas QR rendering engine with high error correction, custom dot geometry, and custom image/emoji centre badge stamps.
- `src/components/steps/link_modal/designer_qr/DesignerQrCanvas.tsx`: Real-time reactive HTML5 Canvas component with live preview and test link actions.
- `src/components/steps/link_modal/designer_qr/colorExtractor.ts`: Client-side pixel sampling and high-contrast color extractor deriving dominant darkest/lightest contrast tones from centre icons and emojis.
- `src/components/steps/link_modal/designer_qr/QrContrastMeter.tsx`: Speedometer dial gauge and mathematical contrast ratio analyser with real-time low-contrast camera warnings.
- `src/components/steps/link_modal/designer_qr/QrStyleControls.tsx`: Mini edit panel for background colour, pattern colour, 'Match Icon' auto-palette extractor, dot shape, and centre icon badge.
- `src/components/steps/link_modal/designer_qr/CentreIconSelector.tsx`: Upload custom icon launcher, emoji palette selector, and active icon badge manager.
- `src/components/steps/link_modal/designer_qr/cropper/cropUtils.ts`: Mathematical coordinate transformer and circular WebP/PNG micro-thumbnail compressor (<3KB).
- `src/components/steps/link_modal/designer_qr/cropper/CropViewport.tsx`: Touch/mouse draggable viewport with circular mask cut-out overlay.
- `src/components/steps/link_modal/designer_qr/cropper/CircularCropModal.tsx`: Avatar / profile picture circular cropper dialog with scale slider and live circular preview.
- `src/components/steps/link_modal/designer_qr/LinkQrDesignerSection.tsx`: Integrated QR studio card containing the "Create and add QR Code" pill button and side-by-side live canvas and controls; defaults to closed/disabled so QR codes are only generated when explicitly opted into.
- `src/components/steps/link_modal/components/GoogleSharingModeToggle.tsx`: Touch-friendly segmented sharing mode converter for standard /edit, force /copy, and /template/preview modes with explanatory tooltip.
- `src/components/steps/link_modal/components/AttachedResourcesTray.tsx`: Attached resources tray showing badges with platform icons and 1-click removal.
- `src/components/steps/link_modal/tabs/PayloadGeneratorTab.tsx`: Wrapper mounting PayloadTabContainer for seamless modal tab integration.
- `src/components/steps/link_modal/tabs/payload/types.ts`: TypeScript contracts for quiz questions and question mix types.
- `src/components/steps/link_modal/tabs/payload/PayloadControls.tsx`: Question count slider (3-10), segmented mix toggle, and custom focus input (<80 lines).
- `src/components/steps/link_modal/tabs/payload/PayloadReviewCards.tsx`: Interactive editable cards for reviewing questions, options, and explanations (<90 lines).
- `src/components/steps/link_modal/tabs/payload/PayloadExportActions.tsx`: Export triggers for direct Google Drive Form creation and 30s Kahoot CSV (<80 lines).
- `src/components/steps/link_modal/tabs/payload/PayloadTabContainer.tsx`: State orchestrator coordinating AI generation, Drive export, and lightweight storage (<95 lines).
- `server/googleDriveHelper.ts`: Drive folder utility strictly enforcing `trashed = false` for "Quick Lesson" folder resolution (<90 lines).
- `server/server.ts`: Express router handling POST `/api/export-to-google-drive` using active OAuth credentials (<95 lines).

## Google Workspace Integration Registry
- `src/types/workspace.ts`: Core interfaces for Google User, Classroom courses, Drive files, and Picker selections.
- `src/services/google/googleAuth.ts`: Google OAuth authentication state manager, Firebase token acquirer, and in-memory token cache.
- `src/services/google/googlePickerService.ts`: Google Picker API initializer and document selection listener.
- `src/services/google/googleDriveService.ts`: Google Drive file listing and lesson backup archive service.
- `src/services/google/googleDocsService.ts`: Google Docs structured lesson plan export with UK curriculum parameters.
- `src/services/google/googleSlidesService.ts`: Google Slides presentation generator with teaching chunk cards and tasks.
- `src/services/google/googleSheetsService.ts`: Google Sheets progression rubric and assessment criteria exporter.
- `src/services/google/googleFormsService.ts`: Google Forms formative assessment quiz builder.
- `src/services/google/googleClassroomService.ts`: Google Classroom course listing and assignment poster.
- `src/services/google/gmailService.ts`: Gmail lesson overview email sender and draft composer.
- `src/components/google_workspace/GoogleSignInButton.tsx`: Official styled Google sign-in button.
- `src/components/google_workspace/GoogleAccountBadge.tsx`: Connected teacher badge with avatar, name, and Workspace Hub trigger.
- `src/components/google_workspace/GooglePickerButton.tsx`: Tactile button to open Google Picker file selector.
- `src/components/google_workspace/WorkspaceConfirmDialog.tsx`: Explicit confirmation modal protecting against unintended mutations.
- `src/components/google_workspace/WorkspaceClassroomCard.tsx`: Google Classroom coursework publisher card.
- `src/components/google_workspace/WorkspaceDocsExportCard.tsx`: Google Docs & Slides 1-click export card.
- `src/components/google_workspace/WorkspaceSheetsFormsCard.tsx`: Google Sheets & Forms rubric and quiz card.
- `src/components/google_workspace/WorkspaceGmailCard.tsx`: Gmail communication and draft composer card.
- `src/components/google_workspace/WorkspaceDriveFilesCard.tsx`: Google Drive storage and file selection card.
- `src/components/google_workspace/GoogleWorkspaceHubModal.tsx`: Comprehensive Classroom Materials Hub dialog with 5-error circuit breaker.
- `src/components/layout/WizardHeader.tsx`: Modular application header hosting Google Workspace status and navigation actions.
- `src/components/layout/HeaderActionButtons.tsx`: Compact subcomponent organizing header actions and authentication badge.
- `src/utils/useAppLessonLogic.ts`: Extracted application state hook ensuring sub-100 line architectural hygiene.

## Step 3 Chunks Registry
- `src/components/step3_chunks/Step3Workspace.tsx`: Top-level workspace shell managing active chunk state, timeline progression, and modal activations.
- `src/components/step3_chunks/Step3ResourceModals.tsx`: Modular dialog wrapper encapsulating visual, video, and quiz resource attachment modal windows.
- `src/components/step3_chunks/ChunksTimeline.tsx`: Core milestones storyboard editor with card movement, split, merge, delete, and companion Classroom Task slate.
- `src/components/step3_chunks/TeachingChunkCard.tsx`: Dedicated teaching slide editor for title, vocabulary tags, teacher script, theory bullets, and examples/demonstrations.
- `src/components/step3_chunks/components/ExamplesDemonstrationEditor.tsx`: Sub-100 line modular editor for concept examples and demonstrations featuring single-click AI regeneration and word-count target monitoring.
- `src/components/step3_chunks/components/MetaphorCompareCard.tsx`: Analogy generator card with sample metaphor viewer and AI comparison popup dialog trigger.

## Printable Differentiated Handouts Registry
- `src/components/steps/Step9DifferentiatorHandouts.tsx`: Student handout print layout containing core chunk progression, UDL pathway tags, and linked digital media.
- `src/components/steps/handouts/HandoutQrResourceItem.tsx`: High-resolution 100x100px scannable QR code generator and italicised Checking-for-Understanding (CFU) prompt renderer.

## Method of Loci Memory Palace Generator Registry
- `src/components/steps/link_modal/tabs/LociGeneratorTab.tsx`: Tab exporter mounting Loci Generator sub-tab (<10 lines).
- `src/components/steps/link_modal/tabs/loci/types.ts`: TypeScript contracts for 3-step wizard, dual coding options, and recall script (<40 lines).
- `src/components/steps/link_modal/tabs/loci/constants.ts`: Built-in physical route presets ("Science Wing", "Sports Pitch", "5-Room House", "School Main Entrance") (<45 lines).
- `src/components/steps/link_modal/tabs/loci/lociVaultStorage.ts`: Lightweight localStorage vault for tracking used room routes (<30 lines).
- `src/components/steps/link_modal/tabs/loci/LociWordSelector.tsx`: Keyword ingestion supporting active chunk pull, manual tags, and AI keywords in 12-15 item batches (<95 lines).
- `src/components/steps/link_modal/tabs/loci/LociLinearTermsList.tsx`: Re-orderable numbered linear sequence list (1., 2., 3.) with up/down controls and inline editing (<85 lines).
- `src/components/steps/link_modal/tabs/loci/LociRouteNameInput.tsx`: Route name input with updated presets, Previously Used trigger, and dynamic suggestions (<90 lines).
- `src/components/steps/link_modal/tabs/loci/LociPreviousRoutesModal.tsx`: Modal popup displaying saved previous routes library with empty-state teacher guidance (<85 lines).
- `src/components/steps/link_modal/tabs/loci/LociRouteChainVisualizer.tsx`: Always-visible horizontal breadcrumb sequence chain (<45 lines).
- `src/components/steps/link_modal/tabs/loci/LociTripletVaultGuard.tsx`: 3-station sequence overlap detector protecting cognitive retention (<35 lines).
- `src/components/steps/link_modal/tabs/loci/LociAssociationsList.tsx`: Scrollable list container for station association items (<30 lines).
- `src/components/steps/link_modal/tabs/loci/LociStationPickerRow.tsx`: Single minimalist combobox input with floating light-mode dropdown suggestions and custom location typing (<90 lines).
- `src/components/steps/link_modal/tabs/loci/LociAssociationItemCard.tsx`: Station card with station dropdown/custom input picker, 1-click reordering, and sensory anchor badges (<75 lines).
- `src/components/steps/link_modal/tabs/loci/LociRouteAndImageMapper.tsx`: Orchestrator for route naming, triplet guard, and strict location validation (<95 lines).
- `src/components/steps/link_modal/tabs/loci/lociApiHelpers.ts`: Async client helpers for Loci API calls (<40 lines).
- `src/components/steps/link_modal/tabs/loci/LociReviewEnding.tsx`: Peer-teaching hand-off prompt and spaced retrieval schedule (<35 lines).
- `src/components/steps/link_modal/tabs/loci/LociFlashcardsView.tsx`: Printable double-sided flashcard cut-sheet with front/back exact grid alignment (<45 lines).
- `src/components/steps/link_modal/tabs/loci/LociScriptAndFlashcards.tsx`: 2-step walkthrough story display with active recall checks and duplicated action toolbars (<98 lines).
- `src/components/steps/link_modal/tabs/loci/LociActionButtons.tsx`: Duplicated top and bottom action button toolbar providing Print dropdown (Journey vs Cards), Add Link, and Attach actions (<94 lines).
- `src/components/steps/link_modal/tabs/loci/LociRhythmCuesToggle.tsx`: Modular toggle control for classroom delivery pause markers (<22 lines).
- `src/components/steps/link_modal/tabs/loci/LociRecallQuestionsList.tsx`: Sub-component listing active recall prompt options (<45 lines).
- `src/components/steps/link_modal/tabs/loci/useLociWizardState.ts`: Isolated session-persistent state hook maintaining Loci drafts (<88 lines).
- `src/components/steps/link_modal/tabs/loci/LociWizardHeader.tsx`: Segmented step tracker header (<34 lines).
- `src/components/steps/link_modal/tabs/loci/lociPrinter.ts`: Dedicated iframe printer for formatted Journey Script and double-sided cut-sheet flashcards (<99 lines).
- `src/components/steps/link_modal/tabs/loci/lociDocExporter.ts`: HTML / Word-compatible document data exporter for Journey walkthrough and printable cards (<68 lines).
- `src/components/steps/link_modal/tabs/loci/LociExportDocModal.tsx`: Export document modal offering choice between Journey Script and Flashcards, with direct attach or QR Studio route (<79 lines).
- `src/components/steps/link_modal/LociExitWarningModal.tsx`: Warning dialog intercepting premature dismissal before attaching (<42 lines).
- `src/components/steps/link_modal/QuizModalTabsBar.tsx`: Modular horizontal tab navigator (<18 lines).
- `src/components/steps/link_modal/QuizModalFooter.tsx`: Educational guidance footer with contextual Done button (<40 lines).
- `src/components/steps/link_modal/tabs/loci/LociGeneratorTab.tsx`: 3-step wizard container pinning the Route Chain directly below the tab menu as a sticky bar (<79 lines).
- `src/components/steps/link_modal/tabs/loci/themedPresets.ts`: Themed environment route presets (School Grounds, Classroom, House, Playground, Space Station, Aquarium, City Street, Sports Gym, History) (<90 lines).
- `src/components/steps/link_modal/tabs/loci/constants.ts`: Complete preset library combining 3 Spatial Archetypes and 9 Themed Route Presets (<40 lines).
- `src/server/lociHandler.ts`: Backend routes for `/api/generate-loci-keywords`, `/api/generate-loci-stations` with strict Method of Loci spatial architectural anchor directives, `/api/generate-loci-associations`, and `/api/generate-loci-script` (<100 lines).
- `src/components/steps/toolbelt/AttachmentQrThumbnail.tsx`: Interactive, responsive canvas thumbnail rendering the teacher's custom designer QR code (<45 lines).
- `src/components/steps/toolbelt/AttachmentQrModal.tsx`: Classroom projector modal displaying the high-resolution scannable QR code and mobile scanning instructions (<60 lines).
- `src/components/steps/toolbelt/AttachmentItemCard.tsx`: Attachment card component integrating custom QR code canvases, scannable QR badges, projector launch modal, and external link utilities (<80 lines).
- `src/components/steps/toolbelt/AttachmentGallery.tsx`: Streamlined classroom visuals and digital media gallery rendering full custom designer QR codes for attached links (<35 lines).

## Limerick & Rhyming Verse Maker Registry
- `src/components/steps/link_modal/tabs/limerick/types.ts`: TypeScript contracts for LimerickItem, PoetryStyle, and LimerickFormState (<35 lines).
- `src/components/steps/link_modal/tabs/limerick/LimerickForm.tsx`: Setup form with core concept input, takeaway goal chips, mnemonic acronym, and 4-way poetry style selector (<65 lines).
- `src/components/steps/link_modal/tabs/limerick/LimerickCard.tsx`: Individual verse card with blank-out recall mode toggle and attach triggers (<70 lines).
- `src/components/steps/link_modal/tabs/limerick/LimerickGrid.tsx`: Balanced 2x2 grid displaying 4 generated verses with bulk attachment action (<45 lines).
- `src/components/steps/link_modal/tabs/limerick/limerickGenerator.ts`: Client API service calling `/api/generate-limerick` with local fallback rhyming templates (<55 lines).
- `src/components/steps/link_modal/tabs/limerick/LimerickWhiteboardSyncBadge.tsx`: Interactive whiteboard sync badge broadcasting rhyming verse decks to Step 3 cards and Step 10 presentation mode (<70 lines).
- `src/components/steps/link_modal/tabs/limerick/LimerickTabContainer.tsx`: Wizard container orchestrating setup form, API verse generation, whiteboard sync badge, and grid studio (<75 lines).
- `src/components/steps/link_modal/tabs/LimerickTab.tsx`: Barrel exporter for modal sub-tab mounting (<5 lines).
- `src/components/steps/link_modal/QuizModalTabsBar.tsx`: Optimized horizontal tab bar with 9px-10px font sizing and compact padding fitting all 6 tabs perfectly (<25 lines).
- `src/server/limerickHandler.ts`: Express POST endpoint for `/api/generate-limerick` integrating Gemini AI verse generation (<85 lines).

## Word Breakdown & Visual Puzzle Studio Registry
- `src/components/steps/link_modal/tabs/word_breakdown/types.ts`: TypeScript contracts for word breakdown items, morphemes, clue types, and wizard steps (<45 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/rebusDictionary.ts`: Extensive phonetic syllable and conceptual meaning dictionary mapping academic stems to accurate emoji pairs (<85 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/rebusGenerator.ts`: Syllable Sound Deconstructor and dual-mode rebus resolver (<45 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/morphologyHelper.ts`: Curriculum vocabulary extractor pulling academic Tier-2/Tier-3 terms directly from concept card title, script, and notes, Greek/Latin roots, and dual-mode rebus mapping (<90 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/WordIngestionRow.tsx`: Individual curriculum term row displaying phonetic pronunciation and morpheme pills (<60 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/WordBreakdownIngestion.tsx`: Concept-targeted vocabulary ingestion screen with Auto-Analyse Concept trigger, custom keyword entry, and Greek/Latin root morphology (<80 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/LetterSlots.tsx`: Interactive letter slot boxes rendering revealed or concealed characters (<45 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/WordPuzzleCard.tsx`: Individual puzzle card with 3-way clue toggle (Rebus, Visual Image, Riddle), inline Sound-Alike vs Concept Story switcher, Nano Banana generator, and reveal control (<95 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/NanoBananaImageGenerator.tsx`: 1-tap AI visual puzzle image generator button and preview thumbnail (<75 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/WhiteboardSyncBadge.tsx`: Interactive toggle button syncing puzzle deck to Step 3 cards and Step 10 whiteboard launchpad (<70 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/WordPuzzleStudio.tsx`: Classroom puzzle grid with live reveal/conceal controls, whiteboard sync badge, and lesson attachment action (<95 lines).
- `src/components/steps/link_modal/tabs/word_breakdown/WordBreakdownTabContainer.tsx`: 2-step wizard container orchestrating concept-based vocabulary analysis, term ingestion, image generation, and visual puzzle studio (<90 lines).
- `src/components/steps/link_modal/tabs/WordBreakdownTab.tsx`: Barrel exporter for modal sub-tab mounting (<5 lines).
- `src/server/bananaImageService.ts`: Dedicated Nano Banana visual clue artwork generation utilizing Gemini image models and bespoke visual puzzle illustrations (<40 lines).
- `src/server/wordBreakdownHandler.ts`: Express POST handlers for `/api/generate-word-breakdown` (dynamic concept card linguistic analysis) and `/api/generate-nano-banana-puzzle` using Gemini Nano Banana and visual clue generator (<80 lines).





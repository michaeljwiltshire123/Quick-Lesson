# Quick Lesson - AI Pipelines & Prompt System

## Active Gemini Production Models & Fallback Hierarchy
- Primary Model Target: `gemini-3.1-flash-lite` (ultra-fast structured JSON generation).
- Failover Hierarchy: `gemini-3.8-flash` -> `gemini-flash-latest`.
- Recovery Mechanism: Bracket JSON extraction, schema validation, and circuit breaker protection.

## Server API Routes (`server.ts` & `src/server/aiHandlers.ts`)
- `/api/parse-module-brief`: Parses uploaded syllabus PDF/DOCX/Text into structured course metadata.
- `/api/reparse-brief-section`: Deep-scans syllabus documents for additional grading criteria (P1, M1, D1).
- `/api/generate-progression-suggestions`: Generates 20 distinct curriculum subtopics with definitions and stumbling blocks.
- `/api/generate-lesson-sequence`: Builds 3-6 progressive learning milestones for a specified lesson topic.
- `/api/generate-lesson-section`: Generates 10-year-old accessible core explanations, UK English British spelling, structured 3-7 item How/Why theory bullet arrays, fully written worked examples, metaphors, and check questions.

## Contextual Focal Guide Priorities
The `/api/generate-lesson-section` endpoint prioritizes inputs as follows:
1. **Concept Title (`chunkTitle`)**: Primary subject matter breakdown.
2. **Lesson Focus (`lessonTitle`)**: Contextual lesson frame.
3. **Course Syllabus (`courseTitle`)**: Overarching qualification/unit scope.
4. **Theme Notes Overlay (`themeNotes`)**: Applied at a maximum weight of 30% to preserve core pedagogy.

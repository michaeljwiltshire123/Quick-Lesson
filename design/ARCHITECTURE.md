# Quick Lesson - System Architecture & Storage Shield

## Project Overview
Quick Lesson is a high-performance UK Curriculum lesson planning application built with TypeScript, React, Express, and Tailwind CSS. It connects to the Gemini API securely via a server-side proxy (`server.ts` & `aiHandlers.ts`) to generate structured syllabus parameters and curriculum progressions on demand.

## Colour Palette & Typography
- **Background**: Warm Cream (`#F8F6F0`)
- **Text & Headers**: Charcoal (`#2D2A26`)
- **Accent Color**: Soft Amber (`#F59E0B`)
- **Success & Badges**: Emerald Green (`#059669` / `#D1FAE5`)
- **Metaphors & Alerts**: Amber (`#D97706` / `#FEF3C7`)

## Storage Double-Guard System
1. **File-Size Limit Gate**: Dropzones (`UniversalUploadDropzone.tsx`, `ModuleBriefUploader.tsx`) enforce a 1.5MB (~10 page / 5,000 word) limit, warning teachers early to avoid browser bloat and timeouts.
2. **Base64 Compaction Engine**:
   - The backend server returns clean decoded UTF-8 text (`rawText`) in `/api/parse-module-brief`.
   - `aiBriefParser.ts` sets `moduleBriefFile.content = rawText` and drops transient Base64 data immediately.
   - `storage.ts` explicitly strips `fileBase64` from uploaded documents and chunk attachments prior to `localStorage` writes, preventing `QuotaExceededError` crashes and browser bloat.

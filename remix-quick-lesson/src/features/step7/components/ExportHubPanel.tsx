import React, { useState } from 'react';
import { LessonChunk, ModuleScheme, SelectedSummativeTask } from '../../../types';
import { SlideItem } from '../../step6/types/slideTypes';
import { downloadFile, safeFilename } from '../services/exporters/downloadFile';
import { copyText } from '../services/exporters/clipboardCopy';
import { formatParentEmail } from '../services/exporters/parentEmailFormatter';
import { auditUnitBrief, savedBriefRecords } from '../services/exporters/unitBriefAuditEngine';
import { BriefAudit } from './BriefAudit';
import { GoogleClassroomPublisher } from './hub/GoogleClassroomPublisher';
import { LessonPackageImportButton } from './LessonPackageImportButton';
import { LessonPackage } from '../services/exporters/lessonPackageTypes';

interface Props { title: string; subject: string; chunks: LessonChunk[]; slides: SlideItem[]; allSlides: SlideItem[]; scheme: ModuleScheme; brief: string; gradeLevel: string; lessonDuration: number; rawNotes: string; themeNotes: string; videoLinks: string[]; summativeTask?: SelectedSummativeTask; learningObjectives: string[]; onImportLesson: (pack: LessonPackage) => void }
const button = 'rounded-xl border border-[#2D2A26]/15 bg-white px-4 py-3 text-left text-[#2D2A26] hover:border-[#B85C38] hover:bg-[#FBF2EA] disabled:opacity-50';
export const ExportHubPanel: React.FC<Props> = ({ title, subject, chunks, slides, allSlides, scheme, brief, gradeLevel, lessonDuration, rawNotes, themeNotes, videoLinks, summativeTask, learningObjectives, onImportLesson }) => {
  const [status, setStatus] = useState('');
  const [copyFallback, setCopyFallback] = useState('');
  const [busy, setBusy] = useState('');
  const filename = safeFilename(title);
  const saved = savedBriefRecords();
  const briefRecord = saved.find((record) => record.parsed?.unitName === scheme.unitName) || saved[0];
  const report = auditUnitBrief(slides, scheme, brief, saved);
  const doExport = async (name: string, work: () => Promise<void>) => {
    setBusy(name); setStatus('');
    try { await work(); setStatus(`${name} downloaded.`); }
    catch (error) { console.error(`${name} export failed.`, error); setStatus(`${name} export failed. Please try again.`); }
    finally { setBusy(''); }
  };
  const copy = async (label: string, text: string) => {
    setCopyFallback('');
    if (await copyText(text)) setStatus(`${label} copied. Paste it into your email or Classroom post.`);
    else { setCopyFallback(text); setStatus('Clipboard access is unavailable. Select and copy the text below.'); }
  };
  const exportButtons = [
    { label: 'PowerPoint presentation (.pptx)', task: async () => (await import('../services/exporters/pptxNativeExporter')).downloadNativePowerPoint(title, slides), disabled: !slides.length },
    { label: 'Portable lesson data (.lesson)', task: async () => (await import('../services/exporters/lessonPackageExporter')).downloadLessonPackage(title, subject, scheme, chunks, allSlides, learningObjectives, summativeTask, { gradeLevel, lessonDuration, rawNotes, themeNotes, videoLinks }), disabled: !slides.length },
    { label: 'Student worksheet (Word)', task: async () => (await import('../services/exporters/docxWorksheetBuilder')).downloadWorksheetDocx(title, chunks, slides), disabled: !chunks.length },
    { label: 'Absent student catch-up (Word)', task: async () => (await import('../services/exporters/docxCatchUpPackBuilder')).downloadCatchUpDocx(title, chunks, slides, scheme), disabled: !chunks.length },
    { label: 'Teacher lesson plan (Word)', task: async () => (await import('../services/exporters/docxLessonPlanBuilder')).downloadLessonPlanDocx(title, chunks), disabled: !chunks.length },
    ...(summativeTask ? [{ label: 'Selected summative task handout (Word)', task: async () => (await import('../services/exporters/docxSummativeHandoutBuilder')).downloadSummativeHandout(title, summativeTask), disabled: false }] : []),
    { label: 'Offline presentation package (.zip)', task: async () => (await import('../services/exporters/offlineBackupPackageBuilder')).downloadOfflineBackup(title, slides), disabled: !slides.length },
    { label: 'Gamma slides (.md)', task: async () => { const { toGammaMarkdown } = await import('../services/exporters/gammaMarkdownExporter'); downloadFile(toGammaMarkdown(slides), 'text/markdown', `${filename}.md`); }, disabled: !slides.length },
  ];
  return <section className="rounded-2xl border border-[#2D2A26]/15 bg-white p-5">
    <header className="border-b border-[#2D2A26]/10 pb-4"><h2 className="text-xl font-bold">Lesson resources</h2>
      <p className="mt-1 text-sm text-[#2D2A26]/70">Student handouts, teacher planning, editable slides and follow-up resources.</p></header>
    <div className="mt-4 grid gap-2 sm:grid-cols-2">{exportButtons.map((item) =>
      <button key={item.label} disabled={item.disabled || !!busy} onClick={() => void doExport(item.label, item.task)} className={button}>
        {busy === item.label ? 'Preparing…' : item.label}</button>)}
      <button className={button} onClick={() => void copy('Parent and teacher email', formatParentEmail(title, subject, chunks, slides))}>Copy parent / teacher email</button>
    </div>
    {status && <p role="status" className="mt-3 rounded-lg bg-[#F8F6F0] p-3 text-sm">{status}</p>}
    {copyFallback && <textarea readOnly value={copyFallback} onFocus={(event) => event.currentTarget.select()} className="mt-3 min-h-32 w-full rounded-lg border p-3 text-sm" />}
    <a href="https://slides.google.com/create" target="_blank" rel="noreferrer" className={`${button} mt-3 block`}>
      Open Google Slides to import the downloaded PPTX
    </a>
    <LessonPackageImportButton onImport={onImportLesson} />
    <div className="mt-4"><GoogleClassroomPublisher title={title} chunks={chunks} slides={slides} /></div>
    <BriefAudit title={scheme.unitName || title} source={briefRecord?.name || 'Current lesson criteria'} results={report} />
    <p className="mt-2 text-xs text-[#2D2A26]/60">Google Slides cannot receive a local file directly from this browser; download the PPTX, then use File → Open in Slides to import it. Text and shapes stay editable, but animation and theme fidelity can differ. The .lesson file is a portable Quick Lesson JSON package, not a Google Slides file. Classroom copy creates a draft for pasting; publishing requires Google Classroom authorization.</p>
  </section>;
};

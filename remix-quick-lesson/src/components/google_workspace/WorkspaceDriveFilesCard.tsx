import React, { useState } from 'react';
import { HardDrive, ExternalLink, Save, CheckCircle } from 'lucide-react';
import { saveLessonPlanToDrive } from '../../services/google/googleDriveService';
import { GooglePickerButton } from './GooglePickerButton';
import { LessonChunk, ModuleScheme } from '../../types';
import { PickerSelectedDoc } from '../../types/workspace';

interface WorkspaceDriveFilesCardProps {
  lessonTitle: string;
  chunks: LessonChunk[];
  moduleScheme: ModuleScheme;
  onFilePicked: (doc: PickerSelectedDoc) => void;
  onRequestConfirm: (title: string, message: string, action: () => Promise<void>) => void;
}

export const WorkspaceDriveFilesCard: React.FC<WorkspaceDriveFilesCardProps> = ({
  lessonTitle,
  chunks,
  moduleScheme,
  onFilePicked,
  onRequestConfirm,
}) => {
  const [driveSavedLink, setDriveSavedLink] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToDrive = () => {
    onRequestConfirm(
      'Save Lesson Plan to Google Drive?',
      `This will save a complete lesson plan text file for "${lessonTitle}" directly into your Google Drive storage.`,
      async () => {
        setIsSaving(true);
        try {
          const content = JSON.stringify({ lessonTitle, moduleScheme, chunks }, null, 2);
          const res = await saveLessonPlanToDrive(lessonTitle || 'Lesson Plan', content);
          setDriveSavedLink(res.webViewLink || 'https://drive.google.com');
        } finally {
          setIsSaving(false);
        }
      }
    );
  };

  return (
    <div className="p-4 rounded-xl border border-[#2D2A26]/10 bg-white/70 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/80 flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-amber-600" />
            <span>Google Drive Storage & Picker</span>
          </h4>
          <p className="text-[11px] text-[#2D2A26]/60">Save lesson archives and select classroom resources directly from Drive.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <GooglePickerButton onFilePicked={onFilePicked} label="Select File with Google Picker" />

        {driveSavedLink ? (
          <a href={driveSavedLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-semibold hover:underline">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Saved in Drive</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <button type="button" onClick={handleSaveToDrive} disabled={isSaving} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2D2A26]/20 bg-white hover:bg-neutral-50 text-xs font-semibold text-[#2D2A26] shadow-2xs cursor-pointer disabled:opacity-50">
            <Save className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isSaving ? 'Saving…' : 'Save Archive to Drive'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

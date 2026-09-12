import React, { useState } from 'react';
import { X, Sparkles, AlertTriangle } from 'lucide-react';
import { WorkspaceDocsExportCard } from './WorkspaceDocsExportCard';
import { WorkspaceSheetsFormsCard } from './WorkspaceSheetsFormsCard';
import { WorkspaceClassroomCard } from './WorkspaceClassroomCard';
import { WorkspaceGmailCard } from './WorkspaceGmailCard';
import { WorkspaceDriveFilesCard } from './WorkspaceDriveFilesCard';
import { WorkspaceConfirmDialog } from './WorkspaceConfirmDialog';
import { LessonChunk, ModuleScheme } from '../../types';
import { PickerSelectedDoc } from '../../types/workspace';

interface GoogleWorkspaceHubModalProps {
  isOpen: boolean; onClose: () => void; lessonTitle: string;
  subject: string; gradeLevel: string; chunks: LessonChunk[];
  moduleScheme: ModuleScheme; onFilePicked: (doc: PickerSelectedDoc) => void;
}

export const GoogleWorkspaceHubModal: React.FC<GoogleWorkspaceHubModalProps> = ({
  isOpen, onClose, lessonTitle, subject, gradeLevel, chunks, moduleScheme, onFilePicked,
}) => {
  const [consecutiveErrors, setConsecutiveErrors] = useState(0);
  const [circuitBroken, setCircuitBroken] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{ isOpen: boolean; title: string; message: string; action: () => Promise<void> }>({ isOpen: false, title: '', message: '', action: async () => {} });

  if (!isOpen) return null;

  const handleRequestConfirm = (title: string, message: string, action: () => Promise<void>) => {
    if (circuitBroken) return;
    setConfirmConfig({ isOpen: true, title, message, action });
  };

  const handleExecuteConfirmed = async () => {
    const act = confirmConfig.action;
    setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
    try {
      await act();
      setConsecutiveErrors(0);
    } catch {
      const nextCount = consecutiveErrors + 1;
      setConsecutiveErrors(nextCount);
      if (nextCount >= 5) setCircuitBroken(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] border border-[#2D2A26]/20 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#2D2A26]/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2D2A26]">Google Workspace Classroom Hub</h3>
              <p className="text-[11px] text-[#2D2A26]/60">Sync materials with Drive, Docs, Sheets, Slides, Forms, Classroom, and Gmail.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 text-[#2D2A26]/60 hover:text-[#2D2A26] cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {circuitBroken && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>Circuit breaker triggered: 5 consecutive network errors detected. Operations paused to safeguard state.</span>
          </div>
        )}

        <div className="space-y-3">
          <WorkspaceClassroomCard lessonTitle={lessonTitle} chunks={chunks} onRequestConfirm={handleRequestConfirm} />
          <WorkspaceDocsExportCard lessonTitle={lessonTitle} subject={subject} gradeLevel={gradeLevel} chunks={chunks} moduleScheme={moduleScheme} onRequestConfirm={handleRequestConfirm} />
          <WorkspaceSheetsFormsCard lessonTitle={lessonTitle} chunks={chunks} moduleScheme={moduleScheme} onRequestConfirm={handleRequestConfirm} />
          <WorkspaceGmailCard lessonTitle={lessonTitle} chunks={chunks} onRequestConfirm={handleRequestConfirm} />
          <WorkspaceDriveFilesCard lessonTitle={lessonTitle} chunks={chunks} moduleScheme={moduleScheme} onFilePicked={onFilePicked} onRequestConfirm={handleRequestConfirm} />
        </div>

        <WorkspaceConfirmDialog isOpen={confirmConfig.isOpen} title={confirmConfig.title} message={confirmConfig.message} onConfirm={handleExecuteConfirmed} onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))} />
      </div>
    </div>
  );
};

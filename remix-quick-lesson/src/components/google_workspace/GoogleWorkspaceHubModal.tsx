import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
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
      <div className="relative bg-[#FDFBF7] border border-[#2D2A26]/20 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        
        {/* Holographic Circuit Blowout Overlay */}
        {circuitBroken && (
          <div className="absolute inset-0 bg-stone-950/95 z-50 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none border border-red-500/30">
            <style>{`
              @keyframes tripwirePulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.8; } }
              @keyframes sparkCascade { 
                0% { transform: translateY(-40px) scale(0.5); opacity: 0; }
                15% { opacity: 1; }
                100% { transform: translateY(220px) translateX(var(--tx)) scale(1.1); opacity: 0; }
              }
            `}</style>
            <div style={{ animation: 'tripwirePulse 1.2s infinite' }} className="absolute inset-x-0 top-1/4 h-0.5 bg-red-600 shadow-[0_0_12px_#ef4444]" />
            <div style={{ animation: 'tripwirePulse 1.8s infinite 0.3s' }} className="absolute inset-x-0 top-2/3 h-0.5 bg-red-600 shadow-[0_0_12px_#ef4444]" />
            <div className="absolute inset-0 z-10 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    left: `${5 + i * 6.5}%`,
                    '--tx': `${-25 + Math.random() * 50}px`,
                    animation: `sparkCascade 1.5s ease-out ${i * 0.12}s infinite`,
                  } as React.CSSProperties}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-amber-400 to-red-500 shadow-[0_0_6px_#f59e0b]"
                />
              ))}
            </div>
            <div className="relative z-20 max-w-md bg-black border border-red-500/50 rounded-2xl p-5 font-mono text-left text-xs text-red-500 space-y-2 shadow-[0_0_30px_rgba(239,68,68,0.25)]">
              <div className="flex items-center gap-2 text-red-400 font-bold border-b border-red-900 pb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>[SYSTEMIC CIRCUIT BREAKER ACTIVE]</span>
              </div>
              <p className="text-[11px] text-stone-400">5 consecutive network errors detected. State protection sequence engaged.</p>
              <div className="bg-stone-900/60 p-2.5 rounded border border-red-900/40 text-[10px] space-y-1">
                <div>&gt; EMERGENCY COOLING ACTIVATED...</div>
                <div>&gt; SAFEGUARD DATA STORAGE WRITTEN [OK]</div>
                <div>&gt; ALL OUTGOING TRAFFIC PAUSED.</div>
              </div>
              <button 
                type="button" 
                onClick={() => { setConsecutiveErrors(0); setCircuitBroken(false); }} 
                className="mt-3 w-full py-2 px-3 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/50 rounded-lg text-[10px] font-bold tracking-wider uppercase cursor-pointer"
              >
                Reset Circuit & Retry Sync
              </button>
            </div>
          </div>
        )}

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

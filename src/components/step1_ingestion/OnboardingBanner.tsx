import React, { useState, useEffect } from 'react';
import { ArrowRight, FolderOpen, Compass, Layers } from 'lucide-react';
import { UniversalUploadDropzone } from './UniversalUploadDropzone';
import { SavedBriefCard, SavedBriefItem } from './SavedBriefCard';
import { GooglePickerButton } from '../google_workspace';
import { SAVED_BRIEFS_KEY } from '../../utils/storage';

export interface OnboardingBannerProps {
  onBegin: () => void;
  onOpenLibrary: () => void;
  onFileParsed?: (fileName: string, content: string, fileBase64?: string, mimeType?: string) => void;
  onLoadSavedBrief?: (brief: SavedBriefItem) => void;
}

export const OnboardingBanner: React.FC<OnboardingBannerProps> = ({
  onBegin, onOpenLibrary, onFileParsed, onLoadSavedBrief,
}) => {
  const [showUploader, setShowUploader] = useState(false);
  const [savedBriefs, setSavedBriefs] = useState<SavedBriefItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_BRIEFS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedBriefs(parsed);
      }
    } catch {}
  }, []);

  return (
    <div className="w-full max-w-2xl bg-white border border-[#2D2A26]/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      {showUploader ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#2D2A26]">Upload Lesson Document</h3>
            <p className="text-xs text-[#2D2A26]/70">Select or drop a curriculum syllabus to import existing unit parameters.</p>
          </div>
          <UniversalUploadDropzone onFileParsed={(n, t, b, m) => onFileParsed?.(n, t, b, m)} onCancel={() => setShowUploader(false)} />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/10 text-[#2D2A26] text-xs font-semibold border border-[#F59E0B]/20">
              <Compass className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Step 1: Pedagogical Framework</span>
            </div>
            <h2 className="text-2xl font-bold text-[#2D2A26] tracking-tight">Welcome to Quick Lesson</h2>
            <p className="text-xs md:text-sm text-[#2D2A26]/80 leading-relaxed">
              Structured around UK curriculum standards, this planner is a guide to creating a full and engaging lesson in any topic.
            </p>
          </div>

          {savedBriefs.length > 0 && (
            <div className="space-y-2.5 pt-3 border-t border-[#2D2A26]/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2D2A26]/70 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Quick-Select Saved Syllabuses</span>
                </div>
                <span className="text-[10px] text-[#2D2A26]/50">Click once to launch</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {savedBriefs.slice(0, 4).map((b, i) => (
                  <SavedBriefCard key={b.id || i} brief={b} onSelect={(item) => onLoadSavedBrief?.(item)} />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button type="button" onClick={onBegin} className="w-full py-3 px-5 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
              <span>Begin Curriculum Planner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => { setShowUploader(true); onOpenLibrary(); }} className="w-full py-3 px-5 bg-[#F8F6F0] hover:bg-[#2D2A26]/5 text-[#2D2A26] font-semibold text-xs rounded-xl border border-[#2D2A26]/15 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <FolderOpen className="w-4 h-4 text-[#2D2A26]/70" />
              <span>Upload New Syllabus</span>
            </button>
          </div>

          <div className="flex items-center justify-center pt-1">
            <GooglePickerButton
              onFilePicked={(doc) => onFileParsed?.(doc.name, doc.description || `Imported from Google Drive: ${doc.name}`)}
              label="Browse Google Drive with Picker"
            />
          </div>
        </>
      )}
    </div>
  );
};

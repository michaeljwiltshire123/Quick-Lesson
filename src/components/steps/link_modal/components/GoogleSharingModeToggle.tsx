import React, { useState } from 'react';
import { Info, FileSpreadsheet, Check, Sparkles } from 'lucide-react';

export type SharingMode = 'standard' | 'copy' | 'template';

interface GoogleSharingModeToggleProps {
  sharingMode: SharingMode;
  onSharingModeChange: (mode: SharingMode) => void;
  isGoogleUrl: boolean;
}

export const GoogleSharingModeToggle: React.FC<GoogleSharingModeToggleProps> = ({
  sharingMode, onSharingModeChange, isGoogleUrl,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#2D2A26]/15 space-y-2">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <FileSpreadsheet className="w-4 h-4 text-[#D97706]" />
          <span className="text-xs font-bold text-[#2D2A26]">Google Workspace Sharing Mode</span>
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="p-0.5 text-[#2D2A26]/60 hover:text-[#D97706] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            title="What is this?"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
        {isGoogleUrl ? (
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-700" /> Google Link Detected
          </span>
        ) : (
          <span className="text-[10px] font-medium text-[#2D2A26]/60 italic">Docs • Sheets • Slides</span>
        )}
      </div>

      {showInfo && (
        <div className="p-2.5 bg-white rounded-lg border border-[#D97706]/30 text-xs text-[#2D2A26]/85 leading-relaxed space-y-1 shadow-2xs">
          <p className="font-bold text-[#D97706] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Google Drive Exclusive URL Magic
          </p>
          <p className="text-[11px]">
            This modifies Google Docs, Sheets, Slides, and Drawings URLs so students can open their own version without editing your original master file:
          </p>
          <ul className="text-[11px] list-disc list-inside space-y-0.5 text-[#2D2A26]/75">
            <li><strong>Standard:</strong> Keeps normal collaborative link (<code className="text-[#D97706]">/edit</code>).</li>
            <li><strong>Force Copy:</strong> Immediately prompts the student to create their own personal copy (<code className="text-[#D97706]">/copy</code>).</li>
            <li><strong>Template:</strong> Shows a clean preview with a &quot;Use Template&quot; button (<code className="text-[#D97706]">/template/preview</code>).</li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-3 gap-1.5 bg-white p-1 rounded-xl border border-[#2D2A26]/15 text-xs">
        <button
          type="button"
          onClick={() => onSharingModeChange('standard')}
          className={`py-1.5 px-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
            sharingMode === 'standard' ? 'bg-[#2D2A26] text-white shadow-2xs' : 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
          }`}
        >
          Standard (/edit)
        </button>
        <button
          type="button"
          onClick={() => onSharingModeChange('copy')}
          className={`py-1.5 px-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
            sharingMode === 'copy' ? 'bg-[#D97706] text-white shadow-2xs' : 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
          }`}
        >
          Force Copy (/copy)
        </button>
        <button
          type="button"
          onClick={() => onSharingModeChange('template')}
          className={`py-1.5 px-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
            sharingMode === 'template' ? 'bg-[#D97706] text-white shadow-2xs' : 'text-[#2D2A26]/70 hover:text-[#2D2A26]'
          }`}
        >
          Template Preview
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { Download, ExternalLink, HardDrive, CheckCircle } from 'lucide-react';

interface PayloadExportActionsProps {
  onExportGoogleDrive: () => Promise<void>;
  onDownloadKahootCsv: () => void;
  isExportingDrive: boolean;
  hasQuestions: boolean;
  driveFormUrl: string | null;
  downloadedCsvName: string | null;
}

export const PayloadExportActions: React.FC<PayloadExportActionsProps> = ({
  onExportGoogleDrive, onDownloadKahootCsv, isExportingDrive,
  hasQuestions, driveFormUrl, downloadedCsvName,
}) => (
  <div className="p-3.5 rounded-xl border border-[#2D2A26]/10 bg-[#FDFBF7] space-y-2.5">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#2D2A26]/80 uppercase tracking-wider">Export Classroom Payloads</span>
      <span className="text-[11px] text-[#2D2A26]/50">30-second Kahoot timing & Drive Forms sync</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 flex flex-col justify-between gap-2 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
            <HardDrive className="w-4 h-4 text-emerald-600" />
            <span>Google Drive Form</span>
          </div>
          <p className="text-[11px] text-[#2D2A26]/60 mt-0.5">Creates an active Form in your "Quick Lesson" folder.</p>
        </div>
        {driveFormUrl ? (
          <a
            href={driveFormUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-bold hover:underline"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Open Form in Drive</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <button
            type="button" disabled={!hasQuestions || isExportingDrive} onClick={onExportGoogleDrive}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>{isExportingDrive ? 'Exporting to Drive…' : 'Export directly to Google Drive'}</span>
          </button>
        )}
      </div>

      <div className="p-3 bg-white rounded-xl border border-[#2D2A26]/10 flex flex-col justify-between gap-2 shadow-2xs">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
            <Download className="w-4 h-4 text-[#D97706]" />
            <span>Kahoot Spreadsheet</span>
          </div>
          <p className="text-[11px] text-[#2D2A26]/60 mt-0.5">30-second timed format ready for instant upload.</p>
        </div>
        <button
          type="button" disabled={!hasQuestions} onClick={onDownloadKahootCsv}
          className="px-3 py-1.5 bg-[#2D2A26] hover:bg-black text-white rounded-lg text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>{downloadedCsvName ? 'Re-download Kahoot CSV' : 'Download Kahoot CSV'}</span>
        </button>
      </div>
    </div>
  </div>
);

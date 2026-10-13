import React, { useState } from 'react';
import { FileText, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { ModuleBriefDropArea } from './ModuleBriefDropArea';

export interface ModuleBriefUploaderProps {
  moduleBriefFile: { name: string; content: string; fileBase64?: string; mimeType?: string } | null;
  onUploadModuleBrief: (file: { name: string; content: string; fileBase64?: string; mimeType?: string } | null) => void;
  onNextStep: () => void;
  onResetSelection: () => void;
}

export const ModuleBriefUploader: React.FC<ModuleBriefUploaderProps> = ({
  moduleBriefFile, onUploadModuleBrief, onNextStep, onResetSelection,
}) => {
  const [isReading, setIsReading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const extractAndUpload = (file: File) => {
    setErrorMsg(null);
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('This file exceeds the 10MB limit. Please upload a standard curriculum document.');
      return;
    }
    setIsReading(true);
    const isDoc = /\.(pdf|docx|doc)$/i.test(file.name) || /pdf|word/i.test(file.type);
    const reader = new FileReader();

    if (isDoc) {
      reader.onload = (e) => {
        setIsReading(false);
        const url = typeof e.target?.result === 'string' ? e.target.result : '';
        const base64 = url.includes(',') ? url.split(',')[1] : url;
        onUploadModuleBrief({ name: file.name, content: '', fileBase64: base64, mimeType: file.type || 'application/octet-stream' });
      };
      reader.onerror = () => { setIsReading(false); setErrorMsg('Unable to read document. Please check file permissions and try again.'); };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (e) => {
        setIsReading(false);
        const text = typeof e.target?.result === 'string' ? e.target.result : '';
        onUploadModuleBrief({ name: file.name, content: text || `Uploaded brief: ${file.name}` });
      };
      reader.onerror = () => { setIsReading(false); setErrorMsg('Unable to read text file. Please try again.'); };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4" id="module-brief-uploader-root">
      {!moduleBriefFile ? (
        <ModuleBriefDropArea isReading={isReading} onFileSelected={extractAndUpload} />
      ) : (
        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs">
          <div className="flex items-center gap-2.5 text-emerald-900 font-semibold truncate">
            <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="truncate text-sm">{moduleBriefFile.name}</span>
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>
          <button type="button" onClick={() => onUploadModuleBrief(null)} className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer rounded-lg hover:bg-red-50" aria-label="Remove brief">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      <div className="flex items-center justify-between pt-1">
        <button type="button" onClick={onResetSelection} className="text-xs font-medium text-[#2D2A26]/70 hover:text-[#2D2A26] cursor-pointer underline">Back to option selection</button>
        <button type="button" onClick={onNextStep} disabled={!moduleBriefFile || isReading} className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#2D2A26] font-semibold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs">Continue to Notes</button>
      </div>
    </div>
  );
};

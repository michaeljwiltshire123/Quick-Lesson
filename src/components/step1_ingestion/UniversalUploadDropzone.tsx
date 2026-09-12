import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

export interface UniversalUploadDropzoneProps {
  onFileParsed: (fileName: string, content: string, fileBase64?: string, mimeType?: string) => void;
  onCancel: () => void;
}

export const UniversalUploadDropzone: React.FC<UniversalUploadDropzoneProps> = ({ onFileParsed, onCancel }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('This file exceeds the 10MB limit. Please upload a standard curriculum document.');
      setIsParsing(false);
      return;
    }
    setIsParsing(true);
    const isDoc = /\.(pdf|docx|doc)$/i.test(file.name) || /pdf|word/i.test(file.type);
    const reader = new FileReader();

    if (isDoc) {
      reader.onload = (e) => {
        const url = typeof e.target?.result === 'string' ? e.target.result : '';
        setIsParsing(false);
        onFileParsed(file.name, '', url.includes(',') ? url.split(',')[1] : url, file.type || 'application/octet-stream');
        onCancel();
      };
      reader.onerror = () => { setIsParsing(false); setErrorMsg('Unable to read document. Please try again.'); };
      reader.readAsDataURL(file);
    } else {
      reader.onload = (e) => {
        const text = typeof e.target?.result === 'string' ? e.target.result : '';
        setIsParsing(false);
        onFileParsed(file.name, text || `Uploaded curriculum document: ${file.name}`);
        onCancel();
      };
      reader.onerror = () => { setIsParsing(false); setErrorMsg('Unable to read text file. Please try again.'); };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isParsing && fileInputRef.current?.click()}
        className={`w-full min-h-[190px] p-8 rounded-2xl border-2 border-dashed transition-colors flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8F6F0] ${
          isDragging ? 'border-[#F59E0B] bg-[#F59E0B]/10' : 'border-[#2D2A26]/30 hover:border-[#2D2A26]/50'
        }`}
      >
        <input ref={fileInputRef} type="file" accept=".txt,.md,.json,.lesson,.docx,.doc,.pdf,.pptx" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ''; }} className="hidden" />
        {isParsing ? (
          <div className="flex flex-col items-center gap-3 text-[#2D2A26]">
            <Loader2 className="w-8 h-8 animate-spin text-[#F59E0B]" />
            <p className="text-sm font-medium">Reading file with native FileReader...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-[#2D2A26]">
            <div className="p-3 bg-white rounded-full border border-[#2D2A26]/10 shadow-sm"><UploadCloud className="w-7 h-7 text-[#F59E0B]" /></div>
            <div>
              <p className="text-base font-semibold">Drag & drop your lesson file here</p>
              <p className="text-xs text-[#2D2A26]/70 mt-1">Supports .txt, .md, .json, .lesson, .docx, .doc, .pdf (Max 10MB)</p>
            </div>
          </div>
        )}
      </div>
      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      <button type="button" onClick={onCancel} disabled={isParsing} className="w-full py-3 px-4 bg-white hover:bg-[#F8F6F0] text-[#2D2A26] font-semibold text-sm rounded-xl border border-[#2D2A26]/15 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
        <ArrowLeft className="w-4 h-4" />
        <span>Go Back to Welcome Screen</span>
      </button>
    </div>
  );
};

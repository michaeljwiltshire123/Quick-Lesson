import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';

interface ModuleBriefDropAreaProps {
  isReading: boolean;
  onFileSelected: (file: File) => void;
}

export const ModuleBriefDropArea: React.FC<ModuleBriefDropAreaProps> = ({ isReading, onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) onFileSelected(e.dataTransfer.files[0]);
  };

  return (
    <div
      id="module-brief-dropzone"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !isReading && fileInputRef.current?.click()}
      className={`w-full p-8 md:p-10 border-2 border-dashed rounded-2xl transition-all duration-150 flex flex-col items-center justify-center gap-3 text-center cursor-pointer select-none ${
        isDragging
          ? 'border-[#F59E0B] bg-[#F59E0B]/10 scale-[1.005]'
          : 'border-[#2D2A26]/20 hover:border-[#2D2A26]/40 bg-[#F8F6F0] hover:bg-[#2D2A26]/[0.02]'
      }`}
    >
      <input ref={fileInputRef} type="file" accept=".txt,.md,.json,.lesson,.pdf,.docx,.doc,.pptx" onChange={handleFileChange} className="hidden" />
      {isReading ? (
        <div className="flex flex-col items-center gap-2 text-[#2D2A26]">
          <Loader2 className="w-8 h-8 animate-spin text-[#F59E0B]" />
          <p className="text-sm font-semibold">Reading curriculum document...</p>
          <p className="text-xs text-[#2D2A26]/60">Extracting unit parameters and learning criteria</p>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#2D2A26]/10 flex items-center justify-center shadow-2xs">
            <UploadCloud className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-sm md:text-base font-bold text-[#2D2A26]">Upload or drop your module brief here</p>
            <p className="text-xs text-[#2D2A26]/70 mt-1 max-w-sm">Click anywhere or drag & drop. Supports PDF, Word (.docx/.doc), Text, and Markdown up to 10MB.</p>
          </div>
          <span className="mt-1 px-4 py-1.5 bg-white border border-[#2D2A26]/15 hover:border-[#2D2A26]/30 text-[#2D2A26] rounded-xl text-xs font-semibold shadow-2xs transition-colors">
            Browse Files
          </span>
        </>
      )}
    </div>
  );
};

import React from 'react';
import { Trash2, FileText, Upload } from 'lucide-react';

export interface NotesDraftAttachmentProps {
  draftFile: { name: string; content: string } | null;
  onUploadDraftFile: (file: { name: string; content: string } | null) => void;
}

export const NotesDraftAttachment: React.FC<NotesDraftAttachmentProps> = ({
  draftFile,
  onUploadDraftFile,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = typeof ev.target?.result === 'string' ? ev.target.result : '';
      onUploadDraftFile({ name: file.name, content: text || `Draft material: ${file.name}` });
    };
    reader.onerror = () => {
      onUploadDraftFile({ name: file.name, content: `Draft material: ${file.name}` });
    };
    reader.readAsText(file);
  };

  if (!draftFile) {
    return (
      <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F8F6F0] border border-[#2D2A26]/20 rounded-xl text-xs font-medium text-[#2D2A26] hover:bg-[#2D2A26]/5 cursor-pointer">
        <Upload className="w-3.5 h-3.5 text-[#F59E0B]" />
        <span>Upload Lesson Plan Material</span>
        <input type="file" accept=".txt,.md,.json,.lesson,.pdf,.docx,.doc" onChange={handleFileChange} className="hidden" />
      </label>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 font-medium">
      <FileText className="w-3.5 h-3.5 text-emerald-600" />
      <span className="max-w-[150px] truncate">{draftFile.name}</span>
      <button
        type="button"
        onClick={() => onUploadDraftFile(null)}
        className="text-red-500 hover:text-red-700 cursor-pointer ml-1"
        aria-label="Remove draft file"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </span>
  );
};

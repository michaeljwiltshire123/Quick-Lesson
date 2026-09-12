import React, { useState } from 'react';
import { FolderOpen } from 'lucide-react';
import { openGooglePicker } from '../../services/google/googlePickerService';
import { googleSignIn, getAccessToken } from '../../services/google/googleAuth';
import { PickerSelectedDoc } from '../../types/workspace';

interface GooglePickerButtonProps {
  onFilePicked: (doc: PickerSelectedDoc) => void;
  label?: string;
  className?: string;
}

export const GooglePickerButton: React.FC<GooglePickerButtonProps> = ({
  onFilePicked,
  label = 'Pick from Google Drive',
  className = '',
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClick = async () => {
    setIsOpening(true);
    setErrorMsg(null);
    try {
      if (!getAccessToken()) {
        await googleSignIn();
      }
      await openGooglePicker((doc) => {
        onFilePicked(doc);
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to open Google Picker.');
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={isOpening}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#2D2A26]/20 bg-white/90 hover:bg-white text-xs font-semibold text-[#2D2A26] shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-50 ${className}`}
      >
        <FolderOpen className="w-3.5 h-3.5 text-[#D97706]" />
        <span>{isOpening ? 'Opening Drive…' : label}</span>
      </button>
      {errorMsg && <span className="text-[10px] text-red-600 font-medium">{errorMsg}</span>}
    </div>
  );
};

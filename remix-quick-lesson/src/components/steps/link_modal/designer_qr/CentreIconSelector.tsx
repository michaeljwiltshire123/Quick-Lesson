import React, { useState, useRef } from 'react';
import { Smile, UploadCloud, X, Crop } from 'lucide-react';
import { EMOJI_OPTIONS, QrDesignConfig } from './types';
import { CircularCropModal } from './cropper/CircularCropModal';

interface CentreIconSelectorProps {
  config: QrDesignConfig;
  onChange: (updated: Partial<QrDesignConfig>) => void;
}

export const CentreIconSelector: React.FC<CentreIconSelectorProps> = ({ config, onChange }) => {
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      if (result) setCropSrc(result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-[#2D2A26] flex items-center gap-1">
          <Smile className="w-3 h-3 text-[#D97706]" /> Centre Badge Icon
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-[10px] font-bold text-[#D97706] hover:text-amber-700 flex items-center gap-1 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 cursor-pointer transition-colors"
        >
          <UploadCloud className="w-3 h-3" /> Upload Custom Icon
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      <div className="flex flex-wrap gap-1 items-center">
        {config.customIconBase64 && (
          <div className="flex items-center gap-1 p-0.5 pr-1.5 bg-amber-100 rounded-lg border border-[#D97706] shadow-2xs">
            <img src={config.customIconBase64} alt="Custom Icon" className="w-5 h-5 rounded-full object-cover border border-white" />
            <button
              type="button"
              onClick={() => setCropSrc(config.customIconBase64!)}
              title="Recrop Icon"
              className="text-[#2D2A26]/70 hover:text-[#2D2A26] p-0.5 rounded cursor-pointer"
            >
              <Crop className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ customIconBase64: undefined })}
              title="Remove Custom Icon"
              className="text-red-500 hover:text-red-700 p-0.5 rounded cursor-pointer"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        )}

        {EMOJI_OPTIONS.map((emoji) => (
          <button
            key={emoji || 'none'}
            type="button"
            onClick={() => onChange({ centerIcon: emoji, customIconBase64: undefined })}
            className={`w-5 h-5 rounded-md text-xs flex items-center justify-center border transition-all cursor-pointer ${
              !config.customIconBase64 && config.centerIcon === emoji
                ? 'border-[#D97706] bg-amber-100 ring-1 ring-[#D97706]'
                : 'border-[#2D2A26]/15 hover:bg-black/5'
            }`}
          >
            {emoji || '—'}
          </button>
        ))}
      </div>

      {cropSrc && (
        <CircularCropModal
          imageSrc={cropSrc}
          onCropComplete={(base64) => onChange({ customIconBase64: base64, centerIcon: '' })}
          onClose={() => setCropSrc(null)}
        />
      )}
    </div>
  );
};

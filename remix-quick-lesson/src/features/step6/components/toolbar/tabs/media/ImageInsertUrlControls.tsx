import React, { useState } from 'react';
import { SlideElement } from '../../../../types/slideTypes';
import { ImagePlus, Replace, ClipboardPaste } from 'lucide-react';

interface ImageInsertUrlControlsProps {
  selectedElement?: SlideElement;
  onInsertElement: (newElement: SlideElement) => void;
  onReplaceContent?: (newUrl: string) => void;
}

export const ImageInsertUrlControls: React.FC<ImageInsertUrlControlsProps> = ({
  selectedElement, onInsertElement, onReplaceContent,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [previewError, setPreviewError] = useState(false);

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.startsWith('http') || text.startsWith('data:image')) {
        setUrlInput(text);
        setPreviewError(false);
      }
    } catch {
      /* ignore */
    }
  };

  const handleInsert = () => {
    if (!urlInput) return;
    onInsertElement({
      id: `el-img-${Date.now()}`,
      type: 'image',
      x: 30, y: 25, width: 40, height: 45,
      content: urlInput,
      caption: 'Online Classroom Visual',
      meta: { shadowStyle: 'soft', opacity: 100 },
    });
    setUrlInput('');
  };

  const handleReplace = () => {
    if (!urlInput || !selectedElement) return;
    onReplaceContent?.(urlInput);
    setUrlInput('');
  };

  return (
    <div className="space-y-2 pt-1 text-xs text-stone-700">
      <div className="space-y-1">
        <label className="text-[10px] text-stone-600 font-semibold">Web Image URL</label>
        <div className="flex items-center gap-1">
          <input
            type="url"
            value={urlInput}
            placeholder="https://images.unsplash.com/..."
            onChange={(e) => { setUrlInput(e.target.value); setPreviewError(false); }}
            className="flex-1 text-[11px] p-1.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600 font-medium"
          />
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="p-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-stone-700 cursor-pointer"
            title="Paste from clipboard"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {urlInput && !previewError && (
        <div className="relative w-full h-24 bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center p-1">
          <img
            src={urlInput}
            alt="Preview"
            onError={() => setPreviewError(true)}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-1.5 pt-1">
        <button
          type="button"
          disabled={!urlInput}
          onClick={handleInsert}
          className="py-1.5 px-2 rounded-lg bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white font-bold text-[10.5px] flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
        >
          <ImagePlus className="w-3.5 h-3.5" />
          <span>+ Add to Slide</span>
        </button>

        <button
          type="button"
          disabled={!urlInput || !selectedElement}
          onClick={handleReplace}
          className="py-1.5 px-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 disabled:opacity-40 text-stone-800 font-bold text-[10.5px] flex items-center justify-center gap-1 cursor-pointer"
        >
          <Replace className="w-3.5 h-3.5 text-stone-600" />
          <span>Replace Active</span>
        </button>
      </div>
    </div>
  );
};

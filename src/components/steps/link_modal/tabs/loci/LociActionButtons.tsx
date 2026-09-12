import React, { useState, useRef, useEffect } from 'react';
import { Printer, Plus, Check, Link2, FileText, ChevronDown } from 'lucide-react';
import { LociScriptOutput } from './types';
import { printLociScript, printLociFlashcards } from './lociPrinter';
import { LociExportDocModal } from './LociExportDocModal';
import { ChunkAttachment } from '../../../../../types';

interface Props {
  scriptData: LociScriptOutput;
  routeName: string;
  attached: boolean;
  onAttach: () => void;
  onAddAttachment?: (att: Partial<ChunkAttachment>) => void;
  onSendToQr?: (url: string, title: string) => void;
}

export const LociActionButtons: React.FC<Props> = ({
  scriptData, routeName, attached, onAttach, onAddAttachment, onSendToQr,
}) => {
  const [showPrintMenu, setShowPrintMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowPrintMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowPrintMenu(!showPrintMenu)}
          className="px-2.5 py-1.5 bg-[#F8F6F0] hover:bg-[#E8E3D8] border border-[#2D2A26]/15 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <Printer className="w-3.5 h-3.5 text-[#D97706]" /> Print <ChevronDown className="w-3 h-3 opacity-60" />
        </button>
        {showPrintMenu && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#2D2A26]/15 rounded-xl shadow-lg z-30 p-1 space-y-0.5">
            <button
              type="button"
              onClick={() => { setShowPrintMenu(false); printLociScript(scriptData, routeName); }}
              className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-[#2D2A26] hover:bg-[#F8F6F0] rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#D97706]" /> Print Journey Script
            </button>
            <button
              type="button"
              onClick={() => { setShowPrintMenu(false); printLociFlashcards(scriptData.stations, routeName || scriptData.title); }}
              className="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-[#2D2A26] hover:bg-[#F8F6F0] rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" /> Print Flashcards
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowExportModal(true)}
        className="px-2.5 py-1.5 bg-[#F8F6F0] hover:bg-[#E8E3D8] border border-[#2D2A26]/15 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
      >
        <Link2 className="w-3.5 h-3.5 text-[#D97706]" /> Add Link
      </button>

      <button
        type="button"
        onClick={onAttach}
        disabled={attached}
        className="px-3 py-1.5 bg-[#D97706] hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer disabled:opacity-50 transition-colors shadow-2xs"
      >
        {attached ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        {attached ? 'Attached' : 'Attach'}
      </button>

      {showExportModal && onSendToQr && (
        <LociExportDocModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          scriptData={scriptData}
          routeName={routeName}
          onSendToQr={onSendToQr}
          onAddAttachment={onAddAttachment}
        />
      )}
    </div>
  );
};

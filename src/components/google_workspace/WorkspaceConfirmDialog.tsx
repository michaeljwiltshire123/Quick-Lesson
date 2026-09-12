import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WorkspaceConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WorkspaceConfirmDialog: React.FC<WorkspaceConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm Action',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] border border-[#2D2A26]/20 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2D2A26]">{title}</h3>
            <p className="text-xs text-[#2D2A26]/70 mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-[#2D2A26]/80 hover:text-[#2D2A26] rounded-xl hover:bg-black/5 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-xs cursor-pointer ${
              isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#D97706] hover:bg-[#B45309]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

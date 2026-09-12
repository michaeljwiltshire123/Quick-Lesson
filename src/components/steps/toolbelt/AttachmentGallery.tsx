import React from 'react';
import { ChunkAttachment } from '../../../types';
import { AttachmentItemCard } from './AttachmentItemCard';

interface AttachmentGalleryProps {
  attachments: ChunkAttachment[];
  onRemoveAttachment: (id: string) => void;
}

export const AttachmentGallery: React.FC<AttachmentGalleryProps> = ({ attachments, onRemoveAttachment }) => {
  if (attachments.length === 0) {
    return (
      <div className="p-3 bg-[#F8F6F0]/60 rounded-xl border border-dashed border-[#2D2A26]/15 text-center">
        <p className="text-xs text-[#2D2A26]/60 font-medium">
          No classroom visuals attached yet. Click <span className="font-bold text-[#D97706]">+ Add Visual</span> to attach diagrams, board images, or charts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#2D2A26]/80 uppercase tracking-wider">
          Attached Classroom Visuals &amp; Media ({attachments.length})
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {attachments.map((att) => (
          <AttachmentItemCard key={att.id} att={att} onRemove={onRemoveAttachment} />
        ))}
      </div>
    </div>
  );
};

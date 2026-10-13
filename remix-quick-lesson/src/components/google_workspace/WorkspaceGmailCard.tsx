import React, { useState } from 'react';
import { Mail, Send, FileEdit, CheckCircle } from 'lucide-react';
import { createOrSendLessonEmail } from '../../services/google/gmailService';
import { LessonChunk } from '../../types';

interface WorkspaceGmailCardProps {
  lessonTitle: string;
  chunks: LessonChunk[];
  onRequestConfirm: (title: string, message: string, action: () => Promise<void>) => void;
}

export const WorkspaceGmailCard: React.FC<WorkspaceGmailCardProps> = ({
  lessonTitle,
  chunks,
  onRequestConfirm,
}) => {
  const [recipient, setRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  const defaultBody = `Dear Colleague / Students,\n\nHere is the overview for our upcoming lesson: "${lessonTitle}".\n\nLesson Progression:\n${chunks.map((c, i) => `${i + 1}. ${c.title} (${c.durationMinutes} mins) - Task: ${c.formativeTaskTitle || 'Classroom activity'}`).join('\n')}\n\nKind regards,\nClass Teacher`;

  const handleAction = (sendNow: boolean) => {
    if (!recipient.trim()) return;
    const actionName = sendNow ? 'Send Email via Gmail?' : 'Save Draft in Gmail?';
    const actionDesc = sendNow
      ? `This will send an email with the lesson breakdown to ${recipient} via your Gmail account.`
      : `This will create a new draft email for ${recipient} in your Gmail mailbox.`;

    onRequestConfirm(actionName, actionDesc, async () => {
      setIsSending(true);
      setSuccessStatus(null);
      try {
        await createOrSendLessonEmail(recipient.trim(), `Lesson Overview: ${lessonTitle}`, defaultBody, sendNow);
        setSuccessStatus(sendNow ? 'Email dispatched successfully via Gmail.' : 'Draft saved in your Gmail account.');
      } finally {
        setIsSending(false);
      }
    });
  };

  return (
    <div className="p-4 rounded-xl border border-[#2D2A26]/10 bg-white/70 space-y-3">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]/80 flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-red-600" />
          <span>Gmail Communication</span>
        </h4>
        <p className="text-[11px] text-[#2D2A26]/60">Email lesson overviews or homework briefings to students and colleagues.</p>
      </div>

      <div className="space-y-2">
        <input
          type="email"
          placeholder="Recipient email address (e.g. colleague@school.org.uk)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-3 py-1.5 text-xs bg-white border border-[#2D2A26]/20 rounded-lg text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none"
        />

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleAction(false)}
            disabled={isSending || !recipient.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2D2A26]/20 bg-white hover:bg-neutral-50 text-[#2D2A26] text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <FileEdit className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleAction(true)}
            disabled={isSending || !recipient.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </button>
        </div>

        {successStatus && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{successStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
};

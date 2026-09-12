import React from 'react';
import { LogOut, FolderKanban } from 'lucide-react';
import { GoogleUser } from '../../types/workspace';

interface GoogleAccountBadgeProps {
  user: GoogleUser;
  onOpenWorkspaceHub: () => void;
  onSignOut: () => void;
}

export const GoogleAccountBadge: React.FC<GoogleAccountBadgeProps> = ({
  user,
  onOpenWorkspaceHub,
  onSignOut,
}) => {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-[#2D2A26]/15 shadow-2xs">
      <button
        type="button"
        onClick={onOpenWorkspaceHub}
        className="flex items-center gap-2 hover:opacity-85 transition-opacity cursor-pointer text-left"
        title="Open Google Workspace Classroom Materials Hub"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Google Account'}
            className="w-5 h-5 rounded-full object-cover border border-neutral-200"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 text-[10px] font-bold flex items-center justify-center">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'G'}
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-[#2D2A26] leading-tight flex items-center gap-1">
            <FolderKanban className="w-3 h-3 text-[#D97706]" />
            <span>Workspace</span>
          </span>
          <span className="text-[9px] text-[#2D2A26]/60 leading-tight max-w-[100px] truncate">
            {user.displayName || user.email}
          </span>
        </div>
      </button>

      <div className="h-4 w-px bg-[#2D2A26]/15" />

      <button
        type="button"
        onClick={onSignOut}
        className="p-1 text-[#2D2A26]/50 hover:text-red-600 transition-colors cursor-pointer"
        title="Disconnect Google Account"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

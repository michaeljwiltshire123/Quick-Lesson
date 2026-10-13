import React from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { GoogleSignInButton, GoogleAccountBadge } from '../google_workspace';
import { GoogleUser } from '../../types/workspace';

interface HeaderActionButtonsProps {
  currentUser: GoogleUser | null;
  isSigningIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenWorkspaceHub: () => void;
  onWalkthrough?: () => void;
  onOpenRestart: () => void;
  hasRestart?: boolean;
}

export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  currentUser,
  isSigningIn,
  onSignIn,
  onSignOut,
  onOpenWorkspaceHub,
  onWalkthrough,
  onOpenRestart,
  hasRestart,
}) => (
  <div className="flex items-center flex-wrap gap-2.5">
    {currentUser ? (
      <GoogleAccountBadge user={currentUser} onOpenWorkspaceHub={onOpenWorkspaceHub} onSignOut={onSignOut} />
    ) : (
      <GoogleSignInButton onClick={onSignIn} isLoading={isSigningIn} />
    )}

    {onWalkthrough && (
      <button
        type="button"
        onClick={onWalkthrough}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 hover:bg-[#F59E0B]/25 text-[#2D2A26] border border-[#F59E0B]/30 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Walk me through</span>
      </button>
    )}

    {hasRestart && (
      <button
        type="button"
        onClick={onOpenRestart}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2D2A26]/20 bg-white/80 hover:bg-white text-xs font-semibold text-[#2D2A26] transition-all hover:border-[#2D2A26]/40 cursor-pointer shadow-2xs active:scale-98"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
        <span>Restart Lesson</span>
      </button>
    )}
  </div>
);

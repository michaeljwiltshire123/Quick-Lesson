import React from 'react';
import { CloudFog, Activity, AlertCircle } from 'lucide-react';

interface Props {
  isMadWorld?: boolean;
  isFogOfWar?: boolean;
  isStaticShock?: boolean;
  isShrinkShake?: boolean;
  children: React.ReactNode;
}

export const DisruptionScreenEffects: React.FC<Props> = ({
  isMadWorld,
  isFogOfWar,
  isStaticShock,
  isShrinkShake,
  children,
}) => {
  let disruptionClasses = 'transition-all duration-300 relative';

  if (isMadWorld) {
    disruptionClasses += ' transform scale-x-[-1]';
  }
  if (isStaticShock) {
    disruptionClasses += ' animate-pulse skew-x-1';
  }
  if (isShrinkShake) {
    disruptionClasses += ' scale-95 animate-bounce';
  }

  return (
    <div className="relative w-full">
      {/* Active Fog of War Overlay */}
      {isFogOfWar && (
        <div className="absolute inset-0 z-30 bg-slate-950/60 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-4 text-center pointer-events-none">
          <CloudFog className="w-10 h-10 text-amber-300 animate-pulse mb-1" />
          <span className="font-mono text-xs font-black text-amber-300 uppercase tracking-widest">
            Fog of War Active
          </span>
          <span className="text-[10px] text-gray-300">Question text is obscured by opponent curse</span>
        </div>
      )}

      {/* Mad World Notice */}
      {isMadWorld && (
        <div className="mb-2 p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold text-center flex items-center justify-center gap-1">
          <Activity className="w-3 h-3" />
          <span>Mad World: Controls and typography are mirrored!</span>
        </div>
      )}

      <div className={disruptionClasses}>{children}</div>
    </div>
  );
};

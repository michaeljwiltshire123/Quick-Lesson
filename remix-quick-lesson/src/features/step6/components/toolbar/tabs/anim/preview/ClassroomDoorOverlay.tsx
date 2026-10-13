import React from 'react';

interface ClassroomDoorOverlayProps {
  speed: number;
}

export const ClassroomDoorOverlay: React.FC<ClassroomDoorOverlayProps> = ({ speed }) => {
  const duration = Math.max(0.5, speed * 1.3);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-xl">
      <style>{`
        @keyframes swingDoorLeft {
          0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
          100% { transform: perspective(1000px) rotateY(-95deg); opacity: 0; }
        }
        @keyframes swingDoorRight {
          0% { transform: perspective(1000px) rotateY(0deg); opacity: 1; }
          100% { transform: perspective(1000px) rotateY(95deg); opacity: 0; }
        }
        @keyframes doorLightSpill {
          0% { opacity: 0; }
          40% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Volumetric light spill */}
      <div
        className="absolute inset-0 bg-radial from-amber-300/60 to-transparent pointer-events-none z-10"
        style={{ animation: `doorLightSpill ${duration}s ease-out forwards` }}
      />

      {/* Left Oak Door */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-amber-950 border-r border-amber-900 shadow-2xl z-20 origin-left"
        style={{ animation: `swingDoorLeft ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />

      {/* Right Oak Door */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-amber-950 border-l border-amber-900 shadow-2xl z-20 origin-right"
        style={{ animation: `swingDoorRight ${duration}s cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
      />
    </div>
  );
};

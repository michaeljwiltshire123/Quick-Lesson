import React from 'react';

interface ElementStudioTypewriterVectorProps {
  isText: boolean;
  motionPath: string;
  onMotionPathChange: (val: string) => void;
  typewriterSpeed: string;
  onTypewriterSpeedChange: (val: string) => void;
}

export const ElementStudioTypewriterVector: React.FC<ElementStudioTypewriterVectorProps> = ({
  isText, motionPath, onMotionPathChange, typewriterSpeed, onTypewriterSpeedChange,
}) => {
  return (
    <div className="space-y-1.5 pt-1 border-t border-amber-200/80">
      <div className="flex items-center justify-between">
        <label className="font-bold text-stone-700">Motion Vector:</label>
        <select
          value={motionPath} onChange={(e) => onMotionPathChange(e.target.value)}
          className="bg-white border border-stone-300 rounded-lg p-1 text-[10.5px] font-semibold"
        >
          <option value="none">Direct Straight</option>
          <option value="arc_float">Gentle Arc Float</option>
          <option value="diagonal_glide">Diagonal Glide</option>
          <option value="swoop_left">Swoop from Left</option>
        </select>
      </div>

      {isText && (
        <div className="flex items-center justify-between pt-1 border-t border-amber-100">
          <span className="font-bold text-stone-700">Typewriter Speed:</span>
          <select
            value={typewriterSpeed} onChange={(e) => onTypewriterSpeedChange(e.target.value)}
            className="bg-white border border-stone-300 rounded-lg p-1 text-[10px] font-semibold"
          >
            <option value="none">Standard Reveal</option>
            <option value="paced">Paced Reader (40 wpm)</option>
            <option value="natural">Natural Speech (80 wpm)</option>
            <option value="rapid">Rapid Text (140 wpm)</option>
          </select>
        </div>
      )}
    </div>
  );
};

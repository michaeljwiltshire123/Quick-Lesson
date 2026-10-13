import React, { useRef, useEffect } from 'react';

interface PromptTextBoxProps {
  promptText: string;
  onChangePrompt: (newText: string) => void;
}

export const PromptTextBox: React.FC<PromptTextBoxProps> = ({
  promptText,
  onChangePrompt,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [promptText]);

  return (
    <div className="space-y-1">
      <textarea
        ref={textareaRef}
        value={promptText}
        onChange={(e) => onChangePrompt(e.target.value)}
        rows={2}
        className="w-full bg-transparent border-0 text-[#2D2A26] text-sm leading-relaxed focus:outline-none focus:ring-0 p-0 resize-none font-medium placeholder-[#2D2A26]/40 overflow-hidden"
        placeholder="Enter discussion prompt..."
      />
    </div>
  );
};

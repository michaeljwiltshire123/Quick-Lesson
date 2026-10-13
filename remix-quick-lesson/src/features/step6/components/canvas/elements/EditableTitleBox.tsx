import React, { useLayoutEffect, useRef } from 'react';

interface EditableTitleBoxProps {
  title: string;
  onChange: (title: string) => void;
  isCover?: boolean;
}

export const EditableTitleBox: React.FC<EditableTitleBoxProps> = ({ title, onChange, isCover = false }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  }, [title]);

  return (
    <textarea ref={inputRef} rows={1} value={title} onChange={(e) => onChange(e.target.value)}
      aria-label="Slide Title" placeholder="Click to edit lesson title..."
      className={`w-full resize-none overflow-hidden whitespace-pre-wrap break-words ${isCover ? 'text-5xl md:text-6xl text-center' : 'text-xl md:text-2xl'} leading-snug font-extrabold bg-transparent focus:outline-none`}
      style={{ overflowWrap: 'anywhere', color: 'inherit' }} />
  );
};

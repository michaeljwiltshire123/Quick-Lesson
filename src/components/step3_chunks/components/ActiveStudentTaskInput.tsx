import React, { useState, useEffect } from 'react';

interface ActiveStudentTaskInputProps {
  value: string;
  onSave: (val: string) => void;
}

export const ActiveStudentTaskInput: React.FC<ActiveStudentTaskInputProps> = ({ value, onSave }) => {
  const [text, setText] = useState(value);

  useEffect(() => { setText(value); }, [value]);

  const handleBlur = () => {
    if (text !== value) onSave(text);
  };

  return (
    <div>
      <label className="block text-xs font-bold text-[#2D2A26] mb-1">Active Student Task</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        rows={2}
        placeholder="Describe what learners are doing during this step..."
        className="w-full text-xs bg-[#F8F6F0]/50 border border-[#2D2A26]/15 rounded-xl p-3 text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 leading-relaxed"
      />
    </div>
  );
};

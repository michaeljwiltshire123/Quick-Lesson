import React, { useState, useEffect } from 'react';
import { X, Gamepad2, Sparkles, School, QrCode, Presentation, Loader2 } from 'lucide-react';
import { LimerickItem } from './types';
import { listTeacherCourses } from '../../../../../services/google/googleClassroomService';
import { ClassroomCourse } from '../../../../../types/workspace';

interface Props {
  items: LimerickItem[];
  isOpen: boolean;
  onClose: () => void;
  onLaunchGame: (config: { classes: string[]; topic: string; title: string; mode: 'game' | 'qr' }) => void;
}

export const InteractiveSetupModal: React.FC<Props> = ({ items, isOpen, onClose, onLaunchGame }) => {
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [topic, setTopic] = useState('Short Task');
  const [title, setTitle] = useState('Interactive Rhyme Challenge');
  const [mode, setMode] = useState<'game' | 'qr'>('game');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      listTeacherCourses()
        .then(fetched => {
          setCourses(fetched);
          if (fetched.length > 0 && selectedClasses.length === 0) {
            setSelectedClasses([fetched[0].name]);
          }
        })
        .catch(err => {
          setError(err.message || 'Please sign in with Google to load your Google Classroom classes.');
          if (selectedClasses.length === 0) {
            setSelectedClasses(['Year 10 Science']);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleClass = (name: string) => {
    setSelectedClasses(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const demoClasses = ['Year 10 Science', 'Year 11 Biology', 'KS3 Science'];
  const displayClasses = courses.length > 0 ? courses.map(c => c.name) : demoClasses;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#2D2A26]/10 space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
          <h3 className="text-sm font-bold text-[#2D2A26] flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#D97706]" /> Setup Interactive Game ({items.length} verses)
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-black/5 text-[#2D2A26]/60 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-[#2D2A26]">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-[#2D2A26]/80 flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-emerald-600" /> Connected Google Classroom Classes
              </label>
              {loading && <Loader2 className="w-3 h-3 animate-spin text-[#D97706]" />}
            </div>
            {error && <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg mb-2">{error}</p>}
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1 bg-[#F8F6F0] rounded-xl border border-[#2D2A26]/10">
              {displayClasses.map(cls => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => toggleClass(cls)}
                  className={`px-3 py-1.5 rounded-lg font-semibold border cursor-pointer transition-all ${selectedClasses.includes(cls) ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-[#2D2A26]/70 border-[#2D2A26]/15 hover:bg-black/5'}`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1 text-[#2D2A26]/80">Slide Action Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('game')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${mode === 'game' ? 'bg-[#D97706] text-white border-[#B45309]' : 'bg-[#F8F6F0] text-[#2D2A26]/80 border-[#2D2A26]/15 hover:bg-black/5'}`}
              >
                <Presentation className="w-3.5 h-3.5" /> Add Game to Slides
              </button>
              <button
                type="button"
                onClick={() => setMode('qr')}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${mode === 'qr' ? 'bg-[#D97706] text-white border-[#B45309]' : 'bg-[#F8F6F0] text-[#2D2A26]/80 border-[#2D2A26]/15 hover:bg-black/5'}`}
              >
                <QrCode className="w-3.5 h-3.5" /> Add QR Code to Slides
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1 text-[#2D2A26]/80">Classroom Topic (Recommended)</label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/15 font-medium"
              placeholder="e.g. Short Task"
            />
          </div>

          <div>
            <label className="font-bold block mb-1 text-[#2D2A26]/80">Assignment Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#F8F6F0] border border-[#2D2A26]/15 font-medium"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#2D2A26]/10">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-[#2D2A26]/70 hover:bg-black/5 cursor-pointer">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onLaunchGame({ classes: selectedClasses, topic, title, mode })}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D97706] text-white hover:bg-[#B45309] shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Launch Game & Draft Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

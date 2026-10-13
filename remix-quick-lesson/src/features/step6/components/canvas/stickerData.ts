export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  tags: string[];
}

export const ALL_SEARCHABLE_STICKERS: StickerItem[] = [
  { id: 'stk-rocket', name: 'Rocket', emoji: '🚀', category: 'General', tags: ['launch', 'fast', 'space', 'start'] },
  { id: 'stk-star', name: 'Star', emoji: '⭐', category: 'General', tags: ['top', 'gold', 'rating', 'important'] },
  { id: 'stk-lightbulb', name: 'Lightbulb', emoji: '💡', category: 'General', tags: ['idea', 'concept', 'smart', 'insight'] },
  { id: 'stk-books', name: 'Books', emoji: '📚', category: 'Education', tags: ['reading', 'study', 'literature', 'library'] },
  { id: 'stk-atom', name: 'Atom', emoji: '⚛️', category: 'Science', tags: ['physics', 'chemistry', 'particle', 'stem'] },
  { id: 'stk-microscope', name: 'Microscope', emoji: '🔬', category: 'Science', tags: ['biology', 'lab', 'observe', 'stem'] },
  { id: 'stk-ruler', name: 'Ruler', emoji: '📐', category: 'Maths', tags: ['geometry', 'measure', 'triangle', 'maths'] },
  { id: 'stk-target', name: 'Target', emoji: '🎯', category: 'General', tags: ['aim', 'goal', 'objective', 'focus'] },
  { id: 'stk-fire', name: 'Fire', emoji: '🔥', category: 'General', tags: ['hot', 'trend', 'streak', 'energy'] },
  { id: 'stk-heart', name: 'Heart', emoji: '❤️', category: 'General', tags: ['love', 'care', 'health', 'favourite'] },
  { id: 'stk-check', name: 'Check', emoji: '✅', category: 'General', tags: ['done', 'correct', 'pass', 'success'] },
  { id: 'stk-warning', name: 'Warning', emoji: '⚠️', category: 'General', tags: ['caution', 'alert', 'error', 'trap'] },
  { id: 'stk-globe', name: 'Globe', emoji: '🌍', category: 'Humanities', tags: ['world', 'geography', 'earth', 'history'] },
  { id: 'stk-palette', name: 'Palette', emoji: '🎨', category: 'Arts', tags: ['art', 'design', 'drawing', 'colour'] },
  { id: 'stk-music', name: 'Music', emoji: '🎵', category: 'Arts', tags: ['audio', 'song', 'sound', 'melody'] },
  { id: 'stk-trophy', name: 'Trophy', emoji: '🏆', category: 'General', tags: ['winner', 'award', 'champion', 'achievement'] },
  { id: 'stk-clock', name: 'Clock', emoji: '⏰', category: 'General', tags: ['time', 'timer', 'deadline', 'minutes'] },
  { id: 'stk-puzzle', name: 'Puzzle', emoji: '🧩', category: 'General', tags: ['solve', 'logic', 'problem', 'piece'] },
  { id: 'stk-dna', name: 'DNA', emoji: '🧬', category: 'Science', tags: ['genetics', 'biology', 'cells', 'life'] },
  { id: 'stk-compass', name: 'Compass', emoji: '🧭', category: 'Humanities', tags: ['navigation', 'direction', 'explore', 'map'] },
  { id: 'stk-magnet', name: 'Magnet', emoji: '🧲', category: 'Science', tags: ['force', 'physics', 'attract', 'poles'] },
  { id: 'stk-tree', name: 'Tree', emoji: '🌳', category: 'Science', tags: ['nature', 'ecology', 'plants', 'environment'] },
  { id: 'stk-computer', name: 'Computer', emoji: '💻', category: 'Tech', tags: ['code', 'programming', 'digital', 'screen'] },
  { id: 'stk-robot', name: 'Robot', emoji: '🤖', category: 'Tech', tags: ['ai', 'future', 'automation', 'bot'] },
];

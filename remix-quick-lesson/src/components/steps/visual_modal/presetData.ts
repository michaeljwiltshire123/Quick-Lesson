export interface StylePreset {
  id: string;
  name: string;
  promptModifier: string;
  searchSuffix: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  { id: 'explainer', name: 'Explainer', promptModifier: 'Clean educational infographic vector diagram, clear labeled arrows, high contrast, crisp flow chart layout', searchSuffix: 'infographic diagram' },
  { id: 'metaphor', name: 'Metaphor', promptModifier: 'Conceptual visual metaphor illustration, clever visual analogy cartoon, clear symbolic representation', searchSuffix: 'visual metaphor illustration' },
  { id: 'satire', name: 'Satire/Spoof', promptModifier: 'Humorous satirical cartoon illustration, witty editorial spoof sketch, expressive characters', searchSuffix: 'satirical educational cartoon' },
  { id: 'comic', name: 'Comic', promptModifier: '3-panel comic strip storyboard layout, ink outlines, speech bubbles, vintage halftone print dots', searchSuffix: 'educational comic strip' },
  { id: 'doodle', name: 'Doodle', promptModifier: 'Hand-drawn whiteboard marker sketch, clean doodle style, clear handwritten labels on white background', searchSuffix: 'whiteboard doodle sketch' },
  { id: 'meme', name: 'Meme', promptModifier: 'Relatable educational meme format, witty text placement, expressive facial reaction', searchSuffix: 'funny educational meme' },
  { id: 'historic', name: 'Historic', promptModifier: 'Authentic historical photograph archival style, vintage texture, realistic period detail', searchSuffix: 'historical photograph archival' },
  { id: 'realistic', name: 'Realistic', promptModifier: 'Crisp high resolution photograph, natural lighting, realistic detailed scene', searchSuffix: 'photograph realistic high resolution' },
];

export const PROMPT_OPTIONS = {
  subjects: ['Teacher at whiteboard', 'Pupil conducting experiment', 'Historical figure in context', 'Cross-section diagram', 'Step-by-step flowchart', 'Classroom scenario'],
  styles: ['Vector Infographic', 'Whiteboard Doodle', '3D Stylised Render', 'Editorial Cartoon', 'Vintage Lithograph', 'Flat Design Illustration'],
  actions: ['Explaining key concept', 'Comparing two scenarios', 'Demonstrating cause and effect', 'Highlighting common misconception', 'Solving step-by-step'],
  lighting: ['Bright Classroom Lighting', 'High Contrast Studio', 'Soft Natural Daylight', 'Focused Spotlight', 'Clean Flat Lighting'],
  moods: ['Clear & Educational', 'Engaging & Humorous', 'Thought-Provoking', 'Energetic & Dynamic', 'Calm & Structured'],
  palettes: ['UK Curriculum Warm Neutral', 'Vibrant Primary Colours', 'High-Contrast Pastel', 'Monochrome & Accent Amber', 'Earthy Tones'],
  compositions: ['Centered Focal Subject', 'Split Screen Comparison', 'Isometric 3D View', 'Horizontal Sequence Timeline', 'Close-Up Detail'],
  technical: ['Vector Graphic', 'Clean White Background', 'Crisp Line Art', '4K High Resolution', 'Bold Typography'],
  negatives: ['blurry, deformed, watermarks', 'low quality graphics', 'text clutter', 'distorted faces', 'unreadable labels'],
};

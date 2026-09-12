export interface PopCultureScene {
  id: string;
  tone?: 'funny' | 'serious' | 'analytical';
  sceneTitle: string;
  movieOrShow: string;
  category?: string;
  whyItWorks?: string;
  conceptConnection?: string;
  startTime?: string;
  endTime?: string;
  pauseCue?: string;
  searchPhrase?: string;
  youtubeId?: string;
}

export const POP_CULTURE_CATEGORIES = [
  'Movie', 'Documentary', 'Comedy', 'Cartoon', 'Reality', 'Behind the Scenes',
] as const;

export type PopCultureCategory = typeof POP_CULTURE_CATEGORIES[number];

export const VIDEO_ARCHETYPES = [
  { label: 'Sitcom Spoof', modifier: 'funny misunderstanding sitcom clip under 3 minutes' },
  { label: 'Mental Model', modifier: 'visual mental model animated clip under 3 minutes' },
  { label: 'Debate Spark', modifier: 'controversial debate dilemma clip under 3 minutes' },
  { label: 'Spot the Mistake', modifier: 'misconception failed attempt demo under 3 minutes' },
  { label: 'Silent Dub', modifier: 'silent process demonstration under 3 minutes' },
  { label: 'Jigsaw Expert', modifier: 'expert deep dive short clip under 3 minutes' },
  { label: 'Mini-Lecture', modifier: 'concise 2 minute concept masterclass under 3 minutes' },
  { label: 'Narrative Arc', modifier: 'dramatic turning point story clip under 3 minutes' },
];

export interface AiVideoPlatform {
  name: string;
  url: string;
  desc: string;
  freeTier: string;
}

export const AI_VIDEO_PLATFORMS: AiVideoPlatform[] = [
  { name: 'Google VideoFX', url: 'https://aitestkitchen.withgoogle.com/tools/video-fx', desc: 'Google cinematic lab', freeTier: '100% Free' },
  { name: 'Hailuo AI (MiniMax)', url: 'https://hailuoai.video/', desc: 'High-fidelity motion', freeTier: '3 free per day' },
  { name: 'Kling AI', url: 'https://klingai.com/', desc: 'High motion realism', freeTier: '6 free per day' },
  { name: 'Luma Dream Machine', url: 'https://lumalabs.ai/dream-machine', desc: 'Cinematic camera', freeTier: '30 free per month' },
  { name: 'Tencent Hunyuan', url: 'https://hunyuan.tencent.com/', desc: 'Open video engine', freeTier: 'Free daily points' },
  { name: 'Vidu AI', url: 'https://www.vidu.studio/', desc: 'Ultra-fast clips', freeTier: '4 free per month' },
];

export const FALLBACK_POP_SCENES: Record<string, PopCultureScene[]> = {
  Movie: [
    { id: 'm1', tone: 'serious', sceneTitle: 'System Critical Point', movieOrShow: 'Apollo 13', conceptConnection: 'Illustrates high-stakes problem solving under strict constraints.', startTime: '01:10', endTime: '02:05', pauseCue: 'Pause at 01:40: Ask class what resource is depleting first.', searchPhrase: 'Apollo 13 square peg in a round hole clip', youtubeId: 'v_C9v4R7l1I' },
    { id: 'm2', tone: 'analytical', sceneTitle: 'The Chain Reaction', movieOrShow: 'Oppenheimer', conceptConnection: 'Visualises sequential compounding impact and catalysts.', startTime: '00:45', endTime: '01:30', pauseCue: 'Pause at 01:15: Which element triggers the secondary cascade?', searchPhrase: 'Oppenheimer chain reaction calculation scene', youtubeId: 'uYPbbksJxIg' },
  ],
  Documentary: [
    { id: 'd1', tone: 'analytical', sceneTitle: 'Structural Load Failure', movieOrShow: 'BBC Horizon', conceptConnection: 'Shows genuine empirical test evidence in controlled conditions.', startTime: '02:15', endTime: '03:10', pauseCue: 'Pause at 02:50: Prompt pupils to identify the shear fracture.', searchPhrase: 'Tacoma Narrows bridge collapse original footage', youtubeId: 'j-zczJXSxnw' },
  ],
  Comedy: [
    { id: 'c1', tone: 'funny', sceneTitle: 'Communication Breakdown', movieOrShow: 'The Office', conceptConnection: 'A hilarious demonstration of misinterpreting foundational rules.', startTime: '00:20', endTime: '01:15', pauseCue: 'Pause at 00:55: Where did the assumption diverge from reality?', searchPhrase: 'The Office fire drill stress test clip', youtubeId: 'gO8N3L_aERg' },
  ],
  Cartoon: [
    { id: 'k1', tone: 'funny', sceneTitle: 'Newtonian Physics Fail', movieOrShow: 'Wile E. Coyote', conceptConnection: 'Comedic exaggeration of gravity, momentum, and friction.', startTime: '00:15', endTime: '01:00', pauseCue: 'Pause at 00:40: Which law of motion was just violated?', searchPhrase: 'Wile E Coyote gravity anvil cartoon physics clip', youtubeId: 'g458w4y9_GQ' },
  ],
  Reality: [
    { id: 'r1', tone: 'serious', sceneTitle: 'Stress Test Pitfall', movieOrShow: 'Great British Bake Off', conceptConnection: 'Shows how minute temperature or timing shifts alter results.', startTime: '01:05', endTime: '01:55', pauseCue: 'Pause at 01:30: What diagnostic sign signaled the collapse?', searchPhrase: 'Bake Off souffle collapse diagnostic clip', youtubeId: 'dQw4w9WgXcQ' },
  ],
  'Behind the Scenes': [
    { id: 'b1', tone: 'analytical', sceneTitle: 'Precision Engineering Setup', movieOrShow: 'NASA Cleanroom Archive', conceptConnection: 'Showcases rigorous industry-grade calibration protocols.', startTime: '00:50', endTime: '01:45', pauseCue: 'Pause at 01:20: Notice the redundancy safeguards in place.', searchPhrase: 'James Webb space telescope cleanroom deployment clip', youtubeId: '4P8fxJrDcOG' },
  ],
};

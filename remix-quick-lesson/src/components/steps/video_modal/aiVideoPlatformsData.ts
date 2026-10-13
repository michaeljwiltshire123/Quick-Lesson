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

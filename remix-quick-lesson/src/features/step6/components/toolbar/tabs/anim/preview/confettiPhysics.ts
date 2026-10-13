export interface ConfettiParticle {
  id: number;
  shape: 'strip' | 'square' | 'disc' | 'diamond' | 'star' | 'streamer';
  color: string;
  source: 'left' | 'right' | 'center';
  tx: number;
  tyPeak: number;
  fall: number;
  sway: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  duration: number;
  delay: number;
  sizeW: number;
  sizeH: number;
}

const CELEBRATION_COLOURS = [
  '#F59E0B', '#EF4444', '#10B981', '#06B6D4',
  '#8B5CF6', '#EC4899', '#FCD34D', '#3B82F6',
  '#FFFFFF', '#FB923C', '#E11D48', '#14B8A6',
  '#A855F7', '#6366F1', '#F43F5E', '#38BDF8',
];

export function generateConfettiParticles(count = 160): ConfettiParticle[] {
  const particles: ConfettiParticle[] = [];
  const shapes: ConfettiParticle['shape'][] = ['strip', 'square', 'disc', 'diamond', 'star', 'streamer'];

  for (let i = 0; i < count; i++) {
    const source: ConfettiParticle['source'] = i % 5 === 0 ? 'center' : i % 2 === 0 ? 'left' : 'right';
    const shape = shapes[i % shapes.length];
    const color = CELEBRATION_COLOURS[i % CELEBRATION_COLOURS.length];

    let tx = 0;
    if (source === 'left') {
      tx = 80 + Math.random() * 420;
    } else if (source === 'right') {
      tx = -(80 + Math.random() * 420);
    } else {
      tx = (Math.random() - 0.5) * 500;
    }

    const tyPeak = -(220 + Math.random() * 280);
    const fall = 200 + Math.random() * 260;
    const sway = (Math.random() - 0.5) * 140;
    const rotX = Math.random() * 1440 - 720;
    const rotY = Math.random() * 1440 - 720;
    const rotZ = Math.random() * 720 - 360;
    const delay = Math.random() * 0.32;
    const duration = 1.4 + Math.random() * 0.7;

    const isStreamer = shape === 'streamer';
    const isStrip = shape === 'strip';
    const sizeW = isStreamer ? 4 : isStrip ? 5 : shape === 'square' ? 9 : 8;
    const sizeH = isStreamer ? 28 : isStrip ? 16 : shape === 'square' ? 9 : 8;

    particles.push({
      id: i, shape, color, source, tx, tyPeak,
      fall, sway, rotX, rotY, rotZ, duration, delay, sizeW, sizeH,
    });
  }
  return particles;
}

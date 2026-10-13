export type TimerMode = 'duration' | 'targetDate';
export type ClockFormat = 'digital' | 'analogue';

export type DigitalStyle = 'neon' | 'radial' | 'horizon' | 'flip';
export type AnalogueStyle = 'wall' | 'iris' | 'stopwatch' | 'hourglass';

export type ChimeSound = 'marimba' | 'zen' | 'schoolBell' | 'digital' | 'silent';

export interface TimerMetaConfig {
  isTimer?: boolean;
  timerMode?: TimerMode;
  clockFormat?: ClockFormat;
  digitalStyle?: DigitalStyle;
  analogueStyle?: AnalogueStyle;
  durationMinutes?: number;
  durationSeconds?: number;
  targetDateTime?: string; // ISO string
  chimeSound?: ChimeSound;
  enableFiveSecCountdown?: boolean;
  trafficLightColor?: boolean;
}

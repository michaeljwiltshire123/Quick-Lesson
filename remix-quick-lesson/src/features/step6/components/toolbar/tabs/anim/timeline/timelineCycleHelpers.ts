export const TRIGGER_CYCLE_ORDER = ['onClick', 'withPrevious', 'afterPrevious'] as const;

export type TriggerMode = (typeof TRIGGER_CYCLE_ORDER)[number];

export const DURATION_CYCLE_PRESETS = [0.4, 0.8, 1.4, 2.0] as const;

export function cycleTrigger(current?: string): string {
  if (current === 'withPrevious') return 'afterPrevious';
  if (current === 'afterPrevious') return 'onClick';
  return 'withPrevious';
}

export function getTriggerCycleInfo(trigger?: string): {
  label: string;
  symbol: string;
  tooltip: string;
} {
  if (trigger === 'withPrevious') {
    return {
      label: 'With Prev',
      symbol: '⚡',
      tooltip: 'Trigger: With Previous. Click to switch to After Previous',
    };
  }
  if (trigger === 'afterPrevious') {
    return {
      label: 'After Prev',
      symbol: '⏱',
      tooltip: 'Trigger: After Previous. Click to switch to On Click',
    };
  }
  return {
    label: 'On Click',
    symbol: '👆',
    tooltip: 'Trigger: On Click. Click to switch to With Previous',
  };
}

export function cycleDuration(current?: number): number {
  const cur = current ?? 0.8;
  if (cur < 0.6) return 0.8;
  if (cur < 1.1) return 1.4;
  if (cur < 1.7) return 2.0;
  return 0.4;
}

export function getDurationCycleInfo(duration?: number): {
  label: string;
  tooltip: string;
} {
  const d = duration ?? 0.8;
  return {
    label: `${d.toFixed(1)}s`,
    tooltip: `Speed: ${d.toFixed(1)}s. Click to cycle: 0.4s → 0.8s → 1.4s → 2.0s`,
  };
}

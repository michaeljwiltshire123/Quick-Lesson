import { useSyncExternalStore } from 'react';

interface MotionPlaybackState {
  isPlaying: boolean;
  step: number;
  maxStep: number;
  autoAdvanceAfterStep: Record<number, number>;
  hoveredElementId: string | null;
}

let currentState: MotionPlaybackState = {
  isPlaying: false,
  step: 0,
  maxStep: 1,
  autoAdvanceAfterStep: {},
  hoveredElementId: null,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function startMotionPlayback(maxStep: number = 1, autoAdvanceAfterStep: Record<number, number> = {}) {
  currentState = {
    ...currentState,
    isPlaying: true,
    step: 0,
    maxStep: Math.max(1, maxStep),
    autoAdvanceAfterStep,
  };
  notify();
}

export function stopMotionPlayback() {
  currentState = {
    ...currentState,
    isPlaying: false,
    step: 0,
    maxStep: 1,
    autoAdvanceAfterStep: {},
  };
  notify();
}

export function advanceMotionStep() {
  if (!currentState.isPlaying) return;
  currentState = {
    ...currentState,
    step: currentState.step + 1,
  };
  notify();
}

export function setHoveredMotionElementId(id: string | null) {
  if (currentState.hoveredElementId === id) return;
  currentState = {
    ...currentState,
    hoveredElementId: id,
  };
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): MotionPlaybackState {
  return currentState;
}

export function useMotionPlayback() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return {
    isPlaying: state.isPlaying,
    step: state.step,
    maxStep: state.maxStep,
    autoAdvanceAfterStep: state.autoAdvanceAfterStep,
    hoveredElementId: state.hoveredElementId,
    startPlayback: startMotionPlayback,
    stopPlayback: stopMotionPlayback,
    advanceStep: advanceMotionStep,
    setHoveredElementId: setHoveredMotionElementId,
  };
}

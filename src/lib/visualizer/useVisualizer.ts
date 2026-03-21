"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { AlgorithmPlugin, VisualizerStep } from "./types";

export type VisualizerControls = {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  annotation: string;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  scrubTo: (index: number) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
};

export function useVisualizer<S, I extends Record<string, unknown>>(
  plugin: AlgorithmPlugin<S, I>,
  input: I,
): { controls: VisualizerControls; currentStep: VisualizerStep<S> } {
  const [steps, setSteps] = useState<VisualizerStep<S>[]>(() =>
    plugin.getSteps(input),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Serialise input to detect actual value changes without triggering on every render
  const inputKey = JSON.stringify(input);

  useEffect(() => {
    const parsed: I = JSON.parse(inputKey);
    setSteps(plugin.getSteps(parsed));
    setStepIndex(0);
    setIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputKey, plugin]);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setStepIndex((idx) => {
        if (idx >= steps.length - 1) {
          setIsPlaying(false);
          return idx;
        }
        return idx + 1;
      });
    }, 1000 / speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const play = useCallback(() => {
    setStepIndex((idx) => (idx >= steps.length - 1 ? 0 : idx));
    setIsPlaying(true);
  }, [steps.length]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((idx) => Math.min(idx + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((idx) => Math.max(idx - 1, 0));
  }, []);

  const scrubTo = useCallback(
    (index: number) => {
      setIsPlaying(false);
      setStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
    },
    [steps.length],
  );

  const reset = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(0);
  }, []);

  return {
    controls: {
      stepIndex,
      totalSteps: steps.length,
      isPlaying,
      speed,
      annotation: steps[stepIndex]?.annotation ?? "",
      play,
      pause,
      stepForward,
      stepBackward,
      scrubTo,
      setSpeed,
      reset,
    },
    currentStep: steps[stepIndex],
  };
}

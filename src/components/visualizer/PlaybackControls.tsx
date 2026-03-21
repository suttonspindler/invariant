"use client";

import type { VisualizerControls } from "@/lib/visualizer/useVisualizer";

const SPEEDS = [0.5, 1, 2, 4] as const;

type Props = { controls: VisualizerControls };

export default function PlaybackControls({ controls }: Props) {
  const {
    stepIndex,
    totalSteps,
    isPlaying,
    speed,
    play,
    pause,
    stepForward,
    stepBackward,
    scrubTo,
    setSpeed,
    reset,
  } = controls;

  const atStart = stepIndex === 0;
  const atEnd = stepIndex === totalSteps - 1;

  const btnBase =
    "flex h-8 w-8 items-center justify-center rounded border border-zinc-700 font-mono text-sm text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="flex flex-col gap-3" role="group" aria-label="Playback controls">
      {/* Scrub slider */}
      <div className="flex items-center gap-3">
        <span className="w-8 text-right font-mono text-[11px] tabular-nums text-zinc-600">
          {stepIndex}
        </span>
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={stepIndex}
          onChange={(e) => scrubTo(Number(e.target.value))}
          className="flex-1 accent-blue-400 cursor-pointer"
          aria-label="Step timeline"
          aria-valuemin={0}
          aria-valuemax={totalSteps - 1}
          aria-valuenow={stepIndex}
        />
        <span className="w-8 font-mono text-[11px] tabular-nums text-zinc-600">
          {totalSteps - 1}
        </span>
      </div>

      {/* Buttons + speed */}
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={reset} aria-label="Reset to start" className={btnBase} disabled={atStart}>
          ⏮
        </button>
        <button onClick={stepBackward} aria-label="Step backward" className={btnBase} disabled={atStart}>
          ←
        </button>
        <button
          onClick={isPlaying ? pause : play}
          aria-label={isPlaying ? "Pause" : "Play"}
          className={`${btnBase} w-10 border-zinc-600 text-zinc-200 hover:border-blue-400 hover:text-blue-400`}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={stepForward} aria-label="Step forward" className={btnBase} disabled={atEnd}>
          →
        </button>

        {/* Speed selector */}
        <div className="ml-auto flex items-center gap-2">
          <span className="font-mono text-[11px] text-zinc-600">speed</span>
          <div className="flex gap-1" role="group" aria-label="Playback speed">
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                aria-pressed={speed === s}
                className={`h-7 rounded px-2 font-mono text-[11px] transition-colors border ${
                  speed === s
                    ? "border-blue-400/50 bg-blue-400/10 text-blue-400"
                    : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

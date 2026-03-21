"use client";

import { useState } from "react";
import type { AnyPlugin } from "@/lib/visualizer/types";
import { useVisualizer } from "@/lib/visualizer/useVisualizer";
import PlaybackControls from "./PlaybackControls";

type Props = { plugin: AnyPlugin };

export default function Visualizer({ plugin }: Props) {
  const [input, setInput] = useState<Record<string, unknown>>(
    plugin.defaultInput,
  );
  const { controls, currentStep } = useVisualizer(plugin, input);

  function handleInputChange(id: string, raw: string, type: "number" | "text") {
    const value = type === "number" ? Number(raw) : raw;
    setInput((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="rounded-sm border border-zinc-800 bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="font-mono text-sm font-bold text-zinc-200">
          {plugin.name}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          {plugin.description}
        </p>
      </div>

      {/* Input Panel */}
      <div className="flex flex-wrap items-center gap-6 border-b border-zinc-800 px-6 py-3">
        {plugin.inputSchema.map((field) => (
          <label
            key={field.id}
            className="flex items-center gap-2 font-mono text-[11px] text-zinc-500"
          >
            <span className="text-zinc-400">{field.label}</span>
            <input
              type={field.type}
              min={field.type === "number" ? field.min : undefined}
              max={field.type === "number" ? field.max : undefined}
              maxLength={field.type === "text" ? 8 : undefined}
              value={String(input[field.id] ?? field.defaultValue)}
              onChange={(e) =>
                handleInputChange(field.id, e.target.value, field.type)
              }
              className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 font-mono text-xs text-zinc-200 focus:border-blue-400 focus:outline-none w-28"
            />
          </label>
        ))}
      </div>

      {/* Visualisation area */}
      <div className="min-h-40 px-6 py-6" aria-live="polite" aria-atomic="true">
        {currentStep && plugin.renderState(currentStep)}
      </div>

      {/* Annotation bar */}
      <div className="flex min-h-10 items-center gap-3 border-t border-zinc-800 px-6 py-2">
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-zinc-600">
          {controls.stepIndex + 1} / {controls.totalSteps}
        </span>
        <span className="h-3 w-px bg-zinc-800 shrink-0" aria-hidden="true" />
        <p className="font-mono text-[11px] text-zinc-400">
          {controls.annotation}
        </p>
      </div>

      {/* Playback Controls */}
      <div className="border-t border-zinc-800 px-6 py-4">
        <PlaybackControls controls={controls} />
      </div>
    </div>
  );
}

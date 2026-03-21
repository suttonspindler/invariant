"use client";

import { useState } from "react";
import Visualizer from "@/components/visualizer/Visualizer";
import { algorithmRegistry } from "@/lib/algorithms/registry";

export default function LabClient() {
  const [activeId, setActiveId] = useState(algorithmRegistry[0].id);
  const activePlugin = algorithmRegistry.find((p) => p.id === activeId)!;

  return (
    <div>
      {/* Algorithm selector tabs */}
      <div
        className="mb-8 flex gap-1 border-b border-zinc-800"
        role="tablist"
        aria-label="Algorithm selector"
      >
        {algorithmRegistry.map((plugin) => {
          const isActive = plugin.id === activeId;
          return (
            <button
              key={plugin.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${plugin.id}`}
              id={`tab-${plugin.id}`}
              onClick={() => setActiveId(plugin.id)}
              className={`-mb-px border-b-2 px-4 pb-3 pt-1 font-mono text-xs tracking-wide transition-colors ${
                isActive
                  ? "border-blue-400 text-blue-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {plugin.name}
            </button>
          );
        })}
      </div>

      {/* Active visualizer */}
      <div
        role="tabpanel"
        id={`panel-${activeId}`}
        aria-labelledby={`tab-${activeId}`}
      >
        <Visualizer plugin={activePlugin} key={activeId} />
      </div>

      {/* Engine note */}
      <p className="mt-6 font-mono text-[11px] text-zinc-700">
        Visualization engine v0.1 — plugin interface:{" "}
        <code className="text-zinc-600">getSteps(input)</code>,{" "}
        <code className="text-zinc-600">renderState(step)</code>
      </p>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Interactive Lab",
  description:
    "Scrubbable, step-by-step algorithm visualizations. Dynamic Programming, sorting, and graph algorithms — interactive, not static.",
};

export default function LabPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section aria-labelledby="lab-heading">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-blue-400 uppercase">
          Interactive Visualizations
        </p>
        <h1
          id="lab-heading"
          className="mb-6 font-mono text-4xl font-bold tracking-tight text-zinc-50"
        >
          The Interactive Lab
        </h1>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-zinc-400">
          Step through algorithm execution one frame at a time. Play, pause,
          scrub, and change inputs. Every step is annotated — you will never
          wonder what just happened or why.
        </p>

        <div className="h-px w-full bg-zinc-800 mb-16" aria-hidden="true" />

        {/* Coming soon placeholder */}
        <div className="flex flex-col items-center justify-center rounded-sm border border-zinc-800 py-32 text-center">
          <p className="font-mono text-4xl text-zinc-700 mb-6" aria-hidden="true">∫</p>
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase mb-3">
            Coming in Phase 2
          </p>
          <p className="text-sm text-zinc-500 max-w-sm">
            The visualization engine is under construction. First up: Fibonacci
            memoization and 0/1 Knapsack.
          </p>
        </div>
      </section>
    </div>
  );
}

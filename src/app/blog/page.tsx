import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Ledger",
  description:
    "Essays on Big O complexity, system design, and what it means to be a developer when AI writes the code.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section aria-labelledby="blog-heading">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-blue-400 uppercase">
          Writing
        </p>
        <h1
          id="blog-heading"
          className="mb-6 font-mono text-4xl font-bold tracking-tight text-zinc-50"
        >
          The Ledger
        </h1>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-zinc-400">
          Essays on the fundamentals that AI cannot replace — complexity
          analysis, system design, algorithmic thinking, and what it actually
          means to understand computation in 2026.
        </p>

        <div className="h-px w-full bg-zinc-800 mb-16" aria-hidden="true" />

        {/* Coming soon placeholder */}
        <div className="flex flex-col items-center justify-center rounded-sm border border-zinc-800 py-32 text-center">
          <p className="font-mono text-4xl text-zinc-700 mb-6" aria-hidden="true">Δ</p>
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase mb-3">
            Coming in Phase 3
          </p>
          <p className="text-sm text-zinc-500 max-w-sm">
            First posts in progress: a site manifesto and a DP explainer with
            an embedded interactive visualization.
          </p>
        </div>
      </section>
    </div>
  );
}

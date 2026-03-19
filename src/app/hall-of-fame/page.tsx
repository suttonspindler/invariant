import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall of Fame",
  description:
    "A chronological museum of CS pioneers — from Ada Lovelace's first algorithm to the architects of the modern internet.",
};

export default function HallOfFamePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <section aria-labelledby="hof-heading">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-blue-400 uppercase">
          CS Pioneers
        </p>
        <h1
          id="hof-heading"
          className="mb-6 font-mono text-4xl font-bold tracking-tight text-zinc-50"
        >
          Hall of Fame
        </h1>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-zinc-400">
          The people who built the intellectual foundations of Computer Science.
          Listed chronologically — oldest first — because understanding where
          ideas came from changes how you use them.
        </p>

        <div className="h-px w-full bg-zinc-800 mb-16" aria-hidden="true" />

        {/* Coming soon placeholder */}
        <div className="flex flex-col items-center justify-center rounded-sm border border-zinc-800 py-32 text-center">
          <p className="font-mono text-4xl text-zinc-700 mb-6" aria-hidden="true">∞</p>
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase mb-3">
            Coming in Phase 3
          </p>
          <p className="text-sm text-zinc-500 max-w-sm">
            Pioneer profiles are being assembled. The roster will span from Ada
            Lovelace (1815) to Tim Berners-Lee and beyond.
          </p>
        </div>
      </section>
    </div>
  );
}

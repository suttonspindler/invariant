import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invariant — Interactive Computer Science Education",
};

const pillars = [
  {
    href: "/lab",
    symbol: "∫",
    label: "The Interactive Lab",
    tagline: "Step through algorithms in real time.",
    description:
      "Scrubbable, interactive visualizations of Dynamic Programming, sorting, and graph algorithms. Not a GIF — a working engine you control.",
  },
  {
    href: "/hall-of-fame",
    symbol: "∞",
    label: "Hall of Fame",
    tagline: "The shoulders we stand on.",
    description:
      "A chronological museum of CS pioneers — from Ada Lovelace's first algorithm to the architects of the modern internet.",
  },
  {
    href: "/blog",
    symbol: "Δ",
    label: "The Ledger",
    tagline: "Writing on what endures.",
    description:
      "Essays on Big O complexity, system design, and what it means to be a developer in an era when AI writes the code but cannot reason about it.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      {/* Hero */}
      <section className="mb-24 max-w-3xl" aria-labelledby="hero-heading">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-blue-400 uppercase">
          Computer Science Education
        </p>
        <h1
          id="hero-heading"
          className="mb-6 font-mono text-5xl font-bold tracking-tight text-zinc-50 sm:text-6xl"
        >
          INVARIANT
        </h1>
        <p className="mb-8 text-xl leading-relaxed text-zinc-300">
          A free, interactive resource for learning Computer Science fundamentals.
        </p>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          Interactive algorithm visualizations, profiles of the pioneers who
          built the field, and writing on the concepts that underpin modern
          software.
        </p>
        <p className="mt-6">
          <Link
            href="/about"
            className="font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-400"
          >
            Why this exists →
          </Link>
        </p>
      </section>

      {/* Divider */}
      <div className="mb-16 h-px w-full bg-zinc-800" aria-hidden="true" />

      {/* Three Pillars */}
      <section aria-labelledby="pillars-heading">
        <h2
          id="pillars-heading"
          className="mb-12 font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase"
        >
          Three Pillars
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ href, symbol, label, tagline, description }) => (
            <Link
              key={href}
              href={href}
              className="group block rounded-sm border border-zinc-800 p-8 transition-colors hover:border-blue-500/50 hover:bg-zinc-900/50"
            >
              <div
                className="mb-6 font-mono text-4xl text-zinc-700 transition-colors group-hover:text-blue-500/70"
                aria-hidden="true"
              >
                {symbol}
              </div>
              <h3 className="mb-1 text-base font-semibold text-zinc-50">
                {label}
              </h3>
              <p className="mb-4 font-mono text-xs text-blue-400/80">
                {tagline}
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                {description}
              </p>
              <p className="mt-6 font-mono text-xs text-zinc-600 transition-colors group-hover:text-zinc-400">
                Explore →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

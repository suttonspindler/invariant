import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Invariant exists: on the name, the thesis, and the gap between writing code and understanding computation.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="mb-4 font-mono text-xs tracking-[0.25em] text-blue-400 uppercase">About</p>
      <h1 className="mb-12 font-mono text-4xl font-bold tracking-tight text-zinc-50">Why Invariant Exists</h1>

      <div className="space-y-6 text-base leading-relaxed text-zinc-400">
        <p>
          In mathematics, an <em className="text-zinc-300">invariant</em> is a property that holds true regardless of
          the transformations applied to a system. A loop invariant holds before and after every iteration. A class
          invariant holds before and after every method call. The concept is load-bearing: it is how you reason about
          correctness when everything else is changing.
        </p>

        <p>
          This site is named after that idea. The thesis is that certain principles of Computer Science work the same
          way, they are true regardless of how the tools around them change. Big O complexity does not care what
          language you write in. The tradeoffs in system design do not change because an AI generated the code. The
          reason a recursive solution hits a stack limit is the same in 2026 as it was in 1986.
        </p>

        <p>
          AI code-generation tools have made it easier than ever to produce working software without deeply
          understanding it. That is mostly a good thing. But it widens the gap between writing code and understanding
          computation, and that gap has always mattered for anyone who wants to build systems that are correct,
          efficient, and maintainable.
        </p>

        <p>
          Invariant is a resource for closing that gap. It is built by a single developer, for the self-taught and the
          curious, people who can already write code and want to understand the theory behind it.
        </p>
      </div>

      <div className="mt-16 border-t border-zinc-800 pt-8">
        <Link href="/" className="font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-400">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

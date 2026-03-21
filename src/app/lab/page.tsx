import type { Metadata } from "next";
import LabClient from "./LabClient";

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

        <LabClient />
      </section>
    </div>
  );
}

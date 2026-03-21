import type { AlgorithmPlugin, VisualizerStep } from "@/lib/visualizer/types";

export type FibState = {
  n: number;
  memo: (number | null)[];
  activeCell: number;
  referencedCells: number[];
};

type FibInput = { n: number };

function getSteps({ n }: FibInput): VisualizerStep<FibState>[] {
  const clampedN = Math.max(0, Math.min(n, 20));
  const memo: (number | null)[] = Array(clampedN + 1).fill(null);
  const steps: VisualizerStep<FibState>[] = [];

  const snap = (
    activeCell: number,
    referencedCells: number[],
    annotation: string,
  ) =>
    steps.push({
      state: { n: clampedN, memo: [...memo], activeCell, referencedCells },
      annotation,
    });

  snap(-1, [], `Computing Fibonacci(${clampedN}). Table initialised — all cells empty.`);

  if (clampedN >= 0) {
    memo[0] = 0;
    snap(0, [], "Base case: fib(0) = 0");
  }
  if (clampedN >= 1) {
    memo[1] = 1;
    snap(1, [], "Base case: fib(1) = 1");
  }

  for (let i = 2; i <= clampedN; i++) {
    snap(
      i,
      [i - 1, i - 2],
      `fib(${i}) = fib(${i - 1}) + fib(${i - 2}) = ${memo[i - 1]} + ${memo[i - 2]}`,
    );
    memo[i] = memo[i - 1]! + memo[i - 2]!;
    snap(i, [], `fib(${i}) = ${memo[i]}  ✓`);
  }

  snap(
    clampedN,
    [],
    `Done. fib(${clampedN}) = ${memo[clampedN] ?? 0}`,
  );

  return steps;
}

function renderState({ state }: VisualizerStep<FibState>) {
  const { memo, activeCell, referencedCells } = state;

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-max">
        {/* Index labels */}
        <div className="flex gap-1 mb-1">
          <div className="w-10 shrink-0" aria-hidden="true" />
          {memo.map((_, i) => (
            <div
              key={i}
              className="w-10 shrink-0 text-center text-[11px] font-mono text-zinc-600"
            >
              {i}
            </div>
          ))}
        </div>

        {/* Memo row */}
        <div className="flex gap-1 items-center">
          <div className="w-10 shrink-0 text-right pr-2 text-[11px] font-mono text-zinc-600">
            fib
          </div>
          {memo.map((val, i) => {
            const isActive = i === activeCell;
            const isRef = referencedCells.includes(i);
            const hasVal = val !== null;
            return (
              <div
                key={i}
                className={`w-10 h-10 shrink-0 flex items-center justify-center text-sm font-mono rounded border transition-colors ${
                  isActive
                    ? "border-blue-400 bg-blue-400/20 text-blue-300"
                    : isRef
                      ? "border-amber-400 bg-amber-400/10 text-amber-300"
                      : hasVal
                        ? "border-zinc-600 bg-zinc-800/80 text-zinc-200"
                        : "border-zinc-800 bg-zinc-900 text-zinc-700"
                }`}
                aria-label={`fib(${i}) = ${hasVal ? val : "unknown"}`}
              >
                {hasVal ? val : "·"}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-5 text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-blue-400 bg-blue-400/20 inline-block" />
            computing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-amber-400 bg-amber-400/10 inline-block" />
            referenced
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-zinc-600 bg-zinc-800/80 inline-block" />
            computed
          </span>
        </div>
      </div>
    </div>
  );
}

export const fibonacciDPPlugin: AlgorithmPlugin<FibState, FibInput> = {
  id: "fibonacci-dp",
  name: "Fibonacci — Bottom-Up DP",
  description:
    "Build the Fibonacci sequence by filling a 1D memo table left to right. Each cell depends only on its two predecessors — the canonical introduction to dynamic programming.",
  inputSchema: [
    {
      id: "n",
      label: "n  (0 – 20)",
      type: "number",
      min: 0,
      max: 20,
      defaultValue: 8,
    },
  ],
  defaultInput: { n: 8 },
  getSteps,
  renderState,
};

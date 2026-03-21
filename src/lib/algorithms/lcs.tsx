import type { AlgorithmPlugin, VisualizerStep } from "@/lib/visualizer/types";

export type LCSState = {
  str1: string;
  str2: string;
  table: (number | null)[][];
  activeCell: [number, number]; // [row, col], -1,-1 = none
  match: boolean; // did str1[row-1] == str2[col-1] at activeCell?
  length: number | null; // final answer, set on last step
};

type LCSInput = { str1: string; str2: string };

function getSteps({ str1, str2 }: LCSInput): VisualizerStep<LCSState>[] {
  // Clamp to 8 chars each so the grid stays readable
  const s1 = str1.slice(0, 8).toUpperCase();
  const s2 = str2.slice(0, 8).toUpperCase();
  const m = s1.length;
  const n = s2.length;

  // dp is (m+1) x (n+1)
  const table: (number | null)[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(null),
  );
  const steps: VisualizerStep<LCSState>[] = [];

  const snap = (
    row: number,
    col: number,
    annotation: string,
    match = false,
    length: number | null = null,
  ) =>
    steps.push({
      state: {
        str1: s1,
        str2: s2,
        table: table.map((r) => [...r]),
        activeCell: [row, col],
        match,
        length,
      },
      annotation,
    });

  snap(-1, -1, `Finding the Longest Common Subsequence of "${s1}" and "${s2}". Building dp[(m+1) × (n+1)] table.`);

  // Fill base cases: row 0 and col 0 are all 0
  for (let j = 0; j <= n; j++) {
    table[0][j] = 0;
  }
  for (let i = 1; i <= m; i++) {
    table[i][0] = 0;
  }
  snap(-1, -1, "Base cases: dp[0][j] = 0 for all j, dp[i][0] = 0 for all i. Empty prefix has LCS length 0.");

  // Fill the rest
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const matched = s1[i - 1] === s2[j - 1];
      snap(
        i,
        j,
        matched
          ? `s1[${i}]="${s1[i - 1]}" == s2[${j}]="${s2[j - 1]}" — match! dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${table[i - 1][j - 1]! + 1}`
          : `s1[${i}]="${s1[i - 1]}" ≠ s2[${j}]="${s2[j - 1]}" — dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = max(${table[i - 1][j]}, ${table[i][j - 1]}) = ${Math.max(table[i - 1][j]!, table[i][j - 1]!)}`,
        matched,
      );
      table[i][j] = matched
        ? table[i - 1][j - 1]! + 1
        : Math.max(table[i - 1][j]!, table[i][j - 1]!);
    }
  }

  const answer = table[m][n] ?? 0;
  snap(
    m,
    n,
    `Done. LCS length = ${answer}`,
    false,
    answer,
  );

  return steps;
}

function renderState({ state }: VisualizerStep<LCSState>) {
  const { str1, str2, table, activeCell, match } = state;
  const [activeRow, activeCol] = activeCell;
  const m = str1.length;
  const n = str2.length;

  // Highlight logic
  const isActive = (r: number, c: number) => r === activeRow && c === activeCol;
  const isAbove = (r: number, c: number) =>
    activeRow > 0 && r === activeRow - 1 && c === activeCol;
  const isLeft = (r: number, c: number) =>
    activeCol > 0 && r === activeRow && c === activeCol - 1;
  const isDiag = (r: number, c: number) =>
    activeRow > 0 && activeCol > 0 && r === activeRow - 1 && c === activeCol - 1;

  // Cell sizing — shrink for longer strings
  const cellSize = n > 6 ? "w-8 h-8 text-[11px]" : "w-10 h-10 text-sm";

  function cellClass(r: number, c: number) {
    const val = table[r]?.[c];
    const filled = val !== null;
    if (isActive(r, c)) {
      return match
        ? "border-green-400 bg-green-400/20 text-green-300"
        : "border-blue-400 bg-blue-400/20 text-blue-300";
    }
    if (isDiag(r, c) && match)
      return "border-green-600/60 bg-green-400/10 text-green-400/70";
    if ((isAbove(r, c) || isLeft(r, c)) && !match)
      return "border-amber-400/60 bg-amber-400/10 text-amber-400/70";
    if (filled) return "border-zinc-700 bg-zinc-800/60 text-zinc-300";
    return "border-zinc-800 bg-zinc-900 text-zinc-700";
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-max">
        {/* Column header: str2 chars */}
        <div className="flex gap-1">
          {/* empty corner for row labels col */}
          <div className={`${cellSize} shrink-0`} aria-hidden="true" />
          {/* "" label (col 0) */}
          <div
            className={`${cellSize} shrink-0 flex items-center justify-center font-mono text-zinc-600`}
          >
            ε
          </div>
          {str2.split("").map((ch, j) => (
            <div
              key={j}
              className={`${cellSize} shrink-0 flex items-center justify-center font-mono font-bold ${
                activeCol === j + 1 ? "text-zinc-200" : "text-zinc-500"
              }`}
            >
              {ch}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: m + 1 }, (_, i) => (
          <div key={i} className="flex gap-1 mt-1">
            {/* Row header: str1 char (or ε for row 0) */}
            <div
              className={`${cellSize} shrink-0 flex items-center justify-center font-mono font-bold ${
                activeRow === i ? "text-zinc-200" : "text-zinc-500"
              }`}
            >
              {i === 0 ? "ε" : str1[i - 1]}
            </div>

            {/* Data cells */}
            {Array.from({ length: n + 1 }, (_, j) => (
              <div
                key={j}
                className={`${cellSize} shrink-0 flex items-center justify-center font-mono rounded border transition-colors ${cellClass(i, j)}`}
                aria-label={`dp[${i}][${j}] = ${table[i]?.[j] ?? "?"}`}
              >
                {table[i]?.[j] !== null ? table[i][j] : "·"}
              </div>
            ))}
          </div>
        ))}

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-5 text-[11px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-blue-400 bg-blue-400/20 inline-block" />
            computing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-green-400 bg-green-400/20 inline-block" />
            match
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-amber-400/60 bg-amber-400/10 inline-block" />
            candidates
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border border-zinc-700 bg-zinc-800/60 inline-block" />
            filled
          </span>
        </div>
      </div>
    </div>
  );
}

export const lcsPlugin: AlgorithmPlugin<LCSState, LCSInput> = {
  id: "lcs",
  name: "Longest Common Subsequence",
  description:
    "Find the longest subsequence common to two strings using a 2D DP table. Each cell dp[i][j] holds the LCS length for the first i characters of s1 and first j characters of s2.",
  inputSchema: [
    {
      id: "str1",
      label: "String 1  (max 8 chars)",
      type: "text",
      defaultValue: "ABCBDAB",
    },
    {
      id: "str2",
      label: "String 2  (max 8 chars)",
      type: "text",
      defaultValue: "BDCAB",
    },
  ],
  defaultInput: { str1: "ABCBDAB", str2: "BDCAB" },
  getSteps,
  renderState,
};

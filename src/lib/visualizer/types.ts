import { type ReactNode } from "react";

export type InputField = {
  id: string;
  label: string;
  type: "number" | "text";
  min?: number;
  max?: number;
  defaultValue: number | string;
};

export type VisualizerStep<S> = {
  state: S;
  annotation: string;
};

export type AlgorithmPlugin<
  S = unknown,
  I extends Record<string, unknown> = Record<string, unknown>,
> = {
  id: string;
  name: string;
  description: string;
  inputSchema: InputField[];
  defaultInput: I;
  getSteps(input: I): VisualizerStep<S>[];
  renderState(step: VisualizerStep<S>): ReactNode;
};

// Type-erased plugin for use in registries and generic renderer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyPlugin = AlgorithmPlugin<any, Record<string, unknown>>;

import type { AnyPlugin } from "@/lib/visualizer/types";
import { fibonacciDPPlugin } from "./fibonacci-dp";
import { lcsPlugin } from "./lcs";

export const algorithmRegistry: AnyPlugin[] = [fibonacciDPPlugin, lcsPlugin];

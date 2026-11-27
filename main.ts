// Roast Your Own Agent — make.fun entry
// Builds /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt) holding one
// fixed single-line roast of my own AI agent, and refuses to write
// anything that fails the competition gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent answers a one-word 'ok' with a 12-step plan, three backup plans, and a status report on the plan to write the plan.";

// The gate, as a single helper: a valid entry is non-blank UTF-8 text of
// 1-200 code points that fits on one line — no newline anywhere.
function entryPassesGate(entry: string): string | null {
  const length = [...entry].length;
  if (length < 1 || length > 200) {
    return `entry is ${length} characters long, but the gate allows 1-200`;
  }
  if (entry.trim() === "") {
    return "entry contains only whitespace";
  }
  if (entry.includes("\n")) {
    return "entry spans more than one line, but it must be a single line";
  }
  return null;
}

const problem = entryPassesGate(ROAST);
if (problem !== null) {
  console.error(`invalid entry: ${problem}`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, ROAST, "utf8");
console.log(`wrote ${[...ROAST].length}-character, single-line entry to ${target}`);

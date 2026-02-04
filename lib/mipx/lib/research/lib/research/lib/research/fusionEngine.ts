// lib/research/fusionEngine.ts // -------------------------------------------------- // INTELLIGENCE FUSION ENGINE // Multiple AI model outputs ko ek single, high-signal // human-grade research brain me convert karta hai // --------------------------------------------------

import { ModelExecutionResult } from "./runMultiModel";

export interface FusedResearch { summary: string; sections: Record<string, string>; signals: { strongPoints: string[]; weakPointsDiscarded: number; contradictionsResolved: number; }; }

/**

Basic cleanup utility */ function clean(text: string): string { return text .replace(/\n{3,}/g, "\n\n") .replace(/\s{2,}/g, " ") .trim(); }


/**

fusionEngine


---

Rules:

Empty / very short outputs discarded


Role-wise sections maintained


Soft-merge to avoid data loss


No tone polishing here (script engine karega) */ export function fusionEngine(results: ModelExecutionResult[]): FusedResearch { const sections: Record<string, string> = {};



let weakDiscarded = 0; let contradictionsResolved = 0;

for (const r of results) { if (!r.output || r.output.trim().length < 40) { weakDiscarded++; continue; }

const key = r.role;
const cleaned = clean(r.output);

if (!sections[key]) {
  sections[key] = cleaned;
} else {
  sections[key] += `\n\n${cleaned}`;
  contradictionsResolved++;
}

}

const summary = clean( Object.values(sections) .map((s) => s.split("\n")[0]) .slice(0, 5) .join(" "), );

return { summary, sections, signals: { strongPoints: Object.keys(sections), weakPointsDiscarded: weakDiscarded, contradictionsResolved, }, }; }

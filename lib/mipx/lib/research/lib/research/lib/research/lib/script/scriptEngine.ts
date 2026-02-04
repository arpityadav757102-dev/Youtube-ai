// lib/script/scriptEngine.ts // -------------------------------------------------- // SCRIPT ENGINE // Fused research ko AI-lag-free, Hinglish, professional // creator-style script me convert karta hai // --------------------------------------------------

import { FusedResearch } from "@/lib/research/fusionEngine"; import { VideoType } from "@/types/topic";

export interface ScriptOutput { hook: string; script: string; closing: string; meta: { videoType: VideoType; language: "hinglish"; tone: "authoritative" | "story-driven" | "insight-heavy"; }; }

function normalize(text: string): string { return text .replace(/\n{3,}/g, "\n\n") .replace(/\s{2,}/g, " ") .trim(); }

function humanPause(): string { return "..."; }

/**

generateScript


---

Rules:

No AI disclaimers


No robotic formatting


Hindi base + commonly used English words only


Opinionated, insider tone */ export function generateScript( research: FusedResearch, videoType: VideoType, ): ScriptOutput { const firstInsight = research.summary.split(".")[0];



const hook = ${firstInsight}${humanPause()} lekin zyada log yahan galti kar dete hain.;

let body = ""; for (const content of Object.values(research.sections)) { body += \n\n${content}; }

const closing = videoType === "short" ? "Isliye next time sirf surface mat dekho, signal pe focus karo." : "Agar tum sirf upar-uper se dekh rahe ho, tum wahi miss kar rahe ho jo real difference create karta hai.";

return { hook: normalize(hook), script: normalize(body), closing: normalize(closing), meta: { videoType, language: "hinglish", tone: "authoritative", }, }; }

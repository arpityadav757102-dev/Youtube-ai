// lib/research/modelRoles.ts // -------------------------------------------------- // MODEL ROLES MAP // Har AI model ka clear role define karta hai // taaki intelligence repeat na ho aur cost control rahe // --------------------------------------------------

export type ModelRoleType = | "deep_facts" | "audience_psychology" | "viral_patterns" | "story_angles" | "contrarian_insights" | "future_implications" | "script_tone_guard";

export interface ModelRole { id: string; provider: "openrouter"; model: string; role: ModelRoleType; maxTokens: number; temperature: number; priority: number; // lower = higher priority }

/**

MODEL_ROLES


---

NOTE:

Model names OpenRouter compatible hone chahiye


Expensive models sirf high-value roles ke liye


Cheap models bulk intelligence ke liye */ export const MODEL_ROLES: ModelRole[] = [ { id: "core-facts", provider: "openrouter", model: "openai/gpt-4.1", role: "deep_facts", maxTokens: 2200, temperature: 0.2, priority: 1, }, { id: "audience-psych", provider: "openrouter", model: "anthropic/claude-3.5-sonnet", role: "audience_psychology", maxTokens: 1800, temperature: 0.4, priority: 2, }, { id: "viral-patterns", provider: "openrouter", model: "google/gemini-1.5-pro", role: "viral_patterns", maxTokens: 1600, temperature: 0.5, priority: 3, }, { id: "story-angles", provider: "openrouter", model: "mistralai/mixtral-8x7b", role: "story_angles", maxTokens: 1400, temperature: 0.7, priority: 4, }, { id: "contrarian", provider: "openrouter", model: "deepseek/deepseek-chat", role: "contrarian_insights", maxTokens: 1200, temperature: 0.8, priority: 5, }, { id: "future-impact", provider: "openrouter", model: "openai/gpt-4o-mini", role: "future_implications", maxTokens: 1200, temperature: 0.6, priority: 6, }, { id: "tone-guard", provider: "openrouter", model: "anthropic/claude-3-haiku", role: "script_tone_guard", maxTokens: 800, temperature: 0.3, priority: 7, }, ];



/**

Helper: execution priority ke hisaab se models return karta hai */ export function getModelsByPriority(): ModelRole[] { return [...MODEL_ROLES].sort((a, b) => a.priority - b.priority); }

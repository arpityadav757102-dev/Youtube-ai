// lib/research/runMultiModel.ts // -------------------------------------------------- // MULTI-MODEL EXECUTION ENGINE // OpenRouter ke through multiple AI models ko // parallel + failure-safe tareeke se run karta hai // --------------------------------------------------

import { getModelsByPriority, ModelRole } from "./modelRoles";

export interface ModelExecutionResult { roleId: string; role: string; model: string; output: string; }

export interface RunMultiModelInput { prompt: string; }

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**

Low-level OpenRouter call

Har model ke liye isolated rakha gaya hai */ async function callOpenRouter( model: ModelRole, prompt: string, ): Promise<string> { const apiKey = process.env.OPENROUTER_API_KEY;


if (!apiKey) { throw new Error("OPENROUTER_API_KEY missing in environment variables"); }

const response = await fetch(OPENROUTER_API_URL, { method: "POST", headers: { Authorization: Bearer ${apiKey}, "Content-Type": "application/json", "HTTP-Referer": "https://yourapp.com", "X-Title": "YouTube AI Research Engine", }, body: JSON.stringify({ model: model.model, messages: [ { role: "user", content: prompt, }, ], max_tokens: model.maxTokens, temperature: model.temperature, }), );

if (!response.ok) { const errorText = await response.text(); throw new Error(OpenRouter error (${model.model}): ${errorText}); }

const data = await response.json();

return data?.choices?.[0]?.message?.content ?? ""; }

/**

runMultiModel


---

Same prompt ko multiple models me parallel run karta hai


Ek model fail ho to baaki continue karte hain


Sirf raw research output return karta hai */ export async function runMultiModel( input: RunMultiModelInput, ): Promise<ModelExecutionResult[]> { const models = getModelsByPriority();



const executions = models.map(async (model) => { try { const output = await callOpenRouter(model, input.prompt);

return {
    roleId: model.id,
    role: model.role,
    model: model.model,
    output,
  } as ModelExecutionResult;
} catch (error) {
  // Failure-safe: empty output, pipeline continues
  return {
    roleId: model.id,
    role: model.role,
    model: model.model,
    output: "",
  } as ModelExecutionResult;
}

});

return Promise.all(executions); }

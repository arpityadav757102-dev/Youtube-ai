// lib/history/reGenerateService.ts // -------------------------------------------------- // RE-GENERATE SERVICE // Purane history item se poori pipeline dubara chalata hai // aur fresh output generate karta hai // --------------------------------------------------

import { getHistoryById, addHistoryItem } from "./historyManager"; import { generateMIPX } from "@/lib/mipx/mipxGenerator"; import { runMultiModel } from "@/lib/research/runMultiModel"; import { fusionEngine } from "@/lib/research/fusionEngine"; import { generateScript } from "@/lib/script/scriptEngine"; import { generateYouTubeSEO } from "@/lib/youtube/youtubeOptimizer"; import { HistoryItem } from "@/types/history";

/**

reGenerateFromHistory


---

Existing history item se input uthata hai


Full research + script pipeline dubara chalata hai


Naya history item create karta hai (lineage ke saath) */ export async function reGenerateFromHistory( historyId: string, ): Promise<HistoryItem> { const oldItem = getHistoryById(historyId);



if (!oldItem) { throw new Error("History item not found"); }

// Step 1: Recreate MIP-X const mipx = generateMIPX({ topic: oldItem.topic, videoType: oldItem.videoType, creatorType: oldItem.creatorType, });

// Step 2: Multi-model research const rawResearch = await runMultiModel({ prompt: mipx.prompt });

// Step 3: Fusion const fusedResearch = fusionEngine(rawResearch);

// Step 4: Script const scriptOutput = generateScript( fusedResearch, oldItem.videoType, );

// Step 5: YouTube SEO const seo = generateYouTubeSEO(scriptOutput);

// Step 6: Save new history item return addHistoryItem({ topic: oldItem.topic, videoType: oldItem.videoType, creatorType: oldItem.creatorType,

hook: scriptOutput.hook,
script: scriptOutput.script,
closing: scriptOutput.closing,

titles: seo.titles,
description: seo.description,
tags: seo.tags,
hashtags: seo.hashtags,
pinnedComment: seo.pinnedComment,

regeneratedFromId: oldItem.id,

}); }

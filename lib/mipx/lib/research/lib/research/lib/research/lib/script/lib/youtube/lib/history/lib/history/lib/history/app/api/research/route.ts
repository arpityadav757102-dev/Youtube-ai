// app/api/research/route.ts // -------------------------------------------------- // MAIN RESEARCH API ROUTE // Frontend → full pipeline → history save // --------------------------------------------------

import { NextResponse } from "next/server"; import { generateMIPX } from "@/lib/mipx/mipxGenerator"; import { runMultiModel } from "@/lib/research/runMultiModel"; import { fusionEngine } from "@/lib/research/fusionEngine"; import { generateScript } from "@/lib/script/scriptEngine"; import { generateYouTubeSEO } from "@/lib/youtube/youtubeOptimizer"; import { addHistoryItem } from "@/lib/history/historyManager"; import { isValidTopicInput, TopicInput } from "@/types/topic";

export async function POST(req: Request) { try { const body = (await req.json()) as TopicInput;

if (!isValidTopicInput(body)) {
  return NextResponse.json(
    { error: "Invalid input" },
    { status: 400 },
  );
}

// Step 1: Generate MIP-X
const mipx = generateMIPX(body);

// Step 2: Multi-model research
const rawResearch = await runMultiModel({
  prompt: mipx.prompt,
});

// Step 3: Fusion
const fusedResearch = fusionEngine(rawResearch);

// Step 4: Script
const scriptOutput = generateScript(
  fusedResearch,
  body.videoType,
);

// Step 5: YouTube SEO
const seo = generateYouTubeSEO(scriptOutput);

// Step 6: Save to history
const historyItem = addHistoryItem({
  topic: body.topic,
  videoType: body.videoType,
  creatorType: body.creatorType,

  hook: scriptOutput.hook,
  script: scriptOutput.script,
  closing: scriptOutput.closing,

  titles: seo.titles,
  description: seo.description,
  tags: seo.tags,
  hashtags: seo.hashtags,
  pinnedComment: seo.pinnedComment,
});

return NextResponse.json({
  success: true,
  data: {
    historyItem,
    researchSummary: fusedResearch.summary,
  },
});

} catch (error: any) { return NextResponse.json( { error: error?.message || "Internal Server Error" }, { status: 500 }, ); } }

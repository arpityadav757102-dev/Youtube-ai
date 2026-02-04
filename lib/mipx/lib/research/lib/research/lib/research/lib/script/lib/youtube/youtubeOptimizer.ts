// lib/youtube/youtubeOptimizer.ts // -------------------------------------------------- // YOUTUBE OPTIMIZATION ENGINE // Script se titles, description, tags, hashtags // generate karta hai – bina clickbait aur AI-lag ke // --------------------------------------------------

import { ScriptOutput } from "@/lib/script/scriptEngine"; import { VideoType } from "@/types/topic";

export interface YouTubeSEOOutput { titles: string[]; description: string; tags: string[]; hashtags: string[]; pinnedComment: string; meta: { videoType: VideoType; strategy: "search" | "browse" | "mixed"; }; }

function unique(list: string[]): string[] { return Array.from(new Set(list)); }

export function generateYouTubeSEO( script: ScriptOutput, ): YouTubeSEOOutput { const cleanHook = script.hook.replace(/.../g, "");

const titles = unique([ cleanHook, ${cleanHook} | Jo koi clearly nahi batata, Sach ye hai: ${cleanHook}, Agar ye samajh gaye, game change ho jayega, ]);

const description = `${script.hook}

${script.script}

${script.closing}

— Ye video un creators ke liye hai jo sirf surface-level content se aage sochna chahte hain.`;

const tags = unique([ "youtube growth", "content creation", "viral video", "youtube strategy", "shorts", "long video", ]);

const hashtags = unique([ "#YouTube", "#ContentCreator", "#YouTubeGrowth", "#ViralContent", ]);

const pinnedComment = "Tumhara opinion kya hai? Comments me likho — discussion interesting hone wali hai.";

return { titles, description, tags, hashtags, pinnedComment, meta: { videoType: script.meta.videoType, strategy: script.meta.videoType === "short" ? "browse" : "mixed", }, }; }

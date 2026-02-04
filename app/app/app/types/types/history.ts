// types/history.ts // -------------------------------------------------- // HISTORY DATA CONTRACT // Generated content ka snapshot + lineage tracking // --------------------------------------------------

import { VideoType } from "./topic";

export interface HistoryItem { id: string; // unique id topic: string; videoType: VideoType; creatorType: string[];

// Script output hook: string; script: string; closing: string;

// YouTube SEO output titles: string[]; description: string; tags: string[]; hashtags: string[]; pinnedComment: string;

// Meta createdAt: number; // timestamp regeneratedFromId?: string; // lineage }

export type HistoryList = HistoryItem[];

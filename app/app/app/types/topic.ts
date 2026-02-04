// types/topic.ts // -------------------------------------------------- // CENTRAL INPUT CONTRACT // Ye type frontend, API, aur core logic ko sync me rakhta hai // --------------------------------------------------

export type VideoType = "short" | "long" | "both";

export interface TopicInput { /**

Core topic provided by the user

Example: "Why most YouTube shorts fail" */ topic: string;


/**

Video format preference */ videoType: VideoType;


/**

Creator persona(s)

Example: ["Beginner", "Faceless", "Pro"] */ creatorType: string[]; }


/**

Runtime guard for API boundaries */ export function isValidTopicInput(input: any): input is TopicInput { return ( typeof input === "object" && typeof input?.topic === "string" && input.topic.trim().length > 0 && (input.videoType === "short" || input.videoType === "long" || input.videoType === "both") && Array.isArray(input.creatorType) ); }

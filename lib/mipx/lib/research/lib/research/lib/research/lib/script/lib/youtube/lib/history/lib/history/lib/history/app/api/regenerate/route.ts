// app/api/regenerate/route.ts // -------------------------------------------------- // RE-GENERATE API ROUTE // History ID ke basis par full pipeline dubara run karta hai // --------------------------------------------------

import { NextResponse } from "next/server"; import { reGenerateFromHistory } from "@/lib/history/reGenerateService";

interface ReGenerateRequestBody { historyId: string; }

export async function POST(req: Request) { try { const body = (await req.json()) as ReGenerateRequestBody;

if (!body?.historyId || typeof body.historyId !== "string") {
  return NextResponse.json(
    { error: "historyId is required" },
    { status: 400 },
  );
}

const newHistoryItem = await reGenerateFromHistory(body.historyId);

return NextResponse.json({
  success: true,
  data: newHistoryItem,
});

} catch (error: any) { return NextResponse.json( { error: error?.message || "Internal Server Error" }, { status: 500 }, ); } }

// app/dashboard/page.tsx // -------------------------------------------------- // DASHBOARD PAGE // History view + Re-Generate UI // --------------------------------------------------

"use client";

import { useEffect, useState } from "react";

interface HistoryItem { id: string; topic: string; createdAt: number; hook: string; script: string; closing: string; titles: string[]; }

export default function DashboardPage() { const [history, setHistory] = useState<HistoryItem[]>([]); const [loadingId, setLoadingId] = useState<string | null>(null);

// NOTE: // Free MVP me history server-memory based hai. // Isliye abhi direct fetch API nahi hai. // Future me /api/history add ki ja sakti hai.

async function handleReGenerate(id: string) { setLoadingId(id); try { const res = await fetch("/api/regenerate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ historyId: id }), });

const data = await res.json();
  console.log("Re-generated:", data);

  // Future: history refetch
} catch (err) {
  console.error(err);
} finally {
  setLoadingId(null);
}

}

return ( <main className="min-h-screen p-6"> <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

{history.length === 0 && (
    <p className="text-gray-500">No history yet. Generate your first topic.</p>
  )}

  <div className="space-y-4">
    {history.map((item) => (
      <div
        key={item.id}
        className="border rounded-md p-4 space-y-2"
      >
        <h2 className="font-medium">{item.topic}</h2>
        <p className="text-sm text-gray-600">{item.hook}</p>

        <div className="flex gap-2">
          <button
            onClick={() => handleReGenerate(item.id)}
            disabled={loadingId === item.id}
            className="px-3 py-1 border rounded"
          >
            {loadingId === item.id ? "Re-generating..." : "Re-Generate"}
          </button>
        </div>
      </div>
    ))}
  </div>
</main>

); }

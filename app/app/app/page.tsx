// app/page.tsx // -------------------------------------------------- // HOME PAGE // User yahin se topic input karke research + script generate karta hai // --------------------------------------------------

"use client";

import { useState } from "react";

export default function HomePage() { const [topic, setTopic] = useState(""); const [videoType, setVideoType] = useState<"short" | "long" | "both">("both"); const [creatorType, setCreatorType] = useState<string[]>([]); const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null);

async function handleGenerate() { setError(null);

if (!topic.trim()) {
  setError("Please enter a topic");
  return;
}

setLoading(true);

try {
  const res = await fetch("/api/research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic,
      videoType,
      creatorType,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.error || "Something went wrong");
  }

  const data = await res.json();
  console.log("Generation result:", data);
  // Future: redirect to dashboard
} catch (err: any) {
  setError(err.message);
} finally {
  setLoading(false);
}

}

function toggleCreator(type: string) { setCreatorType((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type], ); }

return ( <main className="min-h-screen flex items-center justify-center p-6"> <div className="w-full max-w-xl space-y-6"> <h1 className="text-3xl font-semibold text-center"> YouTube AI Research & Script Engine </h1>

<textarea
      className="w-full border rounded-md p-3"
      placeholder="Enter your video topic..."
      rows={3}
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
    />

    <div className="flex gap-2 justify-center">
      {["short", "long", "both"].map((type) => (
        <button
          key={type}
          className={`px-3 py-1 rounded border ${
            videoType === type ? "bg-black text-white" : ""}`}
          onClick={() => setVideoType(type as any)}
        >
          {type}
        </button>
      ))}
    </div>

    <div className="flex flex-wrap gap-2 justify-center">
      {["Beginner", "Pro", "Faceless", "Personal Brand"].map((type) => (
        <button
          key={type}
          onClick={() => toggleCreator(type)}
          className={`px-3 py-1 rounded border ${
            creatorType.includes(type) ? "bg-black text-white" : ""}`}
        >
          {type}
        </button>
      ))}
    </div>

    {error && (
      <p className="text-red-600 text-center text-sm">{error}</p>
    )}

    <button
      onClick={handleGenerate}
      disabled={loading}
      className="w-full py-3 rounded bg-black text-white"
    >
      {loading ? "Generating..." : "Generate"}
    </button>
  </div>
</main>

); }

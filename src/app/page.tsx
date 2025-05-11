"use client";

import { useState } from "react";

export default function TaskSegmentGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState<{
    refinedTitle: string;
    refinedDescription: string;
    segment: string;
    deliverable: string;
    polished?: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const generateOutput = () => {
    const refinedTitle = title.trim().replace(/\s+/g, " ");
    const refinedDescription =
      description.charAt(0).toUpperCase() +
      description.slice(1).trim().replace(/\s+/g, " ");

    let segment = "Process Investigation & Alignment";
    const lower = description.toLowerCase();
    if (lower.includes("tool") || lower.includes("data")) {
      segment = "Tools & Data Management";
    } else if (lower.includes("report") || lower.includes("presentation")) {
      segment = "Presentations & Reporting";
    } else if (lower.includes("collaborat") || lower.includes("stakeholder")) {
      segment = "Collaboration & Relationship Building";
    } else if (lower.includes("document") || lower.includes("handover")) {
      segment = "Knowledge Transfer & Documentation";
    }

    const deliverable = `Refine and automate: ${refinedTitle.toLowerCase()}`;

    setOutput({ refinedTitle, refinedDescription, segment, deliverable });
  };

  const rewriteWithAI = async () => {
    if (!description) return;
    setLoading(true);
    const res = await fetch("/api/rewrite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    const data = await res.json();
    setOutput((prev) =>
      prev ? { ...prev, polished: data.polished } : prev
    );
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-red-600">PLUS ULTRA TASK GENERATOR</h1>
        <p className="text-sm mb-6 text-gray-600 italic">Inspired by My Hero Academia. Time to go beyond.</p>

        <input
          placeholder="What’s your task title, young hero?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />

        <textarea
          placeholder="Write a quick description… like explaining your Quirk!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 min-h-[100px]"
        />

        <div className="flex gap-4">
          <button onClick={generateOutput}>💥 Go Beyond! 💥</button>
          <button onClick={rewriteWithAI}>
            ✨ Rewrite with AI
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-yellow-100 border-l-4 border-red-500 p-6 rounded-xl shadow space-y-2">
          <h2 className="text-2xl font-bold text-black">🎯 Mission Output</h2>
          <p><strong>📝 Title:</strong> {output.refinedTitle}</p>
          <p><strong>📖 Description:</strong> {output.refinedDescription}</p>
          {output.polished && (
            <p><strong>✨ Polished:</strong> {loading ? "Loading..." : output.polished}</p>
          )}
          <p><strong>🧬 Segment (Quirk):</strong> {output.segment}</p>
          <p><strong>✅ Deliverable:</strong> {output.deliverable}</p>
        </div>
      )}
    </div>
  );
}

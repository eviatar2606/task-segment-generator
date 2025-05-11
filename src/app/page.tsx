"use client";
import { useState } from "react";

export default function TaskSegmentGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState<any>(null);
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
    setLoading(true);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      console.log("🧠 AI Response:", data);
      if (data.polished) {
        setOutput((prev: any) => ({
          ...prev,
          polished: data.polished,
        }));
      }
    } catch (err) {
      console.error("💥 Rewrite failed", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>PLUS ULTRA TASK GENERATOR</h1>
      <p>Inspired by My Hero Academia. Time to go beyond.</p>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button onClick={generateOutput}>💥 Go Beyond! 💥</button>
      <button onClick={rewriteWithAI} disabled={loading}>
        ✨ Rewrite with AI
      </button>

      {output && (
        <div>
          <h2>🎯 Mission Output</h2>
          <p><strong>📌 Title:</strong> {output.refinedTitle}</p>
          <p><strong>📄 Description:</strong> {output.refinedDescription}</p>
          {output.polished && (
            <p><strong>✨ Polished:</strong> {output.polished}</p>
          )}
          <p><strong>🔍 Segment (Quirk):</strong> {output.segment}</p>
          <p><strong>✅ Deliverable:</strong> {output.deliverable}</p>
        </div>
      )}
    </div>
  );
}

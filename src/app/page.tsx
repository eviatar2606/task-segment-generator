"use client";

import { useState } from "react";

export default function TaskSegmentGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState<{   refinedTitle: string;   refinedDescription: string;   segment: string;   deliverable: string; } | null>(null);

  const segments = [
    "Process Investigation & Alignment",
    "Tools & Data Management",
    "Collaboration & Relationship Building",
    "Presentations & Reporting",
    "Knowledge Transfer & Documentation",
    "TBD",
  ];

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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="space-y-4 border p-4 rounded-xl shadow-sm bg-white">
        <h2 className="text-xl font-semibold">Task Segment Generator</h2>
        <input
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 h-24"
        />
        <button
          onClick={generateOutput}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="border p-4 rounded-xl shadow-sm bg-white space-y-2">
          <h3 className="text-lg font-semibold">Generated Output</h3>
          <p>
            <strong>Title:</strong> {output.refinedTitle}
          </p>
          <p>
            <strong>Description:</strong> {output.refinedDescription}
          </p>
          <p>
            <strong>Segment:</strong> {output.segment}
          </p>
          <p>
            <strong>Deliverable:</strong> {output.deliverable}
          </p>
        </div>
      )}
    </div>
  );
}

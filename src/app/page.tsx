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
  } | null>(null);

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
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div className="card">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          Task Segment Generator
        </h2>
        <input
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginTop: "1rem", minHeight: "100px" }}
        />
        <button onClick={generateOutput} style={{ marginTop: "1rem" }}>
          Generate
        </button>
      </div>

      {output && (
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Generated Output
          </h3>
          <p><strong>Title:</strong> {output.refinedTitle}</p>
          <p><strong>Description:</strong> {output.refinedDescription}</p>
          <p><strong>Segment:</strong> {output.segment}</p>
          <p><strong>Deliverable:</strong> {output.deliverable}</p>
        </div>
      )}
    </div>
  );
}

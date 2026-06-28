"use client";

import { useState } from "react";

export default function ResumeTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] =
    useState("Modern ATS");

  const templates = [
    {
      id: 1,
      name: "Modern ATS",
      description:
        "Clean ATS-friendly design for software engineers.",
      color: "#2563eb",
      ats: "98%",
      category: "Software Engineer",
    },
    {
      id: 2,
      name: "Professional",
      description:
        "Corporate style resume template.",
      color: "#7c3aed",
      ats: "95%",
      category: "Corporate",
    },
    {
      id: 3,
      name: "Fresh Graduate",
      description:
        "Perfect for students and freshers.",
      color: "#22c55e",
      ats: "96%",
      category: "Student",
    },
    {
      id: 4,
      name: "Developer Pro",
      description:
        "Designed for developers and IT professionals.",
      color: "#f59e0b",
      ats: "99%",
      category: "Developer",
    },
  ];

  return (
    <div className="resume-templates-page">

      {/* Header */}

      <div className="resume-header">

        <h1>
          📋 Resume Templates
        </h1>

        <p>
          Choose a professional ATS-friendly
          template to build your resume.
        </p>

      </div>

      {/* Stats */}

      <div className="template-stats">

        <div className="stat-card">
          <h2>4</h2>
          <p>Templates</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>ATS Compatibility</p>
        </div>

        <div className="stat-card">
          <h2>1000+</h2>
          <p>Downloads</p>
        </div>

        <div className="stat-card">
          <h2>5★</h2>
          <p>User Rating</p>
        </div>

      </div>

      {/* Templates */}

      <div className="templates-grid">

        {templates.map((template) => (

          <div
            key={template.id}
            className={`template-card ${
              selectedTemplate ===
              template.name
                ? "active-template"
                : ""
            }`}
          >

            <div
              className="template-preview"
              style={{
                borderTop:
                  `6px solid ${template.color}`,
              }}
            >

              <div className="preview-header" />

              <div className="preview-line" />
              <div className="preview-line short" />

              <div className="preview-section">
                <div className="preview-line" />
                <div className="preview-line" />
              </div>

              <div className="preview-section">
                <div className="preview-line" />
                <div className="preview-line short" />
              </div>

            </div>

            <h3>
              {template.name}
            </h3>

            <p>
              {template.description}
            </p>

            <div className="template-meta">

              <span>
                ATS: {template.ats}
              </span>

              <span>
                {template.category}
              </span>

            </div>

            <button
              className="template-btn"
              onClick={() =>
                setSelectedTemplate(
                  template.name
                )
              }
            >
              {selectedTemplate ===
              template.name
                ? "✓ Selected"
                : "Use Template"}
            </button>

          </div>

        ))}

      </div>

      {/* Selected Template */}

      <div className="selected-template">

        <h2>
          Selected Template
        </h2>

        <p>
          {selectedTemplate}
        </p>

        <button className="continue-btn">
          Continue Building Resume →
        </button>

      </div>

    </div>
  );
}
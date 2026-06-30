"use client";

import { useState, useEffect } from "react";
import useResumeAnalysis from "../../../hooks/useResumeAnalysis";
import {
  FiEdit3,
  FiCheckCircle,
  FiAlertCircle,
  FiExternalLink,
  FiDownload,
  FiAward,
  FiBookOpen,
  FiGrid,
  FiLayout,
  FiInfo,
  FiRefreshCw
} from "react-icons/fi";

export default function ResumeBuilderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
  });

  const { latestAnalysis: atsFeedback, clearAnalysis, loading: loadingAnalysis } = useResumeAnalysis();
  const [selectedTemplate, setSelectedTemplate] = useState("careerbridge"); // Defaulting to the premium CareerBridge template

  useEffect(() => {
    if (atsFeedback) {
      try {
        // Try to parse values from previous text to pre-fill form
        const text = atsFeedback.parsedText || "";
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
        const phoneMatch = text.match(/[\+]?\d{10,12}/) || text.match(/phone\s*:\s*\d+/i) || text.match(/mobile\s*:\s*\d+/i);
        
        // Extract basic segments
        let extractedSummary = "";
        if (text.includes("summary")) {
          const index = text.indexOf("summary");
          extractedSummary = text.substring(index, index + 300).replace(/summary/i, "").trim();
        } else if (text.includes("profile")) {
          const index = text.indexOf("profile");
          extractedSummary = text.substring(index, index + 300).replace(/profile/i, "").trim();
        }

        setForm((prevForm) => ({
          ...prevForm,
          name: "Dhanush Kumar", // Default or user name
          email: emailMatch ? emailMatch[0] : prevForm.email,
          phone: phoneMatch ? phoneMatch[0] : prevForm.phone,
          summary: extractedSummary || prevForm.summary,
          skills: atsFeedback.detectedSkills && atsFeedback.detectedSkills.length > 0 
            ? atsFeedback.detectedSkills.join(", ") 
            : prevForm.skills,
        }));
      } catch (err) {
        console.error("Error parsing resume prefill state:", err);
      }
    }
  }, [atsFeedback]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearAnalysisCache = () => {
    clearAnalysis();
  };

  const downloadCompiledResume = () => {
    const resumeText = `RESUME: ${form.name.toUpperCase()}
==================================================
Email: ${form.email} | Phone: ${form.phone}

PROFESSIONAL SUMMARY:
--------------------
${form.summary}

CORE TECHNICAL SKILLS:
---------------------
${form.skills}

PROFESSIONAL EXPERIENCE:
-----------------------
${form.experience}

PROJECTS:
--------
${form.projects}

EDUCATION:
---------
${form.education}

==================================================
Compiled using CareerBridge AI Resume Template
`;

    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${form.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume-page" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div className="resume-header" style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "2.2rem", fontWeight: "800" }}>
          <FiEdit3 style={{ color: "var(--primary)" }} />
          <span>AI Resume Builder</span>
        </h1>
        <p style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          Create a highly optimized, placement-compliant resume. Feedbacks and prefilled details are synchronized below.
        </p>
      </div>

      {/* AI Low Score Audit Alert */}
      {atsFeedback && (
        <div style={{
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "35px",
          animation: "fadeIn 0.5s ease"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
            <h3 style={{ display: "inline-flex", alignItems: "center", gap: "10px", margin: 0, color: "#f59e0b", fontSize: "1.2rem", fontWeight: "700" }}>
              <FiAlertCircle size={20} />
              <span>AI Rebuilder Feedback: Previous Score - {atsFeedback.score}%</span>
            </h3>
            <button 
              onClick={clearAnalysisCache} 
              style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.85rem" }}
            >
              <FiRefreshCw size={14} />
              <span>Clear Analysis Cache</span>
            </button>
          </div>
          
          <p style={{ marginTop: "12px", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
            We've parsed your previous file **{atsFeedback.fileName}** and imported its details. It scored below 60% due to missing sections. Improve your template using our builder or target external builders.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "15px" }}>
            {/* Tips Column */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "18px", borderRadius: "12px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                <FiInfo style={{ color: "#3b82f6" }} />
                <span>Actionable Rebuild Tips</span>
              </h4>
              <ul style={{ paddingLeft: "15px", margin: 0, fontSize: "0.88rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "8px" }}>
                {atsFeedback.summaryNeeded && <li>Write a professional summary outlining your development goals.</li>}
                {atsFeedback.projectsNeeded && <li>Detail internship or practice projects containing core technologies.</li>}
                {atsFeedback.certsNeeded && <li>Add certification credentials under a dedicated heading.</li>}
                <li>Separate skill categories (e.g. languages, databases) with clean formatting.</li>
              </ul>
            </div>

            {/* External Portals Column */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "18px", borderRadius: "12px" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                <FiExternalLink style={{ color: "#10b981" }} />
                <span>Recommended External Builders</span>
              </h4>
              <p style={{ margin: "0 0 12px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>Click any of these verified, premium resume builders to draft optimized PDF templates:</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <a href="https://novoresume.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", textDecoration: "none", color: "#3b82f6", fontSize: "0.85rem", fontWeight: "600" }}>
                  <span>Novoresume</span>
                  <FiExternalLink size={12} />
                </a>
                <a href="https://www.canva.com/create/resumes/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.15)", textDecoration: "none", color: "#ec4899", fontSize: "0.85rem", fontWeight: "600" }}>
                  <span>Canva</span>
                  <FiExternalLink size={12} />
                </a>
                <a href="https://resume.io" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", textDecoration: "none", color: "#10b981", fontSize: "0.85rem", fontWeight: "600" }}>
                  <span>Resume.io</span>
                  <FiExternalLink size={12} />
                </a>
                <a href="https://www.kickresume.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "8px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", textDecoration: "none", color: "#8b5cf6", fontSize: "0.85rem", fontWeight: "600" }}>
                  <span>Kickresume</span>
                  <FiExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="builder-layout" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "30px" }}>
        
        {/* Editor Form Panel */}
        <div className="builder-form" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "25px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiLayout style={{ color: "var(--primary)" }} />
            <span>Resume Editor</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div className="settings-group" style={{ margin: 0 }}>
              <label>Full Name</label>
              <input type="text" name="name" value={form.name} placeholder="Your Name" onChange={handleChange} />
            </div>
            <div className="settings-group" style={{ margin: 0 }}>
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} placeholder="email@example.com" onChange={handleChange} />
            </div>
          </div>

          <div className="settings-group" style={{ margin: 0 }}>
            <label>Phone Number</label>
            <input type="text" name="phone" value={form.phone} placeholder="+91 XXXXX XXXXX" onChange={handleChange} />
          </div>

          <div className="settings-group" style={{ margin: 0 }}>
            <label>Professional Summary</label>
            <textarea name="summary" value={form.summary} rows="3" placeholder="2-3 sentence profile summary..." onChange={handleChange} />
          </div>

          <div className="settings-group" style={{ margin: 0 }}>
            <label>Technical Skills (comma separated)</label>
            <textarea name="skills" value={form.skills} rows="2" placeholder="Java, React, SQL..." onChange={handleChange} />
          </div>

          <div className="settings-group" style={{ margin: 0 }}>
            <label>Professional Experience</label>
            <textarea name="experience" value={form.experience} rows="4" placeholder="Role - Company&#10;- Accomplishment 1&#10;- Accomplishment 2" onChange={handleChange} />
          </div>

          <div className="settings-group" style={{ margin: 0 }}>
            <label>Key Projects</label>
            <textarea name="projects" value={form.projects} rows="4" placeholder="Project Name&#10;- Key details&#10;- Core tools used" onChange={handleChange} />
          </div>

          <div className="settings-group" style={{ margin: 0 }}>
            <label>Education Details</label>
            <textarea name="education" value={form.education} rows="2" placeholder="Degree, Institution & GPA..." onChange={handleChange} />
          </div>

          <button className="primary-btn" onClick={downloadCompiledResume} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "10px", padding: "14px 20px" }}>
            <FiDownload />
            <span>Download Formatted Resume</span>
          </button>
        </div>

        {/* Live Preview Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Template Selection Toggles */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "15px 20px", borderRadius: "14px" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>Choose Resume Template</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => setSelectedTemplate("classic")} 
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: selectedTemplate === "classic" ? "rgba(255,255,255,0.06)" : "transparent",
                  border: selectedTemplate === "classic" ? "1px solid var(--border-color)" : "1px solid transparent",
                  color: selectedTemplate === "classic" ? "var(--text-primary)" : "var(--text-secondary)"
                }}
              >
                Classic Minimalist
              </button>
              <button 
                onClick={() => setSelectedTemplate("careerbridge")} 
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: selectedTemplate === "careerbridge" ? "rgba(59, 130, 246, 0.12)" : "transparent",
                  border: selectedTemplate === "careerbridge" ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
                  color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-secondary)"
                }}
              >
                CareerBridge AI Premium
              </button>
            </div>
          </div>

          {/* Render Active Template Layout */}
          <div 
            className="resume-preview" 
            style={{
              background: selectedTemplate === "careerbridge" ? "#0b0f19" : "var(--bg-card)",
              border: selectedTemplate === "careerbridge" ? "2px solid rgba(59,130,246,0.3)" : "1px solid var(--border-color)",
              boxShadow: selectedTemplate === "careerbridge" ? "0 10px 30px rgba(59,130,246,0.05)" : "var(--shadow)",
              borderRadius: "20px",
              padding: "35px",
              minHeight: "680px",
              color: "#e2e8f0",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {/* Template Header layout */}
            {selectedTemplate === "careerbridge" ? (
              <div style={{ borderLeft: "4px solid #3b82f6", paddingLeft: "15px", marginBottom: "25px" }}>
                <h1 style={{ fontSize: "1.9rem", fontWeight: "800", letterSpacing: "-0.5px", margin: 0, color: "white" }}>
                  {form.name || "Your Name"}
                </h1>
                <div style={{ display: "flex", gap: "15px", marginTop: "6px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  <span>{form.email || "email@example.com"}</span>
                  <span>|</span>
                  <span>{form.phone || "+91 XXXXX XXXXX"}</span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", marginBottom: "25px" }}>
                <h1 style={{ fontSize: "1.7rem", fontWeight: "700", margin: 0 }}>{form.name || "Your Name"}</h1>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                  {form.email || "email@example.com"} | {form.phone || "+91 XXXXX XXXXX"}
                </p>
              </div>
            )}

            <hr style={{ borderColor: "rgba(255,255,255,0.08)", marginBottom: "20px" }} />

            {/* Summary */}
            <section style={{ marginBottom: "22px" }}>
              <h2 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-primary)", fontWeight: "700", margin: "0 0 8px" }}>
                Professional Summary
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", margin: 0 }}>
                {form.summary || "Professional summary details will appear here."}
              </p>
            </section>

            {/* Skills */}
            <section style={{ marginBottom: "22px" }}>
              <h2 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-primary)", fontWeight: "700", margin: "0 0 10px" }}>
                Core Competencies
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {form.skills ? (
                  form.skills.split(",").map((skill, index) => (
                    <span 
                      key={index}
                      style={{
                        fontSize: "0.8rem",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: selectedTemplate === "careerbridge" ? "rgba(59, 130, 246, 0.08)" : "rgba(255,255,255,0.03)",
                        border: selectedTemplate === "careerbridge" ? "1px solid rgba(59,130,246,0.15)" : "1px solid var(--border-color)",
                        color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-secondary)",
                        fontWeight: "600"
                      }}
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Skills list...</span>
                )}
              </div>
            </section>

            {/* Experience */}
            <section style={{ marginBottom: "22px" }}>
              <h2 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-primary)", fontWeight: "700", margin: "0 0 8px" }}>
                Professional Experience
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", whiteSpace: "pre-line", margin: 0 }}>
                {form.experience || "Work details will render here."}
              </p>
            </section>

            {/* Projects */}
            <section style={{ marginBottom: "22px" }}>
              <h2 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-primary)", fontWeight: "700", margin: "0 0 8px" }}>
                Technical Projects
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", whiteSpace: "pre-line", margin: 0 }}>
                {form.projects || "Key projects layout details..."}
              </p>
            </section>

            {/* Education */}
            <section style={{ marginBottom: "10px" }}>
              <h2 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", color: selectedTemplate === "careerbridge" ? "#3b82f6" : "var(--text-primary)", fontWeight: "700", margin: "0 0 8px" }}>
                Education Background
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", whiteSpace: "pre-line", margin: 0 }}>
                {form.education || "University degrees..."}
              </p>
            </section>

            {/* Premium Template footer mark */}
            {selectedTemplate === "careerbridge" && (
              <div style={{ marginTop: "40px", borderTop: "1px dashed rgba(255,255,255,0.05)", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
                <span>CareerBridge AI Placement Template</span>
                <FiAward />
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
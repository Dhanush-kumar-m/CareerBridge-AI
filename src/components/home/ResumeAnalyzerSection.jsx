"use client";

import Link from "next/link";
import { FiTarget, FiFilePlus, FiZap, FiCheck, FiAlertTriangle } from "react-icons/fi";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function ResumeAnalyzerSection() {
  return (
    <section id="resume-analyzer" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
        
        {/* Left Side: Text Details */}
        <AnimatedContent delay={0.1} yOffset={20}>
          <div>
            <span style={{ color: "#a78bfa", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Resume Intelligence</span>
            <h2 style={{ fontSize: "2.2rem", color: "#ffffff", margin: "10px 0 20px 0", lineHeight: "1.2" }}>
              Optimize Your Resume for ATS Parsers
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "25px" }}>
              Upload your resume to scan it against applicant tracking systems. Detect compliance metrics, identify missing critical keywords, verify formatting rules, and optimize your overall rating to bypass automated applicant filters.
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiTarget style={{ color: "#a78bfa" }} />
                <span>Keyword density checker matching target job descriptions</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiZap style={{ color: "#a78bfa" }} />
                <span>Instant ATS compliance scoring and layout feedback reports</span>
              </li>
            </ul>

            <Link href="/resume/analyzer" className="btn" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px",
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              boxShadow: "0 4px 15px rgba(167, 139, 250, 0.2)",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}>
              <FiFilePlus />
              <span>Analyze Resume</span>
            </Link>
          </div>
        </AnimatedContent>

        {/* Right Side: Code-Rendered ATS Compliance Panel */}
        <AnimatedContent delay={0.25} yOffset={20}>
          <div style={{
            position: "relative",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(17, 24, 39, 0.55)",
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(167, 139, 250, 0.08)",
            color: "#ffffff",
            textAlign: "left",
            backdropFilter: "blur(10px)"
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <span style={{ fontSize: "0.8rem", color: "#a78bfa", fontWeight: "700" }}>ATS SCORE CARD</span>
              <span style={{ fontSize: "0.75rem", background: "rgba(167, 139, 250, 0.12)", color: "#c084fc", padding: "4px 8px", borderRadius: "8px", fontWeight: "600" }}>Active Review</span>
            </div>

            {/* Score & Gauge */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "4px solid rgba(255, 255, 255, 0.05)",
                borderTopColor: "#a78bfa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                fontWeight: "800",
                color: "#a78bfa"
              }}>
                88%
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 4px 0" }}>High Match Rate</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>Your resume clears Zoho and Accenture entry requirements.</p>
              </div>
            </div>

            {/* Verification Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                <FiCheck style={{ color: "#10b981" }} />
                <span>Standard Sections (Education, Skills, Experience) Found</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                <FiCheck style={{ color: "#10b981" }} />
                <span>LinkedIn and GitHub Profile Anchors verified</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                <FiAlertTriangle style={{ color: "#f59e0b", flexShrink: 0 }} />
                <span style={{ color: "#e2e8f0" }}>Missing terms: <span style={{ color: "#f59e0b" }}>"CI/CD, Kubernetes, Webpack"</span></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                <FiCheck style={{ color: "#10b981" }} />
                <span>No complex nested elements or graphics detected</span>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

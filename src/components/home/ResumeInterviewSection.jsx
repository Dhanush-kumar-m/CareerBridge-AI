"use client";

import { FiFileText, FiMic } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function ResumeInterviewSection() {
  return (
    <section id="resume-interview" style={{ 
      padding: "100px 24px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)" 
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal textClassName="section-title">
            Optimize Resumes & Practice Interviews
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Improve how you present your skills and communicate your answers to stand out to hiring recruiters.
          </ScrollReveal>
        </div>

        {/* Info Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <AnimatedContent delay={0.1} yOffset={25}>
            <SpotlightCard 
              spotlightColor="rgba(167, 139, 250, 0.1)" 
              style={{ 
                height: "100%",
                padding: "32px",
                background: "rgba(17, 24, 39, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <h4 style={{ color: "#ffffff", fontSize: "1.3rem", marginBottom: "16px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" }}>
                <FiFileText style={{ color: "#a78bfa" }} />
                <span>Resume Analyzer</span>
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                Upload your resume to perform instant ATS compliance evaluations. Identify missing keyword targets, formatting checklists, and get structural tips to clear company filtering.
              </p>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent delay={0.25} yOffset={25}>
            <SpotlightCard 
              spotlightColor="rgba(251, 113, 133, 0.1)" 
              style={{ 
                height: "100%",
                padding: "32px",
                background: "rgba(17, 24, 39, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <h4 style={{ color: "#ffffff", fontSize: "1.3rem", marginBottom: "16px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" }}>
                <FiMic style={{ color: "#fb7185" }} />
                <span>AI Mock Interview</span>
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                Simulate technical and HR round placements. Record audio submissions to obtain detailed grades mapping answer content accuracy, speech fluency, and clarity feedback.
              </p>
            </SpotlightCard>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

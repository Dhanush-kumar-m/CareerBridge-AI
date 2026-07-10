"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function ResumeInterviewSection() {
  return (
    <section id="resume-interview" style={{ 
      padding: "80px 20px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)" 
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
          <AnimatedContent delay={0.1} yOffset={25}>
            <SpotlightCard spotlightColor="rgba(167, 139, 250, 0.1)" style={{ height: "100%" }}>
              <div style={{ padding: "30px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", height: "100%" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "12px", fontWeight: "700" }}>📄 Resume Analyzer</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                  Upload your resume to perform instant ATS compliance evaluations. Identify missing keyword targets, formatting checklists, and get structural tips to clear company filtering.
                </p>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent delay={0.25} yOffset={25}>
            <SpotlightCard spotlightColor="rgba(251, 113, 133, 0.1)" style={{ height: "100%" }}>
              <div style={{ padding: "30px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", height: "100%" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "12px", fontWeight: "700" }}>🎙️ AI Mock Interview</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                  Simulate technical and HR round placements. Record audio submissions to obtain detailed grades mapping answer content accuracy, speech fluency, and clarity feedback.
                </p>
              </div>
            </SpotlightCard>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

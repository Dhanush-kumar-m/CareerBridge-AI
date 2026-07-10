"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import { FiXCircle, FiCheckCircle } from "react-icons/fi";

export default function WhyPrepSection() {
  const painPoints = [
    "Unstructured learning from scattered materials",
    "No real-time feedback on code correctness",
    "Generic resumes that fail ATS parser filters",
    "Lack of confidence in verbal coding explanations"
  ];

  const valueProps = [
    "Integrated step-by-step roadmap from day one",
    "Hidden test cases and instant compiler scoring",
    "Real-time ATS compliance and missing keyword checks",
    "Recordable mock audio feedback on fluency and grammar"
  ];

  return (
    <section id="why-prep" style={{ 
      padding: "80px 24px",
      background: "rgba(255, 255, 255, 0.01)",
      borderTop: "1px solid rgba(255, 255, 255, 0.03)"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal textClassName="section-title">
            Why Placement Preparation Matters
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Hiring standards have risen. Standard practice sheets are no longer enough.
          </ScrollReveal>
        </div>

        {/* Side-by-Side Comparison */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "40px" 
        }}>
          {/* Traditional Prep Card */}
          <AnimatedContent delay={0.1} yOffset={20}>
            <div style={{
              background: "rgba(239, 68, 68, 0.02)",
              border: "1.5px solid rgba(239, 68, 68, 0.15)",
              borderRadius: "16px",
              padding: "40px 32px",
              height: "100%",
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.02)"
            }}>
              <h3 style={{ fontSize: "1.4rem", color: "#fca5a5", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FiXCircle style={{ color: "#ef4444" }} />
                <span>Traditional Practice</span>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                {painPoints.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    <span style={{ color: "#ef4444", fontSize: "1.2rem", marginTop: "-2px" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContent>

          {/* CareerBridge Prep Card */}
          <AnimatedContent delay={0.25} yOffset={20}>
            <div style={{
              background: "rgba(16, 185, 129, 0.02)",
              border: "1.5px solid rgba(16, 185, 129, 0.15)",
              borderRadius: "16px",
              padding: "40px 32px",
              height: "100%",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.02)"
            }}>
              <h3 style={{ fontSize: "1.4rem", color: "#6ee7b7", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FiCheckCircle style={{ color: "#10b981" }} />
                <span>The CareerBridge Track</span>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                {valueProps.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.92rem", color: "#e2e8f0", lineHeight: "1.5" }}>
                    <span style={{ color: "#10b981", fontSize: "1.2rem", marginTop: "-2px" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

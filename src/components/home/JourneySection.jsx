"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import ScrollStack from "../reactbits/ScrollStack";

export default function JourneySection() {
  const steps = [
    { title: "1. Discover Your Strengths", desc: "Evaluate your technical baseline and set target placement goals.", badge: "Step 1", color: "#6366f1" },
    { title: "2. Practice Aptitude Worksheets", desc: "Master Quantitative, Logical, and Verbal Ability worksheets to clear screening tests.", badge: "Step 2", color: "#10b981" },
    { title: "3. Improve Coding Skills", desc: "Practice data structures and algorithms using our browser-based multi-language coding compiler.", badge: "Step 3", color: "#a78bfa" },
    { title: "4. Prepare Company-Specific Questions", desc: "Access 30-Day placement prep roadmaps for product, service, and startup companies.", badge: "Step 4", color: "#f59e0b" },
    { title: "5. Build & Optimize Your Resume", desc: "Evaluate ATS compliance scoring, keyword density mapping, and format guidelines.", badge: "Step 5", color: "#3b82f6" },
    { title: "6. Practice Live Mock Interviews", desc: "Experience technical and HR mock simulations with voice evaluation and response feedback.", badge: "Step 6", color: "#fb7185" },
    { title: "7. Become Placement Ready", desc: "Build visual confidence, visual streaks, and high placement scores to secure placements.", badge: "Step 7", color: "#06b6d4" }
  ];

  return (
    <section id="journey" style={{ 
      padding: "80px 20px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Section Title with Scroll Reveal */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <ScrollReveal textClassName="section-title">
            Your Complete Placement Preparation Journey
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            CareerBridge brings every stage of placement preparation into one focused, step-by-step storytelling flow.
          </ScrollReveal>
        </div>

        {/* Storytelling Cards using ScrollStack */}
        <ScrollStack>
          {steps.map((s, idx) => (
            <div 
              key={idx}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "16px",
                padding: "35px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ 
                  fontSize: "0.75rem", 
                  color: s.color, 
                  fontWeight: "700", 
                  textTransform: "uppercase",
                  background: `rgba(${s.color === "#6366f1" ? "99, 102, 241" : s.color === "#10b981" ? "16, 185, 129" : s.color === "#a78bfa" ? "167, 139, 250" : s.color === "#f59e0b" ? "245, 158, 11" : s.color === "#3b82f6" ? "59, 130, 246" : s.color === "#fb7185" ? "251, 113, 133" : "6, 182, 212"}, 0.12)`,
                  padding: "4px 10px",
                  borderRadius: "12px"
                }}>
                  {s.badge}
                </span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#ffffff", margin: "10px 0 5px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.6" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
}

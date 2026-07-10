"use client";

import { FiShield, FiCode } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function PracticeSection() {
  return (
    <section id="practice" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal textClassName="section-title">
            Strengthen Aptitude and Coding
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Practice core topics using real-time feedback engines built to test your structural skills.
          </ScrollReveal>
        </div>

        {/* Practice Highlights Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <AnimatedContent delay={0.1} yOffset={25}>
            <SpotlightCard 
              spotlightColor="rgba(99, 102, 241, 0.1)" 
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
                <FiShield style={{ color: "#818cf8" }} />
                <span>Aptitude Training</span>
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                Solve Quantitative, Logical, and Verbal Ability worksheets. Solve questions with detailed reviews. Track completion progress and daily streaks.
              </p>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent delay={0.25} yOffset={25}>
            <SpotlightCard 
              spotlightColor="rgba(16, 185, 129, 0.1)" 
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
                <FiCode style={{ color: "#10b981" }} />
                <span>Coding Compiler</span>
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                Solve arrays, trees, dynamic programming, and core DSA problems. Write and compile code in Python, Java, C++, JS, or C using our online editor with hidden test-case validation.
              </p>
            </SpotlightCard>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

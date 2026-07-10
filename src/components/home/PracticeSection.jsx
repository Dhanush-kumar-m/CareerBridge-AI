"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function PracticeSection() {
  return (
    <section id="practice" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
          <AnimatedContent delay={0.1} yOffset={25}>
            <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.1)" style={{ height: "100%" }}>
              <div style={{ padding: "30px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", height: "100%" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "12px", fontWeight: "700" }}>🧠 Aptitude Training</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                  Solve Quantitative, Logical, and Verbal Ability worksheets. Solve questions with detailed reviews. Track completion progress and daily streaks.
                </p>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent delay={0.25} yOffset={25}>
            <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.1)" style={{ height: "100%" }}>
              <div style={{ padding: "30px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", height: "100%" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "12px", fontWeight: "700" }}>💻 Coding Compiler</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                  Solve arrays, trees, dynamic programming, and core DSA problems. Write and compile code in Python, Java, C++, JS, or C using our online editor with hidden test-case validation.
                </p>
              </div>
            </SpotlightCard>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

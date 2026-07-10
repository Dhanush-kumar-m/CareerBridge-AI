"use client";

import { FiShield, FiTrendingUp } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function AnalyticsSection() {
  return (
    <section id="analytics" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal textClassName="section-title">
            Track Your Growth
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            See your progress, completed activities, strengths, and areas to improve in real time.
          </ScrollReveal>
        </div>

        {/* Analytics Showcase Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          <AnimatedContent delay={0.1} yOffset={25}>
            <SpotlightCard 
              spotlightColor="rgba(6, 182, 212, 0.1)" 
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
                <FiShield style={{ color: "#06b6d4" }} />
                <span>Placement Readiness Score</span>
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                Obtain a single comprehensive score indicating your readiness level. Combines your overall aptitude accuracy, coding challenge completions, ATS resume scan results, and mock interview performance grades.
              </p>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent delay={0.25} yOffset={25}>
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
                <FiTrendingUp style={{ color: "#818cf8" }} />
                <span>Visual Progress Metrics</span>
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                Access detailed radar charts detailing your subject strengths, daily streak calendars tracking consistency, completion badges, and leaderboard rankings comparing performance with fellow students.
              </p>
            </SpotlightCard>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

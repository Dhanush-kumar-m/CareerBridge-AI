"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function AnalyticsSection() {
  return (
    <section id="analytics" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginBottom: "15px" }}>
              Track Your Growth
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto" }}>
              See your progress, completed activities, strengths, and areas to improve in real time.
            </p>
          </ScrollReveal>
        </div>

        {/* Analytics Showcase Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
          <AnimatedContent delay={0.1} yOffset={25}>
            <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.1)" style={{ height: "100%" }}>
              <div style={{ padding: "30px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", height: "100%" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "12px", fontWeight: "700" }}>📊 Placement Readiness Score</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                  Obtain a single comprehensive score indicating your readiness level. Combines your overall aptitude accuracy, coding challenge completions, ATS resume scan results, and mock interview performance grades.
                </p>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent delay={0.25} yOffset={25}>
            <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.1)" style={{ height: "100%" }}>
              <div style={{ padding: "30px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", height: "100%" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.25rem", marginBottom: "12px", fontWeight: "700" }}>📈 Visual Progress Metrics</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                  Access detailed radar charts detailing your subject strengths, daily streak calendars tracking consistency, completion badges, and leaderboard rankings comparing performance with fellow students.
                </p>
              </div>
            </SpotlightCard>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}

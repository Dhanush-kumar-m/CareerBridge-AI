"use client";

import { FiCpu, FiTerminal, FiFileText, FiMic, FiBriefcase, FiTrendingUp } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function FeaturesSection() {
  const highlights = [
    { title: "AI Powered Learning", desc: "Adaptive practice worksheets tailored to your weak subjects and performance scores.", icon: FiCpu, color: "#2563eb" },
    { title: "Online Coding Compiler", desc: "Solve challenges and run code in multiple languages with hidden test cases.", icon: FiTerminal, color: "#10b981" },
    { title: "AI Resume Analyzer", desc: "Scan and check your ATS compliance rating, missing keywords, and profile tips.", icon: FiFileText, color: "#3b82f6" },
    { title: "AI Mock Interview", desc: "Speech, confidence, and tech accuracy feedback evaluated by neural interviewers.", icon: FiMic, color: "#0ea5e9" },
    { title: "Company Preparation", desc: "30-Day Roadmaps, eligibilities, processes, and checksheets for target hiring partners.", icon: FiBriefcase, color: "#06b6d4" },
    { title: "Placement Analytics", desc: "Detailed radar charts, streaks tracking, and visual metrics detailing your progress.", icon: FiTrendingUp, color: "#60a5fa" }
  ];

  return (
    <section id="features" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <ScrollReveal textClassName="section-title">
            Practice for Every Stage
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Accelerating placements through modern features and modules built for target preparedness.
          </ScrollReveal>
        </div>

        {/* Feature Cards Grid with spotlight effects and stagger animation */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px" 
        }}>
          {highlights.map((h, i) => {
            const Icon = h.icon;
            const getRgbString = (hex) => {
              switch (hex) {
                case "#2563eb": return "37, 99, 235";
                case "#10b981": return "16, 185, 129";
                case "#3b82f6": return "59, 130, 246";
                case "#0ea5e9": return "14, 165, 233";
                case "#06b6d4": return "6, 182, 212";
                case "#60a5fa": return "96, 165, 250";
                default: return "59, 130, 246";
              }
            };
            const rgb = getRgbString(h.color);

            return (
              <AnimatedContent key={i} delay={i * 0.08} yOffset={20}>
                <SpotlightCard
                  spotlightColor={`rgba(${rgb}, 0.12)`}
                  style={{ 
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "32px 28px",
                    background: "rgba(17, 24, 39, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "16px"
                  }}
                >
                  <div style={{ 
                    width: "44px", 
                    height: "44px", 
                    borderRadius: "10px", 
                    background: `rgba(${rgb}, 0.12)`, 
                    color: h.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px"
                  }}>
                    <Icon size={22} />
                  </div>
                  <h4 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", margin: "0 0 8px 0" }}>{h.title}</h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.6" }}>{h.desc}</p>
                </SpotlightCard>
              </AnimatedContent>
            );
          })}
        </div>

      </div>
    </section>
  );
}

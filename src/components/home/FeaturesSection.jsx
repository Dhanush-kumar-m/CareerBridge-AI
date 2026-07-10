"use client";

import { FiCpu, FiTerminal, FiFileText, FiMic, FiBriefcase, FiTrendingUp } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function FeaturesSection() {
  const highlights = [
    { title: "AI Powered Learning", desc: "Adaptive practice worksheets tailored to your weak subjects and performance scores.", icon: FiCpu, color: "#6366f1" },
    { title: "Online Coding Compiler", desc: "Solve challenges and run code in multiple languages with hidden test cases.", icon: FiTerminal, color: "#10b981" },
    { title: "AI Resume Analyzer", desc: "Scan and check your ATS compliance rating, missing keywords, and profile tips.", icon: FiFileText, color: "#a78bfa" },
    { title: "AI Mock Interview", desc: "Speech, confidence, and tech accuracy feedback evaluated by neural interviewers.", icon: FiMic, color: "#fb7185" },
    { title: "Company Preparation", desc: "30-Day Roadmaps, eligibilities, processes, and checksheets for target hiring partners.", icon: FiBriefcase, color: "#f59e0b" },
    { title: "Placement Analytics", desc: "Detailed radar charts, streaks tracking, and visual metrics detailing your progress.", icon: FiTrendingUp, color: "#06b6d4" }
  ];

  return (
    <section id="features" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "25px" 
        }}>
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <AnimatedContent key={i} delay={i * 0.1} yOffset={20}>
                <SpotlightCard
                  spotlightColor={`rgba(${h.color === "#6366f1" ? "99, 102, 241" : h.color === "#10b981" ? "16, 185, 129" : h.color === "#a78bfa" ? "167, 139, 250" : h.color === "#fb7185" ? "251, 113, 133" : h.color === "#f59e0b" ? "245, 158, 11" : "6, 182, 212"}, 0.12)`}
                  style={{ height: "100%" }}
                >
                  <div style={{ 
                    padding: "24px", 
                    background: "rgba(255,255,255,0.01)", 
                    border: "1px solid rgba(255,255,255,0.06)", 
                    borderRadius: "14px",
                    height: "100%"
                  }}>
                    <div style={{ 
                      width: "44px", 
                      height: "44px", 
                      borderRadius: "10px", 
                      background: `rgba(${h.color === "#6366f1" ? "99, 102, 241" : h.color === "#10b981" ? "16, 185, 129" : h.color === "#a78bfa" ? "167, 139, 250" : h.color === "#fb7185" ? "251, 113, 133" : h.color === "#f59e0b" ? "245, 158, 11" : "6, 182, 212"}, 0.12)`, 
                      color: h.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "15px"
                    }}>
                      <Icon size={22} />
                    </div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", margin: "0 0 8px 0" }}>{h.title}</h4>
                    <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>{h.desc}</p>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            );
          })}
        </div>

      </div>
    </section>
  );
}

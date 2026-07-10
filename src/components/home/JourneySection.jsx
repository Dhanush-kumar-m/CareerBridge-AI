"use client";

import { FiCompass, FiBookOpen, FiCode, FiBriefcase, FiFileText, FiMic, FiAward } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import ScrollStack from "../reactbits/ScrollStack";

export default function JourneySection() {
  const steps = [
    { 
      title: "1. Baseline Skill Discovery", 
      desc: "Evaluate your technical baseline and set target placement goals based on current scores.", 
      badge: "Step 1", 
      icon: FiCompass,
      color: "#3b82f6" 
    },
    { 
      title: "2. Practice Aptitude Worksheets", 
      desc: "Master Quantitative, Logical, and Verbal Ability worksheets to clear company screening tests.", 
      badge: "Step 2", 
      icon: FiBookOpen,
      color: "#10b981" 
    },
    { 
      title: "3. Improve Coding Skills", 
      desc: "Practice data structures and algorithms using our browser-based multi-language coding compiler.", 
      badge: "Step 3", 
      icon: FiCode,
      color: "#6366f1" 
    },
    { 
      title: "4. Company-Specific Preps", 
      desc: "Access 30-Day placement prep roadmaps for product, service, and startup companies.", 
      badge: "Step 4", 
      icon: FiBriefcase,
      color: "#f59e0b" 
    },
    { 
      title: "5. ATS Resume Optimization", 
      desc: "Evaluate ATS compliance scoring, keyword density mapping, and structural guidelines.", 
      badge: "Step 5", 
      icon: FiFileText,
      color: "#a78bfa" 
    },
    { 
      title: "6. Interactive Mock Interviews", 
      desc: "Experience technical and HR mock simulations with voice evaluation and response feedback.", 
      badge: "Step 6", 
      icon: FiMic,
      color: "#fb7185" 
    },
    { 
      title: "7. Become Placement Ready", 
      desc: "Build confidence, track consistency streaks, and clear hiring rounds with high readiness scores.", 
      badge: "Step 7", 
      icon: FiAward,
      color: "#06b6d4" 
    }
  ];

  return (
    <section id="journey" style={{ 
      padding: "100px 24px", 
      background: "rgba(255, 255, 255, 0.005)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.03)"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Section Title with Scroll Reveal */}
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <ScrollReveal textClassName="section-title">
            Your Placement Preparation Roadmap
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            A structured, step-by-step educational timeline designed to prepare students for target hiring drives.
          </ScrollReveal>
        </div>

        {/* Storytelling Cards using ScrollStack */}
        <ScrollStack useWindowScroll={true} itemStackDistance={35} baseScale={0.8} blurAmount={2}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="scroll-stack-card"
                style={{
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: "24px",
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                  height: "20rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: `rgba(${s.color === "#3b82f6" ? "59, 130, 246" : s.color === "#10b981" ? "16, 185, 129" : s.color === "#6366f1" ? "99, 102, 241" : s.color === "#f59e0b" ? "245, 158, 11" : s.color === "#a78bfa" ? "167, 139, 250" : s.color === "#fb7185" ? "251, 113, 133" : "6, 182, 212"}, 0.1)`,
                    color: s.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: "0.8rem", color: s.color, fontWeight: "700", textTransform: "uppercase" }}>{s.badge}</span>
                </div>

                <h3 style={{ fontSize: "1.45rem", fontWeight: "800", color: "#ffffff", margin: "10px 0 5px" }}>
                  {s.title}
                </h3>
                
                <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.7" }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </ScrollStack>

      </div>
    </section>
  );
}

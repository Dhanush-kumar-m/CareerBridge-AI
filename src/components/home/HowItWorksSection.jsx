"use client";

import { useState } from "react";
import { FiPlus, FiMinus, FiCpu } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function HowItWorksSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqData = [
    { q: "How to start learning?", a: "Create a free account, complete your profile preferences, and select either Aptitude or Coding tracks to start practicing questions instantly." },
    { q: "How does the AI Resume Analyzer work?", a: "It scans the textual layout of your PDF/DOCX resume to detect standard fields (LinkedIn, GitHub, summary, education) and matches them against target company keyword densities." },
    { q: "How do AI Mock Interviews work?", a: "AI engines generate mock questions based on your category focus. Using audio recording or video capture, it grades your speaking speed, fluency, and answer content accuracy." },
    { q: "How do I practice coding?", a: "Go to the coding arena, select a programming language (Java, Python, C++, C, JS), choose a problem, write code inside our online compiler, and submit to pass test cases." },
    { q: "Is the compiler free?", a: "Yes, our web-based compiler is fully free and runs directly inside your browser with zero setup required." },
    { q: "How is the Placement Readiness Score calculated?", a: "It combines your overall aptitude accuracy, coding compiler completions, ATS resume scan results, and mock interview performance grades." }
  ];

  return (
    <section id="how-it-works" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <ScrollReveal textClassName="section-title">
            Frequently Asked Questions
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Clear your doubts about using CareerBridge AI.
          </ScrollReveal>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "60px" }}>
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <AnimatedContent key={idx} delay={idx * 0.08} yOffset={15}>
                <div style={{ 
                  background: "rgba(255,255,255,0.01)", 
                  border: "1px solid rgba(255,255,255,0.06)", 
                  borderRadius: "10px", 
                  overflow: "hidden" 
                }}>
                  <button 
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 24px",
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}
                  >
                    <span>{faq.q}</span>
                    <span>{isOpen ? <FiMinus /> : <FiPlus />}</span>
                  </button>

                  {isOpen && (
                    <div style={{ 
                      padding: "0 24px 20px", 
                      color: "var(--text-secondary)", 
                      fontSize: "0.88rem", 
                      lineHeight: "1.6" 
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              </AnimatedContent>
            );
          })}
        </div>

        {/* Future Roadmap Card */}
        <AnimatedContent delay={0.3} yOffset={20}>
          <div style={{ 
            background: "rgba(99, 102, 241, 0.03)", 
            border: "1px dashed rgba(99, 102, 241, 0.2)", 
            padding: "30px", 
            borderRadius: "18px" 
          }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>
              <FiCpu style={{ color: "#818cf8" }} />
              <span>Future Platform Roadmap Preview</span>
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
              <div>✦ AI Career Coach advisor profiles</div>
              <div>✦ Interactive GD (Group Discussion) simulator</div>
              <div>✦ Live multiplayer coding arenas</div>
              <div>✦ Job referral recommendation portals</div>
            </div>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}

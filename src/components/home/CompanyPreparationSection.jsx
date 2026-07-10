"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function CompanyPreparationSection() {
  const categories = [
    {
      title: "Product-Based",
      color: "#2563eb",
      desc: "Google, Microsoft, Amazon, Adobe, Oracle, Zoho, Salesforce.",
      details: "Practice dynamic programming, graph algorithms, and system design patterns common in product company rounds."
    },
    {
      title: "Service-Based",
      color: "#10b981",
      desc: "TCS, Infosys, Wipro, Cognizant, Capgemini, Accenture, IBM.",
      details: "Master quantitative worksheets, pseudocode decoding, verbal filters, and typical service company test structures."
    },
    {
      title: "Startups",
      color: "#3b82f6",
      desc: "Razorpay, CRED, PhonePe, Meesho, BrowserStack, Postman.",
      details: "Focus on operational project building, React/Node code tests, REST API integrations, and fast-paced startup rounds."
    }
  ];

  return (
    <section id="companies" style={{ 
      padding: "100px 24px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)" 
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <ScrollReveal textClassName="section-title">
            Prepare Company by Company
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Understand company patterns, coding difficulties, aptitude rounds, and eligibility roadmaps before entering the interview room.
          </ScrollReveal>
        </div>

        {/* Company Cards Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px" 
        }}>
          {categories.map((c, i) => {
            const getRgbString = (hex) => {
              switch (hex) {
                case "#2563eb": return "37, 99, 235";
                case "#10b981": return "16, 185, 129";
                case "#3b82f6": return "59, 130, 246";
                default: return "59, 130, 246";
              }
            };
            const rgb = getRgbString(c.color);

            return (
              <AnimatedContent key={i} delay={i * 0.1} yOffset={25}>
                <SpotlightCard 
                  spotlightColor={`rgba(${rgb}, 0.1)`} 
                  style={{ 
                    height: "100%",
                    padding: "32px 28px",
                    background: "rgba(17, 24, 39, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }}
                >
                <h4 style={{ color: c.color, margin: "0 0 12px 0", fontSize: "1.3rem", fontWeight: "700" }}>{c.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "#e2e8f0", margin: "0 0 16px 0", fontWeight: "600", letterSpacing: "0.02em" }}>{c.desc}</p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.6" }}>{c.details}</p>
              </SpotlightCard>
              </AnimatedContent>
            );
          })}
        </div>

      </div>
    </section>
  );
}

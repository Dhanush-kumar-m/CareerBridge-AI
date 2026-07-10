"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";
import SpotlightCard from "../reactbits/SpotlightCard";

export default function CompanyPreparationSection() {
  const categories = [
    {
      title: "Product-Based",
      color: "#6366f1",
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
      color: "#a78bfa",
      desc: "Razorpay, CRED, PhonePe, Meesho, BrowserStack, Postman.",
      details: "Focus on operational project building, React/Node code tests, REST API integrations, and fast-paced startup rounds."
    }
  ];

  return (
    <section id="companies" style={{ 
      padding: "80px 20px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)" 
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "25px" 
        }}>
          {categories.map((c, i) => (
            <AnimatedContent key={i} delay={i * 0.15} yOffset={25}>
              <SpotlightCard spotlightColor={`rgba(${c.color === "#6366f1" ? "99, 102, 241" : c.color === "#10b981" ? "16, 185, 129" : "167, 139, 250"}, 0.1)`} style={{ height: "100%" }}>
                <div style={{ 
                  padding: "24px", 
                  background: "rgba(255,255,255,0.02)", 
                  border: "1px solid rgba(255,255,255,0.05)", 
                  borderRadius: "12px",
                  height: "100%"
                }}>
                  <h4 style={{ color: c.color, margin: "0 0 10px 0", fontSize: "1.2rem", fontWeight: "700" }}>{c.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 15px 0", fontWeight: "600" }}>{c.desc}</p>
                  <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>{c.details}</p>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

      </div>
    </section>
  );
}

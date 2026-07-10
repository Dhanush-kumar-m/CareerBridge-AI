"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import CountUp from "../reactbits/CountUp";

export default function StatisticsSection() {
  const stats = [
    { value: 500, label: "Aptitude Questions" },
    { value: 16, label: "Coding Problems" },
    { value: 35, label: "Interview Questions" },
    { value: 8, label: "Companies Covered" },
    { value: 5, label: "Programming Languages" }
  ];

  return (
    <section id="statistics" style={{ 
      padding: "80px 24px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)", 
      borderBottom: "1px solid rgba(255, 255, 255, 0.04)" 
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal textClassName="section-title">
            Verified Learning Resources
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            Built with structured content ready for student practice.
          </ScrollReveal>
        </div>

        {/* Counter Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
          textAlign: "center"
        }}>
          {stats.map((s, idx) => (
            <div key={idx} style={{ 
              padding: "28px 20px", 
              background: "rgba(17, 24, 39, 0.4)", 
              border: "1px solid rgba(255, 255, 255, 0.06)", 
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
            }}>
              <strong style={{ display: "block", fontSize: "2.5rem", fontWeight: "800", color: "#ffffff", fontFamily: "'Outfit', sans-serif" }}>
                <CountUp to={s.value} duration={1.5} />
                {s.value >= 100 ? "+" : ""}
              </strong>
              <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "8px", display: "inline-block", fontWeight: "500" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

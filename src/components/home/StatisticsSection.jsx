"use client";

import ScrollReveal from "../reactbits/ScrollReveal";
import CountUp from "../reactbits/CountUp";

export default function StatisticsSection() {
  const stats = [
    { value: 10000, label: "Aptitude Questions" },
    { value: 15000, label: "Coding Problems" },
    { value: 500, label: "Interview Questions" },
    { value: 100, label: "Companies Covered" },
    { value: 5, label: "Programming Languages" }
  ];

  return (
    <section id="statistics" style={{ 
      padding: "60px 20px", 
      background: "rgba(255, 255, 255, 0.01)", 
      borderTop: "1px solid rgba(255, 255, 255, 0.04)", 
      borderBottom: "1px solid rgba(255, 255, 255, 0.04)" 
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <ScrollReveal>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
              Verified Learning Resources
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Built with structured content ready for student practice.
            </p>
          </ScrollReveal>
        </div>

        {/* Counter Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          textAlign: "center"
        }}>
          {stats.map((s, idx) => (
            <div key={idx} style={{ 
              padding: "20px", 
              background: "rgba(255, 255, 255, 0.01)", 
              border: "1px solid rgba(255, 255, 255, 0.06)", 
              borderRadius: "14px" 
            }}>
              <strong style={{ display: "block", fontSize: "2.4rem", fontWeight: "800", color: "#ffffff" }}>
                <CountUp to={s.value} duration={1.5} />
                {s.value >= 100 ? "+" : ""}
              </strong>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "6px", display: "inline-block" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

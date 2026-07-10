"use client";

import { FiMessageSquare, FiStar, FiUser } from "react-icons/fi";
import ScrollReveal from "../reactbits/ScrollReveal";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rohan Sharma",
      role: "Software Development Engineer",
      company: "Zoho",
      text: "The coding compiler and the 30-day prep roadmap were game changers. Passing the hidden test cases prepared me perfectly for Zoho's offline screening test.",
      rating: 5
    },
    {
      name: "Priya Nair",
      role: "Analyst",
      company: "Accenture",
      text: "CareerBridge's Aptitude training helped me cut down my solving speed by half. The resume optimizer also helped me clear initial recruitment filters.",
      rating: 5
    },
    {
      name: "Ankit Verma",
      role: "Associate SDE",
      company: "CRED",
      text: "The speech feedback inside the AI Mock Interview felt like sitting in front of a real interviewer. The confidence metrics gave me direct points to improve.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" style={{ 
      padding: "80px 24px",
      background: "rgba(255, 255, 255, 0.005)",
      borderTop: "1px solid rgba(255, 255, 255, 0.03)"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <ScrollReveal textClassName="section-title">
            Student Success Stories
          </ScrollReveal>
          <ScrollReveal textClassName="section-subtitle">
            See how CareerBridge helped candidates clear hiring rounds and secure placements.
          </ScrollReveal>
        </div>

        {/* Testimonial Cards Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "24px" 
        }}>
          {testimonials.map((t, idx) => (
            <AnimatedContent key={idx} delay={idx * 0.08} yOffset={20}>
              <div style={{
                background: "rgba(17, 24, 39, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "32px 28px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
              }}>
                <div>
                  {/* Rating Stars */}
                  <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} size={15} style={{ fill: "#fbbf24", stroke: "#fbbf24" }} />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.6", fontStyle: "italic", margin: "0 0 24px 0" }}>
                    “{t.text}”
                  </p>
                </div>

                {/* Author Info */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.04)", paddingTop: "16px", width: "100%" }}>
                  <div style={{ 
                    width: "36px", 
                    height: "36px", 
                    borderRadius: "50%", 
                    background: "rgba(255, 255, 255, 0.05)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "var(--primary)" 
                  }}>
                    <FiUser size={18} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: "0.92rem", fontWeight: "700", color: "#ffffff", margin: 0 }}>{t.name}</h5>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                      {t.role} @ <strong style={{ color: "var(--primary)" }}>{t.company}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>

      </div>
    </section>
  );
}

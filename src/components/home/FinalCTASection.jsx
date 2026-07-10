"use client";

import Link from "next/link";
import ScrollReveal from "../reactbits/ScrollReveal";
import ScrollFloat from "../reactbits/ScrollFloat";
import FadeContent from "../reactbits/FadeContent";

export default function FinalCTASection({ isAuthenticated }) {
  return (
    <section id="get-started" className="cta-section" style={{
      margin: "40px auto 60px",
      textAlign: "center",
      padding: "60px 24px",
      minHeight: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.09) 0%, transparent 65%)"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Large ScrollFloat transition statement */}
        <div style={{ marginBottom: "30px" }}>
          <ScrollFloat textClassName="scroll-float-highlight">
            “Preparation becomes progress when you practice consistently.”
          </ScrollFloat>
        </div>

        {/* Call to action details with Scroll Reveal */}
        <ScrollReveal textClassName="section-title">
          Ready to Begin?
        </ScrollReveal>
        
        <div style={{ margin: "10px 0 35px 0" }}>
          <ScrollReveal textClassName="section-subtitle">
            Start building your placement readiness today. Practice aptitude worksheets, optimize your resume for ATS parsers, compile code, and take AI mock interviews.
          </ScrollReveal>
        </div>

        {/* Single Contextual CTA with FadeContent */}
        {isAuthenticated && (
          <FadeContent delay={0.25}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href="/dashboard" className="btn" style={{
                padding: "14px 36px",
                fontSize: "1rem",
                fontWeight: "700",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.25)"
              }}>
                Go to Student Dashboard
              </Link>
            </div>
          </FadeContent>
        )}

      </div>
    </section>
  );
}

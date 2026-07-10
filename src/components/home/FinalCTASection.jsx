"use client";

import Link from "next/link";
import ScrollReveal from "../reactbits/ScrollReveal";
import ScrollFloat from "../reactbits/ScrollFloat";
import FadeContent from "../reactbits/FadeContent";

export default function FinalCTASection({ isAuthenticated }) {
  return (
    <section id="get-started" className="cta-section" style={{
      margin: "80px auto 100px",
      textAlign: "center",
      padding: "80px 40px",
      background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.08) 0%, transparent 70%)"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Large ScrollFloat transition statement */}
        <div style={{ marginBottom: "40px" }}>
          <ScrollFloat>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#a78bfa", margin: 0 }}>
              “Preparation becomes progress when you practice consistently.”
            </h3>
          </ScrollFloat>
        </div>

        {/* Call to action details with Scroll Reveal */}
        <ScrollReveal>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "15px", fontWeight: "800", color: "#ffffff" }}>
            Ready to Begin?
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 35px", fontSize: "1.05rem", lineHeight: "1.6" }}>
            Start building your placement readiness today. Practice aptitude worksheets, optimize your resume for ATS parsers, compile code, and take AI mock interviews.
          </p>
        </ScrollReveal>

        {/* Staggered action buttons with FadeContent */}
        <FadeContent delay={0.25}>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <Link href={isAuthenticated ? "/dashboard" : "/register"} className="btn">Get Started</Link>
            <Link href="/coding" className="btn-outline">Practice Coding</Link>
            <Link href="/resume/analyzer" className="btn-outline">Analyze Resume</Link>
            <Link href="/mock-interview" className="btn-outline">Start AI Interview</Link>
          </div>
        </FadeContent>

      </div>
    </section>
  );
}

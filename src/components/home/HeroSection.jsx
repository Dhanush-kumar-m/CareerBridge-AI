"use client";

import Link from "next/link";
import { FiArrowRight, FiCode, FiFileText, FiMic, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import SplitText from "../reactbits/SplitText";
import FadeContent from "../reactbits/FadeContent";

export default function HeroSection({ isAuthenticated }) {
  return (
    <section id="hero" className="hero-section" style={{
      position: "relative",
      padding: "120px 24px 80px",
      textAlign: "center",
      overflow: "hidden",
      background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 65%)"
    }}>
      <div className="hero-content" style={{ maxWidth: "850px", margin: "0 auto" }}>
        
        {/* Animated Badge */}
        <FadeContent delay={0.1}>
          <span className="hero-badge" style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            border: "1px solid rgba(99, 102, 241, 0.3)", 
            color: "#818cf8", 
            background: "rgba(99, 102, 241, 0.08)", 
            padding: "6px 14px", 
            borderRadius: "30px", 
            fontSize: "0.85rem", 
            fontWeight: "700",
            marginBottom: "20px"
          }}>
            <FiCheckCircle size={14} />
            <span>Enterprise Placement Training Portal</span>
          </span>
        </FadeContent>

        {/* Animated Split Text Title */}
        <h1 style={{ marginTop: "10px", fontSize: "3.5rem", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.03em", color: "#ffffff" }}>
          <SplitText text="Build Skills. Practice Smarter." delay={0.2} animationDelay={0.03} />
          <br />
          Get <span className="gradient-text">Placement Ready</span>
        </h1>

        {/* Animated Description & CTA Buttons */}
        <FadeContent delay={0.6}>
          <p style={{ margin: "24px auto 35px", fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "700px" }}>
            Master Aptitude, Coding, Resume Building, Mock Interviews, Company Preparation, Technical Subjects, and Placement Analytics—all in one AI-powered platform.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <Link href={isAuthenticated ? "/dashboard" : "/register"} className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span>Get Started</span>
              <FiArrowRight />
            </Link>
            <Link href="/coding" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FiCode />
              <span>Practice Coding</span>
            </Link>
            <Link href="/resume/analyzer" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FiFileText />
              <span>Analyze Resume</span>
            </Link>
            <Link href="/mock-interview" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FiMic />
              <span>AI Mock Interview</span>
            </Link>
            <Link href="/companies" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FiBriefcase />
              <span>Explore Companies</span>
            </Link>
          </div>
        </FadeContent>

      </div>
    </section>
  );
}

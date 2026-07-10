"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCode, FiFileText, FiMic, FiBriefcase, FiShield } from "react-icons/fi";
import SplitText from "../reactbits/SplitText";
import FadeContent from "../reactbits/FadeContent";

export default function HeroSection({ isAuthenticated }) {
  return (
    <section id="hero" className="hero-section" style={{
      position: "relative",
      padding: "140px 24px 100px",
      textAlign: "center",
      overflow: "hidden",
      background: "radial-gradient(circle at top, rgba(99, 102, 241, 0.09) 0%, transparent 60%)"
    }}>
      {/* Decorative background glow circles */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div className="hero-content" style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Animated Badge */}
        <FadeContent delay={0.1}>
          <span className="hero-badge" style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            border: "1px solid rgba(99, 102, 241, 0.2)", 
            color: "#a5b4fc", 
            background: "rgba(99, 102, 241, 0.05)", 
            padding: "8px 16px", 
            borderRadius: "50px", 
            fontSize: "0.85rem", 
            fontWeight: "600",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.05)",
            marginBottom: "28px"
          }}>
            <FiShield size={13} style={{ color: "#818cf8" }} />
            <span>Next-Gen Career Training Infrastructure</span>
          </span>
        </FadeContent>

        {/* Animated Split Text Title */}
        <h1 style={{ 
          marginTop: "15px", 
          fontSize: "clamp(2.5rem, 6vw, 4.2rem)", 
          fontWeight: "800", 
          lineHeight: "1.15", 
          letterSpacing: "-0.03em", 
          color: "#ffffff" 
        }}>
          <SplitText text="Crack Your Dream Job With" delay={0.2} animationDelay={0.03} />
          <br />
          <span className="gradient-text" style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            CareerBridge AI
          </span>
        </h1>

        {/* Animated Description */}
        <FadeContent delay={0.5}>
          <p style={{ 
            margin: "24px auto 38px", 
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)", 
            color: "var(--text-secondary)", 
            lineHeight: "1.7", 
            maxWidth: "720px",
            fontWeight: "400"
          }}>
            An institutional-grade platform designed to accelerate candidate preparation. Master Aptitude assessments, solve Coding challenges, scan ATS resumes, and practice live mock interviews.
          </p>

          {/* Clean Redesigned CTA Buttons */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "12px", 
            flexWrap: "wrap",
            marginBottom: "20px"
          }}>
            <Link href={isAuthenticated ? "/dashboard" : "/register"} className="btn" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px",
              padding: "12px 28px",
              fontWeight: "600",
              borderRadius: "10px",
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.25)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}>
              <span>Access Student Portal</span>
              <FiArrowRight />
            </Link>
            
            <Link href="/coding" className="btn-outline" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "6px",
              padding: "12px 22px",
              fontWeight: "600",
              borderRadius: "10px",
              fontSize: "0.95rem",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(12px)",
              transition: "border 0.2s, background 0.2s"
            }}>
              <FiCode />
              <span>Practice Coding</span>
            </Link>
          </div>
        </FadeContent>

        {/* Dashboard Mockup Showcase */}
        <FadeContent delay={0.7}>
          <div className="hero-preview-container" style={{
            position: "relative",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            background: "rgba(10, 12, 26, 0.45)",
            padding: "8px",
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px rgba(99, 102, 241, 0.12)",
            maxWidth: "920px",
            margin: "48px auto 0",
            overflow: "hidden",
            backdropFilter: "blur(20px)"
          }}>
            {/* Top Bar Decoration to look like a browser window */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px 12px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.04)"
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
              <div style={{
                height: "14px",
                width: "120px",
                background: "rgba(255, 255, 255, 0.04)",
                borderRadius: "4px",
                marginLeft: "15px"
              }} />
            </div>
            {/* Live Rendered Dashboard Preview */}
            <div style={{
              background: "rgba(10, 12, 26, 0.55)",
              padding: "28px 24px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              textAlign: "left",
              color: "#ffffff",
              borderTop: "1px solid rgba(255, 255, 255, 0.04)"
            }}>
              {/* Card 1: Readiness */}
              <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
              }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.03em" }}>Placement Readiness</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "12px 0 10px" }}>
                  <span style={{ fontSize: "2.1rem", fontWeight: "800", color: "#818cf8", fontFamily: "'Outfit', sans-serif" }}>85%</span>
                  <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: "600" }}>+5% this week</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "85%", height: "100%", background: "linear-gradient(90deg, #6366f1, #818cf8)" }} />
                </div>
              </div>

              {/* Card 2: Coding Streak */}
              <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
              }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.03em" }}>Coding Challenges</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "12px 0 14px" }}>
                  <span style={{ fontSize: "2.1rem", fontWeight: "800", color: "#10b981", fontFamily: "'Outfit', sans-serif" }}>42</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: "500" }}>solved / 5 streak</span>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} style={{ 
                      width: "16px", 
                      height: "16px", 
                      borderRadius: "4px", 
                      background: i < 5 ? "#10b981" : "rgba(255, 255, 255, 0.05)",
                      boxShadow: i < 5 ? "0 0 10px rgba(16, 185, 129, 0.3)" : "none"
                    }} />
                  ))}
                </div>
              </div>

              {/* Card 3: ATS Score */}
              <div style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)"
              }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.03em" }}>Resume ATS Match</span>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "12px 0 10px" }}>
                  <span style={{ fontSize: "2.1rem", fontWeight: "800", color: "#a78bfa", fontFamily: "'Outfit', sans-serif" }}>88/100</span>
                  <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: "600" }}>ATS Approved</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "88%", height: "100%", background: "linear-gradient(90deg, #a78bfa, #7c3aed)" }} />
                </div>
              </div>
            </div>
          </div>
        </FadeContent>

      </div>
    </section>
  );
}

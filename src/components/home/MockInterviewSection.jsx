"use client";

import Link from "next/link";
import { FiMic, FiAward, FiVolume2, FiMessageCircle } from "react-icons/fi";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function MockInterviewSection() {
  return (
    <section id="mock-interview-showcase" style={{ 
      padding: "80px 24px",
      background: "rgba(255, 255, 255, 0.005)",
      borderTop: "1px solid rgba(255, 255, 255, 0.02)"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
        
        {/* Left Side: Code-Rendered Audio Waveform Feedback */}
        <AnimatedContent delay={0.1} yOffset={20}>
          <div style={{
            position: "relative",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(17, 24, 39, 0.55)",
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(251, 113, 133, 0.08)",
            color: "#ffffff",
            textAlign: "left",
            backdropFilter: "blur(10px)"
          }}>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes bounceWave {
                0% { transform: scaleY(0.3); }
                100% { transform: scaleY(1.3); }
              }
            `}} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <span style={{ fontSize: "0.8rem", color: "#fb7185", fontWeight: "700" }}>AI INTERVIEW CONSOLE</span>
              <span style={{ fontSize: "0.75rem", background: "rgba(251, 113, 133, 0.12)", color: "#fda4af", padding: "4px 8px", borderRadius: "8px", fontWeight: "600" }}>Recording Active</span>
            </div>

            {/* Question display */}
            <div style={{ padding: "16px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "10px", borderLeft: "4px solid #fb7185", marginBottom: "20px" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.03em" }}>Question Prompt</span>
              <p style={{ fontSize: "0.88rem", color: "#ffffff", margin: "6px 0 0 0", lineHeight: "1.4" }}>
                "How do you resolve memory leak cycles when implementing closures in JavaScript?"
              </p>
            </div>

            {/* Audio Waveform Simulator */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", height: "50px", marginBottom: "20px" }}>
              {[8, 14, 25, 38, 18, 12, 28, 40, 22, 14, 30, 48, 16, 20, 8].map((val, idx) => (
                <div key={idx} style={{ 
                  width: "5px", 
                  height: `${val}px`, 
                  borderRadius: "2px", 
                  background: "#fb7185", 
                  animation: `bounceWave 0.6s ease-in-out infinite alternate`, 
                  animationDelay: `${idx * 0.04}s`,
                  transformOrigin: "center"
                }} />
              ))}
            </div>

            {/* Live Analytics Checklist */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "16px" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>Pace Speed</span>
                <div style={{ fontSize: "1rem", fontWeight: "700", color: "#fb7185" }}>128 WPM</div>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>Grammar & Tone</span>
                <div style={{ fontSize: "1rem", fontWeight: "700", color: "#10b981" }}>Professional</div>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* Right Side: Text Details */}
        <AnimatedContent delay={0.25} yOffset={20}>
          <div>
            <span style={{ color: "#fb7185", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Interview Engine</span>
            <h2 style={{ fontSize: "2.2rem", color: "#ffffff", margin: "10px 0 20px 0", lineHeight: "1.2" }}>
              Practice Live Technical & HR Interviews
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "25px" }}>
              Simulate high-pressure company interview rounds. Record audio responses directly inside the portal. Obtain immediate metrics evaluating speech fluency, grammar accuracy, keyword matching, and answer content accuracy.
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiVolume2 style={{ color: "#fb7185" }} />
                <span>Audio capture with visual speech waveforms and analyzer</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiMessageCircle style={{ color: "#fb7185" }} />
                <span>Subject questions tailored to specific technical domains</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiAward style={{ color: "#fb7185" }} />
                <span>Confidence grades and feedback pointers per response</span>
              </li>
            </ul>

            <Link href="/mock-interview" className="btn" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px",
              background: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
              boxShadow: "0 4px 15px rgba(251, 113, 133, 0.2)",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}>
              <FiMic />
              <span>Start Mock Interview</span>
            </Link>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}

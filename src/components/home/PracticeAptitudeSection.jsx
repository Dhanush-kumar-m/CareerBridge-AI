"use client";

import Link from "next/link";
import { FiBookOpen, FiHelpCircle, FiCheck, FiCpu } from "react-icons/fi";
import AnimatedContent from "../reactbits/AnimatedContent";

export default function PracticeAptitudeSection() {
  return (
    <section id="aptitude-training" style={{ 
      padding: "80px 24px",
      background: "rgba(255, 255, 255, 0.005)",
      borderTop: "1px solid rgba(255, 255, 255, 0.02)"
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
        
        {/* Left Side: Mock Aptitude Question UI Card (Visual Content) */}
        <AnimatedContent delay={0.1} yOffset={20}>
          <div style={{
            position: "relative",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(17, 24, 39, 0.55)",
            padding: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 35px rgba(99, 102, 241, 0.07)",
            backdropFilter: "blur(12px)"
          }}>
            {/* Mock Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <span style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: "700" }}>QUANTITATIVE METHODOLOGY</span>
              <span style={{ fontSize: "0.75rem", background: "rgba(99, 102, 241, 0.12)", color: "#a5b4fc", padding: "4px 8px", borderRadius: "8px", fontWeight: "600" }}>Level: Medium</span>
            </div>

            {/* Question Text */}
            <h4 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: "600", marginBottom: "18px", display: "flex", gap: "10px", lineHeight: "1.4" }}>
              <FiHelpCircle style={{ color: "#818cf8", flexShrink: 0, marginTop: "2px" }} />
              <span>Find the probability of getting a sum of 7 when rolling two standard six-sided dice.</span>
            </h4>

            {/* MCQ Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", padding: "12px 16px", border: "1px solid rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.05)", borderRadius: "10px", cursor: "default" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "#10b981" }}>A. 1/6</span>
                <FiCheck style={{ color: "#10b981", marginLeft: "auto" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", border: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(255, 255, 255, 0.01)", borderRadius: "10px" }}>
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>B. 5/36</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", border: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(255, 255, 255, 0.01)", borderRadius: "10px" }}>
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>C. 7/36</span>
              </div>
            </div>

            {/* Explanation Feedback Box */}
            <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderLeft: "3.5px solid #10b981", borderRadius: "0 10px 10px 0" }}>
              <strong style={{ fontSize: "0.85rem", color: "#10b981", display: "block", marginBottom: "4px" }}>Correct Answer Explanation</strong>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.4" }}>
                Sample space is 36. Favorable outcomes are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) which total 6 outcomes. Probability = 6/36 = 1/6.
              </p>
            </div>
          </div>
        </AnimatedContent>

        {/* Right Side: Text Details */}
        <AnimatedContent delay={0.25} yOffset={20}>
          <div>
            <span style={{ color: "#818cf8", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>Aptitude Training</span>
            <h2 style={{ fontSize: "2.2rem", color: "#ffffff", margin: "10px 0 20px 0", lineHeight: "1.2" }}>
              Master Aptitude Worksheets
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7", marginBottom: "25px" }}>
              Solve targeted Quantitative, Logical, and Verbal Ability practice questions. Gain conceptual confidence through instant worksheet evaluation, scoring metrics, and details explanations.
            </p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiBookOpen style={{ color: "#818cf8" }} />
                <span>Quantitative, logical, and verbal topics covered</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#e2e8f0" }}>
                <FiCpu style={{ color: "#818cf8" }} />
                <span>Smart progress tracking and daily practice streaks</span>
              </li>
            </ul>

            <Link href="/aptitude" className="btn" style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px",
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.2)",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "0.95rem"
            }}>
              <FiBookOpen />
              <span>Practice Aptitude</span>
            </Link>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}

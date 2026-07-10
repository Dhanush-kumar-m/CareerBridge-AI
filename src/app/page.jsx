"use client";

import { useState } from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import Lightfall from "../components/common/Lightfall";
import {
  FiBookOpen,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMic,
  FiTrendingUp,
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiTerminal,
  FiDatabase,
  FiCpu,
  FiPlus,
  FiMinus,
  FiCheck,
  FiStar,
  FiCompass,
  FiMapPin,
  FiHelpCircle
} from "react-icons/fi";

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  // FAQs Accordion states
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const stats = [
    { value: "10,000+", label: "Coding Problems" },
    { value: "15,000+", label: "Aptitude Questions" },
    { value: "500+", label: "Interview Questions" },
    { value: "100+", label: "Companies Covered" },
    { value: "5", label: "Programming Languages" },
    { value: "24/7", label: "Learning Support" }
  ];

  const highlights = [
    { title: "AI Powered Learning", desc: "Adaptive practice tailored to your weak subjects and performance scores.", icon: FiCpu, color: "#6366f1" },
    { title: "Online Coding Compiler", desc: "Solve challenges and run code in multiple languages with hidden test cases.", icon: FiTerminal, color: "#10b981" },
    { title: "AI Resume Analyzer", desc: "Scan and check your ATS compliance rating, missing keywords, and profile tips.", icon: FiFileText, color: "#a78bfa" },
    { title: "AI Mock Interview", desc: "Speech, confidence, and tech accuracy feedback evaluated by neural interviewers.", icon: FiMic, color: "#fb7185" },
    { title: "Company Preparation", desc: "30-Day Roadmaps, eligibilities, processes, and checksheets for target hiring partners.", icon: FiBriefcase, color: "#f59e0b" },
    { title: "Placement Analytics", desc: "Detailed radar charts, streaks tracking, and visual metrics detailing your progress.", icon: FiTrendingUp, color: "#06b6d4" }
  ];

  const journeySteps = [
    { step: "Step 1", title: "Create Account", desc: "Register your developer profile." },
    { step: "Step 2", title: "Complete Profile", desc: "List your tech interests and target companies." },
    { step: "Step 3", title: "Upload Resume", desc: "Obtain your starting ATS score checklist." },
    { step: "Step 4", title: "Practice Aptitude", desc: "Master quantitative and logical topics." },
    { step: "Step 5", title: "Practice Coding", desc: "Solve arrays, trees, and dynamic programming." },
    { step: "Step 6", title: "Study Core Subjects", desc: "Revise DBMS, SQL queries, OS, and Networks." },
    { step: "Step 7", title: "Take Mock Interviews", desc: "Test voice and technical responses in simulations." },
    { step: "Step 8", title: "Prepare Company-wise", desc: "Crack past recruiter files and roadmaps." },
    { step: "Step 9", title: "Become Placement Ready", desc: "Meet corporate benchmarks and get hired." }
  ];

  const faqData = [
    { q: "How to start learning?", a: "Create a free account, complete your profile preferences, and select either Aptitude or Coding tracks to start practicing questions instantly." },
    { q: "How does the AI Resume Analyzer work?", a: "It scans the textual layout of your PDF/DOCX resume to detect standard fields (LinkedIn, GitHub, summary, education) and matches them against target company keyword densities." },
    { q: "How do AI Mock Interviews work?", a: "AI engines generate mock questions based on your category focus. Using audio recording or video capture, it grades your speaking speed, fluency, and answer content accuracy." },
    { q: "How do I practice coding?", a: "Go to the coding arena, select a programming language (Java, Python, C++, C, JS), choose a problem, write code inside our online compiler, and submit to pass test cases." },
    { q: "Is the compiler free?", a: "Yes, our web-based compiler is fully free and runs directly inside your browser with zero setup required." },
    { q: "How is the Placement Readiness Score calculated?", a: "It combines your overall aptitude accuracy, coding compiler completions, ATS resume scan results, and mock interview performance grades." }
  ];

  return (
    <main className="home-page" style={{ padding: "0" }}>
      
      {/* Top Section Wrapper with Full-bleed Lightfall Background */}
      <div style={{ 
        position: "relative", 
        overflow: "hidden",
        width: "100%",
        background: "#05070f"
      }}>
        {/* Full-bleed absolute Lightfall background */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          zIndex: 0, 
          opacity: 0.35,
          pointerEvents: "none",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)"
        }}>
          <Lightfall
            colors={['#6366f1', '#a78bfa', '#fb7185']}
            backgroundColor="#05070f"
            speed={0.4}
            streakCount={4}
            streakWidth={0.8}
            streakLength={0.8}
            glow={0.8}
            density={0.5}
            twinkle={0.8}
            zoom={2.5}
            backgroundGlow={0.3}
            opacity={0.6}
            mouseInteraction={true}
          />
        </div>

        {/* Hero Section */}
        <section className="hero-section" style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px 80px",
          textAlign: "center"
        }}>
          <div className="hero-content" style={{ maxWidth: "850px", margin: "0 auto" }}>
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
              fontWeight: "700" 
            }}>
              <FiCheckCircle size={14} />
              <span>Enterprise Placement Training Portal</span>
            </span>

            <h1 style={{ marginTop: "20px", fontSize: "3.2rem", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.03em" }}>
              Ace Your Campus Placements with <span className="gradient-text">AI</span>
            </h1>

            <p style={{ margin: "24px auto 35px", fontSize: "1.12rem", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "700px" }}>
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
          </div>
        </section>

        {/* Statistics counters */}
        <section style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto 80px", padding: "0 20px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "30px",
            borderRadius: "18px"
          }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <strong style={{ display: "block", fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>{stat.value}</strong>
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px", display: "inline-block" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Platform Highlights */}
      <section style={{ maxWidth: "1000px", margin: "0 auto 80px", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>Platform Highlights</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Accelerating placements through modern features and modules.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div 
                key={i} 
                className="feature-card" 
                style={{ 
                  padding: "24px", 
                  background: "rgba(255,255,255,0.01)", 
                  border: "1px solid rgba(255,255,255,0.06)", 
                  borderRadius: "14px" 
                }}
              >
                <div style={{ 
                  width: "44px", 
                  height: "44px", 
                  borderRadius: "10px", 
                  background: `rgba(${h.color === "#6366f1" ? "99, 102, 241" : h.color === "#10b981" ? "16, 185, 129" : h.color === "#a78bfa" ? "167, 139, 250" : h.color === "#fb7185" ? "251, 113, 133" : h.color === "#f59e0b" ? "245, 158, 11" : "6, 182, 212"}, 0.12)`, 
                  color: h.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px"
                }}>
                  <Icon size={22} />
                </div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", margin: "0 0 8px 0" }}>{h.title}</h4>
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>{h.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose CareerBridge AI details */}
      <section style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>Why Choose CareerBridge AI</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Targeted capabilities built specifically to support placement officers and students.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "1.15rem", marginBottom: "10px" }}>💻 Coding Practice</h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                Solve beginner-to-advanced challenges. Write and test implementations with real-time compilation checks.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "1.15rem", marginBottom: "10px" }}>🧠 Aptitude Practice</h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                Practice Quantitative, Logical, and Verbal Ability worksheets. Track completion progress and daily streaks.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#ffffff", fontSize: "1.15rem", marginBottom: "10px" }}>📄 Resume Analyzer</h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                Scan PDF/DOCX templates. Verify details, detect missing keywords, and match requirements of dream companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey visual steps */}
      <section style={{ maxWidth: "1000px", margin: "80px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>Your Learning Journey</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Step-by-step roadmap to become placement ready.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
          {journeySteps.map((step, idx) => (
            <div 
              key={idx} 
              style={{ 
                padding: "20px 15px", 
                background: "rgba(255,255,255,0.01)", 
                border: "1px solid rgba(255,255,255,0.06)", 
                borderRadius: "10px", 
                textAlign: "center" 
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "#6366f1", fontWeight: "700", textTransform: "uppercase" }}>{step.step}</span>
              <strong style={{ display: "block", fontSize: "0.92rem", color: "#ffffff", margin: "6px 0" }}>{step.title}</strong>
              <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>{step.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Company Categories */}
      <section style={{ background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>Company Categories</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Placement preparation tailored for top recruiting categories.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }}>
              <h4 style={{ color: "#6366f1", margin: "0 0 10px 0" }}>Product-Based</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 15px 0" }}>Google, Microsoft, Amazon, Adobe, Oracle, Zoho, Salesforce.</p>
            </div>
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }}>
              <h4 style={{ color: "#10b981", margin: "0 0 10px 0" }}>Service-Based</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 15px 0" }}>TCS, Infosys, Wipro, Cognizant, Capgemini, Accenture, IBM.</p>
            </div>
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }}>
              <h4 style={{ color: "#a78bfa", margin: "0 0 10px 0" }}>Startups</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 15px 0" }}>Razorpay, CRED, PhonePe, Meesho, BrowserStack, Postman.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ maxWidth: "800px", margin: "80px auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>Frequently Asked Questions</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Clear your doubts about using CareerBridge AI.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                style={{ 
                  background: "rgba(255,255,255,0.01)", 
                  border: "1px solid rgba(255,255,255,0.06)", 
                  borderRadius: "10px", 
                  overflow: "hidden" 
                }}
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    background: "transparent",
                    border: "none",
                    color: "#ffffff",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "600"
                  }}
                >
                  <span>{faq.q}</span>
                  <span>{isOpen ? <FiMinus /> : <FiPlus />}</span>
                </button>

                {isOpen && (
                  <div style={{ 
                    padding: "0 24px 20px", 
                    color: "var(--text-secondary)", 
                    fontSize: "0.88rem", 
                    lineHeight: "1.6" 
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Future features list */}
      <section style={{ maxWidth: "1000px", margin: "0 auto 80px", padding: "0 20px" }}>
        <div style={{ background: "rgba(99, 102, 241, 0.03)", border: "1px dashed rgba(99, 102, 241, 0.2)", padding: "30px", borderRadius: "18px" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>
            <FiCpu style={{ color: "#818cf8" }} />
            <span>Future Platform Roadmap Preview</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
            <div>✦ AI Career Coach advisor profiles</div>
            <div>✦ Interactive GD (Group Discussion) simulator</div>
            <div>✦ Live multiplayer coding arenas</div>
            <div>✦ Job referral recommendation portals</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{
        margin: "80px auto 100px",
        textAlign: "center",
        padding: "60px 40px",
        background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.08) 0%, transparent 70%)"
      }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: "15px", fontWeight: "800", color: "#ffffff" }}>Ready to Start Your Placement Journey?</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 30px", fontSize: "1.05rem" }}>
          Build skills, optimize your resume for ATS parsers, practice mock interviews, and land top company roles.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <Link href={isAuthenticated ? "/dashboard" : "/register"} className="btn">Get Started</Link>
          <Link href="/coding" className="btn-outline">Practice Coding</Link>
          <Link href="/resume/analyzer" className="btn-outline">Analyze Resume</Link>
          <Link href="/mock-interview" className="btn-outline">Start AI Interview</Link>
        </div>
      </section>

    </main>
  );
}
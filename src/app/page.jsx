"use client";

import Link from "next/link";
import useAuth from "../hooks/useAuth";
import {
  FiBookOpen,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMic,
  FiTrendingUp,
  FiArrowRight,
  FiAward,
  FiCheckCircle
} from "react-icons/fi";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const stats = [
    { value: "10,000+", label: "Active Students" },
    { value: "500+", label: "Coding Challenges" },
    { value: "1,500+", label: "Aptitude Questions" },
    { value: "50+", label: "Partner Companies" },
  ];

  const features = [
    {
      icon: FiBookOpen,
      iconColor: "#3b82f6",
      title: "Aptitude Training",
      description:
        "Practice quantitative aptitude, verbal ability, and logical reasoning with timed assessments.",
    },
    {
      icon: FiCode,
      iconColor: "#10b981",
      title: "Coding Practice",
      description:
        "Solve coding challenges in Java, Python, C, C++, and JavaScript inside a live compiler.",
    },
    {
      icon: FiBriefcase,
      iconColor: "#f59e0b",
      title: "Company Preparation",
      description:
        "Access custom, targeted placement prep modules for TCS, Infosys, Zoho, Accenture, and Amazon.",
    },
    {
      icon: FiFileText,
      iconColor: "#ec4899",
      title: "Resume Analyzer",
      description:
        "Check your ATS score and get instant smart suggestions to pass HR parsing filters.",
    },
    {
      icon: FiMic,
      iconColor: "#8b5cf6",
      title: "Mock Interviews",
      description:
        "Practice technical and HR mock interviews with instant, detailed AI feedback.",
    },
    {
      icon: FiTrendingUp,
      iconColor: "#06b6d4",
      title: "Performance Analytics",
      description:
        "Track your placement readiness score, track category XP, and pinpoint areas of growth.",
    },
  ];

  return (
    <main className="home-page" style={{ padding: "0 20px" }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(59, 130, 246, 0.3)", color: "var(--primary)", background: "rgba(59, 130, 246, 0.1)", fontSize: "0.85rem", fontWeight: "600" }}>
            <FiCheckCircle size={14} />
            <span>AI-Powered Placement Preparation Portal</span>
          </span>

          <h1 style={{ marginTop: "15px" }}>
            Crack Your Dream Job With
            <span className="gradient-text"> CareerBridge AI</span>
          </h1>

          <p style={{ margin: "20px auto 35px", fontSize: "1.15rem", lineHeight: "1.6" }}>
            The ultimate all-in-one preparation hub. Master aptitude topics, compile code live, build ATS-friendly resumes, practice AI mock interviews, and land top company roles.
          </p>

          <div className="hero-buttons" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            {isAuthenticated ? (
              <Link href="/dashboard" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span>Go to Dashboard</span>
                <FiArrowRight />
              </Link>
            ) : (
              <>
                <Link href="/register" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span>Get Started</span>
                  <FiArrowRight />
                </Link>

                <Link href="/login" className="btn-outline">
                  Login to Account
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "25px", margin: "40px auto 80px" }}>
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card" style={{ textAlign: "center", padding: "30px 20px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>{stat.value}</h2>
            <p style={{ color: "var(--text-secondary)", fontWeight: "500", fontSize: "0.95rem" }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="features-section" style={{ margin: "80px auto" }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "15px" }}>Everything You Need For Placements</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Learn systematically, practice daily, track progress, and get placed.</p>
        </div>

        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="feature-card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "15px", position: "relative", overflow: "hidden" }}>
                <div className="feature-icon" style={{ width: "50px", height: "50px", borderRadius: "12px", background: `rgba(${feature.iconColor === "#3b82f6" ? "59, 130, 246" : feature.iconColor === "#10b981" ? "16, 185, 129" : feature.iconColor === "#f59e0b" ? "245, 158, 11" : feature.iconColor === "#ec4899" ? "236, 72, 153" : feature.iconColor === "#8b5cf6" ? "139, 92, 246" : "6, 182, 212"}, 0.12)`, display: "flex", alignItems: "center", justifyContent: "center", color: feature.iconColor }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{feature.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Companies Section */}
      <section className="companies-section" style={{ margin: "80px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "35px" }}>Targeted Companies</h2>

        <div className="companies-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          <div className="company-card" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", fontWeight: "600", fontSize: "1.1rem" }}><FiBriefcase /> TCS</div>
          <div className="company-card" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", fontWeight: "600", fontSize: "1.1rem" }}><FiCode /> Infosys</div>
          <div className="company-card" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", fontWeight: "600", fontSize: "1.1rem" }}><FiTrendingUp /> Accenture</div>
          <div className="company-card" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", fontWeight: "600", fontSize: "1.1rem" }}><FiAward /> Zoho</div>
          <div className="company-card" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", fontWeight: "600", fontSize: "1.1rem" }}><FiBriefcase /> Amazon</div>
        </div>
      </section>

      {/* Placement Readiness */}
      <section className="feature-highlight" style={{ margin: "80px auto" }}>
        <div className="highlight-card" style={{ padding: "50px", textAlign: "center", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "24px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "15px", display: "inline-flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
            <FiAward style={{ color: "#f59e0b" }} />
            <span>Placement Readiness Score</span>
          </h2>

          <p style={{ maxWidth: "600px", margin: "0 auto 20px", color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6" }}>
            Get a comprehensive, real-time index of your hiring potential based on combined Aptitude stats, Coding scores, Resume ATS results, and Mock Interview metrics.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ margin: "80px auto 100px", textAlign: "center", padding: "60px 40px", background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.08) 0%, transparent 70%)" }}>
        <h2 style={{ fontSize: "2.2rem", marginBottom: "15px" }}>Start Your Placement Journey Today</h2>

        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 30px", fontSize: "1.1rem" }}>
          Build placement-relevant skills, challenge yourself with daily tasks, and benchmark your progress.
        </p>

        {isAuthenticated ? (
          <Link href="/dashboard" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>Continue Preparation</span>
            <FiArrowRight />
          </Link>
        ) : (
          <Link href="/register" className="btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>Create Free Account</span>
            <FiArrowRight />
          </Link>
        )}
      </section>
    </main>
  );
}
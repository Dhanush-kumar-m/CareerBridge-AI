"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiBriefcase, FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <footer className="footer" style={{
      background: "var(--home-dark)",
      borderTop: "1px solid rgba(244, 243, 238, 0.08)",
      padding: "80px 24px 40px",
      fontSize: "0.88rem"
    }}>
      <div className="footer-container" style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px",
        marginBottom: "60px"
      }}>
        {/* Brand Column */}
        <div style={{ gridColumn: "span 2", minWidth: "250px" }}>
          <h2 style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "1.3rem", fontWeight: "800", color: "var(--home-dark-text)", marginBottom: "16px" }}>
            <FiBriefcase style={{ color: "var(--home-accent)" }} />
            <span>CareerBridge AI</span>
          </h2>
          <p style={{ color: "var(--home-dark-muted)", lineHeight: "1.6", marginBottom: "20px" }}>
            Smart Placement Preparation Platform helping students master aptitude, compile code, analyze resumes, practice mock interviews, and track placement readiness.
          </p>
          <div style={{ display: "flex", gap: "15px" }}>
            <a
              href="https://github.com/Dhanush-kumar-m"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/dhanush-kumar-m-b19877295"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}
            >
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
 
        {/* Features Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--home-dark-text)", marginBottom: "8px" }}>Features</h3>
          <Link href="/aptitude" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Aptitude worksheets</Link>
          <Link href="/coding" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Coding arena</Link>
          <Link href="/resume/analyzer" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Resume scan</Link>
          <Link href="/mock-interview" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Mock interviews</Link>
        </div>
 
        {/* Resources Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--home-dark-text)", marginBottom: "8px" }}>Resources</h3>
          <Link href="/companies" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Company preparation</Link>
          <Link href="/analytics" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Performance charts</Link>
          <Link href="/leaderboard" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Leaderboards</Link>
          <Link href="/dashboard" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Student dashboard</Link>
        </div>
 
        {/* Legal Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--home-dark-text)", marginBottom: "8px" }}>Legal</h3>
          <Link href="#" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Privacy Policy</Link>
          <Link href="#" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Terms & Conditions</Link>
          <Link href="#" style={{ color: "var(--home-dark-muted)", transition: "color 0.2s" }}>Placement Guidelines</Link>
        </div>
 
        {/* Contact Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--home-dark-text)", marginBottom: "8px" }}>Contact</h3>
          <span style={{ color: "var(--home-dark-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiMail />
            <span>kumardhanush6494@gmail.com</span>
          </span>
          <span style={{ color: "var(--home-dark-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiPhone />
            <span>+91 8637431104</span>
          </span>
          <span style={{ color: "var(--home-dark-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiMapPin />
            <span>India</span>
          </span>
        </div>
      </div>
 
      {/* Footer Bottom */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        paddingTop: "30px",
        borderTop: "1px solid rgba(244, 243, 238, 0.08)",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "15px",
        color: "var(--home-dark-muted)",
        fontSize: "0.8rem"
      }}>
        <span>© {new Date().getFullYear()} CareerBridge AI. All Rights Reserved.</span>
        <span>Built with ❤️ by Dhanush Kumar</span>
      </div>
    </footer>
  );
}
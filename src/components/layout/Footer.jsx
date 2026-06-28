"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiBriefcase, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2 style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FiBriefcase style={{ color: "var(--primary)" }} />
            <span>CareerBridge AI</span>
          </h2>

          <p>
            Smart Placement Preparation Platform helping students improve aptitude, coding skills, resume building, ATS score, mock interviews, and placement readiness.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/coding">Coding Practice</Link>
          <Link href="/aptitude">Aptitude Training</Link>
          <Link href="/profile">Profile</Link>
        </div>

        {/* Resources */}
        <div className="footer-links">
          <h3>Resources</h3>
          <Link href="/companies">Company Preparation</Link>
          <Link href="/analytics">Analytics</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/mock-interview">Mock Interview</Link>
          <Link href="/resume/analyzer">Resume Analyzer</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: "5px 0" }}>
            <FiMail />
            <span>kumardhanush6494@gmail.com</span>
          </p>

          <p style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: "5px 0" }}>
            <FiPhone />
            <span>+91 8637431104</span>
          </p>

          <p style={{ display: "inline-flex", alignItems: "center", gap: "8px", margin: "5px 0" }}>
            <FiMapPin />
            <span>India</span>
          </p>

          <div className="footer-social" style={{ marginTop: "15px", display: "flex", gap: "15px" }}>
            <a
              href="https://github.com/Dhanush-kumar-m"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FiGithub />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/dhanush-kumar-m-b19877295"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CareerBridge AI. All Rights Reserved.</p>
        <p>Built with ❤️ by Dhanush Kumar</p>
      </div>
    </footer>
  );
}
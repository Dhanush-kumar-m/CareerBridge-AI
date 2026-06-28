import Link from "next/link";
import {
  FiCode,
  FiTerminal,
  FiBookOpen,
  FiClipboard,
  FiTarget,
  FiCheckCircle,
  FiStar,
  FiAward
} from "react-icons/fi";

export default function CodingPage() {
  return (
    <div className="coding-home" style={{ padding: "10px" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h1 style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "2rem" }}>
          <FiCode style={{ color: "var(--primary)" }} />
          <span>Coding Practice Hub</span>
        </h1>
        <p style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          Master Data Structures, Algorithms, Problem Solving, and Company-Specific Coding Questions to crack your technical evaluations.
        </p>
      </div>

      {/* Stats */}
      <div className="coding-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--primary)" }}>500+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Coding Problems</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#10b981" }}>100+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Target Companies</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#eab308" }}>2,450 XP</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Total Experience Points</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#f59e0b" }}>81%</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Readiness Index</p>
        </div>
      </div>

      {/* Modules */}
      <div className="coding-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "50px" }}>
        <div className="coding-card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ width: "45px", height: "45px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.1)", display: "flex", alignItems: "center", justifyContext: "center", color: "#3b82f6", justifyContent: "center" }}>
            <FiTerminal size={22} />
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", margin: 0 }}>Online Compiler</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            Write, compile, and run code directly in the browser across Java, Python, C, C++, and JavaScript.
          </p>
          <Link href="/coding/compiler" className="coding-btn" style={{ marginTop: "10px", textAlign: "center" }}>
            Open Compiler
          </Link>
        </div>

        <div className="coding-card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ width: "45px", height: "45px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContext: "center", color: "#10b981", justifyContent: "center" }}>
            <FiBookOpen size={22} />
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", margin: 0 }}>Practice Problems</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            Filter coding questions by difficulty (Easy, Medium, Hard), specific tags, or target companies.
          </p>
          <Link href="/coding/practice" className="coding-btn" style={{ marginTop: "10px", textAlign: "center" }}>
            Start Practice
          </Link>
        </div>

        <div className="coding-card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ width: "45px", height: "45px", borderRadius: "10px", background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContext: "center", color: "#8b5cf6", justifyContent: "center" }}>
            <FiClipboard size={22} />
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", margin: 0 }}>Submission History</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            Review your accepted solutions, test runtime stats, memory usage, and language benchmarks.
          </p>
          <Link href="/coding/submissions" className="coding-btn" style={{ marginTop: "10px", textAlign: "center" }}>
            View History
          </Link>
        </div>
      </div>

      {/* Roadmap */}
      <div className="coding-roadmap" style={{ padding: "30px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "10px", marginBottom: "25px" }}>
          <FiTarget style={{ color: "#f59e0b" }} />
          <span>Placement Coding Roadmap</span>
        </h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>Arrays & Strings</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>Linked Lists & Stacks</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>Trees & Graphs</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>Recursion & Backtracking</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>Dynamic Programming</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>Company Archives</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
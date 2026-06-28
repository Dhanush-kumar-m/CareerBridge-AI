import companies from "../../data/companies";
import CompanyCard from "../../components/companies/CompanyCard";
import {
  FiBriefcase,
  FiStar,
  FiTarget,
  FiCheckCircle
} from "react-icons/fi";

export default function CompaniesPage() {
  return (
    <div className="companies-page" style={{ padding: "10px" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h1 className="page-title" style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "2rem" }}>
          <FiBriefcase style={{ color: "var(--primary)" }} />
          <span>Company Preparation Hub</span>
        </h1>
        <p className="page-subtitle" style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          Prepare company-wise aptitude, coding, technical interviews, HR rounds, and placement assessments.
        </p>
      </div>

      {/* Statistics */}
      <div className="company-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", color: "var(--primary)" }}>5</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Partner Companies</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#10b981" }}>1200+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Standard Questions</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#8b5cf6" }}>50+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Mock Tests</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", color: "#f59e0b" }}>95%</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Placement Rate</p>
        </div>
      </div>

      {/* Featured Companies */}
      <div className="featured-section" style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <FiStar style={{ color: "#f59e0b" }} />
          <span>Target Recruiter Groups</span>
        </h2>

        <div className="company-tags" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem", fontWeight: "600" }}>TCS</span>
          <span style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem", fontWeight: "600" }}>Infosys</span>
          <span style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem", fontWeight: "600" }}>Accenture</span>
          <span style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem", fontWeight: "600" }}>Zoho</span>
          <span style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem", fontWeight: "600" }}>Amazon</span>
        </div>
      </div>

      {/* Company Cards */}
      <div className="companies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginBottom: "50px" }}>
        {companies.map((company) => (
          <CompanyCard
            key={company.slug}
            company={company}
          />
        ))}
      </div>

      {/* Preparation Tips */}
      <div className="company-tips" style={{ padding: "30px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <FiTarget style={{ color: "var(--primary)" }} />
          <span>Placement Success Checklist</span>
        </h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Practice daily quantitative aptitude modules.</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Solve company-specific archives (e.g. TCS Ninja vs Amazon).</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Engage in mock tech/HR interviews with AI reviews.</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Fine-tune your resume with custom keyword ATS targeting.</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Aim for a Placement Readiness Index score above 80%.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
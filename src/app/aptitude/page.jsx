import AptitudeCard from "../../components/aptitude/AptitudeCard";
import {
  FiBookOpen,
  FiTrendingUp,
  FiCpu,
  FiPieChart,
  FiCompass,
  FiCheckCircle,
  FiTarget,
  FiActivity
} from "react-icons/fi";

export default function AptitudePage() {
  return (
    <div className="aptitude-home" style={{ padding: "10px" }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "40px" }}>
        <h1 style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontSize: "2rem" }}>
          <FiBookOpen style={{ color: "var(--primary)" }} />
          <span>Aptitude Training Portal</span>
        </h1>
        <p style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
          Master Quantitative Aptitude, Verbal Ability, and Logical Reasoning with company-focused practice questions, structured assessments, and placement performance tracking.
        </p>
      </div>

      {/* Statistics */}
      <div className="aptitude-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--primary)" }}>1500+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Practice Questions</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#10b981" }}>100+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Company Sets</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#8b5cf6" }}>50+</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Mock Tests</p>
        </div>

        <div className="stat-card" style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#f59e0b" }}>85%</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>Target Accuracy</p>
        </div>
      </div>

      {/* Aptitude Categories */}
      <div className="section-header" style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.6rem" }}>Choose Your Practice Area</h2>
        <p style={{ color: "var(--text-secondary)" }}>Select a category to practice and reinforce your speed and logic skills.</p>
      </div>

      <div className="aptitude-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "50px" }}>
        <AptitudeCard
          title="Quantitative"
          description="Percentages, Profit & Loss, Time & Work, Probability, Permutation & Combination, and mathematical foundations."
          href="/aptitude/quantitative"
          icon={<FiTrendingUp size={22} style={{ color: "#3b82f6" }} />}
        />

        <AptitudeCard
          title="Verbal Ability"
          description="Grammar, Vocabulary, Reading Comprehension, Synonyms, Antonyms, and verbal reasoning skills."
          href="/aptitude/verbal"
          icon={<FiBookOpen size={22} style={{ color: "#ec4899" }} />}
        />

        <AptitudeCard
          title="Reasoning"
          description="Logical Reasoning, Coding-Decoding, Puzzles, Blood Relations, and Seating Arrangements."
          href="/aptitude/reasoning"
          icon={<FiCpu size={22} style={{ color: "#10b981" }} />}
        />

        <AptitudeCard
          title="Data Interpretation"
          description="Table Charts, Pie Charts, Bar Charts, Line Graphs, and Data Sufficiency problems."
          href="/aptitude/data-interpretation"
          icon={<FiPieChart size={22} style={{ color: "#8b5cf6" }} />}
        />

        <AptitudeCard
          title="Abstract Reasoning"
          description="Identify visual patterns, logical rules, and sequence trends in shapes and diagrams."
          href="/aptitude/abstract-reasoning"
          icon={<FiCompass size={22} style={{ color: "#f59e0b" }} />}
        />
      </div>

      {/* Placement Preparation Tips */}
      <div className="practice-info" style={{ padding: "30px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <FiTarget style={{ color: "var(--primary)" }} />
          <span>Placement Preparation Strategy</span>
        </h2>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Practice daily under test conditions (1 minute per question limit).</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Review explanatory answers to learn time-saving math shortcuts.</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Solve company-specific archives for target recruiters (e.g. Zoho, TCS).</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Take full-length mock tests to build analytical endurance.</span>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)" }}>
            <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
            <span>Aim to maintain a baseline accuracy score above 80% across modules.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

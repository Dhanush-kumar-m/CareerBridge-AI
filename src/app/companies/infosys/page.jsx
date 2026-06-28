import Link from "next/link";

export default function InfosysPage() {
  return (
    <div className="company-page">

      {/* Header */}

      <div className="company-header">

        <h1>
          💻 Infosys Placement Preparation
        </h1>

        <p>
          Prepare for Infosys aptitude tests,
          programming assessments, technical interviews,
          and HR rounds with company-specific resources.
        </p>

      </div>

      {/* Stats */}

      <div className="company-stats">

        <div className="stat-card">
          <h3>Aptitude Questions</h3>
          <h2>220</h2>
        </div>

        <div className="stat-card">
          <h3>Coding Questions</h3>
          <h2>120</h2>
        </div>

        <div className="stat-card">
          <h3>Interview Questions</h3>
          <h2>70</h2>
        </div>

        <div className="stat-card">
          <h3>Success Rate</h3>
          <h2>89%</h2>
        </div>

      </div>

      {/* Hiring Process */}

      <div className="company-section">

        <h2>
          📋 Infosys Hiring Process
        </h2>

        <div className="roadmap-grid">

          <div className="roadmap-card">
            <span>1️⃣</span>
            <h3>Online Assessment</h3>
          </div>

          <div className="roadmap-card">
            <span>2️⃣</span>
            <h3>Reasoning Ability</h3>
          </div>

          <div className="roadmap-card">
            <span>3️⃣</span>
            <h3>Verbal Ability</h3>
          </div>

          <div className="roadmap-card">
            <span>4️⃣</span>
            <h3>Programming Logic</h3>
          </div>

          <div className="roadmap-card">
            <span>5️⃣</span>
            <h3>Technical Interview</h3>
          </div>

          <div className="roadmap-card">
            <span>6️⃣</span>
            <h3>HR Interview</h3>
          </div>

        </div>

      </div>

      {/* Important Topics */}

      <div className="company-section">

        <h2>
          🎯 Important Topics
        </h2>

        <div className="topics-grid">

          <span>Reasoning</span>
          <span>English Grammar</span>
          <span>Programming Logic</span>
          <span>Arrays</span>
          <span>Strings</span>
          <span>OOPs</span>
          <span>DBMS</span>
          <span>SQL</span>
          <span>Operating Systems</span>
          <span>Computer Networks</span>

        </div>

      </div>

      {/* Preparation Strategy */}

      <div className="company-section">

        <h2>
          🚀 Infosys Preparation Strategy
        </h2>

        <ul className="company-list">

          <li>
            Practice aptitude daily.
          </li>

          <li>
            Improve English grammar and communication.
          </li>

          <li>
            Solve programming logic questions.
          </li>

          <li>
            Revise DBMS, OOPs and SQL concepts.
          </li>

          <li>
            Attend mock interviews regularly.
          </li>

          <li>
            Maintain ATS score above 80%.
          </li>

        </ul>

      </div>

      {/* Resources */}

      <div className="company-section">

        <h2>
          📚 Preparation Resources
        </h2>

        <div className="resource-buttons">

          <Link
            href="/aptitude"
            className="company-btn"
          >
            Practice Aptitude
          </Link>

          <Link
            href="/coding/practice"
            className="company-btn"
          >
            Practice Coding
          </Link>

          <Link
            href="/mock-interview"
            className="company-btn"
          >
            Mock Interview
          </Link>

        </div>

      </div>

    </div>
  );
}
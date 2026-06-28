import Link from "next/link";

export default function TCSPage() {
  return (
    <div className="company-page">

      {/* Header */}

      <div className="company-header">

        <h1>
          🏢 TCS Placement Preparation
        </h1>

        <p>
          Prepare for TCS National Qualifier Test (NQT),
          aptitude assessments, coding rounds,
          technical interviews and HR discussions.
        </p>

      </div>

      {/* Stats */}

      <div className="company-stats">

        <div className="stat-card">
          <h3>Aptitude Questions</h3>
          <h2>250</h2>
        </div>

        <div className="stat-card">
          <h3>Coding Questions</h3>
          <h2>150</h2>
        </div>

        <div className="stat-card">
          <h3>Interview Questions</h3>
          <h2>80</h2>
        </div>

        <div className="stat-card">
          <h3>Success Rate</h3>
          <h2>91%</h2>
        </div>

      </div>

      {/* Hiring Process */}

      <div className="company-section">

        <h2>
          📋 TCS Hiring Process
        </h2>

        <div className="roadmap-grid">

          <div className="roadmap-card">
            <span>1️⃣</span>
            <h3>TCS NQT</h3>
          </div>

          <div className="roadmap-card">
            <span>2️⃣</span>
            <h3>Quantitative Aptitude</h3>
          </div>

          <div className="roadmap-card">
            <span>3️⃣</span>
            <h3>Verbal Ability</h3>
          </div>

          <div className="roadmap-card">
            <span>4️⃣</span>
            <h3>Logical Reasoning</h3>
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

          <span>Quantitative Aptitude</span>
          <span>Logical Reasoning</span>
          <span>Verbal Ability</span>
          <span>Number Series</span>
          <span>Probability</span>
          <span>Time & Work</span>
          <span>Arrays</span>
          <span>Strings</span>
          <span>OOPs</span>
          <span>DBMS</span>

        </div>

      </div>

      {/* Preparation Strategy */}

      <div className="company-section">

        <h2>
          🚀 TCS Preparation Strategy
        </h2>

        <ul className="company-list">

          <li>
            Practice TCS NQT aptitude questions daily.
          </li>

          <li>
            Focus on Quantitative and Logical Reasoning.
          </li>

          <li>
            Learn programming fundamentals thoroughly.
          </li>

          <li>
            Revise DBMS, OOPs and SQL concepts.
          </li>

          <li>
            Attend mock interviews regularly.
          </li>

          <li>
            Improve communication and HR interview skills.
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
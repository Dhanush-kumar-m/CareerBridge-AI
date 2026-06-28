import Link from "next/link";

export default function AccenturePage() {
  return (
    <div className="company-page">

      {/* Header */}

      <div className="company-header">

        <h1>
          🚀 Accenture Placement Preparation
        </h1>

        <p>
          Prepare for Accenture hiring process with
          aptitude questions, coding challenges,
          communication skills and interview preparation.
        </p>

      </div>

      {/* Stats */}

      <div className="company-stats">

        <div className="stat-card">
          <h3>Aptitude Questions</h3>
          <h2>180</h2>
        </div>

        <div className="stat-card">
          <h3>Coding Questions</h3>
          <h2>110</h2>
        </div>

        <div className="stat-card">
          <h3>Interview Questions</h3>
          <h2>65</h2>
        </div>

        <div className="stat-card">
          <h3>Success Rate</h3>
          <h2>87%</h2>
        </div>

      </div>

      {/* Hiring Process */}

      <div className="company-section">

        <h2>
          📋 Accenture Hiring Process
        </h2>

        <div className="roadmap-grid">

          <div className="roadmap-card">
            <span>1️⃣</span>
            <h3>Cognitive Assessment</h3>
          </div>

          <div className="roadmap-card">
            <span>2️⃣</span>
            <h3>Technical Assessment</h3>
          </div>

          <div className="roadmap-card">
            <span>3️⃣</span>
            <h3>Pseudo Code Round</h3>
          </div>

          <div className="roadmap-card">
            <span>4️⃣</span>
            <h3>Programming MCQs</h3>
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
          <span>Arrays</span>
          <span>Strings</span>
          <span>OOPs</span>
          <span>DBMS</span>
          <span>SQL</span>
          <span>Operating Systems</span>
          <span>Computer Networks</span>

        </div>

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
            Solve Coding Questions
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
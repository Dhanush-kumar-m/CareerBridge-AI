import Link from "next/link";

export default function AmazonPage() {
  return (
    <div className="company-page">

      {/* Header */}

      <div className="company-header">

        <h1>
          📦 Amazon Placement Preparation
        </h1>

        <p>
          Prepare for Amazon's coding rounds,
          online assessments, technical interviews,
          system design discussions and leadership principles.
        </p>

      </div>

      {/* Stats */}

      <div className="company-stats">

        <div className="stat-card">
          <h3>Aptitude Questions</h3>
          <h2>200</h2>
        </div>

        <div className="stat-card">
          <h3>Coding Questions</h3>
          <h2>350</h2>
        </div>

        <div className="stat-card">
          <h3>Interview Questions</h3>
          <h2>120</h2>
        </div>

        <div className="stat-card">
          <h3>Success Rate</h3>
          <h2>92%</h2>
        </div>

      </div>

      {/* Hiring Process */}

      <div className="company-section">

        <h2>
          📋 Amazon Hiring Process
        </h2>

        <div className="roadmap-grid">

          <div className="roadmap-card">
            <span>1️⃣</span>
            <h3>Online Assessment</h3>
          </div>

          <div className="roadmap-card">
            <span>2️⃣</span>
            <h3>Data Structures</h3>
          </div>

          <div className="roadmap-card">
            <span>3️⃣</span>
            <h3>Algorithms</h3>
          </div>

          <div className="roadmap-card">
            <span>4️⃣</span>
            <h3>Technical Interview</h3>
          </div>

          <div className="roadmap-card">
            <span>5️⃣</span>
            <h3>Behavioral Round</h3>
          </div>

          <div className="roadmap-card">
            <span>6️⃣</span>
            <h3>Leadership Principles</h3>
          </div>

        </div>

      </div>

      {/* Important Topics */}

      <div className="company-section">

        <h2>
          🎯 Important Topics
        </h2>

        <div className="topics-grid">

          <span>Arrays</span>
          <span>Strings</span>
          <span>Linked Lists</span>
          <span>Stacks</span>
          <span>Queues</span>
          <span>Trees</span>
          <span>Graphs</span>
          <span>Dynamic Programming</span>
          <span>System Design</span>
          <span>Leadership Principles</span>

        </div>

      </div>

      {/* Preparation Strategy */}

      <div className="company-section">

        <h2>
          🚀 Amazon Preparation Strategy
        </h2>

        <ul className="company-list">

          <li>
            Master Data Structures and Algorithms.
          </li>

          <li>
            Solve at least 200+ LeetCode style questions.
          </li>

          <li>
            Practice Amazon tagged coding questions.
          </li>

          <li>
            Learn System Design fundamentals.
          </li>

          <li>
            Prepare STAR method answers for behavioral rounds.
          </li>

          <li>
            Study Amazon Leadership Principles thoroughly.
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
            href="/coding/practice"
            className="company-btn"
          >
            Practice Coding
          </Link>

          <Link
            href="/aptitude"
            className="company-btn"
          >
            Aptitude Training
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
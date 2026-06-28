import Link from "next/link";

export default function ZohoPage() {
  return (
    <div className="company-page">

      {/* Header */}

      <div className="company-header">

        <h1>
          🔥 Zoho Placement Preparation
        </h1>

        <p>
          Prepare for Zoho's coding-focused hiring process,
          advanced problem-solving rounds, technical interviews,
          and software development assessments.
        </p>

      </div>

      {/* Stats */}

      <div className="company-stats">

        <div className="stat-card">
          <h3>Aptitude Questions</h3>
          <h2>150</h2>
        </div>

        <div className="stat-card">
          <h3>Coding Questions</h3>
          <h2>300</h2>
        </div>

        <div className="stat-card">
          <h3>Interview Questions</h3>
          <h2>90</h2>
        </div>

        <div className="stat-card">
          <h3>Success Rate</h3>
          <h2>94%</h2>
        </div>

      </div>

      {/* Hiring Process */}

      <div className="company-section">

        <h2>
          📋 Zoho Hiring Process
        </h2>

        <div className="roadmap-grid">

          <div className="roadmap-card">
            <span>1️⃣</span>
            <h3>Written Test</h3>
          </div>

          <div className="roadmap-card">
            <span>2️⃣</span>
            <h3>C Programming</h3>
          </div>

          <div className="roadmap-card">
            <span>3️⃣</span>
            <h3>Problem Solving</h3>
          </div>

          <div className="roadmap-card">
            <span>4️⃣</span>
            <h3>Advanced Coding</h3>
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

          <span>C Programming</span>
          <span>C++</span>
          <span>Java</span>
          <span>Arrays</span>
          <span>Strings</span>
          <span>Linked Lists</span>
          <span>Stacks</span>
          <span>Queues</span>
          <span>Trees</span>
          <span>Data Structures</span>
          <span>Algorithms</span>
          <span>DBMS</span>

        </div>

      </div>

      {/* Preparation Strategy */}

      <div className="company-section">

        <h2>
          🚀 Zoho Preparation Strategy
        </h2>

        <ul className="company-list">

          <li>
            Master C Programming fundamentals.
          </li>

          <li>
            Practice Data Structures extensively.
          </li>

          <li>
            Solve coding problems daily.
          </li>

          <li>
            Focus on optimization techniques.
          </li>

          <li>
            Learn Algorithms and Problem Solving.
          </li>

          <li>
            Practice previous Zoho coding questions.
          </li>

          <li>
            Prepare for technical and HR interviews.
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
            href="/coding/compiler"
            className="company-btn"
          >
            Online Compiler
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
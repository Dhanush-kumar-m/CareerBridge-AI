import Link from "next/link";

export default function MockInterviewPage() {
  return (
    <div className="mock-interview-page">

      {/* Header */}

      <div className="page-header">

        <h1>
          🎤 AI Mock Interview
        </h1>

        <p>
          Practice real interview scenarios,
          improve communication skills and
          boost your placement readiness score.
        </p>

      </div>

      {/* Statistics */}

      <div className="interview-stats">

        <div className="stat-card">
          <h2>500+</h2>
          <p>Interview Questions</p>
        </div>

        <div className="stat-card">
          <h2>25+</h2>
          <p>Companies Covered</p>
        </div>

        <div className="stat-card">
          <h2>85%</h2>
          <p>Target Score</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>AI Practice Access</p>
        </div>

      </div>

      {/* Interview Types */}

      <div className="interview-grid">

        <Link
          href="/mock-interview/hr"
          className="interview-card"
        >

          <div className="interview-icon">
            👨‍💼
          </div>

          <h2>
            HR Interview
          </h2>

          <p>
            Practice self-introduction,
            strengths, weaknesses,
            behavioral and HR questions.
          </p>

          <span>
            Start Interview →
          </span>

        </Link>

        <Link
          href="/mock-interview/technical"
          className="interview-card"
        >

          <div className="interview-icon">
            💻
          </div>

          <h2>
            Technical Interview
          </h2>

          <p>
            Prepare DSA, OOPs,
            DBMS, OS, Networks and
            programming concepts.
          </p>

          <span>
            Start Interview →
          </span>

        </Link>

      </div>

      {/* Benefits */}

      <div className="benefits-section">

        <h2>
          🚀 Why Use AI Mock Interviews?
        </h2>

        <div className="benefits-grid">

          <div className="benefit-card">
            🎙 Voice-Based Practice
          </div>

          <div className="benefit-card">
            📊 Performance Analysis
          </div>

          <div className="benefit-card">
            💡 AI Feedback
          </div>

          <div className="benefit-card">
            🎯 Placement Readiness Score
          </div>

        </div>

      </div>

    </div>
  );
}
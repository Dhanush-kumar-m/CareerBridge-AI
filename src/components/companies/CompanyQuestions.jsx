import Link from "next/link";

export default function CompanyQuestions() {
  return (
    <div className="question-section">

      <div className="question-card">

        <div className="question-icon">
          🧠
        </div>

        <h3>
          Aptitude Questions
        </h3>

        <p>
          Practice quantitative aptitude,
          verbal ability, and logical reasoning
          questions asked in company assessments.
        </p>

        <Link
          href="/aptitude"
          className="question-btn"
        >
          Start Aptitude →
        </Link>

      </div>

      <div className="question-card">

        <div className="question-icon">
          💻
        </div>

        <h3>
          Coding Questions
        </h3>

        <p>
          Solve company-specific coding
          challenges and improve your
          problem-solving skills.
        </p>

        <Link
          href="/coding"
          className="question-btn"
        >
          Start Coding →
        </Link>

      </div>

      <div className="question-card">

        <div className="question-icon">
          🎤
        </div>

        <h3>
          Interview Questions
        </h3>

        <p>
          Prepare for HR, Technical,
          and Managerial interview rounds
          with curated questions.
        </p>

        <Link
          href="/mock-interview"
          className="question-btn"
        >
          Start Interview Prep →
        </Link>

      </div>

    </div>
  );
}
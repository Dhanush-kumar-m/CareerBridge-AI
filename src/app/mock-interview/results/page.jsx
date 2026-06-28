import ConfidenceMeter
from "../../../components/interview/ConfidenceMeter";

import CommunicationScore
from "../../../components/interview/CommunicationScore";

import ReadinessScore
from "../../../components/interview/ReadinessScore";

import InterviewFeedback
from "../../../components/interview/InterviewFeedback";

export default function ResultsPage() {
  return (
    <div className="results-page">

      {/* Header */}

      <div className="page-header">

        <h1>
          📊 Interview Results
        </h1>

        <p>
          Review your interview performance,
          communication skills and placement readiness.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="results-summary">

        <div className="summary-card">
          <h2>82%</h2>
          <p>Confidence Score</p>
        </div>

        <div className="summary-card">
          <h2>78%</h2>
          <p>Communication Score</p>
        </div>

        <div className="summary-card">
          <h2>80%</h2>
          <p>Readiness Score</p>
        </div>

        <div className="summary-card">
          <h2>Good</h2>
          <p>Overall Performance</p>
        </div>

      </div>

      {/* Detailed Scores */}

      <div className="results-grid">

        <ConfidenceMeter
          score={82}
        />

        <CommunicationScore
          score={78}
        />

        <ReadinessScore
          score={80}
        />

      </div>

      {/* Performance Insights */}

      <div className="results-section">

        <h2>
          📈 Performance Insights
        </h2>

        <div className="insights-grid">

          <div className="insight-card">
            <h3>💪 Strengths</h3>

            <ul>
              <li>
                Good confidence level
              </li>

              <li>
                Clear communication
              </li>

              <li>
                Strong technical understanding
              </li>
            </ul>
          </div>

          <div className="insight-card">
            <h3>🎯 Improvements</h3>

            <ul>
              <li>
                Reduce filler words
              </li>

              <li>
                Improve answer structure
              </li>

              <li>
                Provide more examples
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Feedback */}

      <div className="results-section">

        <h2>
          📝 Detailed Feedback
        </h2>

        <InterviewFeedback />

      </div>

      {/* Recommendation */}

      <div className="recommendation-card">

        <h2>
          🚀 Next Recommendation
        </h2>

        <p>
          Practice 2 more mock interviews
          and improve your communication score
          above 85% to become placement ready.
        </p>

      </div>

    </div>
  );
}
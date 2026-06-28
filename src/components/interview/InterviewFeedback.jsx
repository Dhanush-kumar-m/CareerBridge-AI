export default function InterviewFeedback() {
  const strengths = [
    "Good confidence level",
    "Clear communication",
    "Structured answer",
  ];

  const improvements = [
    "Add more technical examples",
    "Improve answer depth",
    "Use real-world scenarios",
  ];

  return (
    <div className="feedback-card">

      <div className="feedback-header">

        <div className="feedback-icon">
          🤖
        </div>

        <div>
          <h2>
            AI Interview Feedback
          </h2>

          <p>
            Personalized interview analysis
          </p>
        </div>

      </div>

      <div className="feedback-score">

        <div className="feedback-score-circle">
          80%
        </div>

        <div>

          <h3>
            Overall Performance
          </h3>

          <p>
            Good performance. You are
            interview ready but there is
            room for improvement.
          </p>

        </div>

      </div>

      <div className="feedback-grid">

        <div className="feedback-section">

          <h3>
            ✅ Strengths
          </h3>

          <ul>

            {strengths.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>

        <div className="feedback-section">

          <h3>
            🎯 Improvements
          </h3>

          <ul>

            {improvements.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

      <div className="feedback-recommendation">

        <h3>
          🚀 Recommended Next Step
        </h3>

        <p>
          Practice 5 technical interview
          questions and complete another
          mock interview to increase your
          readiness score above 90%.
        </p>

      </div>

    </div>
  );
}
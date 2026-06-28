export default function ImprovementTips() {
  const tips = [
    {
      title: "Add More Industry Keywords",
      impact: "High Impact",
      icon: "🔍",
    },
    {
      title: "Include Certifications",
      impact: "Medium Impact",
      icon: "🏅",
    },
    {
      title: "Improve Professional Summary",
      impact: "High Impact",
      icon: "✍️",
    },
    {
      title: "Highlight Technical Projects",
      impact: "High Impact",
      icon: "💻",
    },
    {
      title: "Add Internship Experience",
      impact: "Medium Impact",
      icon: "🏢",
    },
  ];

  return (
    <div className="resume-card">

      <div className="tips-header">

        <div className="tips-icon">
          🚀
        </div>

        <div>
          <h2>
            Resume Improvement Tips
          </h2>

          <p>
            Personalized suggestions to improve your ATS score.
          </p>
        </div>

      </div>

      <div className="tips-container">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="tip-card"
          >

            <div className="tip-left">

              <span className="tip-icon">
                {tip.icon}
              </span>

              <div>

                <h4>
                  {tip.title}
                </h4>

                <p>
                  ATS Optimization
                </p>

              </div>

            </div>

            <span
              className={`impact-badge ${
                tip.impact === "High Impact"
                  ? "high-impact"
                  : "medium-impact"
              }`}
            >
              {tip.impact}
            </span>

          </div>
        ))}

      </div>

      <div className="tips-summary">

        <h3>
          📈 Expected Improvement
        </h3>

        <p>
          Applying all recommendations can
          increase your ATS score by
          approximately 10–15%.
        </p>

      </div>

    </div>
  );
}
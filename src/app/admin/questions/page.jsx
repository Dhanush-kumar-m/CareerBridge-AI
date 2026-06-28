
export default function QuestionsPage() {
  const categories = [
    {
      title: "Quantitative Aptitude",
      count: 650,
      icon: "📊",
    },
    {
      title: "Logical Reasoning",
      count: 450,
      icon: "🧠",
    },
    {
      title: "Verbal Ability",
      count: 400,
      icon: "📝",
    },
    {
      title: "Coding Problems",
      count: 800,
      icon: "💻",
    },
  ];

  return (
    <div className="questions-page">

      <div className="page-header">

        <h1>
          📚 Question Bank
        </h1>

        <p>
          Manage aptitude, coding and
          company-specific questions for
          placement preparation.
        </p>

      </div>

      <div className="question-stats">

        <div className="question-stat-card">
          <h2>1500</h2>
          <p>Aptitude Questions</p>
        </div>

        <div className="question-stat-card">
          <h2>800</h2>
          <p>Coding Questions</p>
        </div>

        <div className="question-stat-card">
          <h2>2300</h2>
          <p>Total Questions</p>
        </div>

        <div className="question-stat-card">
          <h2>100+</h2>
          <p>Company Sets</p>
        </div>

      </div>

      <h2 className="section-title">
        Question Categories
      </h2>

      <div className="question-grid">

        {categories.map((category) => (
          <div
            key={category.title}
            className="question-card"
          >

            <div className="question-icon">
              {category.icon}
            </div>

            <h3>
              {category.title}
            </h3>

            <p>
              {category.count} Questions
            </p>

            <button className="admin-btn">
              Manage Questions
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}


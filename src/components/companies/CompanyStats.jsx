export default function CompanyStats({
  company,
}) {
  return (
    <div className="company-stats">

      <div className="stat-box">

        <div className="stat-icon">
          🧠
        </div>

        <h3>
          Aptitude Questions
        </h3>

        <p>
          {company.aptitude}
        </p>

      </div>

      <div className="stat-box">

        <div className="stat-icon">
          💻
        </div>

        <h3>
          Coding Questions
        </h3>

        <p>
          {company.coding}
        </p>

      </div>

      <div className="stat-box">

        <div className="stat-icon">
          🎤
        </div>

        <h3>
          Interview Questions
        </h3>

        <p>
          {company.interview}
        </p>

      </div>

    </div>
  );
}
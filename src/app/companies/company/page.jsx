import companies from "../../../data/companies";

import CompanyStats from "../../../components/companies/CompanyStats";

import CompanyProgress from "../../../components/companies/CompanyProgress";

import CompanyQuestions from "../../../components/companies/CompanyQuestions";

export default async function CompanyPage({
  params,
}) {
  const company =
    companies.find(
      (c) =>
        c.slug === params.company
    );

  if (!company) {
    return (
      <div className="not-found-page">

        <h1>
          ❌ Company Not Found
        </h1>

        <p>
          The company you are looking
          for does not exist.
        </p>

      </div>
    );
  }

  return (
    <div className="company-page">

      {/* Hero Section */}

      <div className="company-hero">

        <div className="company-icon">
          {company.logo}
        </div>

        <div>

          <h1>
            {company.name}
            {" "}
            Preparation Portal
          </h1>

          <p>
            Prepare for aptitude,
            coding assessments,
            technical interviews and
            placement rounds.
          </p>

        </div>

      </div>

      {/* Quick Stats */}

      <CompanyStats
        company={company}
      />

      {/* Readiness */}

      <div className="company-section">

        <h2>
          🎯 Placement Readiness
        </h2>

        <CompanyProgress
          readiness={
            company.readiness
          }
        />

      </div>

      {/* Hiring Process */}

      <div className="company-section">

        <h2>
          📋 Hiring Process
        </h2>

        <div className="roadmap-grid">

          <div className="roadmap-card">
            1️⃣ Aptitude Test
          </div>

          <div className="roadmap-card">
            2️⃣ Coding Round
          </div>

          <div className="roadmap-card">
            3️⃣ Technical Interview
          </div>

          <div className="roadmap-card">
            4️⃣ HR Interview
          </div>

        </div>

      </div>

      {/* Important Topics */}

      <div className="company-section">

        <h2>
          📚 Important Topics
        </h2>

        <div className="topics-grid">

          <span>Arrays</span>
          <span>Strings</span>
          <span>OOPs</span>
          <span>DBMS</span>
          <span>SQL</span>
          <span>Operating Systems</span>
          <span>Computer Networks</span>
          <span>Reasoning</span>
          <span>Aptitude</span>

        </div>

      </div>

      {/* Questions */}

      <div className="company-section">

        <h2>
          💻 Company Questions
        </h2>

        <CompanyQuestions />

      </div>

      {/* Tips */}

      <div className="company-section">

        <h2>
          🚀 Preparation Tips
        </h2>

        <ul className="tips-list">

          <li>
            Complete all aptitude modules.
          </li>

          <li>
            Solve company-specific coding problems.
          </li>

          <li>
            Improve your ATS resume score.
          </li>

          <li>
            Attend mock interviews regularly.
          </li>

          <li>
            Maintain a readiness score above 80%.
          </li>

        </ul>

      </div>

    </div>
  );
}
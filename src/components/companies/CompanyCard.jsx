import Link from "next/link";

export default function CompanyCard({
  company,
}) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="company-card"
    >

      <div className="company-header">

        <div className="company-logo">
          {company.logo}
        </div>

        <div>

          <h2>
            {company.name}
          </h2>

          <p className="company-tag">
            Placement Preparation
          </p>

        </div>

      </div>

      <div className="company-details">

        <div className="detail-item">

          <span>
            🧠 Aptitude
          </span>

          <strong>
            {company.aptitude}
          </strong>

        </div>

        <div className="detail-item">

          <span>
            💻 Coding
          </span>

          <strong>
            {company.coding}
          </strong>

        </div>

        <div className="detail-item">

          <span>
            🎤 Interview
          </span>

          <strong>
            {company.interview}
          </strong>

        </div>

      </div>

      <div className="company-readiness">

        <div className="readiness-header">

          <span>
            Placement Readiness
          </span>

          <strong>
            {company.readiness}%
          </strong>

        </div>

        <div className="readiness-bar">

          <div
            className="readiness-fill"
            style={{
              width: `${company.readiness}%`,
            }}
          />

        </div>

      </div>

      <div className="company-footer">

        <span>
          Start Preparation →
        </span>

      </div>

    </Link>
  );
}

"use client";

export default function ResumesPage() {
  const resumeStats = [
    {
      title: "Total Resumes",
      value: "870",
      icon: "📄",
    },
    {
      title: "ATS Approved",
      value: "645",
      icon: "✅",
    },
    {
      title: "Needs Improvement",
      value: "225",
      icon: "⚠️",
    },
    {
      title: "Average ATS Score",
      value: "78%",
      icon: "📊",
    },
  ];

  const recentResumes = [
    {
      name: "Dhanush Kumar",
      score: "88%",
      status: "Approved",
    },
    {
      name: "Rahul Kumar",
      score: "72%",
      status: "Review",
    },
    {
      name: "Priya Sharma",
      score: "91%",
      status: "Approved",
    },
    {
      name: "Arun Kumar",
      score: "65%",
      status: "Improve",
    },
  ];

  const handleExport = () => {
    const headers = ["Student Name", "ATS Score", "Status"];
    const rows = recentResumes.map(resume => [
      resume.name,
      resume.score,
      resume.status
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "resume_analysis_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resumes-page">

      <div className="page-header">

        <h1>
          📄 Resume Analysis
        </h1>

        <p>
          Monitor ATS scores, resume quality
          and student resume performance.
        </p>

      </div>

      <div className="resume-stats">

        {resumeStats.map((stat) => (
          <div
            key={stat.title}
            className="resume-stat-card"
          >
            <div className="resume-icon">
              {stat.icon}
            </div>

            <h2>{stat.value}</h2>

            <p>{stat.title}</p>
          </div>
        ))}

      </div>

      <div className="resume-table-card">

        <div className="table-header">

          <h2>
            Recent Resume Analysis
          </h2>

          <button className="admin-btn" onClick={handleExport}>
            Export Report
          </button>

        </div>

        <div className="resume-list">

          {recentResumes.map(
            (resume, index) => (
              <div
                key={index}
                className="resume-item"
              >

                <div>
                  <h3>
                    {resume.name}
                  </h3>
                </div>

                <div>
                  <strong>
                    ATS: {resume.score}
                  </strong>
                </div>

                <span
                  className={`resume-status ${
                    resume.status ===
                    "Approved"
                      ? "approved"
                      : resume.status ===
                        "Review"
                      ? "review"
                      : "improve"
                  }`}
                >
                  {resume.status}
                </span>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}




"use client";

const students = [
  {
    id: 1,
    name: "Dhanush Kumar",
    cgpa: 8.0,
    ats: 82,
    status: "Placement Ready",
  },
  {
    id: 2,
    name: "Arun",
    cgpa: 7.8,
    ats: 75,
    status: "In Progress",
  },
];

export default function StudentsPage() {
  const handleExport = () => {
    const headers = ["ID", "Name", "CGPA", "ATS Score", "Status"];
    const rows = students.map(student => [
      student.id,
      student.name,
      student.cgpa,
      `${student.ats}%`,
      student.status
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "student_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="students-page">

      <div className="page-header">

        <h1>
          👨‍🎓 Student Management
        </h1>

        <p>
          Monitor student performance,
          CGPA, ATS scores and placement readiness.
        </p>

      </div>

      <div className="student-stats">

        <div className="student-stat-card">
          <h2>1500+</h2>
          <p>Total Students</p>
        </div>

        <div className="student-stat-card">
          <h2>82%</h2>
          <p>Average ATS Score</p>
        </div>

        <div className="student-stat-card">
          <h2>8.1</h2>
          <p>Average CGPA</p>
        </div>

        <div className="student-stat-card">
          <h2>72%</h2>
          <p>Placement Ready</p>
        </div>

      </div>

      <div className="student-table-card">

        <div className="table-header">

          <h2>
            Student Records
          </h2>

          <button className="admin-btn" onClick={handleExport}>
            Export Data
          </button>

        </div>

        <table className="admin-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>CGPA</th>
              <th>ATS Score</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.cgpa}</td>
                <td>{student.ats}%</td>

                <td>
                  <span
                    className={
                      student.status ===
                      "Placement Ready"
                        ? "status-ready"
                        : "status-progress"
                    }
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}



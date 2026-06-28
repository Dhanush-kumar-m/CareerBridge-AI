import StatsCard from "../../components/admin/StatsCard";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <h1>
          📊 Admin Dashboard
        </h1>

        <p>
          Monitor students, placements,
          coding activity, resumes and
          platform performance.
        </p>

      </div>

      {/* Statistics */}

      <div className="admin-grid">

        <StatsCard
          title="Students"
          value="1250"
        />

        <StatsCard
          title="Companies"
          value="5"
        />

        <StatsCard
          title="Resumes"
          value="870"
        />

        <StatsCard
          title="Interviews"
          value="540"
        />

        <StatsCard
          title="Coding Submissions"
          value="10540"
        />

        <StatsCard
          title="Placement Ready"
          value="320"
        />

      </div>

      {/* Recent Activity */}

      <div className="admin-section">

        <h2>
          📈 Recent Activity
        </h2>

        <div className="activity-list">

          <div className="activity-item">
            ✅ New student registered
          </div>

          <div className="activity-item">
            📄 Resume uploaded
          </div>

          <div className="activity-item">
            💻 Coding challenge completed
          </div>

          <div className="activity-item">
            🎤 Mock interview finished
          </div>

          <div className="activity-item">
            🏢 Amazon preparation module visited
          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="admin-section">

        <h2>
          ⚡ Quick Actions
        </h2>

        <div className="quick-actions">

          <button className="admin-btn">
            Add Question
          </button>

          <button className="admin-btn">
            Send Notification
          </button>

          <button className="admin-btn">
            Generate Report
          </button>

          <button className="admin-btn">
            Manage Students
          </button>

        </div>

      </div>

      {/* Platform Status */}

      <div className="admin-section">

        <h2>
          🚀 Platform Status
        </h2>

        <div className="status-grid">

          <div className="status-card">
            <h3>Server</h3>
            <p>🟢 Online</p>
          </div>

          <div className="status-card">
            <h3>Database</h3>
            <p>🟢 Connected</p>
          </div>

          <div className="status-card">
            <h3>Users Active</h3>
            <p>152</p>
          </div>

          <div className="status-card">
            <h3>System Health</h3>
            <p>99.9%</p>
          </div>

        </div>

      </div>

    </div>
  );
}
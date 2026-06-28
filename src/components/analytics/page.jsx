import AnalyticsStats
from "../../components/analytics/AnalyticsStats";

import ProgressChart
from "../../components/analytics/ProgressChart";

import ActivityChart
from "../../components/analytics/ActivityChart";

import ReadinessCard
from "../../components/analytics/ReadinessCard";

import {
  progressData,
  activityData,
  readinessData,
}
from "../../data/analyticsData";

export default function AnalyticsPage() {
  return (
    <div className="analytics-page">

      {/* Header */}

      <div className="analytics-header">

        <h1>
          📊 Analytics Dashboard
        </h1>

        <p>
          Monitor your placement preparation,
          coding progress, ATS performance,
          interview readiness and overall
          placement score.
        </p>

      </div>

      {/* Statistics */}

      <AnalyticsStats />

      {/* Readiness Section */}

      <div className="section-header">

        <h2>
          🎯 Placement Readiness Breakdown
        </h2>

        <p>
          Track readiness across all placement
          preparation categories.
        </p>

      </div>

      <div className="readiness-grid">

        <ReadinessCard
          title="Aptitude"
          value={
            readinessData.aptitude
          }
        />

        <ReadinessCard
          title="Coding"
          value={
            readinessData.coding
          }
        />

        <ReadinessCard
          title="Resume"
          value={
            readinessData.resume
          }
        />

        <ReadinessCard
          title="Interview"
          value={
            readinessData.interview
          }
        />

        <ReadinessCard
          title="Placement"
          value={
            readinessData.placement
          }
        />

      </div>

      {/* Progress Chart */}

      <div className="analytics-section">

        <ProgressChart
          data={progressData}
        />

      </div>

      {/* Activity Chart */}

      <div className="analytics-section">

        <ActivityChart
          data={activityData}
        />

      </div>

      {/* Summary */}

      <div className="analytics-summary">

        <h2>
          🚀 Performance Summary
        </h2>

        <div className="summary-grid">

          <div className="summary-card">
            <h3>
              Strongest Area
            </h3>
            <p>
              Resume ATS (88%)
            </p>
          </div>

          <div className="summary-card">
            <h3>
              Needs Improvement
            </h3>
            <p>
              Coding Practice
            </p>
          </div>

          <div className="summary-card">
            <h3>
              Placement Readiness
            </h3>
            <p>
              79% Ready
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
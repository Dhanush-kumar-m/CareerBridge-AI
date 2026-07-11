"use client";

import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  const student = {
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Dhanush Kumar",
    email: user?.email || "dhanush@example.com",
    department: "Computer Science Engineering",
    year: "Final Year",
    cgpa: "8.0",
    phone: "+91 9876543210",
    aptitudeScore: 82,
    codingScore: 78,
    atsScore: 88,
    readinessScore: 81,
    xp: 2450,
    streak: 14,
    rank: 12,
    profileCompletion: 92,
  };

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <div className="profile-avatar">
          {student.name.charAt(0)}
        </div>

        <div>
          <h1>{student.name}</h1>
          <p>{student.email}</p>

          <span className="profile-badge">
            🚀 Placement Ready
          </span>
        </div>

      </div>

      {/* Profile Completion */}

      <div className="profile-completion">

        <div className="completion-header">
          <span>Profile Completion</span>
          <span>
            {student.profileCompletion}%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${student.profileCompletion}%`,
            }}
          />
        </div>

      </div>

      {/* Basic Details */}

      <div className="profile-grid">

        <div className="profile-card">
          <h3>Department</h3>
          <p>{student.department}</p>
        </div>

        <div className="profile-card">
          <h3>Year</h3>
          <p>{student.year}</p>
        </div>

        <div className="profile-card">
          <h3>CGPA</h3>
          <p>{student.cgpa}</p>
        </div>

        <div className="profile-card">
          <h3>Phone</h3>
          <p>{student.phone}</p>
        </div>

      </div>

      {/* Performance */}

      <h2 className="section-title">
        📊 Performance Overview
      </h2>

      <div className="profile-grid">

        <div className="score-card">
          <h3>Aptitude</h3>
          <h1>{student.aptitudeScore}%</h1>
        </div>

        <div className="score-card">
          <h3>Coding</h3>
          <h1>{student.codingScore}%</h1>
        </div>

        <div className="score-card">
          <h3>ATS Score</h3>
          <h1>{student.atsScore}%</h1>
        </div>

        <div className="score-card">
          <h3>Placement Readiness</h3>
          <h1>{student.readinessScore}%</h1>
        </div>

      </div>

      {/* Achievements */}

      <h2 className="section-title">
        🏆 Achievements
      </h2>

      <div className="profile-grid">

        <div className="achievement-card">
          🔥 {student.streak} Day Streak
        </div>

        <div className="achievement-card">
          ⭐ {student.xp} XP Earned
        </div>

        <div className="achievement-card">
          🏅 Global Rank #{student.rank}
        </div>

        <div className="achievement-card">
          📄 Resume Expert
        </div>

      </div>

      {/* Skills */}

      <h2 className="section-title">
        💻 Skills
      </h2>

      <div className="skills-container">

        <span>Java</span>
        <span>Python</span>
        <span>JavaScript</span>
        <span>React</span>
        <span>Node.js</span>
        <span>SQL</span>
        <span>DSA</span>

      </div>

      {/* Recent Activity */}

      <h2 className="section-title">
        📅 Recent Activity
      </h2>

      <div className="activity-card">

        <p>✅ Solved "Two Sum"</p>
        <p>📄 Resume ATS Score Improved to 88%</p>
        <p>🎤 Completed HR Mock Interview</p>
        <p>🏆 Earned Coding Champion Badge</p>

      </div>

      {/* Actions */}

      <div className="profile-actions">

        <button className="edit-btn">
          Edit Profile
        </button>

        <button className="resume-btn">
          View Resume
        </button>

      </div>

    </div>
  );
}
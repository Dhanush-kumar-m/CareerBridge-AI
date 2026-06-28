"use client";

import { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiCheckSquare,
  FiCode,
  FiFileText,
  FiMic,
  FiTrendingUp,
  FiBell,
  FiCpu,
  FiCalendar,
  FiBarChart2,
  FiActivity
} from "react-icons/fi";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "1,500+", icon: FiUser, color: "#3b82f6", desc: "Registered candidates" },
    { label: "Companies Available", value: "50+", icon: FiBriefcase, color: "#10b981", desc: "Hiring partners" },
    { label: "Total Courses", value: "12", icon: FiBookOpen, color: "#f59e0b", desc: "Placement modules" },
    { label: "Mock Tests Conducted", value: "240", icon: FiCheckSquare, color: "#ec4899", desc: "Quantitative reviews" },
    { label: "Coding Problems", value: "300+", icon: FiCode, color: "#8b5cf6", desc: "DSA & Framework challenges" },
    { label: "Resume Submissions", value: "870", icon: FiFileText, color: "#06b6d4", desc: "ATS verified CVs" },
    { label: "Mock Interviews Completed", value: "540", icon: FiMic, color: "#f97316", desc: "Technical & HR assessments" },
    { label: "Placement Success Rate", value: "82%", icon: FiTrendingUp, color: "#14b8a6", desc: "Active hiring ratio" },
    { label: "Active Notifications", value: "125", icon: FiBell, color: "#a855f7", desc: "Pushed system announcements" },
    { label: "AI Assistant Usage", value: "94%", icon: FiCpu, color: "#6366f1", desc: "Response satisfaction index" }
  ];

  const recentActivities = [
    { student: "Dhanush Kumar", action: "Submitted resume for ATS analysis", score: "88%", time: "10 mins ago" },
    { student: "Arun Kumar", action: "Completed Technical Mock Interview (OOP)", score: "84%", time: "25 mins ago" },
    { student: "Priya Sharma", action: "Solved daily DSA binary tree challenge", score: "100%", time: "1 hour ago" },
    { student: "Rahul Verma", action: "Attempted TCS quantitative mock test", score: "78%", time: "2 hours ago" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px", animation: "fadeIn 0.5s ease" }}>
      
      {/* Upper overview bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
        border: "1px solid var(--border-color)",
        padding: "20px 30px",
        borderRadius: "16px"
      }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "800", margin: 0 }}>System Performance Insights</h2>
          <p style={{ margin: "5px 0 0", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            Central administration hub checking server status, registration curves, and active user metrics.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "0.85rem", color: "var(--text-secondary)", background: "rgba(255,255,255,0.02)", padding: "10px 18px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
          <FiCalendar />
          <span>Session: June 2026</span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "var(--shadow)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              transition: "transform 0.2s ease"
            }} className="stat-hover-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: "600" }}>{stat.label}</span>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: `rgba(${stat.color === "#3b82f6" ? "59, 130, 246" : stat.color === "#10b981" ? "16, 185, 129" : stat.color === "#f59e0b" ? "245, 158, 11" : stat.color === "#ec4899" ? "236, 72, 153" : stat.color === "#8b5cf6" ? "139, 92, 246" : stat.color === "#06b6d4" ? "6, 182, 212" : stat.color === "#f97316" ? "249, 115, 22" : stat.color === "#14b8a6" ? "20, 184, 166" : stat.color === "#a855f7" ? "168, 85, 247" : "99, 102, 241"}, 0.12)`,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: "800", margin: 0 }}>{stat.value}</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Charts section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "25px",
        marginTop: "10px"
      }}>
        {/* Placement curves SVG line chart */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          padding: "25px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <FiActivity style={{ color: "var(--primary)" }} />
            <span>Weekly Learning Active Students Curve</span>
          </h3>
          {/* Custom SVG Line Chart */}
          <div style={{ height: "200px", width: "100%", position: "relative" }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" />

              {/* Area path */}
              <path d="M 40 170 Q 110 120 180 140 T 320 60 T 480 40 L 480 170 Z" fill="url(#blue-gradient)" opacity="0.15" />
              
              {/* Line path */}
              <path d="M 40 170 Q 110 120 180 140 T 320 60 T 480 40" fill="none" stroke="var(--primary)" strokeWidth="3" />

              {/* Data points */}
              <circle cx="110" cy="142" r="5" fill="var(--primary)" />
              <circle cx="218" cy="115" r="5" fill="var(--primary)" />
              <circle cx="320" cy="60" r="5" fill="var(--primary)" />
              <circle cx="480" cy="40" r="5" fill="var(--primary)" />

              {/* Gradients */}
              <defs>
                <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px 0 40px", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "5px" }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Department performance bar charts */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          padding: "25px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <FiBarChart2 style={{ color: "#10b981" }} />
            <span>Placement Readiness Index by Department</span>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", margin: "10px 0" }}>
            {[
              { dept: "Computer Science (CSE)", val: 86, color: "#3b82f6" },
              { dept: "Information Tech (IT)", val: 78, color: "#10b981" },
              { dept: "Electronics (ECE)", val: 68, color: "#f59e0b" },
              { dept: "Electrical (EEE)", val: 58, color: "#ec4899" }
            ].map((bar, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: "600" }}>
                  <span>{bar.dept}</span>
                  <span style={{ color: bar.color }}>{bar.val}% Placement Ready</span>
                </div>
                <div style={{ height: "8px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${bar.val}%`, background: bar.color, borderRadius: "10px", transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "var(--shadow)",
        marginBottom: "20px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>Recent Student Activities</h3>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Live feeds</span>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {recentActivities.map((act, index) => (
            <div key={index} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 18px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.01)",
              border: "1px solid var(--border-color)",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <div>
                <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>{act.student}</span>
                <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "var(--text-secondary)" }}>{act.action}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{ fontSize: "0.82rem", background: "rgba(59, 130, 246, 0.12)", color: "var(--primary)", padding: "4px 8px", borderRadius: "6px", fontWeight: "700" }}>
                  Score: {act.score}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .stat-hover-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary) !important;
          box-shadow: var(--shadow-glow) !important;
        }
      `}</style>

    </div>
  );
}


"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [activeSetting, setActiveSetting] = useState(null);
  const [configState, setConfigState] = useState({});

  const settings = [
    {
      title: "Authentication",
      description: "Manage login, registration and user access.",
      icon: "🔐",
      fields: [
        { name: "allowRegistration", label: "Allow New Student Registrations", type: "checkbox", default: true },
        { name: "sessionTimeout", label: "Session Timeout (minutes)", type: "number", default: 60 },
        { name: "twoFactor", label: "Enforce Admin 2FA", type: "checkbox", default: false }
      ]
    },
    {
      title: "Email Notifications",
      description: "Configure placement alerts and announcements.",
      icon: "📧",
      fields: [
        { name: "sendAlerts", label: "Send Automated Placement Alerts", type: "checkbox", default: true },
        { name: "digestFrequency", label: "Weekly Digest Day", type: "select", options: ["Monday", "Friday", "Sunday"], default: "Monday" },
        { name: "senderName", label: "Email Sender Name", type: "text", default: "CareerBridge Placements Office" }
      ]
    },
    {
      title: "Question Bank",
      description: "Manage aptitude and coding question settings.",
      icon: "📚",
      fields: [
        { name: "minPassScore", label: "Passing Percentage (%)", type: "number", default: 60 },
        { name: "allowMultipleAttempts", label: "Allow Multiple Test Re-attempts", type: "checkbox", default: true },
        { name: "editorTheme", label: "Coding IDE Default Theme", type: "select", options: ["vs-dark", "light"], default: "vs-dark" }
      ]
    },
    {
      title: "Resume Analysis",
      description: "Configure ATS scoring and resume evaluation.",
      icon: "📄",
      fields: [
        { name: "minAtsScore", label: "Target ATS Passing Threshold (%)", type: "number", default: 75 },
        { name: "enableAIGrammar", label: "Auto-scan Spelling & Grammar", type: "checkbox", default: true },
        { name: "maxFileSize", label: "Maximum Upload Size (MB)", type: "number", default: 5 }
      ]
    },
    {
      title: "Interview Module",
      description: "Manage mock interview configurations.",
      icon: "🎤",
      fields: [
        { name: "maxDailyInterviews", label: "Max Interviews/Student/Day", type: "number", default: 3 },
        { name: "voiceFeedback", label: "Enable AI Audio Feedback Speech", type: "checkbox", default: false },
        { name: "evaluationEngine", label: "AI Model Version", type: "select", options: ["Gemini 2.5 Flash", "Gemini 2.5 Pro"], default: "Gemini 2.5 Flash" }
      ]
    },
    {
      title: "System Preferences",
      description: "Application settings, themes and security.",
      icon: "⚙️",
      fields: [
        { name: "maintenanceMode", label: "Enable Maintenance Mode", type: "checkbox", default: false },
        { name: "systemTheme", label: "Default System Appearance", type: "select", options: ["System Theme", "Dark Mode Only", "Light Mode Only"], default: "System Theme" },
        { name: "backupInterval", label: "Database Backup Schedule", type: "select", options: ["Every 24 Hours", "Every Week", "Every Month"], default: "Every 24 Hours" }
      ]
    },
  ];

  // Initialize config states from localStorage or defaults
  useEffect(() => {
    const loadedConfigs = {};
    settings.forEach((s) => {
      s.fields.forEach((f) => {
        const key = `settings_${s.title.toLowerCase().replace(/\s+/g, "_")}_${f.name}`;
        const storedVal = localStorage.getItem(key);
        if (storedVal !== null) {
          if (f.type === "checkbox") {
            loadedConfigs[key] = storedVal === "true";
          } else if (f.type === "number") {
            loadedConfigs[key] = parseInt(storedVal);
          } else {
            loadedConfigs[key] = storedVal;
          }
        } else {
          loadedConfigs[key] = f.default;
        }
      });
    });
    setConfigState(loadedConfigs);
  }, []);

  const handleFieldChange = (key, val) => {
    setConfigState((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (!activeSetting) return;

    activeSetting.fields.forEach((f) => {
      const key = `settings_${activeSetting.title.toLowerCase().replace(/\s+/g, "_")}_${f.name}`;
      localStorage.setItem(key, String(configState[key]));
    });

    alert(`Settings for ${activeSetting.title} updated successfully!`);
    setActiveSetting(null);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ System Settings</h1>
        <p>
          Manage application configurations, security settings and platform preferences.
        </p>
      </div>

      <div className="settings-stats">
        <div className="settings-stat-card">
          <h2>1500+</h2>
          <p>Registered Users</p>
        </div>
        <div className="settings-stat-card">
          <h2>99.9%</h2>
          <p>System Uptime</p>
        </div>
        <div className="settings-stat-card">
          <h2>6</h2>
          <p>Active Modules</p>
        </div>
        <div className="settings-stat-card">
          <h2>24/7</h2>
          <p>Monitoring</p>
        </div>
      </div>

      <div className="settings-grid">
        {settings.map((setting) => (
          <div key={setting.title} className="settings-card">
            <div className="settings-icon">{setting.icon}</div>
            <h3>{setting.title}</h3>
            <p>{setting.description}</p>
            <button className="admin-btn" onClick={() => setActiveSetting(setting)}>
              Configure
            </button>
          </div>
        ))}
      </div>

      {/* Configuration Modal - High Visibility Design */}
      {activeSetting && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(8, 12, 24, 0.85)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <form onSubmit={handleSaveConfig} style={{
            background: "linear-gradient(145deg, #1e293b, #0f172a)",
            color: "#f8fafc",
            padding: "25px",
            borderRadius: "14px",
            border: "1.5px solid #3b82f6",
            width: "90%",
            maxWidth: "460px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 12px rgba(59, 130, 246, 0.2)"
          }}>
            <h2 style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px", fontSize: "1.25rem", color: "#ffffff" }}>
              <span>⚙️ Configure {activeSetting.title}</span>
              <button 
                type="button"
                onClick={() => setActiveSetting(null)}
                style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
              >
                &times;
              </button>
            </h2>
            <p style={{ color: "#94a3b8", marginBottom: "20px", fontSize: "0.88rem", lineHeight: "1.4" }}>
              Update the settings and operational rules for the {activeSetting.title} section.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
              {activeSetting.fields.map((field) => {
                const key = `settings_${activeSetting.title.toLowerCase().replace(/\s+/g, "_")}_${field.name}`;
                const value = configState[key];

                return (
                  <div key={field.name} style={{ display: "flex", flexDirection: field.type === "checkbox" ? "row-reverse" : "column", justifyContent: field.type === "checkbox" ? "flex-end" : "flex-start", alignItems: field.type === "checkbox" ? "center" : "stretch", gap: "6px" }}>
                    <label style={{ fontSize: "0.88rem", fontWeight: "600", color: "#cbd5e1" }}>{field.label}</label>

                    {field.type === "checkbox" && (
                      <input 
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) => handleFieldChange(key, e.target.checked)}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                      />
                    )}

                    {field.type === "number" && (
                      <input 
                        type="number"
                        value={value !== undefined ? value : ""}
                        onChange={(e) => handleFieldChange(key, parseInt(e.target.value) || 0)}
                        required
                        style={{
                          padding: "10px",
                          background: "rgba(0, 0, 0, 0.2)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.9rem"
                        }}
                      />
                    )}

                    {field.type === "text" && (
                      <input 
                        type="text"
                        value={value !== undefined ? value : ""}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        required
                        style={{
                          padding: "10px",
                          background: "rgba(0, 0, 0, 0.2)",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.9rem"
                        }}
                      />
                    )}

                    {field.type === "select" && (
                      <select
                        value={value !== undefined ? value : ""}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        style={{
                          padding: "10px",
                          background: "#0f172a",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          borderRadius: "8px",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                          cursor: "pointer"
                        }}
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button 
                type="button" 
                onClick={() => setActiveSetting(null)}
                style={{ 
                  padding: "10px 18px", 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.15)", 
                  borderRadius: "8px", 
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ 
                  padding: "10px 18px", 
                  background: "#3b82f6", 
                  border: "none", 
                  borderRadius: "8px", 
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "0.88rem",
                  cursor: "pointer"
                }}
              >
                Save Configuration
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}



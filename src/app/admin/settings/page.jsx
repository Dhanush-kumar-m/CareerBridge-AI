"use client";

import { useState, useEffect } from "react";
import {
  FiSettings,
  FiBriefcase,
  FiBookOpen,
  FiCode,
  FiFileText,
  FiMic,
  FiLock,
  FiDatabase,
  FiMail,
  FiBell,
  FiCpu,
  FiCheckCircle,
  FiAlertTriangle,
  FiTerminal,
  FiRefreshCw,
  FiUpload,
  FiPlay
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  // Configuration form state
  const [generalConfig, setGeneralConfig] = useState({
    platformName: "CareerBridge AI",
    supportEmail: "support@careerbridge.ai",
    contactNumber: "+91 8637431104",
    timeZone: "UTC+5:30 (Kolkata)",
    dateFormat: "YYYY-MM-DD",
    maintenanceMode: false
  });

  const [authConfig, setAuthConfig] = useState({
    enableRegistration: true,
    emailVerification: true,
    jwtSecret: "careerbridge_token_secret_vault_key",
    sessionTimeout: 60,
    googleLogin: true,
    githubLogin: true,
    twoFactor: false
  });

  const [smtpConfig, setSmtpConfig] = useState({
    host: "smtp.careerbridge.ai",
    port: 587,
    username: "broadcast@careerbridge.ai",
    senderName: "CareerBridge Placements Office",
    senderEmail: "broadcast@careerbridge.ai",
    autoAnnounceDrive: true,
    autoAlertInterview: true,
    autoAlertResume: true
  });

  const [apiConfig, setApiConfig] = useState({
    aiProvider: "Gemini",
    aiApiKey: "AIzaSyB_demo_gemini_key_hash",
    aiModel: "gemini-2.5-flash",
    aiTemperature: 0.2,
    compilerProvider: "Judge0 API",
    compilerUrl: "https://api.judge0.com",
    compilerApiKey: "judge0_demo_key_hash",
    execTimeLimit: 2.0,
    memoryLimit: 512
  });

  const [moduleConfig, setModuleConfig] = useState({
    minAtsScore: 75,
    interviewTimer: 10,
    interviewVoice: true,
    interviewVideo: false,
    negativeMarking: false,
    aptitudePassScore: 60,
    codingChallenges: true
  });

  const handleSave = (section) => {
    alert(`${section} settings updated successfully in system configs database!`);
  };

  const handleTestEmail = () => {
    alert("Test email dispatched successfully to support@careerbridge.ai");
  };

  const handleClearCache = () => {
    alert("System template cache flushed successfully.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px", animation: "fadeIn 0.5s ease" }}>
      
      {/* Header Banner */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 30px",
        borderRadius: "16px"
      }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", margin: 0, color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
            <FiSettings style={{ color: "var(--primary)" }} />
            <span>Platform Configurations</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Tune SMTP servers host, OAuth providers permissions, Judge0 limits, and Gemini AI temperature variables.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("general")} className={`tab-link ${activeTab === "general" ? "active" : ""}`}>
          <FiSettings />
          <span>General & Branding</span>
        </button>
        <button onClick={() => setActiveTab("auth")} className={`tab-link ${activeTab === "auth" ? "active" : ""}`}>
          <FiLock />
          <span>Auth & Security</span>
        </button>
        <button onClick={() => setActiveTab("smtp")} className={`tab-link ${activeTab === "smtp" ? "active" : ""}`}>
          <FiMail />
          <span>SMTP & Notifications</span>
        </button>
        <button onClick={() => setActiveTab("api")} className={`tab-link ${activeTab === "api" ? "active" : ""}`}>
          <FiCpu />
          <span>APIs & Compiler</span>
        </button>
        <button onClick={() => setActiveTab("modules")} className={`tab-link ${activeTab === "modules" ? "active" : ""}`}>
          <FiCode />
          <span>Module Specifics</span>
        </button>
        <button onClick={() => setActiveTab("system")} className={`tab-link ${activeTab === "system" ? "active" : ""}`}>
          <FiDatabase />
          <span>Database & Maintenance</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: General & Branding */}
        {activeTab === "general" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", alignItems: "start" }}>
            
            {/* General form */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Platform Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Platform Name</span>
                    <input type="text" value={generalConfig.platformName} onChange={e => setGeneralConfig({...generalConfig, platformName: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", fontSize: "0.88rem" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Support Email</span>
                    <input type="text" value={generalConfig.supportEmail} onChange={e => setGeneralConfig({...generalConfig, supportEmail: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", fontSize: "0.88rem" }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Time Zone</span>
                    <input type="text" value={generalConfig.timeZone} onChange={e => setGeneralConfig({...generalConfig, timeZone: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", fontSize: "0.88rem" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Date Format</span>
                    <input type="text" value={generalConfig.dateFormat} onChange={e => setGeneralConfig({...generalConfig, dateFormat: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", fontSize: "0.88rem" }} />
                  </div>
                </div>
                
                <button type="button" onClick={() => handleSave("General")} className="solve-btn" style={{ marginTop: "10px", alignSelf: "flex-start" }}>Save Changes</button>
              </div>
            </div>

            {/* Branding uploaders */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Platform Logo Assets</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ border: "1px dashed rgba(255,255,255,0.1)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                  <FiUpload style={{ color: "var(--primary)", marginBottom: "8px" }} size={24} />
                  <span style={{ display: "block", fontSize: "0.82rem", color: "var(--text-secondary)" }}>Upload Platform Dark Logo (.png)</span>
                </div>
                <div style={{ border: "1px dashed rgba(255,255,255,0.1)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                  <FiUpload style={{ color: "var(--primary)", marginBottom: "8px" }} size={24} />
                  <span style={{ display: "block", fontSize: "0.82rem", color: "var(--text-secondary)" }}>Upload Browser Favicon (.ico)</span>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 2: Auth & Security */}
        {activeTab === "auth" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Registration/Login rules */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Access Permissions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Allow Student Registrations</span>
                  <input type="checkbox" checked={authConfig.enableRegistration} onChange={e => setAuthConfig({...authConfig, enableRegistration: e.target.checked})} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Enforce email verification</span>
                  <input type="checkbox" checked={authConfig.emailVerification} onChange={e => setAuthConfig({...authConfig, emailVerification: e.target.checked})} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Google Login (OAuth)</span>
                  <input type="checkbox" checked={authConfig.googleLogin} onChange={e => setAuthConfig({...authConfig, googleLogin: e.target.checked})} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span>Enforce Admin Two-Factor Authentication</span>
                  <input type="checkbox" checked={authConfig.twoFactor} onChange={e => setAuthConfig({...authConfig, twoFactor: e.target.checked})} />
                </div>
              </div>
              <button type="button" onClick={() => handleSave("Security")} className="solve-btn" style={{ marginTop: "15px" }}>Save Auth Config</button>
            </div>

            {/* Token secrets */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>JWT Secrets & Expiries</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>JWT secret signature</span>
                  <input type="password" value={authConfig.jwtSecret} onChange={e => setAuthConfig({...authConfig, jwtSecret: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", fontSize: "0.88rem" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Session Timeout limit (Mins)</span>
                  <input type="number" value={authConfig.sessionTimeout} onChange={e => setAuthConfig({...authConfig, sessionTimeout: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", fontSize: "0.88rem" }} />
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 3: SMTP & Notifications */}
        {activeTab === "smtp" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* SMTP config */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>SMTP Server Configurations</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Host</span>
                    <input type="text" value={smtpConfig.host} onChange={e => setSmtpConfig({...smtpConfig, host: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Port</span>
                    <input type="number" value={smtpConfig.port} onChange={e => setSmtpConfig({...smtpConfig, port: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Sender Email Address</span>
                  <input type="text" value={smtpConfig.senderEmail} onChange={e => setSmtpConfig({...smtpConfig, senderEmail: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                </div>
                
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button type="button" onClick={() => handleSave("SMTP")} className="solve-btn">Save SMTP</button>
                  <button type="button" onClick={handleTestEmail} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff" }}>Send Test Email</button>
                </div>
              </div>
            </div>

            {/* Auto trigger notifications toggles (Omitted certificates!) */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Auto Notification Rules</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Announce new placement drive opening</span>
                  <input type="checkbox" checked={smtpConfig.autoAnnounceDrive} onChange={e => setSmtpConfig({...smtpConfig, autoAnnounceDrive: e.target.checked})} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Alert when mock interview is scheduled</span>
                  <input type="checkbox" checked={smtpConfig.autoAlertInterview} onChange={e => setSmtpConfig({...smtpConfig, autoAlertInterview: e.target.checked})} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span>Alert when resume ATS score check completes</span>
                  <input type="checkbox" checked={smtpConfig.autoAlertResume} onChange={e => setSmtpConfig({...smtpConfig, autoAlertResume: e.target.checked})} />
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 4: APIs & Compiler Integrations */}
        {activeTab === "api" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Gemini settings */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>AI Services (Gemini Integration)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>AI Provider</span>
                  <input type="text" value={apiConfig.aiProvider} readOnly style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-secondary)", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Gemini API key</span>
                  <input type="password" value={apiConfig.aiApiKey} onChange={e => setApiConfig({...apiConfig, aiApiKey: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Model version</span>
                    <input type="text" value={apiConfig.aiModel} onChange={e => setApiConfig({...apiConfig, aiModel: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Temperature</span>
                    <input type="number" step="0.1" value={apiConfig.aiTemperature} onChange={e => setApiConfig({...apiConfig, aiTemperature: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                  </div>
                </div>
                <button type="button" onClick={() => handleSave("AI Provider")} className="solve-btn" style={{ marginTop: "8px", alignSelf: "flex-start" }}>Save AI keys</button>
              </div>
            </div>

            {/* Compiler Judge0 settings */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Online Compiler settings (Judge0 API)</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>API Gateway URL</span>
                  <input type="text" value={apiConfig.compilerUrl} onChange={e => setApiConfig({...apiConfig, compilerUrl: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>API Gateway Key</span>
                  <input type="password" value={apiConfig.compilerApiKey} onChange={e => setApiConfig({...apiConfig, compilerApiKey: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Time limit (Secs)</span>
                    <input type="number" step="0.5" value={apiConfig.execTimeLimit} onChange={e => setApiConfig({...apiConfig, execTimeLimit: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Memory limit (MB)</span>
                    <input type="number" value={apiConfig.memoryLimit} onChange={e => setApiConfig({...apiConfig, memoryLimit: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                  </div>
                </div>
                <button type="button" onClick={() => handleSave("Compiler")} className="solve-btn" style={{ marginTop: "8px", alignSelf: "flex-start" }}>Save Compiler Settings</button>
              </div>
            </div>

          </section>
        )}

        {/* Tab 5: Module Specifics */}
        {activeTab === "modules" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Resume & Interview specifics */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Resume & Mock Interview rules</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Target ATS approved threshold (%)</span>
                  <input type="number" value={moduleConfig.minAtsScore} onChange={e => setModuleConfig({...moduleConfig, minAtsScore: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px", borderRadius: "4px", width: "60px", textAlign: "center", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Interview speech recording timer (Mins)</span>
                  <input type="number" value={moduleConfig.interviewTimer} onChange={e => setModuleConfig({...moduleConfig, interviewTimer: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px", borderRadius: "4px", width: "60px", textAlign: "center", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span>Enable AI Voice Speech output</span>
                  <input type="checkbox" checked={moduleConfig.interviewVoice} onChange={e => setModuleConfig({...moduleConfig, interviewVoice: e.target.checked})} />
                </div>
              </div>
            </div>

            {/* Coding & Aptitude specifics */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Coding & Aptitude configurations</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Aptitude tests passing score (%)</span>
                  <input type="number" value={moduleConfig.aptitudePassScore} onChange={e => setModuleConfig({...moduleConfig, aptitudePassScore: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px", borderRadius: "4px", width: "60px", textAlign: "center", fontSize: "0.85rem" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span>Enforce negative markings</span>
                  <input type="checkbox" checked={moduleConfig.negativeMarking} onChange={e => setModuleConfig({...moduleConfig, negativeMarking: e.target.checked})} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span>Enable Daily coding challenges arena</span>
                  <input type="checkbox" checked={moduleConfig.codingChallenges} onChange={e => setModuleConfig({...moduleConfig, codingChallenges: e.target.checked})} />
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 6: System & Backups */}
        {activeTab === "system" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Database backups */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.1rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiDatabase style={{ color: "#fb7185" }} />
                <span>Database Administration</span>
              </h3>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginBottom: "20px" }}>Generate state backups, check sizes, or import candidate tables.</p>
              
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={() => alert("Database state backup finalized. Archive name: backup_20260629.sql")} className="solve-btn" style={{ background: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)" }}>Manual Backup</button>
                <button type="button" onClick={() => alert("Database restoration scheduled.")} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" }}>Restore Database</button>
              </div>
            </div>

            {/* Quick configurations utilities */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.1rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiSettings style={{ color: "#10b981" }} />
                <span>Quick Settings Utilities</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={handleClearCache} className="start-practice-badge-btn" style={{ justifyContent: "center" }}><FiRefreshCw /> Clear Template Cache</button>
                <button onClick={() => alert("Gateway compiler micro-services restarted successfully.")} className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)" }}><FiPlay /> Restart Compiler Services</button>
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}

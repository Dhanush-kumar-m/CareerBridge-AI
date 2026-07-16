export default function LanguageSelector({
  language,
  setLanguage,
  onDownload,
  onReset
}) {
  const languages = [
    {
      value: "C",
      icon: "⚙️",
    },
    {
      value: "C++",
      icon: "🚀",
    },
    {
      value: "Java",
      icon: "☕",
    },
    {
      value: "Python",
      icon: "🐍",
    },
    {
      value: "JavaScript",
      icon: "🟨",
    },
  ];

  return (
    <div className="language-selector" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <label style={{ margin: 0, whiteSpace: "nowrap" }}>
          Programming Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
          style={{ cursor: "pointer" }}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.icon} {lang.value}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button 
          onClick={onDownload} 
          title="Download Source Code"
          style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "#e5e7eb", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"}
        >
          📥 Download
        </button>
        <button 
          onClick={onReset} 
          title="Reset Code Editor"
          style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "#e5e7eb", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)"}
        >
          🧹 Reset
        </button>
      </div>
    </div>
  );
}
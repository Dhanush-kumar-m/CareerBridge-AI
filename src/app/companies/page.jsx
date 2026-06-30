"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import companies from "../../data/companies";
import {
  FiBriefcase,
  FiSearch,
  FiTrendingUp,
  FiFolder,
  FiCalendar,
  FiCheckCircle,
  FiBookmark,
  FiFilter,
  FiDollarSign,
  FiMapPin,
  FiZap,
  FiChevronRight
} from "react-icons/fi";

import useCompanyInteractions from "../../hooks/useCompanyInteractions";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedWorkMode, setSelectedWorkMode] = useState("All");

  const { getSavedAndAppliedCounts } = useCompanyInteractions();
  const { savedCount, appliedCount } = getSavedAndAppliedCounts();

  // Unique categories, locations, work modes for filter options
  const categoriesList = ["All", "Product-Based", "Service-Based", "Startup", "Banking & Finance", "Consulting Companies", "Automobile Companies"];
  const locationsList = ["All", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"];
  const workModesList = ["All", "Remote", "Hybrid", "In-Office"];

  // Search & filter matching logic
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.package.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.overview.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || c.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" ||
        c.eligibility.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesWorkMode =
        selectedWorkMode === "All" ||
        c.eligibility.mode.toLowerCase() === selectedWorkMode.toLowerCase();

      return matchesSearch && matchesCategory && matchesLocation && matchesWorkMode;
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedWorkMode]);

  // Dream companies count (companies with package >= 10 LPA)
  const dreamCompaniesCount = companies.filter((c) => {
    const pkg = parseFloat(c.package);
    return !isNaN(pkg) && pkg >= 10;
  }).length;

  return (
    <div className="companies-portal-container" style={{ padding: "10px" }}>
      
      {/* Portal Header */}
      <header className="aptitude-portal-header" style={{ marginBottom: "35px" }}>
        <div className="portal-header-info">
          <span className="badge-glow">
            <FiBriefcase style={{ marginRight: "6px" }} />
            CAREER & PLACEMENTS
          </span>
          <h1>Company Preparation Hub</h1>
          <p>
            Navigate custom recruiters profiles, detailed eligibility requirements, salary structures, 
            30-day prep roadmaps, previous years' assessment papers, and interview transcripts.
          </p>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="portal-header-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "15px", width: "100%" }}>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Total Companies</span>
            <span className="stat-value" style={{ fontSize: "1.4rem" }}>{companies.length}</span>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Dream Companies</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#f59e0b" }}>{dreamCompaniesCount}</span>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Applied Drives</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#10b981" }}>{appliedCount}</span>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Saved</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#a78bfa" }}>{savedCount}</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "25px" }}>
        
        {/* Search & Filters Panel */}
        <section style={{ 
          background: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.06)", 
          borderRadius: "16px", 
          padding: "20px" 
        }}>
          
          <div className="filter-controls" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            
            {/* Search Input */}
            <div className="search-wrapper" style={{ minWidth: "100%" }}>
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search recruiters by name, package (LPA), roles, technologies, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="category-pills" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
                  style={{ fontSize: "0.85rem", padding: "6px 14px" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Secondary Filter Dropdowns */}
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Location:</span>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  {locationsList.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Work Mode:</span>
                <select 
                  value={selectedWorkMode} 
                  onChange={(e) => setSelectedWorkMode(e.target.value)}
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  {workModesList.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                </select>
              </div>

            </div>

          </div>
        </section>

        {/* Company Recruiter Cards Grid */}
        <section>
          <div className="companies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "25px" }}>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((c) => (
                <article 
                  key={c.slug}
                  className="module-accordion-card"
                  style={{ 
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "260px",
                    cursor: "default"
                  }}
                >
                  <div>
                    {/* Header Row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <div style={{
                          fontSize: "2.2rem",
                          width: "55px",
                          height: "55px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {c.logo}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.15rem", fontWeight: "700", margin: 0, color: "#ffffff" }}>{c.name}</h3>
                          <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>{c.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Brief description */}
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: "1.5", margin: "0 0 18px 0" }}>
                      {c.description}
                    </p>

                    {/* Meta info tags */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.84rem", color: "#cbd5e1" }}>
                        <FiDollarSign style={{ color: "#10b981", flexShrink: 0 }} />
                        <span><strong>Package:</strong> {c.package}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.84rem", color: "#cbd5e1" }}>
                        <FiMapPin style={{ color: "#60a5fa", flexShrink: 0 }} />
                        <span><strong>Job Location:</strong> {c.eligibility.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Link */}
                  <div style={{ 
                    borderTop: "1px solid rgba(255,255,255,0.06)", 
                    paddingTop: "15px", 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                  }}>
                    <span style={{ 
                      fontSize: "0.78rem", 
                      fontWeight: "700", 
                      color: c.stats.difficulty === "Hard" ? "#fb7185" : "#fbbf24" 
                    }}>
                      {c.stats.difficulty} Difficulty
                    </span>
                    <Link href={`/companies/${c.slug}`} className="start-practice-badge-btn">
                      <span>Prep Portal</span>
                      <FiChevronRight style={{ marginLeft: "2px" }} />
                    </Link>
                  </div>

                </article>
              ))
            ) : (
              <div className="empty-search-state" style={{ gridColumn: "1 / -1", padding: "40px", textAlign: "center" }}>
                <p style={{ color: "var(--text-secondary)" }}>No recruiter profiles found matching your filters. Try shifting parameters.</p>
              </div>
            )}
          </div>
        </section>

        {/* Informative guidelines */}
        <section className="practice-tips-section" style={{ marginTop: "20px" }}>
          <h3><FiZap /> Corporate Recruitment Roadmap Overview</h3>
          <div className="tips-grid">
            <div className="tip-box">
              <span className="tip-num">01</span>
              <h5>Online Assessment (OA)</h5>
              <p>Practice timing, solve previous years' aptitude and coding challenges in real compilers.</p>
            </div>
            <div className="tip-box">
              <span className="tip-num">02</span>
              <h5>Technical Evaluations</h5>
              <p>Study core fundamentals (DBMS, SQL Joins, System design principles, and dry-run code sheets).</p>
            </div>
            <div className="tip-box">
              <span className="tip-num">03</span>
              <h5>Managerial & HR</h5>
              <p>Structure your responses using the STAR method (Situation, Task, Action, Result) for behavioral evaluations.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
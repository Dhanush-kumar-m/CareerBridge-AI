"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  modules,
  companies,
  mockTests,
  difficultyLevels,
  certificates
} from "../../data/aptitudeCurriculum";
import {
  FiBookOpen,
  FiTrendingUp,
  FiCpu,
  FiPieChart,
  FiCompass,
  FiCheckCircle,
  FiTarget,
  FiActivity,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiBriefcase,
  FiAward,
  FiZap,
  FiTrophy,
  FiShield,
  FiCalendar,
  FiUser,
  FiPercent,
  FiExternalLink,
  FiDownload,
  FiLock,
  FiPlay,
  FiCheck
} from "react-icons/fi";

export default function AptitudePage() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedToast, setCompletedToast] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const completed = params.get("completedModule");
      if (completed) {
        const completedId = parseInt(completed);
        const nextId = completedId + 1;
        
        // Find if next module exists
        const nextModule = modules.find(m => m.id === nextId);
        if (nextModule) {
          setExpandedModule(nextId);
          setTimeout(() => {
            const el = document.getElementById(`module-card-${nextId}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 600);
        }

        const prevModule = modules.find(m => m.id === completedId);
        if (prevModule) {
          setCompletedToast(`Thanks for completing Module ${completedId}: ${prevModule.title.split(": ")[1] || ""}! 🥳`);
          setTimeout(() => setCompletedToast(""), 4000);
        }
      }
    }
  }, []);

  // Search and Category Filter for Modules
  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" ||
        m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Search filter for Companies
  const [companySearch, setCompanySearch] = useState("");
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) =>
      c.name.toLowerCase().includes(companySearch.toLowerCase())
    );
  }, [companySearch]);

  const toggleModule = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  // Helper to map category to route
  const getCategoryRoute = (category) => {
    switch (category) {
      case "Quantitative":
        return "/aptitude/quantitative";
      case "Verbal":
        return "/aptitude/verbal";
      case "Reasoning":
        return "/aptitude/reasoning";
      case "Data Interpretation":
        return "/aptitude/data-interpretation";
      default:
        return "/aptitude/quantitative";
    }
  };

  return (
    <div className="aptitude-home-container" style={{ padding: "30px", maxWidth: "1400px", margin: "0 auto", position: "relative" }}>
      {/* Toast Alert */}
      {completedToast && (
        <div style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          padding: "16px 24px",
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#ffffff",
          fontWeight: "700",
          fontSize: "1.05rem",
          animation: "fadeIn 0.3s ease-out"
        }}>
          <span style={{ fontSize: "1.5rem" }}>🎉</span>
          <span>{completedToast}</span>
        </div>
      )}
      {/* Banner / Header */}
      <header className="aptitude-portal-header">
        <div className="portal-header-info">
          <span className="badge-glow">
            <FiZap size={13} style={{ marginRight: "6px" }} />
            Placement Preparation Hub
          </span>
          <h1>Aptitude Training Portal</h1>
          <p>
            Master Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Data Interpretation. 
            Benchmark your metrics, challenge mock assessments, and earn certified readiness credentials.
          </p>
        </div>
        <div className="portal-header-stats">
          <div className="stat-pill">
            <span className="stat-label">Syllabus Progress</span>
            <span className="stat-value">42%</span>
            <div className="mini-progress-bar"><div className="fill" style={{ width: "42%" }}></div></div>
          </div>
          <div className="stat-pill">
            <span className="stat-label">Accuracy Goal</span>
            <span className="stat-value">78% / 85%</span>
            <div className="mini-progress-bar"><div className="fill glow" style={{ width: "78%" }}></div></div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav">
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`tab-link ${activeTab === "curriculum" ? "active" : ""}`}
        >
          <FiBookOpen />
          <span>Curriculum ({modules.length} Modules)</span>
        </button>

        <button
          onClick={() => setActiveTab("companies")}
          className={`tab-link ${activeTab === "companies" ? "active" : ""}`}
        >
          <FiBriefcase />
          <span>Company Archives ({companies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("tests")}
          className={`tab-link ${activeTab === "tests" ? "active" : ""}`}
        >
          <FiZap />
          <span>Mock Tests</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`tab-link ${activeTab === "analytics" ? "active" : ""}`}
        >
          <FiActivity />
          <span>Performance Analytics</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Curriculum */}
        {activeTab === "curriculum" && (
          <section className="tab-pane fade-in">
            <div className="filter-controls">
              {/* Search input */}
              <div className="search-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search modules or specific subtopics (e.g. Divisibility, Syllogism)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category selector */}
              <div className="category-pills">
                {["All", "Quantitative", "Reasoning", "Verbal", "Data Interpretation"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Curriculum grid */}
            <div className="modules-accordion-grid">
              {filteredModules.length > 0 ? (
                filteredModules.map((m) => {
                  const isExpanded = expandedModule === m.id;
                  const categoryColors = {
                    Quantitative: "rgba(59, 130, 246, 0.15)",
                    Reasoning: "rgba(16, 185, 129, 0.15)",
                    Verbal: "rgba(236, 72, 153, 0.15)",
                    "Data Interpretation": "rgba(139, 92, 246, 0.15)"
                  };
                  const categoryBorderColors = {
                    Quantitative: "#3b82f6",
                    Reasoning: "#10b981",
                    Verbal: "#ec4899",
                    "Data Interpretation": "#8b5cf6"
                  };
                  return (
                    <article 
                      key={m.id} 
                      id={`module-card-${m.id}`}
                      className={`module-accordion-card ${isExpanded ? "expanded" : ""}`}
                      style={{ borderLeft: `4px solid ${categoryBorderColors[m.category] || "#4b5563"}` }}
                    >
                      <div className="module-header" onClick={() => toggleModule(m.id)}>
                        <div className="module-title-group">
                          <span 
                            className="module-cat-badge" 
                            style={{ 
                              background: categoryColors[m.category] || "rgba(255,255,255,0.05)",
                              color: categoryBorderColors[m.category] || "#94a3b8"
                            }}
                          >
                            {m.category}
                          </span>
                          <h3>{m.title}</h3>
                        </div>
                        <div className="module-interactive-indicators">
                          <span className="topics-count-label">{m.topics.length} topics</span>
                          <Link 
                            href={`${getCategoryRoute(m.category)}?difficulty=Easy&module=${m.id}`}
                            className="start-practice-badge-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiPlay style={{ marginRight: "4px" }} />
                            <span>Start Practice</span>
                          </Link>
                          <button className="expand-chevron">
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="module-body">
                          <div className="topics-list-container">
                            <h4>Curriculum Checklist:</h4>
                            <div className="topics-tags-grid">
                              {m.topics.map((topic, i) => (
                                <span key={i} className="topic-tag">
                                  <FiCheck className="bullet-icon" />
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="module-practice-footer">
                            <span className="practice-label">Practice Assessment:</span>
                            <div className="difficulty-actions-group">
                              <Link href={`${getCategoryRoute(m.category)}?difficulty=Easy&module=${m.id}`} className="practice-action-btn easy">
                                <span>Easy</span>
                              </Link>
                              <Link href={`${getCategoryRoute(m.category)}?difficulty=Medium&module=${m.id}`} className="practice-action-btn medium">
                                <span>Medium</span>
                              </Link>
                              <Link href={`${getCategoryRoute(m.category)}?difficulty=Hard&module=${m.id}`} className="practice-action-btn hard">
                                <span>Hard</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <div className="empty-search-state">
                  <p>No modules found matching your search. Try adjusting your query or category filters.</p>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="practice-tips-section">
              <h3><FiTarget /> Structured Practice Routine</h3>
              <div className="tips-grid">
                <div className="tip-box">
                  <span className="tip-num">01</span>
                  <h5>Concept Check</h5>
                  <p>Read through the module subtopics. Focus on HCF/LCM, Blood Relations, and Syllogism bottlenecks.</p>
                </div>
                <div className="tip-box">
                  <span className="tip-num">02</span>
                  <h5>Timed Workouts</h5>
                  <p>Start with Easy drills, then move to Medium. Keep page timers running to simulate exam pressure.</p>
                </div>
                <div className="tip-box">
                  <span className="tip-num">03</span>
                  <h5>Target Accuracy</h5>
                  <p>Aim for a minimum score of 80%. Review explanations carefully when you make a mistake.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Company Wise */}
        {activeTab === "companies" && (
          <section className="tab-pane fade-in">
            <div className="company-tab-header">
              <div className="tab-title-desc">
                <h2>Target Recruiter Practice Files</h2>
                <p>Select targeted question banks modeled on previous-year aptitude papers of top tech recruiters.</p>
              </div>
              <div className="search-wrapper max-width-350">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Filter companies..."
                  value={companySearch}
                  onChange={(e) => setCompanySearch(e.target.value)}
                />
              </div>
            </div>

            <div className="companies-card-grid">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((c, i) => {
                  const gradientThemes = [
                    "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    "linear-gradient(135deg, #10b981 0%, #047857 100%)",
                    "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                    "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
                    "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
                    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
                  ];
                  const theme = gradientThemes[i % gradientThemes.length];
                  return (
                    <div key={c.name} className="company-prep-card">
                      <div className="company-logo-avatar" style={{ background: theme }}>
                        {c.logo}
                      </div>
                      <div className="company-card-details">
                        <div className="company-card-top-row">
                          <h4>{c.name}</h4>
                          <span className="company-cat-tag">{c.category}</span>
                        </div>
                        <p>{c.questions} Practice Questions</p>
                        <div className="company-card-action">
                          <Link href={`/companies`} className="company-prep-btn">
                            <span>Solve Archive</span>
                            <FiExternalLink size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-search-state col-span-all">
                  <p>No companies found matching "{companySearch}".</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tab 3: Mock Tests */}
        {activeTab === "tests" && (
          <section className="tab-pane fade-in">
            <div className="section-title-wrapper">
              <h2>Placement Readiness Mock Tests</h2>
              <p>Simulate the pressure of actual recruitment drives with randomized topic questionnaires and strict timer parameters.</p>
            </div>

            <div className="mock-tests-grid">
              {mockTests.map((test) => {
                const getLevelClass = (lvl) => {
                  switch (lvl.toLowerCase()) {
                    case "beginner": return "lbl-beginner";
                    case "medium": return "lbl-medium";
                    case "hard": return "lbl-hard";
                    default: return "lbl-mixed";
                  }
                };
                return (
                  <div key={test.name} className="mock-test-card">
                    <div className="mock-card-header">
                      <span className={`level-label ${getLevelClass(test.level)}`}>{test.level}</span>
                      <div className="duration-label">
                        <FiClock size={14} />
                        <span>{test.duration}</span>
                      </div>
                    </div>
                    <h3>{test.name}</h3>
                    <p>{test.description}</p>
                    <div className="mock-card-footer">
                      <span className="qs-count">{test.questions}</span>
                      <button className="start-test-btn" onClick={() => alert(`${test.name} starting... Simulation active.`)}>
                        <FiPlay size={12} style={{ marginRight: "6px" }} />
                        Launch Test
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Difficulty Levels Reference */}
            <div className="difficulty-reference-panel">
              <h3>Practice Difficulty Standards</h3>
              <div className="diff-standards-row">
                {difficultyLevels.map((lvl) => (
                  <div key={lvl.name} className="diff-standard-box">
                    <div className="indicator-row">
                      <span className="color-dot" style={{ backgroundColor: lvl.color }}></span>
                      <h4>{lvl.name}</h4>
                    </div>
                    <p>{lvl.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Performance Analytics */}
        {activeTab === "analytics" && (
          <section className="tab-pane fade-in">
            <div className="analytics-layout-grid">
              
              {/* Left Panel: Primary Metrics */}
              <div className="analytics-left-panel">
                {/* Score Circle Card */}
                <div className="metric-radial-card">
                  <h4>Placement Readiness Index</h4>
                  <div className="radial-meter-container">
                    <svg viewBox="0 0 100 100" className="radial-svg">
                      <circle cx="50" cy="50" r="40" className="radial-bg-track" />
                      <circle cx="50" cy="50" r="40" className="radial-fill-track" style={{ strokeDashoffset: 251.2 - (251.2 * 78) / 100 }} />
                    </svg>
                    <div className="radial-meter-content">
                      <span className="meter-number">78%</span>
                      <span className="meter-label">Ready</span>
                    </div>
                  </div>
                  <p className="meter-footer-note">Excellent! You are 7% away from the "Elite Readiness" bracket (85%+).</p>
                </div>

                {/* Streak Widget */}
                <div className="analytics-streak-card">
                  <div className="streak-title-row">
                    <div className="streak-icon-wrap"><FiZap /></div>
                    <div>
                      <h4>7-Day Streak</h4>
                      <p>Active practice streak</p>
                    </div>
                  </div>
                  <div className="streak-days-row">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                      <div key={idx} className={`streak-day-item ${idx < 6 ? "active" : "today-pending"}`}>
                        <span className="day-name">{day}</span>
                        <div className="day-circle">{idx < 6 ? <FiCheck /> : ""}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Summary Grid */}
                <div className="perf-summary-mini-grid">
                  <div className="mini-summary-card">
                    <div className="summary-icon blue"><FiClock /></div>
                    <div className="summary-info">
                      <span className="summary-val">12.5 hrs</span>
                      <span className="summary-lbl">Practice Time</span>
                    </div>
                  </div>
                  <div className="mini-summary-card">
                    <div className="summary-icon pink"><FiPercent /></div>
                    <div className="summary-info">
                      <span className="summary-val">78.4%</span>
                      <span className="summary-lbl">Avg Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Breakdown & Leaderboard */}
              <div className="analytics-right-panel">
                
                {/* Topic Progress Bar breakdown */}
                <div className="topic-breakdown-card">
                  <h4>Category Syllabus Coverage</h4>
                  <div className="topic-progress-list">
                    <div className="topic-prog-row">
                      <div className="prog-title-row">
                        <span>Quantitative Aptitude</span>
                        <span>45%</span>
                      </div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "45%", backgroundColor: "#3b82f6" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row">
                        <span>Logical Reasoning</span>
                        <span>60%</span>
                      </div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "60%", backgroundColor: "#10b981" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row">
                        <span>Verbal Ability</span>
                        <span>30%</span>
                      </div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "30%", backgroundColor: "#ec4899" }}></div></div>
                    </div>
                    <div className="topic-prog-row">
                      <div className="prog-title-row">
                        <span>Data Interpretation</span>
                        <span>20%</span>
                      </div>
                      <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: "20%", backgroundColor: "#8b5cf6" }}></div></div>
                    </div>
                  </div>
                </div>

                {/* Strength Weakness Profile */}
                <div className="strength-weakness-card">
                  <h4>Core Competency Profile</h4>
                  <div className="sw-grid">
                    <div className="sw-column strength">
                      <h5>💪 Top Strong Areas</h5>
                      <ul>
                        <li>Number System</li>
                        <li>Simplification</li>
                        <li>Blood Relations</li>
                        <li>Reading Comprehension</li>
                      </ul>
                    </div>
                    <div className="sw-column weakness">
                      <h5>⚠️ Focus Growth Areas</h5>
                      <ul>
                        <li>Probability</li>
                        <li>Compound Interest</li>
                        <li>Syllogism</li>
                        <li>Data Sufficiency</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Leaderboard Showcase */}
                <div className="leaderboard-card-showcase">
                  <div className="card-header-row">
                    <h4>Weekly Leaderboard</h4>
                    <Link href="/leaderboard" className="view-full-link">View Full</Link>
                  </div>
                  <div className="leaderboard-mini-list">
                    <div className="lb-member-row">
                      <span className="rank-num gold">1</span>
                      <FiUser className="avatar-dummy" />
                      <span className="member-name">Rohan Sharma</span>
                      <span className="member-xp">940 XP</span>
                    </div>
                    <div className="lb-member-row">
                      <span className="rank-num silver">2</span>
                      <FiUser className="avatar-dummy" />
                      <span className="member-name">Priya Patel</span>
                      <span className="member-xp">880 XP</span>
                    </div>
                    <div className="lb-member-row current-user">
                      <span className="rank-num blue">3</span>
                      <FiUser className="avatar-dummy" />
                      <span className="member-name">You</span>
                      <span className="member-xp">720 XP</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

      </main>
    </div>
  );
}

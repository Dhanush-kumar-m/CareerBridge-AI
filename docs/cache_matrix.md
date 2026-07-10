# CareerBridge AI - Cache Matrix & Data Classification

This document classifies every data source and route in the CareerBridge AI application and details the caching strategy to optimize performance and reduce Supabase DB load.

---

## 1. Data Classification

### A. Public & Cacheable Data (Low Sensitivity)
- **Company Preparation Question Banks**: Static list of companies, eligibilities, prep steps, and question roadmaps.
- **Aptitude Questions**: Static list of quantitative, logical, and verbal practice questions.
- **Coding Arena Questions**: Static list of coding problems, description sheets, and boilerplate templates.
- **Achievements Metadata**: Static list of badges and descriptions.

### B. Private & Non-Cacheable Data (High Sensitivity)
- **User Profile & XP Details**: Dynamic authentication profile stored in `profiles` table.
- **Solved Progress (Aptitude/Coding)**: Solved states tracking user progress.
- **Resume ATS Analysis Feedbacks**: Detailed AI evaluation outputs in `resume_analyses`.
- **Mock Interview Submissions**: History of speech-to-text response grades.
- **Coding Compiler Submissions**: Detailed historical logs of test-cases runs.
- **Private Notifications Feed**: System alert updates specific to the user.

---

## 2. Caching Strategy Matrix

| Data Source | Location | Storage Type | Revalidation / TTL | Caching Layer |
| :--- | :--- | :--- | :--- | :--- |
| **Recruiter List & Question Banks** | Client Bundle | Bundled JS | Immutable (Build Time) | Browser Cache |
| **Aptitude Questions Database** | Client Bundle | Bundled JS | Immutable (Build Time) | Browser Cache |
| **Coding Arena Problems** | Client Bundle | Bundled JS | Immutable (Build Time) | Browser Cache |
| **Aptitude Solved List** | Supabase REST | Local Cache | `no-store` (Sync on Mount) | React State & Supabase RLS |
| **Coding Solved List** | Supabase REST | Local Cache | `no-store` (Sync on Mount) | React State & Supabase RLS |
| **Resume ATS Review Logs** | Supabase REST | Dynamic Read | `no-store` (Sync on Mount) | React State & Supabase RLS |
| **Coding Compiler Submissions** | Supabase REST | Dynamic Read | `no-store` (Sync on Mount) | React State & Supabase RLS |
| **Leaderboard Standings** | Client Bundle | Bundled JS | Revalidate (1h) | Browser Cache / localStorage |
| **System Notifications** | Supabase REST | Dynamic Read | `no-store` (Sync on Mount) | React State & Supabase RLS |

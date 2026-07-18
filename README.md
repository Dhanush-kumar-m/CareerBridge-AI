# CareerBridge AI 🚀

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-IDE-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)
  [![Recharts](https://img.shields.io/badge/Recharts-Analytics-FF69B4?style=for-the-badge)](https://recharts.org/)

  **An institutional-grade placement preparation and training portal designed to accelerate candidate placement readiness through structured roadmap pathways, multi-language code compilation, aptitude modules, AI mock interviews, and administrative tracking.**

</div>

---

## 📖 Table of Contents
1. [Platform Modules](#-platform-modules)
2. [Architectural Highlights](#-architectural-highlights)
3. [Testing & Quality Assurance](#-testing--quality-assurance)
4. [Project Directory Layout](#-project-directory-layout)
5. [Local Setup & Environment](#-local-setup--environment)
6. [Security & Rate Limiting](#-security--rate-limiting)

---

## 🌟 Platform Modules

### 💻 1. Online Coding Compiler & Practice Arena
* **Multi-Language Sandbox**: Write, test, and run code in `C`, `C++`, `Java`, `JavaScript`, `Python`, `C#`, and `Go`.
* **Tri-Tier Execution Architecture**: Features a primary CodeX Sandbox, secondary Judge0 API proxy, and automatic local fallback simulation so code evaluation never fails during network/third-party outages.
* **Monaco IDE & Diagnostics**: Integrated Monaco Editor with auto-complete, language selector, and stack trace line error highlights.
* **Submissions Tracking**: Tracks execution time, memory usage, pass/fail ratios, and solved status synced with Supabase.

### 🧠 2. Aptitude & Logical Reasoning Platform
* **5 Core Domains**: Quantitative Aptitude, Logical Reasoning, Verbal Ability, Abstract Reasoning, and Data Interpretation.
* **Interactive Test Engines**: Session countdown timers, instant solution explanation reveals, progress tracking hooks (`useAptitudeProgress`), and module progression resets.
* **Company & Difficulty Patterns**: Practice question sets grouped by top recruiter patterns and difficulty levels (Easy, Medium, Hard).

### 📊 3. Administrative Console & Student Session Monitoring
* **Live Session & Active Status Tracking**: Real-time monitoring of student online status (`ACTIVE` / `INACTIVE`) and accumulated login time.
* **Recharts Analytics Audit**: 3-axis visualizers for daily logins, user logouts, registration velocity, and activity timeline metrics.
* **Student & Company Management**: Admin controls for user management, company rosters, problem configuration, and notification dispatches.

### 📄 4. ATS Resume Suite
* **Resume Analyzer**: Local PDF parsing via PDF.js to score ATS keyword density, formatting, and profile completeness.
* **Resume Builder & Template Gallery**: Structured resume builder with modern resume templates.

### 🎙️ 5. AI Mock Interviews
* **Technical & HR Rounds**: Conversational voice & text mock interviews with real-time feedback scores and detailed performance rubrics.

---

## ⚡ Architectural Highlights

### 🔁 Resilient Tri-Tier Compiler Engine
To guarantee 100% execution availability, the `/api/compile` proxy uses a tri-tier execution fallback:
```
User Code -> Primary CodeX API -> Secondary Judge0 API -> Local Simulation Fallback
```
If third-party APIs return non-200 responses or timeout, the local simulator evaluates test cases cleanly without throwing 500 errors to the user.

### 🔒 Monaco Editor Model Isolation
Monaco Editor uses a global browser model cache. CareerBridge AI binds unique file schemes dynamically to prevent cross-question code bleeding:
```javascript
path={`file:///question-${questionId}.${getLanguageExtension(language)}`}
```

### 🔐 Database Row Level Security (RLS)
Supabase database tables utilize strict RLS policies:
- **Tenant Isolation**: Students can only access their own submissions and profile data (`auth.uid() = user_id`).
- **Role Escalation Safeguard**: Database trigger `check_profile_role_update` blocks unauthorized student role modifications.

---

## 🧪 Testing & Quality Assurance

CareerBridge AI includes built-in verification scripts for integration, security, and performance profiling:

```bash
# Run integration tests (/api/status & /api/health)
npm test

# Run security & RLS verification suite
node scripts/test-security.js

# Run latency & Web Vitals performance profiler
node scripts/measure-performance.js

# Run full unified test suite
npm run test-production
```

---

## 📂 Project Directory Layout

| Directory / File | Description |
| :--- | :--- |
| `src/app/coding/compiler/` | Coding compiler workspace & Monaco Editor integration |
| `src/app/coding/practice/` | Algorithm problem catalog with difficulty/topic filtering |
| `src/app/aptitude/` | Aptitude test modules (Quantitative, Reasoning, Verbal, etc.) |
| `src/app/admin/` | Admin Dashboard, student session logs, and reports |
| `src/app/api/compile/` | Code compilation proxy route handler |
| `src/context/` | Authentication (`AuthContext`) and global state providers |
| `src/hooks/` | Custom hooks (`useCodingProgress`, `useAptitudeProgress`, `useAuth`) |
| `scripts/` | Automated security, performance, and integration testing scripts |

---

## 🚀 Local Setup & Environment

### 1. Prerequisites
Ensure [Node.js (v20+)](https://nodejs.org/) and Git are installed.

### 2. Clone Repository & Install Dependencies
```bash
git clone https://github.com/Dhanush-kumar-m/CareerBridge-AI.git
cd CareerBridge-AI
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional Custom Compiler Sandbox Overrides
# COMPILER_URL=https://judge0-ce.p.rapidapi.com
# COMPILER_API_KEY=your-rapidapi-key
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Security & Rate Limiting
* **Authentication**: Google OAuth Sign-in integration with Supabase Auth.
* **Role Verification**: Admin matching for institutional administration access.
* **Production Build**: Clean production compilation via `npm run build`.

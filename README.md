# CareerBridge AI 🚀

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-IDE-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)
  [![Recharts](https://img.shields.io/badge/Recharts-Analytics-FF69B4?style=for-the-badge)](https://recharts.org/)

  **An institutional-grade placement preparation and training portal designed to accelerate candidate placement readiness through structured Roadmap pathways.**

</div>

---

## 📖 Table of Contents
1. [Platform Modules](#-platform-modules)
2. [Architectural Highlights](#-architectural-highlights)
3. [Project Directory Layout](#-project-directory-layout)
4. [Local Setup & Environment](#-local-setup--environment)
5. [Security & Rate Limiting](#-security--rate-limiting)
6. [Deployment](#-deployment)

---

## 🌟 Platform Modules

### 💻 1. Online Coding Compiler
* **Multi-Language Sandbox**: Write and compile code in `Java`, `Python`, `JavaScript`, `C`, and `C++`.
* **Side-by-Side Split Workspace**: Independent scroll-height viewport paneling (`750px`) for descriptive problem cards and code editors.
* **Responsive Test Cases Grid**: Dynamic expected-vs-actual output evaluation grids aligned perfectly across all difficulties.

### 📊 2. User Activity & Registration Console
* **Interactive Chart Audits**: 3-axis Recharts area visualizer detailing daily user logins, logouts, and new student accounts.
* **Audit Logs Timeline**: Track user session timelines with color-coded status badges, real-time timestamps, and dynamic queries.
* **PDF Export Framework**: Download auditor audit logs with clean print-media CSS layouts.

### 📄 3. ATS Resume Analyzer
* **Client-Side Document Parsing**: Parses PDF files locally using PDF.js to rate resume keyword density and profile completeness.

### 🎙️ 4. AI Mock Interviews
* **Speech Evaluation**: Conduct HR and Technical audio interviews with live feedback scoring.

---

## ⚡ Architectural Highlights

### 🔒 Monaco Editor Model Isolation
Monaco Editor uses a global model cache in browser memory. In order to prevent carryover code when switching questions, CareerBridge AI binds unique file schemes dynamically:
```javascript
path={`file:///question-${questionId}.${getLanguageExtension(language)}`}
```
Coupled with derived React states calculated during rendering, the editor clears itself instantly and loads language-specific boilerplates without frame delay.

### 🔌 Resilient Spline 3D Globe Pre-flight Check
To prevent offline connection crashes, the Spline component runs a pre-flight HEAD fetch check:
```javascript
fetch("https://prod.spline.design/...scene.splinecode", { method: "HEAD", mode: "no-cors" })
```
If the fetch rejects due to blocked networks, DNS errors, or firewall settings, the app catches it cleanly and replaces the canvas with a static offline fallback globe card without triggering Next.js dev error overlays.

---

## 📂 Project Directory Layout

| Directory / File | Description |
| :--- | :--- |
| `src/app/coding/compiler/` | Coding compiler container page |
| `src/components/coding/` | `CodeEditor` & `TestCases` workspace UI |
| `src/app/admin/new-users/` | Auditor registration & login Recharts console |
| `src/components/home/` | Spline Interactive `GlobeSection` wrapper |
| `src/app/resume/analyzer/` | Resume file upload container & PDF parser script |
| `src/context/` | Global state handlers (Authentication, Themes, XP) |
| `src/lib/` | Security configurations, rate limiting, and Supabase client |

---

## 🚀 Local Setup & Environment

### 1. Prerequisite Installations
Ensure [Node.js (v20+)](https://nodejs.org/) and Git are configured locally.

### 2. Clone the Repository & Configure Packages
```bash
git clone https://github.com/Dhanush-kumar-m/CareerBridge-AI.git
cd CareerBridge-AI
npm install
```

### 3. Setup Local Environment File
Create a `.env.local` file inside the root folder:
```env
# Supabase Local credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-anon-key
```

### 4. Boot Up Development Server
```bash
npm run dev
```
Open your browser to [http://localhost:3000](http://localhost:3000).

---

## 🛡️ Security & Rate Limiting
* **CSP Headers**: Configured Content Security Policy middleware protecting script execution and Monaco code validation contexts.
* **Auth Protection**: Protected route guards (`AuthGuard`) intercepting unauthorized requests.
* **Rate Limits**: Rate limiter middleware protection on sensitive login and API routes.

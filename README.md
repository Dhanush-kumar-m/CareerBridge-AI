# CareerBridge AI 🚀

CareerBridge AI is an institutional-grade placement preparation and training portal designed to accelerate candidate success in corporate recruitment drives. The platform integrates technical coding compilation, aptitude assessments, AI-driven resume analytics, mock interviews, and administrative auditing into a unified, high-performance web experience.

---

## 🛠️ Technology Stack
* **Framework**: [Next.js 15](https://nextjs.org/) (App Router & React 19)
* **Styling**: Modern Vanilla CSS with high-performance CSS grids and responsive layouts
* **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Realtime database, and GoTrue OAuth integration)
* **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (Isolated in-memory file buffers per question/language)
* **Libraries**: [Recharts](https://recharts.org/) (Data visualization & Audit trends), [PDF.js](https://mozilla.github.io/pdf.js/) (Local client-side resume parsing), [Spline 3D](https://spline.design/) (Interactive landing globe)

---

## 🌟 Key Features

### 💻 1. Online Coding Compiler
* **Multi-Language Support**: Complete coding playground for Java, Python, JavaScript, C, and C++.
* **Model-Isolation Architecture**: Leverages custom Monaco in-memory file URI paths (`file:///question-[id].[ext]`) combined with derived React state rendering to prevent code carryover, ensure clean workspace switches, and preserve state progress per question.
* **Side-by-Side Playground**: LeetCode-style dual split panels featuring independent scroll containers, sample test case layouts, execution logs, and compilation error diagnostics.

### 📊 2. User Activity & Registration Dashboard
* **Dynamic Analytics**: Visualizes 7-day portal engagement statistics for new user registrations, user logins, and logout audit records using interactive Recharts Area Charts.
* **Auditing Timeline**: Track student interaction events (sign-ins and sign-outs) with color-coded status badges, real-time timestamps, and user search queries.
* **PDF Report Exports**: One-click printable PDF document generation for security compliance review and placement auditing.

### 📄 3. ATS Resume Analyzer
* **Client-Side PDF Parsing**: Robust, connection-resilient local PDF.js script loader equipped with fallback checks and microtask retry delays.
* **ATS Scoring & Tips**: Analyzes ATS parser compatibility, identifies missing keywords, and provides formatting recommendations.

### 🎙️ 4. AI Mock Interviews
* **Speech & grammar checkpoints**: Practice standard Technical and HR mock interview sessions with live audio checkpoints and feedback analysis.

---

## 🚀 Local Installation & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Dhanush-kumar-m/CareerBridge-AI.git
cd CareerBridge-AI
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to access the portal.

---

## 🛡️ Security & Performance
* **Content Security Policy (CSP)**: Secure middleware headers protecting script execution (`unsafe-eval` for Monaco compiler sandbox), frame hijacking protection (`DENY`), and connection source validations.
* **Rate Limiting**: Custom client IP rate limiting on authentication routes and mock API endpoints.

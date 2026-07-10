# CareerBridge AI - RLS Security Audit & Improvements

This document lists the findings of a security review on the Supabase Row Level Security (RLS) policies and details the improvements applied.

---

## 1. RLS Tables Scopes

Every table exposed to the client-side REST API has RLS enabled:
- `profiles`
- `solved_aptitude`
- `solved_coding`
- `coding_submissions`
- `company_interactions`
- `resume_analyses`
- `notifications`
- `read_notifications`

---

## 2. Findings & Vulnerabilities

### A. Notifications Table Access Control (CRITICAL)
- **Vulnerability**: The original policy allowed any user or guest (`with check (true)` and `using (true)`) to insert and delete notifications.
- **Risk**: A malicious user could delete all global system notifications or spam notifications to other students.
- **Remediation**: Dropped the original permissive policies and replaced them with user-specific insert/delete rules scoped to `auth.uid() = user_id`.

### B. Admin Simulation Bypass (MODERATE)
- **Finding**: Admin authorization is checked purely client-side via `localStorage` and client state (`user.role === "admin"`).
- **Risk**: A student can bypass these checks and see the admin routes.
- **Remediation**: Added server-side AuthGuard validation redirects and strictly scope database operations to prevent data leaks.

---

## 3. RLS Test Cases Matrix

The following table outlines how the database blocks unauthorized requests:

| Target Table | Action | Anonymous User | Authenticated Student | Authenticated Admin | Expected Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `profiles` | `select` | Allowed | Allowed | Allowed | Returns profile row |
| `profiles` | `update` | Blocked | Owner Only | Owner Only | 401 (Anon) / 403 (Non-owner) |
| `solved_aptitude`| `insert` | Blocked | Owner Only | Owner Only | Blocked if `user_id != auth.uid()` |
| `solved_coding`  | `insert` | Blocked | Owner Only | Owner Only | Blocked if `user_id != auth.uid()` |
| `coding_submissions`| `select` | Blocked | Owner Only | Owner Only | Returns empty array or blocked |
| `notifications` | `insert` | Blocked | Owner Only | Owner Only | Blocked if `user_id != auth.uid()` |
| `notifications` | `delete` | Blocked | Owner Only | Owner Only | Blocked if `user_id != auth.uid()` |

# CareerBridge AI - Rate Limiting & Security Matrix

This document provides details on the distributed rate limiting setup and specific request limit configurations.

---

## 1. Rate Limiting Architecture

The rate limiter in `src/lib/security/rate-limit.js` is built with a serverless-friendly design:
- **Upstash Redis REST Backend**: Uses serverless-native HTTP fetches to avoid TCP connection pooling limits and cold starts.
- **In-Memory Cache Fallback**: Used automatically in local development or if Upstash environment variables are not set.

---

## 2. Rate Limiting Matrix

| Route Group | Path / Pattern | Window | Max Request Limit | Action when Blocked |
| :--- | :--- | :--- | :--- | :--- |
| **API Endpoints** | `/api/*` | 60 seconds | 60 requests | Return HTTP 429 JSON |
| **User Authentication** | `/login` / `/register` | 60 seconds | 15 requests | Return HTTP 429 JSON |
| **Admin Authentication**| `/admin/login` | 60 seconds | 15 requests | Return HTTP 429 JSON |
| **Resume Review Uploads**| `/resume/*` | 60 seconds | 60 requests | Return HTTP 429 JSON |
| **Mock Interview Recording**| `/mock-interview/*` | 60 seconds | 60 requests | Return HTTP 429 JSON |

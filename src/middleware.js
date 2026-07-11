import { NextResponse } from "next/server";
import { rateLimit } from "./lib/security/rate-limit";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Set headers on response
  const response = NextResponse.next();

  // 1. Content Security Policy (CSP) - allows Supabase REST API & web sockets, Monaco Editor eval execution, cdnjs CDNs
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://*.supabase.co;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cdnjs.cloudflare.com;
    worker-src 'self' blob:;
    frame-src 'self';
    frame-ancestors 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // 2. Rate Limiting check
  const isApi = pathname.startsWith("/api/");
  const isAuth = pathname === "/login" || pathname === "/register" || pathname === "/admin/login";
  const isSensitivePage = pathname.startsWith("/mock-interview") || pathname.startsWith("/resume");

  if (isApi || isAuth || isSensitivePage) {
    try {
      const ip = request.ip || request.headers.get("x-forwarded-for") || "127.0.0.1";
      const limit = isAuth ? 15 : 60;
      const windowSeconds = 60;

      const hostname = request.nextUrl.hostname;
      const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";

      const limitResult = await rateLimit(ip, limit, windowSeconds, isLocalhost);

      if (!limitResult.success) {
        return new NextResponse(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(windowSeconds),
            },
          }
        );
      }
    } catch (err) {
      console.error("RATE LIMITER MIDDLEWARE CRASH:", err);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|json|woff2?|otf|ttf|eot)).*)",
  ],
};
